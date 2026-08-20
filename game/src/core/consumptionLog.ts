/**
 * T1-4 消耗日志助手 — 存档层对 GameState.consumptionLog 的纯函数操作。
 *
 * 设计目标（验收② consumptionLog 只含活跃项）：
 * - active 只保留未到期 buff / 进行中任务；
 * - 已完结/过期/回滚的条目由 pruneConsumptionLog 折叠进 aggregate 后从 active 丢弃，
 *   不保留明细，防止存档随游玩臃肿。
 *
 * 与 T1-1 ConsumptionEngine 的关系：
 * - 引擎把事件维护在内存 Map（getActiveEvents 返回未回滚项），刷新即丢；
 * - 本模块提供持久化投影：调用方（持有 buff/探索到期语义的 ReactorRuntime，T1-2）
 *   在 consume 时 recordActiveConsumption、在 buff/任务结束时 completeConsumption、
 *   在存档前 pruneConsumptionLog(now)，即可保证持久层只含活跃项。
 * - 不在此处反向耦合 consumption.ts（types 自洽，避免循环依赖）。
 */

import type {
  ConsumptionLog,
  ConsumptionLogEntry,
  ConsumptionAggregate,
} from './types';

/** 构造空消耗日志（v6→v7 迁移与 createNewGame 共用） */
export function createEmptyConsumptionLog(): ConsumptionLog {
  return {
    active: [],
    aggregate: {
      completedEvents: 0,
      consumedByResource: {},
      producedByResource: {},
    },
  };
}

/** 条目是否仍活跃——未设 expiresAt 或未到期 */
export function isActiveEntry(entry: ConsumptionLogEntry, now: number): boolean {
  return entry.expiresAt === undefined || entry.expiresAt > now;
}

/** 把一条已完结条目折叠进聚合（累加消耗/产出，completedEvents+1） */
function foldIntoAggregate(agg: ConsumptionAggregate, entry: ConsumptionLogEntry): void {
  agg.completedEvents += 1;
  agg.consumedByResource[entry.resourceId] =
    (agg.consumedByResource[entry.resourceId] ?? 0) + entry.amount;
  for (const p of entry.produced) {
    agg.producedByResource[p.resourceId] =
      (agg.producedByResource[p.resourceId] ?? 0) + p.amount;
  }
}

/**
 * 修剪消耗日志：到期/完结条目从 active 移除并折叠进 aggregate，只保留活跃项。
 * 存档前调用，保证持久化数据只含活跃 buff/进行中任务。
 *
 * @returns 是否发生了修剪（有条目被折叠）
 */
export function pruneConsumptionLog(log: ConsumptionLog, now: number): boolean {
  const stillActive: ConsumptionLogEntry[] = [];
  let changed = false;
  for (const entry of log.active) {
    if (isActiveEntry(entry, now)) {
      stillActive.push(entry);
    } else {
      foldIntoAggregate(log.aggregate, entry);
      changed = true;
    }
  }
  log.active = stillActive;
  return changed;
}

/** 追加一条活跃消耗条目（consume / buff 激活 / 探索派遣后调用） */
export function recordActiveConsumption(log: ConsumptionLog, entry: ConsumptionLogEntry): void {
  log.active.push(entry);
}

/**
 * 显式完结一条活跃条目（buff 提前结束 / 探索任务完成 / 回滚）。
 * 从 active 移除并折叠进 aggregate。
 * @returns 是否找到并完结了该条目
 */
export function completeConsumption(log: ConsumptionLog, entryId: string): boolean {
  const idx = log.active.findIndex((e) => e.id === entryId);
  if (idx < 0) return false;
  const [entry] = log.active.splice(idx, 1);
  foldIntoAggregate(log.aggregate, entry);
  return true;
}

/** 查询某条幂等键是否仍活跃（防离线结算重复扣） */
export function isActiveIdempotencyKey(log: ConsumptionLog, key: string): boolean {
  return log.active.some((e) => e.idempotencyKey === key);
}
