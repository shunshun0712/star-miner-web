/**
 * T2-1: 转生层数据工厂 + 永久解锁注册表。
 *
 * 本模块是「持久层自洽」的叶子模块——只 import 类型（types.ts），
 * 不反向依赖 state.ts / save.ts / consumption.ts，避免循环依赖
 * （参照 T1-4 consumptionLog.ts 的设计）。
 *
 * - createEmptyPrestigeLayer：供 v7→v8 迁移、新游戏初始化、缺失 prestige 键回填
 * - PRESTIGE_UNLOCKS：永久解锁注册表，每项带 apply(state) 回调；
 *   转生后基线层据此应用永久 buff（不走 createNewGame 裸初始态）
 */
import type { GameState, PrestigeLayer } from './types';

/** 构造空转生层——旧 v7 存档迁移、新游戏首存档的初始值 */
export function createEmptyPrestigeLayer(): PrestigeLayer {
  return {
    unlocked: [],
    stardust: 0,
    prestigeLevel: 0,
    history: [],
    shopPurchases: {},
  };
}

/**
 * 永久解锁 schema——描述一项永久解锁及其对转生后基线层的效果。
 *
 * apply 直接 mutate 入参 state（已在事务工作状态上操作，无需返回）。
 * v0.5 只注册两条示意性解锁，数值平衡留 v0.6（参照 T1-3「只注册 schema 不配数值」惯例）。
 */
export interface PrestigeUnlockSchema {
  id: string;
  name: string;
  description: string;
  /** 应用到转生后基线层（在已构造的初始基线之上叠加永久 buff） */
  apply(state: GameState): void;
}

/**
 * 永久解锁注册表（白名单）。
 *
 * 新增解锁只需追加一项；validateState 会据此过滤存档里的非法 unlocked id，
 * 防止恶意存档注入任意字符串算入永久 buff（参照 M4 research/achievements 白名单惯例）。
 */
export const PRESTIGE_UNLOCKS: Record<string, PrestigeUnlockSchema> = {
  /** 转生后初始信用点 +500（而非裸初始态 100） */
  'prestige-start-credits': {
    id: 'prestige-start-credits',
    name: '初始信用点 +500',
    description: '每次转生后从 600 信用点起步（裸初始态为 100）',
    apply(state: GameState): void {
      state.credits += 500;
    },
  },
  /** 转生后初始解锁氦-3 采矿器（裸初始态为锁定） */
  'prestige-he3-unlock': {
    id: 'prestige-he3-unlock',
    name: '初始解锁氦-3 采矿器',
    description: '每次转生后氦-3 采矿器默认解锁（裸初始态为锁定）',
    apply(state: GameState): void {
      state.facilities.he3Excavator.unlocked = true;
    },
  },
};

/** 判断某 id 是否为已注册的永久解锁（白名单校验用） */
export function isRegisteredPrestigeUnlock(id: string): boolean {
  return id in PRESTIGE_UNLOCKS;
}
