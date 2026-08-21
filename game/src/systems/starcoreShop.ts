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
 * 商店物品注册表——15 个物品覆盖 5 大类别。
 *
 * T3-2 从 T3-1 的 5 个占位扩充到 15 个完整物品，保留全部 5 个原有 ID（数值/回调不变）。
 * 持续型乘子效果（矿石产量、信用点收入、研究成本折扣等）不在 onPurchase/onBaseline 中，
 * 而是由 shopBonuses.ts 的派生乘子函数读取 shopPurchases 计算——遵循 achievementProductionMultiplier 先例。
 */
export const SHOP_ITEMS: Record<string, ShopItemSchema> = {
  // ════════════════════════════════════════════
  // economy（经济）— 3 项
  // ════════════════════════════════════════════

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

  /** 经济类：信用点收入乘子——每级 +15%（派生乘子，shopBonuses.ts 读取） */
  'shop-credit-amplifier': {
    id: 'shop-credit-amplifier',
    name: '信用放大器',
    description: '出售资源获得的信用点每级 +15%（持续生效）',
    category: 'economy',
    baseCost: 6,
    costMultiplier: 1.6,
    maxLevel: 3,
    prerequisites: [{ itemId: 'shop-credit-injection', level: 1 }],
  },

  /** 经济类：转生后初始信用点——每级 +300（onBaseline 叠加） */
  'shop-starting-fund': {
    id: 'shop-starting-fund',
    name: '启动资金',
    description: '每次转生后初始信用点 +300×等级（叠加在裸基线 100 之上）',
    category: 'economy',
    baseCost: 8,
    costMultiplier: 1.7,
    maxLevel: 3,
    prerequisites: [{ itemId: 'shop-credit-injection', level: 1 }],
    onBaseline(state: GameState, level: number): void {
      state.credits += 300 * level;
    },
  },

  // ════════════════════════════════════════════
  // production（生产）— 4 项
  // ════════════════════════════════════════════

  /** 生产类：转生后采掘器等级提升 */
  'shop-excavator-tuning': {
    id: 'shop-excavator-tuning',
    name: '采掘器调校',
    description: '每次转生后采掘器额外 +1 级（每级叠加，上限受 effectiveMaxLevel 约束）',
    category: 'production',
    baseCost: 5,
    costMultiplier: 1.5,
    maxLevel: 3,
    prerequisites: [{ itemId: 'shop-credit-injection', level: 1 }],
    onBaseline(state: GameState, level: number): void {
      // 上限沿用裸 MAX_LEVEL=5（不与 shop-level-cap 叠加，防转生后初始等级即超限）
      state.facilities.excavator.level = Math.min(5, state.facilities.excavator.level + level);
    },
  },

  /** 生产类：矿石产量乘子——每级 +20%（派生乘子，作用于采掘类 rawRate） */
  'shop-ore-booster': {
    id: 'shop-ore-booster',
    name: '矿石增幅器',
    description: '所有采掘器矿石产量每级 +20%（持续生效）',
    category: 'production',
    baseCost: 7,
    costMultiplier: 1.6,
    maxLevel: 3,
    prerequisites: [{ itemId: 'shop-excavator-tuning', level: 1 }],
  },

  /** 生产类：设施速率乘子——每级 +10%（派生乘子，作用于全部 rawRate） */
  'shop-overdrive': {
    id: 'shop-overdrive',
    name: '超频驱动',
    description: '所有设施产出速率每级 +10%（持续生效）',
    category: 'production',
    baseCost: 12,
    costMultiplier: 1.8,
    maxLevel: 2,
    prerequisites: [{ itemId: 'shop-ore-booster', level: 1 }],
  },

  /** 生产类：同位素产量乘子——每级 +25%（派生乘子，作用于 tickProduction 同位素产出） */
  'shop-isotope-enrichment': {
    id: 'shop-isotope-enrichment',
    name: '同位素富集',
    description: '同位素获取概率每级 +25%（持续生效）',
    category: 'production',
    baseCost: 9,
    costMultiplier: 1.7,
    maxLevel: 2,
    prerequisites: [{ itemId: 'shop-credit-injection', level: 1 }],
  },

  // ════════════════════════════════════════════
  // research（研究）— 3 项
  // ════════════════════════════════════════════

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

  /** 研究类：研究成本折扣——每级 -10%（派生乘子，下限 0.1） */
  'shop-research-grant': {
    id: 'shop-research-grant',
    name: '研究资助',
    description: '所有科技研究成本每级 -10%（持续生效）',
    category: 'research',
    baseCost: 10,
    costMultiplier: 1.7,
    maxLevel: 3,
    prerequisites: [{ itemId: 'shop-research-subsidy', level: 1 }],
  },

  /** 研究类：解锁 T3 研究——购买后 tier 3 科技可研究（派生布尔，shopBonuses.ts 读取） */
  'shop-advanced-research': {
    id: 'shop-advanced-research',
    name: '高级研究授权',
    description: '解锁 T3 层科技（量子采掘、聚变反应堆、量子精炼等）',
    category: 'research',
    baseCost: 20,
    costMultiplier: 2.0,
    maxLevel: 1,
    prerequisites: [{ itemId: 'shop-research-grant', level: 2 }],
  },

  // ════════════════════════════════════════════
  // facility（设施）— 3 项
  // ════════════════════════════════════════════

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

  /** 设施类：转生后初始解锁氘采掘器 */
  'shop-deuterium-permit': {
    id: 'shop-deuterium-permit',
    name: '氘开采许可',
    description: '每次转生后氘采掘器默认解锁',
    category: 'facility',
    baseCost: 14,
    costMultiplier: 2.0,
    maxLevel: 1,
    prerequisites: [{ itemId: 'shop-he3-permit', level: 1 }],
    onBaseline(state: GameState, level: number): void {
      state.facilities.deuteriumExcavator.unlocked = true;
    },
  },

  /** 设施类：设施等级上限提升——每级 +1（派生，effectiveMaxLevel 读取） */
  'shop-level-cap': {
    id: 'shop-level-cap',
    name: '等级突破',
    description: '设施等级上限每级 +1（裸上限 5，每级突破上限）',
    category: 'facility',
    baseCost: 18,
    costMultiplier: 2.2,
    maxLevel: 2,
    prerequisites: [{ itemId: 'shop-credit-injection', level: 2 }],
  },

  // ════════════════════════════════════════════
  // prestige（转生）— 2 项
  // ════════════════════════════════════════════

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

  /** 转生类：转生收益乘子——每级 +25%（派生乘子，作用于 computeStardustEarned） */
  'shop-prestige-amplifier': {
    id: 'shop-prestige-amplifier',
    name: '转生增幅器',
    description: '转生结算获得的星核每级 +25%（持续生效）',
    category: 'prestige',
    baseCost: 25,
    costMultiplier: 2.5,
    maxLevel: 2,
    prerequisites: [{ itemId: 'shop-stardust-resonance', level: 1 }],
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

  // 5. 原子提交——commit 失败时 rollback 事务并返回错误，防止 txRepo 永久卡死
  try {
    await tx.commit();
  } catch (commitErr) {
    if (!tx.isDone()) {
      tx.rollback();
    }
    return { ok: false, error: commitErr instanceof Error ? commitErr.message : '提交事务失败' };
  }

  return { ok: true, state, itemId, newLevel, cost };
}
