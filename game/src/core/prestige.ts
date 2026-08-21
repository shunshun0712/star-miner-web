/**
 * T2-2: 转生重置编排器——基于 T2-1 分层存档骨架的完整实现。
 *
 * 编排流程（标记 dirty → 批量重建 → 事务提交）：
 * 1. planPrestigeReset（纯函数）：采集转生前快照 → 结算星核 → 标记 dirty 字段
 *    （基线层全字段）→ 批量重建新基线（含永久加成）→ 结算转生层。不触碰入参。
 * 2. previewPrestigeReset（纯函数）：复用 plan，产出 UI"预览转生效果 → 确认/取消"
 *    所需的前后对比数据；确认前无任何写操作。
 * 3. executePrestigeReset：走 T0-1 事务 begin → 把 plan 一次性刷入工作状态 → commit
 *    原子落盘（基线层 + 转生层经 LayeredStateBackend.saveBoth 单事务双键写）。
 * 4. rollbackPrestigeReset：用 execute 返回的转生前快照，走事务把两层恢复到转生前。
 *
 * 红线：不走 createNewGame 代码路径——重建走 buildPrestigeBaseline
 * （createInitialBaseline 纯工厂 + prestige.unlocked 永久加成），见 T2-1。
 */
import type {
  BaselineState,
  GameState,
  PrestigeBaselineSnapshot,
  PrestigeHistoryEntry,
  PrestigeLayer,
} from './types';
import { createInitialBaseline } from './state';
import { PRESTIGE_UNLOCKS } from './prestigeLayer';
import type { TransactionalRepository } from '../save/transactional';

// ════════════════════════════════════════════
// 星核定价公式（v0.5 正式版）
// ════════════════════════════════════════════

/**
 * 各资源折算星核点数（点数 = 资源量 × 比率）。按稀有度加权：
 * - crystal（晶体，主线进阶货币）：1/100
 * - isotope（同位素，反应堆资源）：1/20
 * - antimatter（反物质，T3）：1/5
 * - darkmatter（暗物质，T4）：1/2
 * - stardust（星尘，量产基础资源）：1/1000
 * credits（信用点，现金流）与 energy（能量，产能瓶颈）不计入转生定价。
 */
export const STARDUST_EARN_RATES = {
  crystal: 1 / 100,
  isotope: 1 / 20,
  antimatter: 1 / 5,
  darkmatter: 1 / 2,
  stardust: 1 / 1000,
} as const;

/** 设施每高于初始 1 级，贡献的星核点数 */
export const STARDUST_PER_FACILITY_LEVEL = 2;

/** 每完成一项研究，贡献的星核点数 */
export const STARDUST_PER_RESEARCH = 5;

/**
 * 计算本次转生应得星核——正式定价公式（替代 T2-1 的 v0.5 占位 floor(crystal/100)）。
 *
 * 公式：
 * ```
 * 点数 = crystal/100 + isotope/20 + antimatter/5 + darkmatter/2 + stardust/1000   ← 资源种类
 *      + 2 × Σ(facility.level - 1)                                              ← 设施数量/等级
 *      + 5 × research.length                                                    ← 研究进度
 * 星核 = floor(点数)
 * ```
 *
 * 纯函数、各因子独立可测；数值平衡调整只改上方常量（v0.6 调参单点）。
 */
export function computeStardustEarned(state: GameState): number {
  let points = 0;
  points += state.crystal * STARDUST_EARN_RATES.crystal;
  points += state.isotope * STARDUST_EARN_RATES.isotope;
  points += state.antimatter * STARDUST_EARN_RATES.antimatter;
  points += state.darkmatter * STARDUST_EARN_RATES.darkmatter;
  points += state.stardust * STARDUST_EARN_RATES.stardust;
  for (const f of Object.values(state.facilities)) {
    points += Math.max(0, f.level - 1) * STARDUST_PER_FACILITY_LEVEL;
  }
  points += state.research.length * STARDUST_PER_RESEARCH;
  return Math.floor(points);
}

// ════════════════════════════════════════════
// 快照
// ════════════════════════════════════════════

/**
 * 采集转生前**完整基线层**快照（深拷贝，剔除 prestige）——回滚/预览用。
 * 与 createBaselineSnapshot（history 留档的紧凑摘要）分工不同：
 * 完整快照能逐字段恢复基线层，紧凑摘要只够"成就回顾"展示。
 */
export function captureFullBaseline(state: GameState): BaselineState {
  const { prestige: _prestige, ...baseline } = state;
  return structuredClone(baseline) as BaselineState;
}

/** 采集转生时刻的基线层紧凑摘要（history 留档，供 T2-3"成就回顾"展示） */
export function createBaselineSnapshot(state: GameState): PrestigeBaselineSnapshot {
  const facilityLevels = {} as PrestigeBaselineSnapshot['facilityLevels'];
  (Object.keys(state.facilities) as Array<keyof GameState['facilities']>).forEach((id) => {
    facilityLevels[id] = state.facilities[id].level;
  });
  return {
    credits: state.credits,
    stardust: state.stardust,
    crystal: state.crystal,
    isotope: state.isotope,
    antimatter: state.antimatter,
    darkmatter: state.darkmatter,
    facilityLevels,
    achievementCount: state.achievements.length,
    researchCount: state.research.length,
    createdAt: state.createdAt,
  };
}

/** 转生前完整快照（基线层 + 转生层）——execute 返回，rollback 凭它恢复 */
export interface PrestigeResetSnapshot {
  baseline: BaselineState;
  prestige: PrestigeLayer;
  timestamp: number;
}

// ════════════════════════════════════════════
// 重置计划（纯函数，可测）
// ════════════════════════════════════════════

/** 转生重置计划——planPrestigeReset 的产出，execute/preview 共用 */
export interface PrestigeResetPlan {
  /** 本次应得星核 */
  stardustEarned: number;
  /** 转生前完整快照（回滚凭据） */
  preSnapshot: PrestigeResetSnapshot;
  /** 本次被标记 dirty、将批量重建的基线层顶层字段 */
  dirtyFields: string[];
  /** 结算后的转生层（prestigeLevel+1、stardust 累加、history 追加） */
  newPrestige: PrestigeLayer;
  /** 重建后的完整状态（基线层含永久加成 + 新转生层） */
  rebuiltState: GameState;
}

/**
 * 构造转生后初始基线层——裸初始基线 + prestige.unlocked 叠加永久 buff（T2-1 语义不变）。
 * 红线：不调用 createNewGame；共享 createInitialBaseline 纯工厂（T2-1 已批准）。
 */
export function buildPrestigeBaseline(now: number, prestige: PrestigeLayer): GameState {
  const state: GameState = { ...createInitialBaseline(now), prestige };
  for (const id of prestige.unlocked) {
    const schema = PRESTIGE_UNLOCKS[id];
    if (schema) schema.apply(state);
  }
  return state;
}

/**
 * 转生重置计划——纯函数：读取 current，产出完整计划，**不 mutate 入参**。
 *
 * 编排语义"标记 dirty → 批量重建"的落地：
 * - dirtyFields：基线层全部顶层字段被整体标记 dirty（转生是全量重置，非字段级增量）
 * - rebuiltState：一次性批量重建（新基线 + 结算后转生层），execute 整体刷入事务工作状态
 */
export function planPrestigeReset(current: GameState, now: number): PrestigeResetPlan {
  const earned = computeStardustEarned(current);
  const preSnapshot: PrestigeResetSnapshot = {
    baseline: captureFullBaseline(current),
    prestige: structuredClone(current.prestige),
    timestamp: now,
  };
  const dirtyFields = Object.keys(preSnapshot.baseline);
  const newPrestige: PrestigeLayer = {
    unlocked: [...current.prestige.unlocked],
    stardust: current.prestige.stardust + earned,
    prestigeLevel: current.prestige.prestigeLevel + 1,
    history: [
      ...current.prestige.history,
      {
        sequence: current.prestige.prestigeLevel + 1,
        timestamp: now,
        baselineSnapshot: createBaselineSnapshot(current),
        stardustEarned: earned,
      } satisfies PrestigeHistoryEntry,
    ],
    // T3-1: 商店购买等级跨转生保留（转生不清空购物记录）
    shopPurchases: { ...current.prestige.shopPurchases },
  };
  const rebuiltState = buildPrestigeBaseline(now, newPrestige);
  return { stardustEarned: earned, preSnapshot, dirtyFields, newPrestige, rebuiltState };
}

// ════════════════════════════════════════════
// 预览（UI "预览转生效果 → 确认/取消"）
// ════════════════════════════════════════════

/** 转生预览——确认前展示"会得到什么 / 会失去什么" */
export interface PrestigeResetPreview {
  /** 本次可获星核 */
  stardustEarned: number;
  /** 转生后等级 */
  newPrestigeLevel: number;
  /** 转生后星核余额 */
  newStardustBalance: number;
  /** 转生后生效的永久加成（unlocked id） */
  permanentBonuses: string[];
  /** 将被重置的内容摘要 */
  resets: {
    /** 归零的资源字段 */
    resourceIds: string[];
    /** 重置到 1 级/锁定的设施数 */
    facilityCount: number;
    /** 清空的研究数 */
    researchCount: number;
    /** 清空的成就数 */
    achievementCount: number;
  };
  /** 转生前完整基线层（UI 对比展示 / 取消时的参照） */
  baselineBefore: BaselineState;
  /** 转生后完整状态预览（基线层含永久加成 + 结算后转生层） */
  stateAfter: GameState;
}

/** 生成转生预览——纯函数，无任何写操作；取消则直接丢弃返回值即可 */
export function previewPrestigeReset(current: GameState, now: number): PrestigeResetPreview {
  const plan = planPrestigeReset(current, now);
  return {
    stardustEarned: plan.stardustEarned,
    newPrestigeLevel: plan.newPrestige.prestigeLevel,
    newStardustBalance: plan.newPrestige.stardust,
    permanentBonuses: [...plan.newPrestige.unlocked],
    resets: {
      resourceIds: [
        'credits',
        'stardust',
        'refineryBuffer',
        'crystal',
        'energy',
        'isotope',
        'antimatter',
        'darkmatter',
      ],
      facilityCount: Object.keys(current.facilities).length,
      researchCount: current.research.length,
      achievementCount: current.achievements.length,
    },
    baselineBefore: plan.preSnapshot.baseline,
    stateAfter: plan.rebuiltState,
  };
}

// ════════════════════════════════════════════
// 执行与回滚（T0-1 事务）
// ════════════════════════════════════════════

export interface PrestigeResetResult {
  ok: true;
  state: GameState;
  stardustEarned: number;
  /** 转生前完整快照——rollbackPrestigeReset 的凭据 */
  preSnapshot: PrestigeResetSnapshot;
}

/** 把 source 的全部字段批量刷入 target 引用（清空后整体赋值，保持引用不变） */
function overwriteState(target: GameState, source: GameState): void {
  const t = target as unknown as Record<string, unknown>;
  for (const key of Object.keys(t)) delete t[key];
  Object.assign(t, structuredClone(source));
}

/**
 * 执行一次转生重置（T0-1 事务：begin → 批量刷入 → commit 原子落盘）。
 *
 * - commit 前基线层不变（改动只在事务工作状态的内存里）
 * - commit 一次性重置（LayeredStateBackend.saveBoth 单 IDB 事务双键写，无半重置态）
 * - 转生后初始态含永久加成（buildPrestigeBaseline，不走 createNewGame）
 */
export async function executePrestigeReset(
  repo: TransactionalRepository<GameState>,
  current: GameState,
  now: number,
): Promise<PrestigeResetResult | { ok: false; error: string }> {
  const plan = planPrestigeReset(current, now);

  let tx;
  try {
    tx = repo.begin(current);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : '事务启动失败' };
  }

  overwriteState(tx.getState(), plan.rebuiltState);
  await tx.commit();

  // current 引用即事务工作状态（begin 不拷贝），commit 后已是重建后的状态
  return { ok: true, state: current, stardustEarned: plan.stardustEarned, preSnapshot: plan.preSnapshot };
}

/**
 * 回滚一次已提交的转生——用 execute 返回的 preSnapshot 把两层恢复到转生前。
 * 同样走 T0-1 事务：恢复动作本身也原子落盘（无"恢复一半"状态）。
 */
export async function rollbackPrestigeReset(
  repo: TransactionalRepository<GameState>,
  current: GameState,
  snapshot: PrestigeResetSnapshot,
): Promise<{ ok: true; state: GameState } | { ok: false; error: string }> {
  let tx;
  try {
    tx = repo.begin(current);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : '事务启动失败' };
  }
  const restored: GameState = {
    ...structuredClone(snapshot.baseline),
    prestige: structuredClone(snapshot.prestige),
  };
  overwriteState(tx.getState(), restored);
  await tx.commit();
  return { ok: true, state: current };
}
