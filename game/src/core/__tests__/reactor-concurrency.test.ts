/**
 * 反应堆同位素消耗 — 高并发 / 竞态场景测试
 *
 * 覆盖 ConsumptionEngine + TransactionalRepository 在并发调用下的行为。
 * ConsumptionEngine 在 consume/rollback 入口通过 promise 链式串行化队列（mutex）
 * 将并发调用排队为顺序执行，从源头消除事务层交错。
 *
 * 背景架构事实：TransactionalRepository 是单实例共享可变状态机——
 * `snapshot` / `workingState` / `done` 是实例字段，返回的 Transaction 闭包捕获 this。
 * 修复前，两个 consume() 在 await commit 处交错时，第二个 begin() 会通过"自动清理残留"
 * 覆盖第一个事务的元数据，引发扣减泄漏（Bug A）和幂等 check-then-act 竞态（Bug B）。
 * 修复方式：engine 层串行化队列，所有 consume/rollback 调用排队顺序执行。
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createNewGame } from '../state';
import { ConsumptionEngine } from '../consumption';
import { ReactorRuntime } from '../reactor';
import { InMemoryBackend, TransactionalRepository } from '../../save/transactional';
import type { PersistenceBackend } from '../../save/transactional';
import type { GameState } from '../types';

const T0 = 1_700_000_000_000;

/** 构造一个带指定同位素的游戏状态 */
function makeState(isotope: number, now = T0): GameState {
  const state = createNewGame(now);
  state.isotope = isotope;
  return state;
}

/** 构造完整的消耗链路：backend → repo → engine → runtime */
function makeRuntime(backend: PersistenceBackend<GameState>) {
  const repo = new TransactionalRepository<GameState>(backend, structuredClone);
  const engine = new ConsumptionEngine(repo);
  const runtime = new ReactorRuntime(engine);
  return { repo, engine, runtime };
}

/**
 * 可控失败后端：前 `failFirst` 次 save 抛异常，之后成功。
 * 用于模拟 IndexedDB 写入失败（QuotaExceededError）。
 */
class FailingBackend<T> implements PersistenceBackend<T> {
  saveCallCount = 0;
  failFirst = 0;
  private data: T | null = null;
  constructor(initial: T | null = null) {
    this.data = initial;
  }
  async load(): Promise<T | null> {
    return this.data;
  }
  async save(state: T): Promise<void> {
    this.saveCallCount++;
    if (this.saveCallCount <= this.failFirst) {
      throw new Error('模拟写入失败: QuotaExceededError');
    }
    this.data = state;
  }
  peek(): T | null {
    return this.data;
  }
}

describe('反应堆同位素消耗 — 高并发 / 竞态场景', () => {
  let backend: InMemoryBackend<GameState>;
  let repo: TransactionalRepository<GameState>;
  let engine: ConsumptionEngine;
  let runtime: ReactorRuntime;

  beforeEach(() => {
    backend = new InMemoryBackend<GameState>();
    ({ repo, engine, runtime } = makeRuntime(backend));
    engine.reset();
    runtime.reset();
  });

  // ===== 1. 并发双成功 =====
  it('并发双成功：Promise.all 同时发两个 consume，都 ok 且 isotope 精确扣两次', async () => {
    const state = makeState(200);

    const [r1, r2] = await Promise.all([
      engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 40 }),
      engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 60 }),
    ]);

    // 两个消耗都成功
    expect(r1.ok).toBe(true);
    expect(r2.ok).toBe(true);

    // isotope 精确扣了两次：200 - 40 - 60 = 100
    expect(state.isotope).toBe(100);

    // 后端持久化的是最终状态
    expect(backend.peek()?.isotope).toBe(100);

    // 两个消耗事件都登记
    expect(engine.getEvents()).toHaveLength(2);

    // 事务全部结束，无残留
    expect(repo.isActive()).toBe(false);
  });

  // ===== 2. 并发首次 save 失败 =====
  it('并发首次 save 失败：串行化后第一个失败回滚、第二个成功，状态精确为 140', async () => {
    const failingBackend = new FailingBackend<GameState>();
    failingBackend.failFirst = 1; // 第 1 次 save 抛异常（属于第一个 consume）
    const fRepo = new TransactionalRepository<GameState>(failingBackend, structuredClone);
    const fEngine = new ConsumptionEngine(fRepo);
    fEngine.reset();

    const state = makeState(200);

    const [r1, r2] = await Promise.all([
      // 第一个 consume：amount 40，save 会抛 QuotaExceededError
      fEngine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 40 }),
      // 第二个 consume：amount 60，save 成功
      fEngine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 60 }),
    ]);

    // 第一个失败（commit 内 save 抛错 → catch 捕获）
    expect(r1.ok).toBe(false);
    expect(r1.reason).toContain('异常');

    // 第二个成功
    expect(r2.ok).toBe(true);

    // save 被调用两次：第 1 次失败、第 2 次成功
    expect(failingBackend.saveCallCount).toBe(2);

    // 串行化后：c1 先完整执行（save 失败→rollback 完整恢复 40）→ c2 再执行成功扣 60。
    // state.isotope = 200 - 0（c1 回滚）- 60（c2） = 140
    expect(state.isotope).toBe(140);

    // 后端持久化的是 c2 成功后的状态（140）
    expect(failingBackend.peek()?.isotope).toBe(140);

    // 仅第二个 consume 的事件被登记（第一个失败未登记）
    expect(fEngine.getEvents()).toHaveLength(1);

    // 事务层最终无残留
    expect(fRepo.isActive()).toBe(false);
  });

  // ===== 3. 高频串行 =====
  it('高频串行：连续 50 次 consume，每次 ok 且余额精确递减', async () => {
    const state = makeState(2000); // 50 × 40 = 2000，刚好扣完

    let okCount = 0;
    for (let i = 0; i < 50; i++) {
      const r = await engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 40 });
      if (r.ok) okCount++;
      // 每次都验证余额精确递减
      expect(state.isotope).toBe(2000 - (i + 1) * 40);
    }

    // 50 次全部成功
    expect(okCount).toBe(50);
    // 余额扣到 0
    expect(state.isotope).toBe(0);
    // 50 个事件
    expect(engine.getEvents()).toHaveLength(50);
    // 后端持久化最终状态
    expect(backend.peek()?.isotope).toBe(0);
  });

  // ===== 4. 并发三类混合 =====
  it('并发三类混合：同时发 buff 激活 + 碎片兑换 + 探索派遣，都成功', async () => {
    const state = makeState(300);
    // createNewGame 默认 credits = 100
    expect(state.credits).toBe(100);

    const [rb, re, rx] = await Promise.all([
      runtime.activateBuff(state, 'isotope-furnace', T0),     // 消耗 40 同位素
      runtime.exchange(state, 'iso-to-credits'),               // 消耗 25 同位素，产出 300 信用点
      runtime.dispatchExploration(state, 'nearby-belt', T0),    // 消耗 30 同位素
    ]);

    // 三类消耗都成功
    expect(rb.ok).toBe(true);
    expect(re.ok).toBe(true);
    expect(rx.ok).toBe(true);

    // isotope 精确扣三次：300 - 40 - 25 - 30 = 205
    expect(state.isotope).toBe(205);

    // 兑换产出信用点：100 + 300 = 400
    expect(state.credits).toBe(400);

    // 三个消耗事件
    expect(engine.getEvents()).toHaveLength(3);

    // buff 与探索都进入运行态
    expect(runtime.getActiveBuffs()).toHaveLength(1);
    expect(runtime.getActiveExplorations()).toHaveLength(1);
  });

  // ===== 5. 并发余额不足 =====
  it('并发余额不足：isotope 只够一次消耗时并发两个请求，只有一个成功', async () => {
    const state = makeState(40); // 只够一次 isotope-furnace(40)

    const [r1, r2] = await Promise.all([
      runtime.activateBuff(state, 'isotope-furnace', T0),       // 需 40
      runtime.activateBuff(state, 'catalysis-overdrive', T0 + 1), // 需 60
    ]);

    // 恰好一个成功、一个因余额不足失败
    const oks = [r1.ok, r2.ok].filter(Boolean).length;
    expect(oks).toBe(1);

    // 失败的那个原因是"不足"
    const failReason = [r1, r2].find((r) => !r.ok)?.reason;
    expect(failReason).toContain('不足');

    // 没有超额扣减：余额扣到 0（恰好一次 40）
    expect(state.isotope).toBe(0);
    // 后端持久化的也是 0
    expect(backend.peek()?.isotope).toBe(0);
  });

  // ===== 6. 并发幂等 =====
  it('并发幂等：相同 idempotencyKey 的两个并发请求，串行化后只扣一次且都返回同一事件', async () => {
    const state = makeState(200);
    const key = 'concurrent-idempotency-key';

    const [r1, r2] = await Promise.all([
      engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 40, idempotencyKey: key }),
      engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 40, idempotencyKey: key }),
    ]);

    // 两个请求都返回 ok（c1 执行扣减，c2 命中幂等返回已有事件）
    expect(r1.ok).toBe(true);
    expect(r2.ok).toBe(true);
    expect(r1.event).toBeDefined();
    expect(r2.event).toBeDefined();

    // 串行化后：c1 完整处理并登记 key → c2 命中幂等返回已有事件 → 只扣一次。
    // state.isotope = 200 - 40 = 160
    expect(state.isotope).toBe(160);

    // 只登记了一个事件（幂等生效）
    expect(engine.getEvents()).toHaveLength(1);

    // 两个请求返回的是同一个事件（引用相等）
    expect(r2.event).toBe(r1.event);

    // key 确实被标记为已处理
    expect(engine.isProcessed(key)).toBe(true);
  });
});
