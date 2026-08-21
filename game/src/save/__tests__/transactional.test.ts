import { describe, it, expect } from 'vitest';
import { TransactionalRepository, InMemoryBackend } from '../transactional';
import type { GameState } from '../../core/types';
import { createNewGame } from '../../core/state';

const T0 = 1_700_000_000_000;

/** 结构化深拷贝（生产环境可用 structuredClone，测试环境用 JSON 往返兜底） */
function deepClone<T>(obj: T): T {
  if (typeof structuredClone === 'function') return structuredClone(obj);
  return JSON.parse(JSON.stringify(obj));
}

function makeState(): GameState {
  return createNewGame(T0);
}

// ════════════════════════════════════════════
// ① commit 后 state 与 IDB 一致
// ════════════════════════════════════════════

describe('验收 ① commit 后 state 与 IDB 一致', () => {
  it('commit 后后端持有最新状态', async () => {
    const backend = new InMemoryBackend<GameState>(makeState());
    const repo = new TransactionalRepository(backend, deepClone);

    const tx = repo.begin(backend.peek()!);
    tx.getState().credits = 999;
    tx.getState().stardust = 42;
    await tx.commit();

    const loaded = await backend.load();
    expect(loaded?.credits).toBe(999);
    expect(loaded?.stardust).toBe(42);
  });

  it('commit 后嵌套对象也一致', async () => {
    const backend = new InMemoryBackend<GameState>(makeState());
    const repo = new TransactionalRepository(backend, deepClone);

    const tx = repo.begin(backend.peek()!);
    tx.getState().facilities.excavator.level = 5;
    tx.getState().settings.autoSellStardust = true;
    await tx.commit();

    const loaded = await backend.load();
    expect(loaded?.facilities.excavator.level).toBe(5);
    expect(loaded?.settings.autoSellStardust).toBe(true);
  });
});

// ════════════════════════════════════════════
// ② 任意步骤 rollback 回到 begin 前
// ════════════════════════════════════════════

describe('验收 ② rollback 回到 begin 前', () => {
  it('rollback 后状态恢复到 begin 前的值', () => {
    const state = makeState();
    state.credits = 500;
    state.facilities.excavator.level = 3;
    const backend = new InMemoryBackend<GameState>(deepClone(state));
    const repo = new TransactionalRepository(backend, deepClone);

    const tx = repo.begin(state);
    tx.getState().credits = 0;
    tx.getState().facilities.excavator.level = 1;
    tx.getState().stardust = 999;
    tx.rollback();

    // 工作状态引用已被恢复
    expect(state.credits).toBe(500);
    expect(state.facilities.excavator.level).toBe(3);
    expect(state.stardust).toBe(0);
  });

  it('rollback 后后端不受影响', () => {
    const state = makeState();
    state.credits = 500;
    const backend = new InMemoryBackend<GameState>(deepClone(state));
    const repo = new TransactionalRepository(backend, deepClone);

    const tx = repo.begin(state);
    tx.getState().credits = 0;
    tx.rollback();

    expect(backend.peek()?.credits).toBe(500);
  });

  it('rollback 后嵌套对象也恢复', () => {
    const state = makeState();
    state.facilities.excavator.level = 4;
    state.settings.stardustKeepAmount = 30;
    const backend = new InMemoryBackend<GameState>(deepClone(state));
    const repo = new TransactionalRepository(backend, deepClone);

    const tx = repo.begin(state);
    tx.getState().facilities.excavator.level = 1;
    tx.getState().settings.stardustKeepAmount = 999;
    tx.getState().facilities.transport.unlocked = true;
    tx.rollback();

    expect(state.facilities.excavator.level).toBe(4);
    expect(state.settings.stardustKeepAmount).toBe(30);
    expect(state.facilities.transport.unlocked).toBe(false);
  });

  it('rollback 后可以开新事务', () => {
    const state = makeState();
    const backend = new InMemoryBackend<GameState>(deepClone(state));
    const repo = new TransactionalRepository(backend, deepClone);

    const tx1 = repo.begin(state);
    tx1.getState().credits = 1;
    tx1.rollback();

    const tx2 = repo.begin(state);
    tx2.getState().credits = 2;
    tx2.rollback();

    expect(state.credits).toBe(100); // createNewGame 默认
  });
});

// ════════════════════════════════════════════
// ③ 中途刷新页面无半写态
// ════════════════════════════════════════════

describe('验收 ③ 中途刷新页面无半写态', () => {
  it('事务未 commit 时后端保持 begin 前状态', () => {
    const state = makeState();
    state.credits = 500;
    const backend = new InMemoryBackend<GameState>(deepClone(state));
    const repo = new TransactionalRepository(backend, deepClone);

    const tx = repo.begin(state);
    tx.getState().credits = 0;
    tx.getState().stardust = 999;

    // 模拟页面刷新：内存事务丢失，后端未被触碰
    expect(backend.peek()?.credits).toBe(500);
    expect(backend.peek()?.stardust).toBe(0);
  });

  it('事务未 commit 时后端嵌套对象也保持原值', () => {
    const state = makeState();
    state.facilities.excavator.level = 3;
    const backend = new InMemoryBackend<GameState>(deepClone(state));
    const repo = new TransactionalRepository(backend, deepClone);

    const tx = repo.begin(state);
    tx.getState().facilities.excavator.level = 5;
    tx.getState().facilities.transport.unlocked = true;

    // 页面刷新模拟
    expect(backend.peek()?.facilities.excavator.level).toBe(3);
    expect(backend.peek()?.facilities.transport.unlocked).toBe(false);
  });
});

// ════════════════════════════════════════════
// ④ 接口不耦合具体资源类型
// ════════════════════════════════════════════

describe('验收 ④ 接口不耦合具体资源类型', () => {
  it('泛型 T 可以是任意类型（非 GameState）', async () => {
    interface SimpleState {
      count: number;
      items: string[];
    }

    const backend = new InMemoryBackend<SimpleState>({ count: 0, items: [] });
    const repo = new TransactionalRepository<SimpleState>(backend, deepClone);

    const tx = repo.begin(backend.peek()!);
    tx.getState().count = 5;
    tx.getState().items.push('a', 'b');
    await tx.commit();

    const loaded = await backend.load();
    expect(loaded?.count).toBe(5);
    expect(loaded?.items).toEqual(['a', 'b']);
  });

  it('泛型 T 可以是原始对象', async () => {
    const backend = new InMemoryBackend<{ x: number; y: number }>({ x: 1, y: 2 });
    const repo = new TransactionalRepository(backend, deepClone);

    const tx = repo.begin(backend.peek()!);
    tx.getState().x = 10;
    await tx.commit();

    expect((await backend.load())?.x).toBe(10);
  });
});

// ════════════════════════════════════════════
// ⑤ 单事务 < 5ms
// ════════════════════════════════════════════

describe('验收 ⑤ 单事务 < 5ms', () => {
  it('begin + commit 总耗时 < 5ms（内存后端）', async () => {
    const backend = new InMemoryBackend<GameState>(makeState());
    const repo = new TransactionalRepository(backend, deepClone);

    const start = performance.now();
    const tx = repo.begin(backend.peek()!);
    tx.getState().credits = 999;
    await tx.commit();
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(5);
  });

  it('begin + rollback 总耗时 < 5ms（内存后端）', () => {
    const backend = new InMemoryBackend<GameState>(makeState());
    const repo = new TransactionalRepository(backend, deepClone);

    const start = performance.now();
    const tx = repo.begin(backend.peek()!);
    tx.getState().credits = 999;
    tx.rollback();
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(5);
  });
});

// ════════════════════════════════════════════
// 事务生命周期
// ════════════════════════════════════════════

describe('事务生命周期', () => {
  it('commit 后 isDone() 返回 true', async () => {
    const backend = new InMemoryBackend<GameState>(makeState());
    const repo = new TransactionalRepository(backend, deepClone);

    const tx = repo.begin(backend.peek()!);
    expect(tx.isDone()).toBe(false);
    await tx.commit();
    expect(tx.isDone()).toBe(true);
  });

  it('rollback 后 isDone() 返回 true', () => {
    const backend = new InMemoryBackend<GameState>(makeState());
    const repo = new TransactionalRepository(backend, deepClone);

    const tx = repo.begin(backend.peek()!);
    expect(tx.isDone()).toBe(false);
    tx.rollback();
    expect(tx.isDone()).toBe(true);
  });

  it('commit 后再 commit 抛异常', async () => {
    const backend = new InMemoryBackend<GameState>(makeState());
    const repo = new TransactionalRepository(backend, deepClone);

    const tx = repo.begin(backend.peek()!);
    await tx.commit();
    await expect(tx.commit()).rejects.toThrow('事务已结束');
  });

  it('rollback 后再 rollback 抛异常', () => {
    const backend = new InMemoryBackend<GameState>(makeState());
    const repo = new TransactionalRepository(backend, deepClone);

    const tx = repo.begin(backend.peek()!);
    tx.rollback();
    expect(() => tx.rollback()).toThrow('事务已结束');
  });

  it('commit 后 getState 抛异常', async () => {
    const backend = new InMemoryBackend<GameState>(makeState());
    const repo = new TransactionalRepository(backend, deepClone);

    const tx = repo.begin(backend.peek()!);
    await tx.commit();
    expect(() => tx.getState()).toThrow('事务已结束');
  });

  it('同时开两个事务时自动清理旧事务', () => {
    const state = makeState();
    const backend = new InMemoryBackend<GameState>(deepClone(state));
    const repo = new TransactionalRepository(backend, deepClone);

    const tx1 = repo.begin(state);
    // 修复后：begin() 不再抛异常，而是自动清理旧事务元数据后开新事务
    const tx2 = repo.begin(state);
    expect(tx1.isDone()).toBe(true);
    expect(tx2.isDone()).toBe(false);
    tx2.rollback();
  });

  it('事务结束后可以开新事务', async () => {
    const state = makeState();
    const backend = new InMemoryBackend<GameState>(deepClone(state));
    const repo = new TransactionalRepository(backend, deepClone);

    const tx1 = repo.begin(state);
    await tx1.commit();

    // 事务结束后可以开新事务
    const tx2 = repo.begin(state);
    tx2.getState().credits = 200;
    await tx2.commit();

    expect(backend.peek()?.credits).toBe(200);
  });

  it('isActive 正确反映事务状态', async () => {
    const backend = new InMemoryBackend<GameState>(makeState());
    const repo = new TransactionalRepository(backend, deepClone);

    expect(repo.isActive()).toBe(false);
    const tx = repo.begin(backend.peek()!);
    expect(repo.isActive()).toBe(true);
    await tx.commit();
    expect(repo.isActive()).toBe(false);
  });
});
