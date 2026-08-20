import { describe, it, expect, beforeEach } from 'vitest';
import { TransactionalRepository, InMemoryBackend } from '../../save/transactional';
import { ConsumptionEngine } from '../consumption';
import type { ConsumptionRequest, ConsumptionEvent } from '../consumption';
import { createNewGame } from '../state';
import { clearRegistry, initResourceRegistry, getResource, isRegistered } from '../resourceRegistry';
import { RESOURCE_SCHEMAS } from '../config';
import type { GameState } from '../types';

const T0 = 1_700_000_000_000;

/** 深拷贝——structuredClone 优先，JSON 往返兜底 */
function deepClone<T>(obj: T): T {
  if (typeof structuredClone === 'function') return structuredClone(obj);
  return JSON.parse(JSON.stringify(obj));
}

/** 构造一个带资源的初始状态 */
function makeState(isotope = 100, credits = 500, crystal = 50): GameState {
  const s = createNewGame(T0);
  s.isotope = isotope;
  s.credits = credits;
  s.crystal = crystal;
  return s;
}

/** 构造消耗引擎 + 内存后端 */
function makeEngine(state: GameState) {
  const backend = new InMemoryBackend<GameState>(deepClone(state));
  const repo = new TransactionalRepository<GameState>(backend, deepClone);
  const engine = new ConsumptionEngine(repo);
  return { engine, backend, repo, state };
}

beforeEach(() => {
  clearRegistry();
  initResourceRegistry(RESOURCE_SCHEMAS);
});

// ════════════════════════════════════════════
// 验收① 三类消耗各走一次事务、原子完成
// ════════════════════════════════════════════

describe('验收① 三类消耗各走一次事务、原子完成', () => {
  it('buff 激活消耗同位素，事务原子完成', async () => {
    const { engine, state } = makeEngine(makeState(100));
    const req: ConsumptionRequest = {
      kind: 'buff',
      resourceId: 'isotope',
      amount: 20,
    };
    const r = await engine.consume(state, req);
    expect(r.ok).toBe(true);
    expect(r.event).toBeDefined();
    expect(r.event!.kind).toBe('buff');
    expect(r.event!.amount).toBe(20);
    expect(r.event!.resourceId).toBe('isotope');
    // 扣减生效
    expect(state.isotope).toBe(80);
  });

  it('exploration 派遣消耗同位素并产出反物质，事务原子完成', async () => {
    const { engine, state } = makeEngine(makeState(100));
    const req: ConsumptionRequest = {
      kind: 'exploration',
      resourceId: 'isotope',
      amount: 30,
      produces: [{ resourceId: 'antimatter', amount: 5 }],
    };
    const r = await engine.consume(state, req);
    expect(r.ok).toBe(true);
    expect(r.event!.kind).toBe('exploration');
    expect(r.event!.produced).toEqual([{ resourceId: 'antimatter', amount: 5 }]);
    // 扣减和产出在同一事务内原子完成
    expect(state.isotope).toBe(70);
    expect(state.antimatter).toBe(5);
  });

  it('exchange 碎片兑换消耗同位素产出信用点，事务原子完成', async () => {
    const { engine, state } = makeEngine(makeState(100, 500));
    const req: ConsumptionRequest = {
      kind: 'exchange',
      resourceId: 'isotope',
      amount: 10,
      produces: [{ resourceId: 'credits', amount: 100 }],
    };
    const r = await engine.consume(state, req);
    expect(r.ok).toBe(true);
    expect(r.event!.kind).toBe('exchange');
    expect(state.isotope).toBe(90);
    expect(state.credits).toBe(600);
  });

  it('消耗数量为 0 时不改变状态但事务正常完成', async () => {
    const { engine, state } = makeEngine(makeState(100));
    const req: ConsumptionRequest = {
      kind: 'buff',
      resourceId: 'isotope',
      amount: 0,
    };
    const r = await engine.consume(state, req);
    expect(r.ok).toBe(true);
    expect(state.isotope).toBe(100);
  });

  it('消耗后事件被记录到引擎日志', async () => {
    const { engine, state } = makeEngine(makeState(100));
    await engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 10 });
    await engine.consume(state, { kind: 'exploration', resourceId: 'isotope', amount: 20 });
    const events = engine.getEvents();
    expect(events.length).toBe(2);
    expect(events[0].kind).toBe('buff');
    expect(events[1].kind).toBe('exploration');
  });
});

// ════════════════════════════════════════════
// 验收② 余额不足时校验拦截不扣
// ════════════════════════════════════════════

describe('验收② 余额不足时校验拦截不扣', () => {
  it('同位素不足时返回失败且不扣减', async () => {
    const { engine, state } = makeEngine(makeState(10));
    const req: ConsumptionRequest = {
      kind: 'buff',
      resourceId: 'isotope',
      amount: 50,
    };
    const r = await engine.consume(state, req);
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('不足');
    expect(state.isotope).toBe(10); // 余额不变
  });

  it('余额刚好等于消耗量时成功扣至 0', async () => {
    const { engine, state } = makeEngine(makeState(30));
    const r = await engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 30 });
    expect(r.ok).toBe(true);
    expect(state.isotope).toBe(0);
  });

  it('余额不足时不记录事件', async () => {
    const { engine, state } = makeEngine(makeState(5));
    await engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 50 });
    expect(engine.getEvents().length).toBe(0);
  });

  it('消耗负数返回失败', async () => {
    const { engine, state } = makeEngine(makeState(100));
    const r = await engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: -5 });
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('负');
  });

  it('未注册资源返回失败', async () => {
    const { engine, state } = makeEngine(makeState(100));
    const r = await engine.consume(state, { kind: 'buff', resourceId: 'nonexistent', amount: 10 });
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('未知资源类型');
  });

  it('产出资源不影响余额校验——只校验消耗方', async () => {
    const { engine, state } = makeEngine(makeState(100));
    // 产出 credits 但不消耗 credits——应该成功
    const r = await engine.consume(state, {
      kind: 'exchange',
      resourceId: 'isotope',
      amount: 10,
      produces: [{ resourceId: 'credits', amount: 999999 }],
    });
    expect(r.ok).toBe(true);
    expect(state.credits).toBe(999999 + 500);
  });
});

// ════════════════════════════════════════════
// 验收③ 离线结算不重复扣（幂等）
// ════════════════════════════════════════════

describe('验收③ 离线结算不重复扣（幂等）', () => {
  it('相同 idempotencyKey 的消耗只执行一次', async () => {
    const { engine, state } = makeEngine(makeState(100));
    const req: ConsumptionRequest = {
      kind: 'buff',
      resourceId: 'isotope',
      amount: 20,
      idempotencyKey: 'offline-buff-001',
    };
    const r1 = await engine.consume(state, req);
    expect(r1.ok).toBe(true);
    expect(state.isotope).toBe(80);

    // 再次用相同 key 调用——不应重复扣
    const r2 = await engine.consume(state, req);
    expect(r2.ok).toBe(true);
    expect(state.isotope).toBe(80); // 余额不变
    expect(r2.event!.id).toBe(r1.event!.id); // 返回的是同一个事件
  });

  it('不同 idempotencyKey 的消耗各执行一次', async () => {
    const { engine, state } = makeEngine(makeState(100));
    await engine.consume(state, {
      kind: 'buff',
      resourceId: 'isotope',
      amount: 20,
      idempotencyKey: 'key-A',
    });
    await engine.consume(state, {
      kind: 'buff',
      resourceId: 'isotope',
      amount: 20,
      idempotencyKey: 'key-B',
    });
    expect(state.isotope).toBe(60); // 两次各扣 20
  });

  it('isProcessed 正确反映幂等状态', async () => {
    const { engine, state } = makeEngine(makeState(100));
    expect(engine.isProcessed('key-X')).toBe(false);
    await engine.consume(state, {
      kind: 'buff',
      resourceId: 'isotope',
      amount: 10,
      idempotencyKey: 'key-X',
    });
    expect(engine.isProcessed('key-X')).toBe(true);
  });

  it('无 idempotencyKey 的消耗每次都执行', async () => {
    const { engine, state } = makeEngine(makeState(100));
    await engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 20 });
    await engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 20 });
    expect(state.isotope).toBe(60); // 两次都扣了
  });

  it('模拟离线结算场景：多次重放不重复扣', async () => {
    const { engine, state } = makeEngine(makeState(100));
    // 模拟离线结算：首次执行
    const offlineReq: ConsumptionRequest = {
      kind: 'exploration',
      resourceId: 'isotope',
      amount: 15,
      produces: [{ resourceId: 'antimatter', amount: 3 }],
      idempotencyKey: 'offline-settle-20260820',
    };
    await engine.consume(state, offlineReq);
    // 模拟页面刷新后重新结算——引擎应跳过已处理的 key
    await engine.consume(state, offlineReq);
    await engine.consume(state, offlineReq);
    expect(state.isotope).toBe(85); // 只扣了一次
    expect(state.antimatter).toBe(3); // 只产了一次
  });
});

// ════════════════════════════════════════════
// 验收④ 消耗事件可回滚
// ════════════════════════════════════════════

describe('验收④ 消耗事件可回滚', () => {
  it('回滚 buff 消耗——归还同位素', async () => {
    const { engine, state } = makeEngine(makeState(100));
    const r = await engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 20 });
    expect(state.isotope).toBe(80);

    const rb = await engine.rollback(state, r.event!.id);
    expect(rb.ok).toBe(true);
    expect(state.isotope).toBe(100); // 归还
  });

  it('回滚 exploration 消耗——归还消耗并扣除产出', async () => {
    const { engine, state } = makeEngine(makeState(100));
    const r = await engine.consume(state, {
      kind: 'exploration',
      resourceId: 'isotope',
      amount: 30,
      produces: [{ resourceId: 'antimatter', amount: 5 }],
    });
    expect(state.isotope).toBe(70);
    expect(state.antimatter).toBe(5);

    await engine.rollback(state, r.event!.id);
    expect(state.isotope).toBe(100); // 归还消耗
    expect(state.antimatter).toBe(0); // 扣除产出
  });

  it('回滚 exchange 消耗——归还消耗并扣除产出', async () => {
    const { engine, state } = makeEngine(makeState(100, 500));
    const r = await engine.consume(state, {
      kind: 'exchange',
      resourceId: 'isotope',
      amount: 10,
      produces: [{ resourceId: 'credits', amount: 100 }],
    });
    expect(state.isotope).toBe(90);
    expect(state.credits).toBe(600);

    await engine.rollback(state, r.event!.id);
    expect(state.isotope).toBe(100);
    expect(state.credits).toBe(500);
  });

  it('回滚后事件标记为已回滚', async () => {
    const { engine, state } = makeEngine(makeState(100));
    const r = await engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 20 });
    await engine.rollback(state, r.event!.id);

    const event = engine.getEvent(r.event!.id);
    expect(event!.rolledBack).toBe(true);
  });

  it('回滚后活跃事件列表不再包含该事件', async () => {
    const { engine, state } = makeEngine(makeState(100));
    const r = await engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 20 });
    expect(engine.getActiveEvents().length).toBe(1);

    await engine.rollback(state, r.event!.id);
    expect(engine.getActiveEvents().length).toBe(0);
  });

  it('重复回滚同一事件返回失败', async () => {
    const { engine, state } = makeEngine(makeState(100));
    const r = await engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 20 });
    await engine.rollback(state, r.event!.id);

    const rb = await engine.rollback(state, r.event!.id);
    expect(rb.ok).toBe(false);
    expect(rb.reason).toContain('已回滚');
  });

  it('回滚不存在的事件返回失败', async () => {
    const { engine, state } = makeEngine(makeState(100));
    const rb = await engine.rollback(state, 'nonexistent-id');
    expect(rb.ok).toBe(false);
    expect(rb.reason).toContain('不存在');
  });

  it('产出已花掉时回滚仍归还消耗资源（尽力扣除产出）', async () => {
    const { engine, state } = makeEngine(makeState(100));
    const r = await engine.consume(state, {
      kind: 'exchange',
      resourceId: 'isotope',
      amount: 10,
      produces: [{ resourceId: 'credits', amount: 100 }],
    });
    expect(state.credits).toBe(600);

    // 玩家花掉产出的 credits
    state.credits = 30;

    await engine.rollback(state, r.event!.id);
    // 消耗的资源一定归还
    expect(state.isotope).toBe(100);
    // 产出的资源尽力扣除（Math.max 保护，不会变负）
    expect(state.credits).toBe(0); // 30 - 100 → Math.max(0, -70) = 0
  });
});

// ════════════════════════════════════════════
// 事务安全性
// ════════════════════════════════════════════

describe('事务安全性', () => {
  it('消耗事务提交后后端持有最新状态', async () => {
    const { engine, backend, state } = makeEngine(makeState(100));
    await engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 20 });
    const saved = backend.peek();
    expect(saved?.isotope).toBe(80);
  });

  it('余额不足回滚后后端不受影响', async () => {
    const { engine, backend, state } = makeEngine(makeState(10));
    await engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 50 });
    expect(backend.peek()?.isotope).toBe(10);
  });

  it('回滚后后端同步更新', async () => {
    const { engine, backend, state } = makeEngine(makeState(100));
    const r = await engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 20 });
    expect(backend.peek()?.isotope).toBe(80);

    await engine.rollback(state, r.event!.id);
    expect(backend.peek()?.isotope).toBe(100);
  });

  it('消耗事件包含时间戳和完整产出记录', async () => {
    const { engine, state } = makeEngine(makeState(100));
    const before = Date.now();
    const r = await engine.consume(state, {
      kind: 'exploration',
      resourceId: 'isotope',
      amount: 25,
      produces: [
        { resourceId: 'antimatter', amount: 3 },
        { resourceId: 'darkmatter', amount: 1 },
      ],
    });
    const after = Date.now();
    expect(r.event!.timestamp).toBeGreaterThanOrEqual(before);
    expect(r.event!.timestamp).toBeLessThanOrEqual(after);
    expect(r.event!.produced).toHaveLength(2);
    expect(r.event!.produced[0]).toEqual({ resourceId: 'antimatter', amount: 3 });
    expect(r.event!.produced[1]).toEqual({ resourceId: 'darkmatter', amount: 1 });
  });
});

// ════════════════════════════════════════════
// T1-3 资源注册验证
// ════════════════════════════════════════════

describe('T1-3 资源注册——反物质与暗物质', () => {
  it('反物质和暗物质已注册到资源注册表', () => {
    expect(isRegistered('antimatter')).toBe(true);
    expect(isRegistered('darkmatter')).toBe(true);
    expect(getResource('antimatter')!.name).toBe('反物质');
    expect(getResource('darkmatter')!.name).toBe('暗物质');
    expect(getResource('antimatter')!.consumable).toBe(true);
    expect(getResource('darkmatter')!.consumable).toBe(true);
  });

  it('反物质和暗物质可通过消耗引擎消耗', async () => {
    const { engine, state } = makeEngine(makeState(0, 500, 0));
    state.antimatter = 10;
    state.darkmatter = 8;

    const r1 = await engine.consume(state, { kind: 'exchange', resourceId: 'antimatter', amount: 3 });
    expect(r1.ok).toBe(true);
    expect(state.antimatter).toBe(7);

    const r2 = await engine.consume(state, { kind: 'exchange', resourceId: 'darkmatter', amount: 2 });
    expect(r2.ok).toBe(true);
    expect(state.darkmatter).toBe(6);
  });

  it('新资源不影响现有三资源消耗逻辑', async () => {
    const { engine, state } = makeEngine(makeState(100, 500, 50));
    // 现有资源消耗正常
    expect((await engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 10 })).ok).toBe(true);
    expect((await engine.consume(state, { kind: 'exchange', resourceId: 'credits', amount: 50 })).ok).toBe(true);
    expect((await engine.consume(state, { kind: 'exchange', resourceId: 'crystal', amount: 5 })).ok).toBe(true);
    expect(state.isotope).toBe(90);
    expect(state.credits).toBe(450);
    expect(state.crystal).toBe(45);
  });
});
