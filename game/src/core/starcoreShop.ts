/**
 * T3-1: 星核商店引擎——M4 星核商店系统的基础设施层。
 *
 * 职责：
 * - SHOP_ITEMS 注册表：定义商店物品 schema（id / 名称 / 成本曲线 / 前置 / 效果回调）
 * - canPurchase / getItemCost / getItemLevel：纯读接口，UI 和购买逻辑共用
 * - purchaseItem：走 T0-1 事务原子购买（check → deduct → increment → onPurchase → commit）
 *
 * 两类效果回调：
 * - onPurchase(state, level)：购买时**立即**生效（mutate 事务工作状态），效果持续到下次转生
 * - onBaseline(state, level)：转生后基线层叠加（T3-2 的 applyShopBonuses 调用），永久生效
 *
 * 设计要点：
 * - 购买前先做只读校验（canPurchase），再开事务——避免开事务后发现买不了
 * - 成本公式：floor(baseCost × costMultiplier^currentLevel)，每级更贵
 * - shopPurchases 存储在 prestige 层，跨转生保留（转生不清空购物记录）
 * - T3-1 先放 5 个占位物品（覆盖 5 类），T3-2 扩充到 ~12-15 个并接入效果集成
 */
import type { GameState } from './types';
import type { TransactionalRepository } from '../save/transactional';

// ════════════════════════════════════════════
// 类型定义
// ════════════════════════════════════════════

/** 商店物品分类——与游戏主要系统对齐 */
export type ShopItemCategory = 'production' | 'economy' | 'research' | 'facility' | 'prestige';

/** 前置依赖——某物品需达到指定等级才能购买 */
export interface ShopItemPrerequisite {
  /** 前置物品 ID */
  itemId: string;
  /** 需达到的等级 */
  level: number;
}

/**
 * 商店物品 schema——描述一项可购买物品的全部元数据与效果。
 *
 * 成本公式：`baseCost × costMultiplier^currentLevel`（每级更贵，Math.floor 取整）。
 * - maxLevel：最大购买等级（level 从 1 开始计数，达到 maxLevel 后不可再买）
 * - prerequisites：前置物品等级要求（空数组 = 无前置）
 * - onPurchase：购买时立即生效（在事务工作状态上 mutate）；level 是购买后的新等级
 * - onBaseline：转生后基线层叠加（T3-2 applyShopBonuses 调用）；level 是当前已购等级
 */
export interface ShopItemSchema {
  id: string;
  name: string;
  description: string;
  category: ShopItemCategory;
  /** 基础成本（第 1 级的花费） */
  baseCost: number;
  /** 每级成本递增倍率（>1 时逐级更贵） */
  costMultiplier: number;
  /** 最大购买等级（达到后不可再买） */
  maxLevel: number;
  /** 前置依赖列表 */
  prerequisites: ShopItemPrerequisite[];
  /**
   * 购买时立即生效——在事务工作状态上 mutate。
   * level 是购买后的新等级（从 1 开始）。
   */
  onPurchase?(state: GameState, level: number): void;
  /**
   * 转生后基线层叠加——在 buildPrestigeBaseline 构造的初始基线之上叠加。
   * level 是当前已购买等级。T3-2 的 applyShopBonuses 遍历调用。
   */
  onBaseline?(state: GameState, level: number): void;
}

// ════════════════════════════════════════════
// 商店物品注册表
// ════════════════════════════════════════════

/**
 * 商店物品注册表。
 *
 * T3-1 先放 5 个占位物品（覆盖全部 5 类），数值为示意性可用值。
 * T3-2 会扩充到 ~12-15 个物品并接入 production/research/economy/prestige 集成钩子。
 */
export const SHOP_ITEMS: Record<string, ShopItemSchema> = {
  /** 经济类：立即获得信用点（购买即生效，测试用） */
  'shop-credit-injection': {
    id: 'shop-credit-injection',
    name: '信用点注入',
    description: '购买后立即获得 500 信用点（每级效果叠加）',
    category: 'economy',
    baseCost: 3,
    costMultiplier: 1.5,
    maxLevel: 5,
    prerequisites: [],
    onPurchase(state: GameState, level: number): void {
      state.credits += 500;
    },
  },

  /** 生产类：转生后采掘器等级提升 */
  'shop-excavator-tuning': {
    id: 'shop-excavator-tuning',
    name: '采掘器调校',
    description: '每次转生后采掘器额外 +1 级（每级叠加）',
    category: 'production',
    baseCost: 5,
    costMultiplier: 1.5,
    maxLevel: 3,
    prerequisites: [{ itemId: 'shop-credit-injection', level: 1 }],
    onBaseline(state: GameState, level: number): void {
      state.facilities.excavator.level = Math.min(5, state.facilities.excavator.level + level);
    },
  },

  /** 研究类：购买后永久解锁研究中心 */
  'shop-research-subsidy': {
    id: 'shop-research-subsidy',
    name: '研究补贴',
    description: '购买后永久解锁研究中心（无需晶体）',
    category: 'research',
    baseCost: 8,
    costMultiplier: 1.8,
    maxLevel: 1,
    prerequisites: [],
    onPurchase(state: GameState, level: number): void {
      state.researchCenterUnlocked = true;
    },
  },

  /** 设施类：转生后初始解锁氦-3 采掘器 */
  'shop-he3-permit': {
    id: 'shop-he3-permit',
    name: '氦-3 开采许可',
    description: '每次转生后氦-3 采掘器默认解锁',
    category: 'facility',
    baseCost: 10,
    costMultiplier: 2.0,
    maxLevel: 1,
    prerequisites: [{ itemId: 'shop-credit-injection', level: 1 }],
    onBaseline(state: GameState, level: number): void {
      state.facilities.he3Excavator.unlocked = true;
    },
  },

  /** 转生类：转生后初始星尘加成 */
  'shop-stardust-resonance': {
    id: 'shop-stardust-resonance',
    name: '星核共鸣',
    description: '每次转生后初始星尘 +50×等级',
    category: 'prestige',
    baseCost: 15,
    costMultiplier: 2.0,
    maxLevel: 3,
    prerequisites: [{ itemId: 'shop-credit-injection', level: 2 }],
    onBaseline(state: GameState, level: number): void {
      state.stardust += 50 * level;
    },
  },
};

/** 判断某 id 是否为已注册的商店物品 */
export function isRegisteredShopItem(id: string): boolean {
  return id in SHOP_ITEMS;
}

// ════════════════════════════════════════════
// 纯读接口（UI 与购买逻辑共用）
// ════════════════════════════════════════════

/**
 * 获取某物品当前已购买等级。
 * 从 prestige.shopPurchases[itemId] 读取，缺失返回 0（未购买）。
 */
export function getItemLevel(state: GameState, itemId: string): number {
  return state.prestige.shopPurchases[itemId] ?? 0;
}

/**
 * 计算某物品下一级的购买成本。
 * 公式：floor(baseCost × costMultiplier^currentLevel)。
 * 未知物品返回 Infinity（canPurchase 会拒绝）。
 */
export function getItemCost(state: GameState, itemId: string): number {
  const item = SHOP_ITEMS[itemId];
  if (!item) return Infinity;
  const level = getItemLevel(state, itemId);
  return Math.floor(item.baseCost * Math.pow(item.costMultiplier, level));
}

/**
 * 购买前校验——纯只读，不 mutate。
 *
 * 校验项：
 * 1. 物品存在
 * 2. 未满级（level < maxLevel）
 * 3. 星核余额足够
 * 4. 前置依赖满足
 *
 * 返回 { ok, reason }：ok=true 可购买，ok=false 时 reason 描述拒绝原因。
 */
export interface CanPurchaseResult {
  ok: boolean;
  reason?: string;
}

export function canPurchase(state: GameState, itemId: string): CanPurchaseResult {
  const item = SHOP_ITEMS[itemId];
  if (!item) return { ok: false, reason: `未知商店物品: ${itemId}` };

  const level = getItemLevel(state, itemId);
  if (level >= item.maxLevel) return { ok: false, reason: `${item.name}已满级（${item.maxLevel}级）` };

  const cost = getItemCost(state, itemId);
  if (state.prestige.stardust < cost) {
    return { ok: false, reason: `星核不足（需 ${cost}，余 ${state.prestige.stardust}）` };
  }

  for (const prereq of item.prerequisites) {
    const prereqLevel = getItemLevel(state, prereq.itemId);
    if (prereqLevel < prereq.level) {
      const prereqItem = SHOP_ITEMS[prereq.itemId];
      const prereqName = prereqItem?.name ?? prereq.itemId;
      return { ok: false, reason: `需要${prereqName}达到 ${prereq.level} 级` };
    }
  }

  return { ok: true };
}

// ════════════════════════════════════════════
// 事务型购买
// ════════════════════════════════════════════

export interface PurchaseSuccess {
  ok: true;
  state: GameState;
  itemId: string;
  newLevel: number;
  cost: number;
}

export interface PurchaseFailure {
  ok: false;
  error: string;
}

/**
 * 执行一次商店购买（T0-1 事务：check → begin → deduct → increment → onPurchase → commit）。
 *
 * 流程：
 * 1. 先做只读校验（canPurchase）——避免开事务后才发现买不了
 * 2. 开事务 begin——state 即工作状态引用（begin 不拷贝）
 * 3. 扣星核、增等级——mutate 工作状态
 * 4. 调 onPurchase——立即效果 mutate 工作状态
 * 5. commit——原子落盘（LayeredStateBackend.saveBoth 单 IDB 事务双键写）
 *
 * commit 前 state 已被 mutate（begin 不拷贝工作状态），但 IDB 未写入；
 * commit 后 state 的改动持久化到 IDB。返回的 state 与入参是同一引用。
 */
export async function purchaseItem(
  repo: TransactionalRepository<GameState>,
  state: GameState,
  itemId: string,
): Promise<PurchaseSuccess | PurchaseFailure> {
  // 1. 只读校验（不开事务）
  const check = canPurchase(state, itemId);
  if (!check.ok) return { ok: false, error: check.reason! };

  const cost = getItemCost(state, itemId);
  const currentLevel = getItemLevel(state, itemId);
  const newLevel = currentLevel + 1;

  // 2. 开事务
  let tx;
  try {
    tx = repo.begin(state);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : '事务启动失败' };
  }

  // 3. 扣星核、增等级
  const ws = tx.getState();
  ws.prestige.stardust -= cost;
  ws.prestige.shopPurchases[itemId] = newLevel;

  // 4. 立即效果
  const item = SHOP_ITEMS[itemId];
  if (item.onPurchase) {
    item.onPurchase(ws, newLevel);
  }

  // 5. 原子提交
  await tx.commit();

  return { ok: true, state, itemId, newLevel, cost };
}
