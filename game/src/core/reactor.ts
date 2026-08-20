/**
 * T1-2 同位素反应堆 · 运行时配置 + ReactorRuntime
 *
 * 设计要点：
 * - 三类消耗入口（buff 激活 / 深空探索派遣 / 碎片兑换）全部走 T1-1 ConsumptionEngine，
 *   即「校验→扣减→产出→事件」原子事务，面板只负责交互与展示。
 * - buff 倒计时与探索进度均以「绝对时间戳 + now 参数」驱动——不依赖 Three.js 主渲染循环
 *   的帧计数，也不依赖 Date.now（now 由调用方传入，便于测试与解耦）。
 *   因此场景被暂停（modal 仅禁用 OrbitControls，渲染照常）或丢帧时，倒计时仍按墙钟推进。
 * - 反应堆「运行态」用 reactorActivity(now) 输出 0..1，驱动 Three.js 粒子流强度（ReactorFX）。
 *
 * 范围边界（与 T1-4 存档迁移解耦）：
 * - 活跃 buff / 进行中探索仅存于内存 ReactorRuntime，不写入 GameState / save。
 * - T1-4（v6→v7 迁移 + consumptionLog）负责把活跃项持久化；本模块暴露的 ActiveBuff /
 *   ActiveExploration 结构即 T1-4 持久化的数据形状，二者通过本类型对接，互不侵入对方文件。
 */

import { ConsumptionEngine, type ConsumptionRequest } from './consumption';
import { addResourceAmount, canConsumeResource, getResourceAmount } from './resourceRegistry';
import type { GameState } from './types';

// ===== 类型定义 =====

export type BuffEffectTarget = 'stardust' | 'crystal';

/** buff 激活消耗同位素，对指定资源产出施加限时倍率 */
export interface ReactorBuffDef {
  id: string;
  name: string;
  description: string;
  cost: { resourceId: string; amount: number };
  durationMs: number;
  effect: { target: BuffEffectTarget; mult: number };
}

/** 深空探索派遣目标——玩家主动选择，风险/时长/回报三者权衡 */
export interface ExplorationTarget {
  id: string;
  name: string;
  description: string;
  durationMs: number;
  cost: { resourceId: string; amount: number };
  reward: { resourceId: string; amount: number };
  /** 风险标签：低/中/高，纯展示用于决策深度 */
  riskLabel: string;
}

/** 碎片兑换配方：消耗 A 产出 B，单次事务内原子完成（走 ConsumptionEngine exchange） */
export interface ExchangeRecipe {
  id: string;
  name: string;
  cost: { resourceId: string; amount: number };
  produces: { resourceId: string; amount: number }[];
}

/** 运行时活跃 buff */
export interface ActiveBuff {
  /** 唯一实例 id（同 def 同时只允许一个活跃） */
  instanceId: string;
  defId: string;
  startedAt: number;
  expiresAt: number;
  effect: { target: BuffEffectTarget; mult: number };
}

/** 运行时进行中探索 */
export interface ActiveExploration {
  instanceId: string;
  targetId: string;
  startedAt: number;
  completesAt: number;
  reward: { resourceId: string; amount: number };
}

/** tick 结算结果——供 UI 弹 toast 反馈 */
export interface ReactorTickResult {
  completed: ActiveExploration[];
  expiredBuffs: ActiveBuff[];
}

// ===== 配置常量（v0.5 只搭框架，数值平衡留 v0.6） =====

export const REACTOR_BUFFS: ReactorBuffDef[] = [
  {
    id: 'catalysis-overdrive',
    name: '催化过载',
    description: '全采掘 ×2 产出，持续 10 分钟',
    cost: { resourceId: 'isotope', amount: 60 },
    durationMs: 10 * 60 * 1000,
    effect: { target: 'stardust', mult: 2 },
  },
  {
    id: 'crystal-resonance',
    name: '晶体共鸣',
    description: '精炼 ×1.5 产出，持续 5 分钟',
    cost: { resourceId: 'isotope', amount: 90 },
    durationMs: 5 * 60 * 1000,
    effect: { target: 'crystal', mult: 1.5 },
  },
  {
    id: 'isotope-furnace',
    name: '同位素熔炉',
    description: '全采掘 ×1.5 产出，持续 20 分钟（长时低增益）',
    cost: { resourceId: 'isotope', amount: 40 },
    durationMs: 20 * 60 * 1000,
    effect: { target: 'stardust', mult: 1.5 },
  },
];

export const EXPLORATION_TARGETS: ExplorationTarget[] = [
  {
    id: 'nearby-belt',
    name: '近地小行星带',
    description: '低风险短途，稳定产出反物质',
    durationMs: 60 * 1000,
    cost: { resourceId: 'isotope', amount: 30 },
    reward: { resourceId: 'antimatter', amount: 4 },
    riskLabel: '低',
  },
  {
    id: 'kuiper',
    name: '柯伊伯带',
    description: '中风险长途，产出暗物质',
    durationMs: 3 * 60 * 1000,
    cost: { resourceId: 'isotope', amount: 80 },
    reward: { resourceId: 'darkmatter', amount: 3 },
    riskLabel: '中',
  },
  {
    id: 'ophiuchus',
    name: '蛇夫座深空',
    description: '高风险远征，高额反物质回报',
    durationMs: 6 * 60 * 1000,
    cost: { resourceId: 'isotope', amount: 150 },
    reward: { resourceId: 'antimatter', amount: 10 },
    riskLabel: '高',
  },
];

export const EXCHANGE_RECIPES: ExchangeRecipe[] = [
  {
    id: 'iso-to-credits',
    name: '同位素催化兑换',
    cost: { resourceId: 'isotope', amount: 25 },
    produces: [{ resourceId: 'credits', amount: 300 }],
  },
  {
    id: 'iso-to-crystal',
    name: '同位素结晶',
    cost: { resourceId: 'isotope', amount: 40 },
    produces: [{ resourceId: 'crystal', amount: 8 }],
  },
  {
    id: 'antimatter-to-darkmatter',
    name: '反物质湮灭',
    cost: { resourceId: 'antimatter', amount: 3 },
    produces: [{ resourceId: 'darkmatter', amount: 2 }],
  },
];

export const REACTOR_BUFF_BY_ID: Record<string, ReactorBuffDef> = Object.fromEntries(
  REACTOR_BUFFS.map((b) => [b.id, b]),
);
export const EXPLORATION_TARGET_BY_ID: Record<string, ExplorationTarget> = Object.fromEntries(
  EXPLORATION_TARGETS.map((t) => [t.id, t]),
);
export const EXCHANGE_RECIPE_BY_ID: Record<string, ExchangeRecipe> = Object.fromEntries(
  EXCHANGE_RECIPES.map((r) => [r.id, r]),
);

/** buff 产出倍率累加上限——防止多 buff 叠加失控 */
export const REACTOR_MULT_CAP = 8;

// ===== ReactorRuntime =====

let instanceCounter = 0;
function nextInstanceId(prefix: string): string {
  return `${prefix}-${++instanceCounter}`;
}

export interface ReactorOpResult {
  ok: boolean;
  reason?: string;
}

export class ReactorRuntime {
  private activeBuffs = new Map<string, ActiveBuff>();
  private activeExplorations = new Map<string, ActiveExploration>();

  constructor(private readonly engine: ConsumptionEngine) {}

  // ----- buff -----

  /** 是否可激活某 buff：资源充足且该 buff 未在活跃 */
  canActivateBuff(state: GameState, defId: string, now: number): ReactorOpResult {
    const def = REACTOR_BUFF_BY_ID[defId];
    if (!def) return { ok: false, reason: '未知 buff' };
    if (this.buffActive(defId)) return { ok: false, reason: `${def.name} 已在运行` };
    const held = getResourceAmount(state, def.cost.resourceId);
    if (held < def.cost.amount) {
      return { ok: false, reason: `同位素不足（需 ${def.cost.amount}，持有 ${Math.floor(held)}）` };
    }
    void now;
    return { ok: true };
  }

  /** 激活 buff：走 ConsumptionEngine 扣减同位素，成功后注册活跃 buff */
  async activateBuff(state: GameState, defId: string, now: number): Promise<ReactorOpResult> {
    const def = REACTOR_BUFF_BY_ID[defId];
    if (!def) return { ok: false, reason: '未知 buff' };
    if (this.buffActive(defId)) return { ok: false, reason: `${def.name} 已在运行` };

    const request: ConsumptionRequest = {
      kind: 'buff',
      resourceId: def.cost.resourceId,
      amount: def.cost.amount,
      idempotencyKey: `buff-${defId}-${now}`,
    };
    try {
      const r = await this.engine.consume(state, request);
      if (!r.ok) return { ok: false, reason: r.reason ?? '激活失败' };
    } catch (err) {
      return { ok: false, reason: `激活异常: ${err instanceof Error ? err.message : String(err)}` };
    }

    const buff: ActiveBuff = {
      instanceId: nextInstanceId('buff'),
      defId,
      startedAt: now,
      expiresAt: now + def.durationMs,
      effect: { ...def.effect },
    };
    this.activeBuffs.set(defId, buff);
    return { ok: true };
  }

  buffActive(defId: string): boolean {
    return this.activeBuffs.has(defId);
  }

  getActiveBuff(defId: string): ActiveBuff | undefined {
    return this.activeBuffs.get(defId);
  }

  getActiveBuffs(): ActiveBuff[] {
    return Array.from(this.activeBuffs.values());
  }

  /** 指定资源目标的累计产出倍率（多 buff 乘法叠加，封顶 REACTOR_MULT_CAP） */
  getProductionMult(target: BuffEffectTarget, now: number): number {
    let mult = 1;
    for (const b of this.activeBuffs.values()) {
      if (b.effect.target === target && b.expiresAt > now) {
        mult *= b.effect.mult;
      }
    }
    return Math.min(REACTOR_MULT_CAP, mult);
  }

  // ----- exploration -----

  /** 是否可派遣探索：当前无进行中探索且资源充足 */
  canDispatch(state: GameState, targetId: string): ReactorOpResult {
    const target = EXPLORATION_TARGET_BY_ID[targetId];
    if (!target) return { ok: false, reason: '未知探索目标' };
    if (this.activeExplorations.size > 0) return { ok: false, reason: '已有探索进行中（每次仅限 1 路）' };
    const held = getResourceAmount(state, target.cost.resourceId);
    if (held < target.cost.amount) {
      return { ok: false, reason: `同位素不足（需 ${target.cost.amount}，持有 ${Math.floor(held)}）` };
    }
    return { ok: true };
  }

  /** 派遣探索：走 ConsumptionEngine 扣减同位素（产出在完成时发放，非派遣时） */
  async dispatchExploration(state: GameState, targetId: string, now: number): Promise<ReactorOpResult> {
    const target = EXPLORATION_TARGET_BY_ID[targetId];
    if (!target) return { ok: false, reason: '未知探索目标' };
    if (this.activeExplorations.size > 0) return { ok: false, reason: '已有探索进行中' };

    const request: ConsumptionRequest = {
      kind: 'exploration',
      resourceId: target.cost.resourceId,
      amount: target.cost.amount,
      idempotencyKey: `explore-${targetId}-${now}`,
    };
    try {
      const r = await this.engine.consume(state, request);
      if (!r.ok) return { ok: false, reason: r.reason ?? '派遣失败' };
    } catch (err) {
      return { ok: false, reason: `派遣异常: ${err instanceof Error ? err.message : String(err)}` };
    }

    const ex: ActiveExploration = {
      instanceId: nextInstanceId('explore'),
      targetId,
      startedAt: now,
      completesAt: now + target.durationMs,
      reward: { ...target.reward },
    };
    this.activeExplorations.set(ex.instanceId, ex);
    return { ok: true };
  }

  getActiveExplorations(): ActiveExploration[] {
    return Array.from(this.activeExplorations.values());
  }

  // ----- exchange -----

  /** 碎片兑换：消耗 A 产出 B，单次事务原子完成 */
  canExchange(state: GameState, recipeId: string): ReactorOpResult {
    const recipe = EXCHANGE_RECIPE_BY_ID[recipeId];
    if (!recipe) return { ok: false, reason: '未知兑换配方' };
    const held = getResourceAmount(state, recipe.cost.resourceId);
    if (held < recipe.cost.amount) {
      return { ok: false, reason: `资源不足（需 ${recipe.cost.amount}，持有 ${Math.floor(held)}）` };
    }
    return { ok: true };
  }

  async exchange(state: GameState, recipeId: string): Promise<ReactorOpResult> {
    const recipe = EXCHANGE_RECIPE_BY_ID[recipeId];
    if (!recipe) return { ok: false, reason: '未知兑换配方' };
    const request: ConsumptionRequest = {
      kind: 'exchange',
      resourceId: recipe.cost.resourceId,
      amount: recipe.cost.amount,
      produces: recipe.produces.map((p) => ({ resourceId: p.resourceId, amount: p.amount })),
      idempotencyKey: `exchange-${recipeId}-${Date.now()}`,
    };
    try {
      const r = await this.engine.consume(state, request);
      if (!r.ok) return { ok: false, reason: r.reason ?? '兑换失败' };
      return { ok: true };
    } catch (err) {
      return { ok: false, reason: `兑换异常: ${err instanceof Error ? err.message : String(err)}` };
    }
  }

  // ----- tick（墙钟驱动，与 Three.js 循环解耦） -----

  /**
   * 推进运行时：移除过期 buff、结算完成探索（发放奖励）。
   * 全部基于传入的 now，不读 Date.now——测试可注入任意时间，运行态主循环传入 Date.now()。
   */
  tick(state: GameState, now: number): ReactorTickResult {
    const completed: ActiveExploration[] = [];
    const expiredBuffs: ActiveBuff[] = [];

    for (const [defId, buff] of this.activeBuffs) {
      if (buff.expiresAt <= now) {
        expiredBuffs.push(buff);
        this.activeBuffs.delete(defId);
      }
    }

    for (const [id, ex] of this.activeExplorations) {
      if (ex.completesAt <= now) {
        // 奖励发放走资源注册表的通用增加口（生产侧），与 production.ts 直接 mutate 风格一致
        addResourceAmount(state, ex.reward.resourceId, ex.reward.amount);
        completed.push(ex);
        this.activeExplorations.delete(id);
      }
    }

    return { completed, expiredBuffs };
  }

  /**
   * 反应堆运行态活动度 0..1，驱动 Three.js 粒子流强度。
   * 无活跃 buff 且无探索时为 0（待机）；有活跃时随数量上升，封顶 1。
   */
  reactorActivity(now: number): number {
    let activeCount = 0;
    for (const b of this.activeBuffs.values()) if (b.expiresAt > now) activeCount += 1;
    activeCount += this.activeExplorations.size;
    if (activeCount === 0) return 0;
    return Math.min(1, 0.55 + 0.45 * (activeCount / 3));
  }

  /** 重置（测试用） */
  reset(): void {
    this.activeBuffs.clear();
    this.activeExplorations.clear();
    instanceCounter = 0;
  }
}

/** 便捷：检查资源是否充足（面板按钮禁用态用） */
export function hasEnough(state: GameState, resourceId: string, amount: number): boolean {
  return canConsumeResource(state, resourceId, amount).ok;
}
