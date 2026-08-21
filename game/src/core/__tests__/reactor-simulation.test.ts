/**
 * 反应堆同位素消耗模拟测试
 *
 * 模拟玩家实际点击操作的全流程，验证：
 * 1. 正常路径：激活 buff → 扣减同位素 → buff 生效
 * 2. 余额不足：扣减被拦截，资源不变
 * 3. ★事务泄露修复★：save() 抛异常后 repo 不卡死（核心修复验证）
 * 4. 幂等：相同 key 不重复扣
 * 5. 兑换：消耗同位素产出信用点
 * 6. 探索：派遣 → tick 结算 → 奖励发放
 * 7. 双 buff 叠加
 * 8. buff 过期清理
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createNewGame } from '../state';
import { ConsumptionEngine } from '../consumption';
import { ReactorRuntime } from '../reactor';
import { InMemoryBackend, TransactionalRepository } from '../../save/transactional';
import type { PersistenceBackend } from '../../save/transactional';
import type { GameState } from '../types';

const T0 = 1_700_000_000_000;

/** 构造一个带充足同位素的游戏状态 */
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

/** save 时抛异常的后端——模拟 IndexedDB 写入失败 / QuotaExceededError */
class FailingBackend<T> implements PersistenceBackend<T> {
  saveShouldFail = false;
  saveCallCount = 0;
  private data: T | null = null;

  constructor(initial: T | null = null) {
    this.data = initial;
  }

  async load(): Promise<T | null> {
    return this.data;
  }

  async save(state: T): Promise<void> {
    this.saveCallCount++;
    if (this.saveShouldFail) {
      throw new Error('模拟写入失败: QuotaExceededError');
    }
    this.data = state;
  }

  peek(): T | null {
    return this.data;
  }
}

describe('反应堆同位素消耗模拟 — 模拟玩家点击', () => {
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

  // ===== 1. 正常路径：点击「同位素熔炉」 =====
  it('点击同位素熔炉（消耗40同位素）：扣除40，buff激活，倍率生效', async () => {
    const state = makeState(200);
    const now = T0;

    // 模拟面板按钮点击
    const result = await runtime.activateBuff(state, 'isotope-furnace', now);

    expect(result.ok).toBe(true);
    expect(result.reason).toBeUndefined();

    // 同位素从 200 扣到 160
    expect(state.isotope).toBe(160);

    // buff 已激活
    expect(runtime.buffActive('isotope-furnace')).toBe(true);

    // 产出倍率生效：stardust ×1.5
    const mult = runtime.getProductionMult('stardust', now);
    expect(mult).toBe(1.5);

    // 后端已持久化（commit 成功）
    const saved = backend.peek();
    expect(saved).not.toBeNull();
    expect(saved!.isotope).toBe(160);
  });

  // ===== 2. 余额不足：点击「催化过载」但同位素不够 =====
  it('点击催化过载（消耗60同位素）但只持有10：拦截扣减，资源不变', async () => {
    const state = makeState(10);

    const result = await runtime.activateBuff(state, 'catalysis-overdrive', T0);

    expect(result.ok).toBe(false);
    expect(result.reason).toContain('不足');

    // 同位素没被扣
    expect(state.isotope).toBe(10);

    // buff 没激活
    expect(runtime.buffActive('catalysis-overload')).toBe(false);

    // 后端没写入
    expect(backend.peek()).toBeNull();
  });

  // ===== 3. ★事务泄露修复核心验证★ =====
  it('★事务泄露修复★：save()抛异常后，repo自动清理不卡死，后续消耗正常', async () => {
    const failingBackend = new FailingBackend<GameState>();
    const fRepo = new TransactionalRepository<GameState>(failingBackend, structuredClone);
    const fEngine = new ConsumptionEngine(fRepo);
    const fRuntime = new ReactorRuntime(fEngine);
    fEngine.reset();
    fRuntime.reset();

    // 初始有 200 同位素
    const state = makeState(200);

    // --- 第一次消耗：save 抛异常 ---
    failingBackend.saveShouldFail = true;

    const result1 = await fRuntime.activateBuff(state, 'isotope-furnace', T0);

    // 激活失败（commit 内 save 抛错 → catch 捕获 → rollback）
    expect(result1.ok).toBe(false);
    expect(result1.reason).toContain('异常');

    // buff 没激活
    expect(fRuntime.buffActive('isotope-furnace')).toBe(false);

    // ★关键断言1：repo 已自动清理，无活跃事务残留★
    // 修复前：commit() 里 await backend.save() 抛错后 cleanup() 被跳过
    //         → done=false, snapshot≠null → repo 永久卡死
    // 修复后：begin() 发现残留事务自动 cleanup()
    expect(fRepo.isActive()).toBe(false);

    // save 确实被调用过（且失败了）
    expect(failingBackend.saveCallCount).toBeGreaterThanOrEqual(1);

    // --- ★关键断言2：repo 可以再次开启新事务（不卡死）★ ---
    // 修复前：第二次 begin() 会抛 "已有进行中事务"
    // 修复后：begin() 自动清理残留，正常返回
    expect(() => fRepo.begin(state)).not.toThrow();

    // --- 第二次消耗：恢复正常 save ---
    failingBackend.saveShouldFail = false;
    const state2 = makeState(200);

    const result2 = await fRuntime.activateBuff(state2, 'isotope-furnace', T0 + 1);

    // 这次成功了
    expect(result2.ok).toBe(true);
    expect(state2.isotope).toBe(160);
    expect(fRuntime.buffActive('isotope-furnace')).toBe(true);
    expect(failingBackend.peek()?.isotope).toBe(160);

    // --- 第三次消耗：再次 save 失败后再恢复 ---
    failingBackend.saveShouldFail = true;
    const state3 = makeState(200);

    const result3 = await fRuntime.activateBuff(state3, 'crystal-resonance', T0 + 2);
    expect(result3.ok).toBe(false); // 又失败了
    expect(fRepo.isActive()).toBe(false); // 又自动清理了

    // 恢复后第四次成功
    failingBackend.saveShouldFail = false;
    const state4 = makeState(200);

    const result4 = await fRuntime.activateBuff(state4, 'crystal-resonance', T0 + 3);
    expect(result4.ok).toBe(true);
    expect(state4.isotope).toBe(110); // 200 - 90 = 110
  });

  // ===== 4. 幂等：相同 idempotencyKey 不重复扣（engine 层验证）=====
  it('幂等：相同 idempotencyKey 的消耗请求只执行一次', async () => {
    const state = makeState(200);

    const key = 'test-idempotency-key-001';
    const request = {
      kind: 'buff' as const,
      resourceId: 'isotope',
      amount: 40,
      idempotencyKey: key,
    };

    // 第一次消耗
    const r1 = await engine.consume(state, request);
    expect(r1.ok).toBe(true);
    expect(state.isotope).toBe(160);

    // 相同 key 再来一次——幂等返回 ok 但不重复扣
    const r2 = await engine.consume(state, request);
    expect(r2.ok).toBe(true);
    expect(state.isotope).toBe(160); // 没有再扣
  });

  // ===== 5. 兑换：消耗同位素产出信用点 =====
  it('点击同位素催化兑换（25同位素→300信用点）：原子完成', async () => {
    const state = makeState(100);
    state.credits = 50;

    const result = await runtime.exchange(state, 'iso-to-credits');

    expect(result.ok).toBe(true);
    expect(state.isotope).toBe(75);  // 100 - 25
    expect(state.credits).toBe(350); // 50 + 300
  });

  // ===== 6. 探索派遣 → tick 结算 =====
  it('点击近地小行星带探索（30同位素→1分钟后4反物质）：派遣+结算全流程', async () => {
    const state = makeState(100);
    const now = T0;

    // 派遣
    const result = await runtime.dispatchExploration(state, 'nearby-belt', now);

    expect(result.ok).toBe(true);
    expect(state.isotope).toBe(70); // 100 - 30

    // 探索进行中
    const explorations = runtime.getActiveExplorations();
    expect(explorations).toHaveLength(1);
    expect(explorations[0].targetId).toBe('nearby-belt');
    expect(explorations[0].completesAt).toBe(now + 60_000);

    // 还没到时间，tick 不结算
    const tick1 = runtime.tick(state, now + 30_000);
    expect(tick1.completed).toHaveLength(0);

    // 到时间了，tick 结算
    const tick2 = runtime.tick(state, now + 61_000);
    expect(tick2.completed).toHaveLength(1);
    expect(tick2.completed[0].targetId).toBe('nearby-belt');

    // 反物质到账
    expect(state.antimatter).toBe(4);

    // 探索已清空
    expect(runtime.getActiveExplorations()).toHaveLength(0);
  });

  // ===== 7. 双 buff 叠加 =====
  it('连续激活催化过载(60)+同位素熔炉(40)：两个buff同时生效，倍率叠加', async () => {
    const state = makeState(200);
    const now = T0;

    const r1 = await runtime.activateBuff(state, 'catalysis-overdrive', now);
    expect(r1.ok).toBe(true);
    expect(state.isotope).toBe(140); // 200 - 60

    const r2 = await runtime.activateBuff(state, 'isotope-furnace', now + 1);
    expect(r2.ok).toBe(true);
    expect(state.isotope).toBe(100); // 140 - 40

    // 两个 buff 都在
    expect(runtime.getActiveBuffs()).toHaveLength(2);

    // stardust 倍率叠加：×2 × 1.5 = ×3
    const mult = runtime.getProductionMult('stardust', now);
    expect(mult).toBe(3);
  });

  // ===== 8. buff 过期清理 =====
  it('buff到期后tick清理，倍率归1', async () => {
    const state = makeState(200);
    const now = T0;

    // 同位素熔炉持续 20 分钟
    await runtime.activateBuff(state, 'isotope-furnace', now);

    // 10 分钟时还在
    expect(runtime.getProductionMult('stardust', now + 10 * 60_000)).toBe(1.5);

    // 21 分钟后过期
    const tick = runtime.tick(state, now + 21 * 60_000);
    expect(tick.expiredBuffs).toHaveLength(1);
    expect(tick.expiredBuffs[0].defId).toBe('isotope-furnace');

    // 倍率归 1
    expect(runtime.getProductionMult('stardust', now + 21 * 60_000)).toBe(1);
  });

  // ===== 9. 同时已有活跃 buff 时拒绝重复激活 =====
  it('同buff已在运行时拒绝重复激活', async () => {
    const state = makeState(200);

    await runtime.activateBuff(state, 'isotope-furnace', T0);

    // 再次激活同一 buff（不同时间避免幂等）
    const r = await runtime.activateBuff(state, 'isotope-furnace', T0 + 1);
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('已在运行');

    // 同位素没多扣
    expect(state.isotope).toBe(160);
  });
});
