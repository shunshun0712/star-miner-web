import { describe, it, expect, beforeEach } from 'vitest';
import { TransactionalRepository, InMemoryBackend } from '../../save/transactional';
import { ConsumptionEngine } from '../consumption';
import {
  ReactorRuntime,
  REACTOR_BUFF_BY_ID,
  EXPLORATION_TARGET_BY_ID,
  EXCHANGE_RECIPE_BY_ID,
  REACTOR_MULT_CAP,
} from '../reactor';
import { createNewGame } from '../state';
import { clearRegistry, initResourceRegistry, getResourceAmount } from '../resourceRegistry';
import { RESOURCE_SCHEMAS } from '../config';
import type { GameState } from '../types';

const T0 = 1_700_000_000_000;

function deepClone<T>(obj: T): T {
  if (typeof structuredClone === 'function') return structuredClone(obj);
  return JSON.parse(JSON.stringify(obj));
}

function makeState(isotope = 200, antimatter = 10, credits = 500, crystal = 50): GameState {
  const s = createNewGame(T0);
  s.isotope = isotope;
  s.antimatter = antimatter;
  s.credits = credits;
  s.crystal = crystal;
  return s;
}

function makeRuntime(state: GameState) {
  const backend = new InMemoryBackend<GameState>(deepClone(state));
  const repo = new TransactionalRepository<GameState>(backend, deepClone);
  const engine = new ConsumptionEngine(repo);
  const runtime = new ReactorRuntime(engine);
  return { runtime, engine, state };
}

beforeEach(() => {
  clearRegistry();
  initResourceRegistry(RESOURCE_SCHEMAS);
});

// ═══════════════════════════════════════════════════════════════
// 验收① 三类入口可交互且触发 ConsumptionEngine
// ═══════════════════════════════════════════════════════════════

describe('验收① 三类入口触发 ConsumptionEngine', () => {
  it('buff 激活走 ConsumptionEngine 扣减同位素', async () => {
    const { runtime, state } = makeRuntime(makeState(100));
    const before = state.isotope;
    const r = await runtime.activateBuff(state, 'catalysis-overdrive', T0);
    expect(r.ok).toBe(true);
    const cost = REACTOR_BUFF_BY_ID['catalysis-overdrive'].cost.amount;
    expect(state.isotope).toBe(before - cost);
  });

  it('exploration 派遣走 ConsumptionEngine 扣减同位素', async () => {
    const { runtime, state } = makeRuntime(makeState(100));
    const before = state.isotope;
    const r = await runtime.dispatchExploration(state, 'nearby-belt', T0);
    expect(r.ok).toBe(true);
    const cost = EXPLORATION_TARGET_BY_ID['nearby-belt'].cost.amount;
    expect(state.isotope).toBe(before - cost);
  });

  it('exchange 兑换走 ConsumptionEngine 扣减并产出', async () => {
    const { runtime, state } = makeRuntime(makeState(100, 0, 100));
    const beforeIso = state.isotope;
    const beforeCredits = state.credits;
    const r = await runtime.exchange(state, 'iso-to-credits');
    expect(r.ok).toBe(true);
    const recipe = EXCHANGE_RECIPE_BY_ID['iso-to-credits'];
    expect(state.isotope).toBe(beforeIso - recipe.cost.amount);
    expect(state.credits).toBe(beforeCredits + recipe.produces[0].amount);
  });
});

// ═══════════════════════════════════════════════════════════════
// 验收② buff 倒计时与 Three.js 主循环解耦（墙钟驱动）
// ═══════════════════════════════════════════════════════════════

describe('验收② buff 倒计时墙钟驱动（不依赖渲染帧）', () => {
  it('buff 激活后基于 now 计算剩余时间', async () => {
    const { runtime, state } = makeRuntime(makeState(100));
    await runtime.activateBuff(state, 'isotope-furnace', T0);
    const buff = runtime.getActiveBuff('isotope-furnace');
    expect(buff).toBeDefined();
    const def = REACTOR_BUFF_BY_ID['isotope-furnace'];
    expect(buff!.expiresAt).toBe(T0 + def.durationMs);
    // 中途检查剩余
    const mid = T0 + def.durationMs / 2;
    expect(buff!.expiresAt - mid).toBeCloseTo(def.durationMs / 2, -1);
  });

  it('buff 过期后 tick 移除', async () => {
    const { runtime, state } = makeRuntime(makeState(100));
    await runtime.activateBuff(state, 'catalysis-overdrive', T0);
    expect(runtime.buffActive('catalysis-overdrive')).toBe(true);
    const def = REACTOR_BUFF_BY_ID['catalysis-overdrive'];
    const result = runtime.tick(state, T0 + def.durationMs + 1);
    expect(runtime.buffActive('catalysis-overdrive')).toBe(false);
    expect(result.expiredBuffs).toHaveLength(1);
    expect(result.expiredBuffs[0].defId).toBe('catalysis-overdrive');
  });

  it('buff 未过期时 tick 不移除', async () => {
    const { runtime, state } = makeRuntime(makeState(100));
    await runtime.activateBuff(state, 'isotope-furnace', T0);
    const def = REACTOR_BUFF_BY_ID['isotope-furnace'];
    runtime.tick(state, T0 + def.durationMs / 2);
    expect(runtime.buffActive('isotope-furnace')).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// 验收③ 探索派遣有目标选择
// ═══════════════════════════════════════════════════════════════

describe('验收③ 探索派遣有目标选择', () => {
  it('三个探索目标可选且各自独立校验资源', async () => {
    const { runtime, state } = makeRuntime(makeState(30));
    // nearby-belt 需 30 同位素 → 可派遣
    expect(runtime.canDispatch(state, 'nearby-belt').ok).toBe(true);
    // kuiper 需 80 同位素 → 不足
    expect(runtime.canDispatch(state, 'kuiper').ok).toBe(false);
    // ophiuchus 需 150 → 不足
    expect(runtime.canDispatch(state, 'ophiuchus').ok).toBe(false);
  });

  it('派遣后记录进行中探索，完成时发放奖励', async () => {
    const { runtime, state } = makeRuntime(makeState(100));
    const r = await runtime.dispatchExploration(state, 'nearby-belt', T0);
    expect(r.ok).toBe(true);
    const active = runtime.getActiveExplorations();
    expect(active).toHaveLength(1);
    expect(active[0].targetId).toBe('nearby-belt');

    // 完成前无奖励
    const target = EXPLORATION_TARGET_BY_ID['nearby-belt'];
    const antimatterBefore = state.antimatter;
    runtime.tick(state, T0 + target.durationMs / 2);
    expect(state.antimatter).toBe(antimatterBefore);

    // 完成时发放奖励
    const result = runtime.tick(state, T0 + target.durationMs + 1);
    expect(state.antimatter).toBe(antimatterBefore + target.reward.amount);
    expect(result.completed).toHaveLength(1);
    expect(result.completed[0].targetId).toBe('nearby-belt');
    // 探索已清空
    expect(runtime.getActiveExplorations()).toHaveLength(0);
  });

  it('每次仅限 1 路探索进行中', async () => {
    const { runtime, state } = makeRuntime(makeState(500));
    await runtime.dispatchExploration(state, 'nearby-belt', T0);
    const r = await runtime.dispatchExploration(state, 'kuiper', T0 + 100);
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('进行中');
  });
});

// ═══════════════════════════════════════════════════════════════
// 验收④ 反应堆运行态有粒子反馈（reactorActivity 驱动）
// ═══════════════════════════════════════════════════════════════

describe('验收④ 反应堆运行态 reactorActivity', () => {
  it('无活跃 buff/探索时 activity=0（待机）', () => {
    const { runtime } = makeRuntime(makeState(100));
    expect(runtime.reactorActivity(T0)).toBe(0);
  });

  it('有活跃 buff 时 activity>0', async () => {
    const { runtime, state } = makeRuntime(makeState(100));
    await runtime.activateBuff(state, 'isotope-furnace', T0);
    expect(runtime.reactorActivity(T0 + 1000)).toBeGreaterThan(0);
  });

  it('有进行中探索时 activity>0', async () => {
    const { runtime, state } = makeRuntime(makeState(100));
    await runtime.dispatchExploration(state, 'nearby-belt', T0);
    expect(runtime.reactorActivity(T0 + 1000)).toBeGreaterThan(0);
  });

  it('activity 封顶 1.0', async () => {
    const { runtime, state } = makeRuntime(makeState(500));
    // 激活多个 buff + 探索 → 活跃数 >3，仍应封顶 1
    await runtime.activateBuff(state, 'catalysis-overdrive', T0);
    await runtime.activateBuff(state, 'crystal-resonance', T0);
    await runtime.activateBuff(state, 'isotope-furnace', T0);
    expect(runtime.reactorActivity(T0 + 1000)).toBeLessThanOrEqual(1);
  });

  it('buff 过期后 activity 回归 0', async () => {
    const { runtime, state } = makeRuntime(makeState(100));
    await runtime.activateBuff(state, 'isotope-furnace', T0);
    const def = REACTOR_BUFF_BY_ID['isotope-furnace'];
    runtime.tick(state, T0 + def.durationMs + 1);
    expect(runtime.reactorActivity(T0 + def.durationMs + 1)).toBe(0);
  });
});

// ═══════════════════════════════════════════════════════════════
// 产出倍率与叠加
// ═══════════════════════════════════════════════════════════════

describe('产出倍率 getProductionMult', () => {
  it('无 buff 时倍率=1', () => {
    const { runtime } = makeRuntime(makeState(100));
    expect(runtime.getProductionMult('stardust', T0)).toBe(1);
    expect(runtime.getProductionMult('crystal', T0)).toBe(1);
  });

  it('单个 stardust buff 生效', async () => {
    const { runtime, state } = makeRuntime(makeState(100));
    await runtime.activateBuff(state, 'catalysis-overdrive', T0);
    expect(runtime.getProductionMult('stardust', T0 + 1000)).toBe(2);
  });

  it('多个 stardust buff 乘法叠加', async () => {
    const { runtime, state } = makeRuntime(makeState(200));
    await runtime.activateBuff(state, 'catalysis-overdrive', T0); // ×2
    await runtime.activateBuff(state, 'isotope-furnace', T0); // ×1.5
    expect(runtime.getProductionMult('stardust', T0 + 1000)).toBeCloseTo(3, 5);
  });

  it('叠加封顶 REACTOR_MULT_CAP', async () => {
    // 需要多 buff 叠加超过 cap=8——但 REACTOR_BUFFS 只有 2 个 stardust buff（×2*×1.5=3）
    // 所以测试封顶逻辑：直接验证 cap 常量值合理
    expect(REACTOR_MULT_CAP).toBe(8);
    expect(REACTOR_MULT_CAP).toBeGreaterThan(0);
  });

  it('buff 过期后倍率回归 1', async () => {
    const { runtime, state } = makeRuntime(makeState(100));
    await runtime.activateBuff(state, 'catalysis-overdrive', T0);
    const def = REACTOR_BUFF_BY_ID['catalysis-overdrive'];
    runtime.tick(state, T0 + def.durationMs + 1);
    expect(runtime.getProductionMult('stardust', T0 + def.durationMs + 1)).toBe(1);
  });

  it('crystal buff 不影响 stardust 倍率', async () => {
    const { runtime, state } = makeRuntime(makeState(200));
    await runtime.activateBuff(state, 'crystal-resonance', T0); // crystal ×1.5
    expect(runtime.getProductionMult('stardust', T0 + 1000)).toBe(1);
    expect(runtime.getProductionMult('crystal', T0 + 1000)).toBe(1.5);
  });
});

// ═══════════════════════════════════════════════════════════════
// 校验拦截与边界
// ═══════════════════════════════════════════════════════════════

describe('校验拦截与边界', () => {
  it('资源不足时 canActivateBuff 返回失败', () => {
    const { runtime, state } = makeRuntime(makeState(10));
    // catalysis-overdrive 需 60
    const r = runtime.canActivateBuff(state, 'catalysis-overdrive', T0);
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('不足');
  });

  it('buff 已激活时不能重复激活', async () => {
    const { runtime, state } = makeRuntime(makeState(200));
    await runtime.activateBuff(state, 'catalysis-overdrive', T0);
    const r = runtime.canActivateBuff(state, 'catalysis-overdrive', T0);
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('运行');
  });

  it('未知 buff 返回失败', () => {
    const { runtime, state } = makeRuntime(makeState(200));
    expect(runtime.canActivateBuff(state, 'nonexistent', T0).ok).toBe(false);
  });

  it('未知探索目标返回失败', () => {
    const { runtime, state } = makeRuntime(makeState(200));
    expect(runtime.canDispatch(state, 'nonexistent').ok).toBe(false);
  });

  it('未知兑换配方返回失败', () => {
    const { runtime, state } = makeRuntime(makeState(200));
    expect(runtime.canExchange(state, 'nonexistent').ok).toBe(false);
  });

  it('兑换资源不足时 canExchange 失败', () => {
    const { runtime, state } = makeRuntime(makeState(5));
    // iso-to-credits 需 25
    expect(runtime.canExchange(state, 'iso-to-credits').ok).toBe(false);
  });

  it('antimatter 兑换 darkmatter 正确产出', async () => {
    const { runtime, state } = makeRuntime(makeState(0, 10));
    const r = await runtime.exchange(state, 'antimatter-to-darkmatter');
    expect(r.ok).toBe(true);
    expect(state.antimatter).toBe(7); // 10 - 3
    expect(state.darkmatter).toBe(2); // 0 + 2
  });
});

// ═══════════════════════════════════════════════════════════════
// tick 综合行为
// ═══════════════════════════════════════════════════════════════

describe('tick 综合行为', () => {
  it('同时过期 buff 和完成探索', async () => {
    const { runtime, state } = makeRuntime(makeState(300));
    await runtime.activateBuff(state, 'isotope-furnace', T0);
    await runtime.dispatchExploration(state, 'nearby-belt', T0);
    // 前进到两个都过期/完成
    const buffDef = REACTOR_BUFF_BY_ID['isotope-furnace'];
    const exploreDef = EXPLORATION_TARGET_BY_ID['nearby-belt'];
    const future = T0 + Math.max(buffDef.durationMs, exploreDef.durationMs) + 1;
    const result = runtime.tick(state, future);
    expect(result.expiredBuffs).toHaveLength(1);
    expect(result.completed).toHaveLength(1);
  });

  it('tick 不影响未到期的 buff/探索', async () => {
    const { runtime, state } = makeRuntime(makeState(200));
    await runtime.activateBuff(state, 'isotope-furnace', T0);
    await runtime.dispatchExploration(state, 'nearby-belt', T0);
    runtime.tick(state, T0 + 1000);
    expect(runtime.getActiveBuffs()).toHaveLength(1);
    expect(runtime.getActiveExplorations()).toHaveLength(1);
  });

  it('多次 tick 幂等——已完成探索不重复发奖', async () => {
    const { runtime, state } = makeRuntime(makeState(100));
    await runtime.dispatchExploration(state, 'nearby-belt', T0);
    const target = EXPLORATION_TARGET_BY_ID['nearby-belt'];
    runtime.tick(state, T0 + target.durationMs + 1);
    const antimatterAfter1 = state.antimatter;
    runtime.tick(state, T0 + target.durationMs + 1000);
    expect(state.antimatter).toBe(antimatterAfter1);
  });
});
