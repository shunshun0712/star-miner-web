/**
 * T2-1: 转生编排核心——分层存档架构下"重置基线层、保留转生层"的落地实现。
 *
 * 设计要点：
 * - 走 T0-1 事务接口（TransactionalRepository.begin/commit/rollback），不直接写 IDB
 * - 重置后基线层由 buildPrestigeBaseline 重建：取裸初始基线 → 根据 prestige.unlocked 叠加永久 buff
 *   （不走 createNewGame 路径，避免污染新玩家首存档）
 * - 转生层结算：prestigeLevel +1、星核入账、历史追加快照
 * - commit 前任意时刻刷新页面：事务未提交，IDB 无半写态（T0-1 保证）
 *
 * 注：dirty-flag 批量重建 / 回滚预览等 UI 编排留 T2-2 扩展本文件。
 */
import type { GameState, PrestigeBaselineSnapshot, PrestigeHistoryEntry, PrestigeLayer } from './types';
import { createInitialBaseline } from './state';
import { PRESTIGE_UNLOCKS } from './prestigeLayer';
import type { TransactionalRepository } from '../save/transactional';

/**
 * 计算本次转生应得星核——基于基线层进度的简易公式。
 *
 * v0.5 占位实现（参照 T1-3「只注册 schema 不配数值」惯例）：每 100 晶体 → 1 星核。
 * 数值平衡留 v0.6 / T2-2 商店定价时调整。
 */
export function computeStardustEarned(state: GameState): number {
  return Math.floor(state.crystal / 100);
}

/** 采集转生时刻的基线层快照摘要（用于"成就回顾"与历史留档） */
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

/**
 * 构造转生后的初始基线层——裸初始基线 + prestige.unlocked 叠加永久 buff。
 *
 * 红线：不调用 createNewGame。createNewGame = 初始基线 + 空转生层（新玩家首存档语义），
 * 而转生后初始态必须含永久加成；二者共享 createInitialBaseline 这个纯初始基线工厂，
 * 但 prestige 路径在裸基线之上 apply 永久解锁，新玩家路径保持裸初始态。
 *
 * 返回的 state.prestige 仍沿用入参 prestige（调用方负责结算 prestigeLevel/stardust/history）。
 */
export function buildPrestigeBaseline(now: number, prestige: PrestigeLayer): GameState {
  const state: GameState = { ...createInitialBaseline(now), prestige };
  for (const id of prestige.unlocked) {
    const schema = PRESTIGE_UNLOCKS[id];
    if (schema) schema.apply(state);
  }
  return state;
}

export interface PrestigeResetResult {
  ok: true;
  state: GameState;
  stardustEarned: number;
}

/**
 * 执行一次转生重置。
 *
 * 流程（全在事务工作状态上 mutate，commit 时一次性原子落盘）：
 * 1. 结算星核：earned = computeStardustEarned(current)
 * 2. 采集基线快照，追加 history；prestigeLevel +1、stardust 入账、unlocked 保留
 * 3. 用 buildPrestigeBaseline 重建基线层（含永久加成），覆盖工作状态
 * 4. commit——TransactionalRepository 一次性写入持久化后端（基线层 + 转生层原子落盘）
 *
 * @returns 成功返回新状态；事务约束冲突（已有活跃事务）时返回 ok:false
 */
export async function executePrestigeReset(
  repo: TransactionalRepository<GameState>,
  current: GameState,
  now: number,
): Promise<PrestigeResetResult | { ok: false; error: string }> {
  const earned = computeStardustEarned(current);

  let tx;
  try {
    tx = repo.begin(current);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : '事务启动失败' };
  }

  const working = tx.getState();

  // 2. 结算转生层（保留 unlocked 永久解锁、+1 转生等级、星核入账、历史追加）
  const newPrestige: PrestigeLayer = {
    unlocked: [...working.prestige.unlocked],
    stardust: working.prestige.stardust + earned,
    prestigeLevel: working.prestige.prestigeLevel + 1,
    history: [
      ...working.prestige.history,
      {
        sequence: working.prestige.prestigeLevel + 1,
        timestamp: now,
        baselineSnapshot: createBaselineSnapshot(working),
        stardustEarned: earned,
      } satisfies PrestigeHistoryEntry,
    ],
  };

  // 3. 用含永久加成的初始基线层覆盖工作状态（注意：原 current 已被 repo.begin 快照，
  //    这里构造新 state 再把字段刷回 working 引用，保证 commit 写入的是重建后的状态）
  const rebuilt = buildPrestigeBaseline(now, newPrestige);
  const target = working as unknown as Record<string, unknown>;
  for (const key of Object.keys(target)) delete target[key];
  Object.assign(target, rebuilt);

  // 4. 原子提交
  await tx.commit();

  return { ok: true, state: working, stardustEarned: earned };
}
