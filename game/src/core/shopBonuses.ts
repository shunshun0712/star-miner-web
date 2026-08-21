/**
 * T3-2: 星核商店永久加成效果系统。
 *
 * 两类效果：
 * - **onBaseline 叠加**（一次性，转生重建时调用）：遍历 prestige.shopPurchases，
 *   对每个已购物品调用 item.onBaseline(state, level)。由 applyShopBonuses 聚合。
 * - **派生乘子**（持续生效，每次计算时读取 shopPurchases）：矿石产量、信用点收入、
 *   研究成本、转生收益、设施速率、设施等级上限、T3 研究解锁。
 *
 * 派生乘子遵循 achievementProductionMultiplier 的先例——纯函数读取 prestige.shopPurchases，
 * 不引入新 GameState 字段、不升版本号，跨转生安全（shopPurchases 在转生层）。
 *
 * 依赖方向：shopBonuses → starcoreShop → types（无循环依赖）。
 * production / research / economy / prestige 从 shopBonuses 导入派生乘子。
 */
import type { GameState } from './types';
import { MAX_LEVEL } from './config';
import { SHOP_ITEMS, getItemLevel } from './starcoreShop';

// ════════════════════════════════════════════
// onBaseline 聚合
// ════════════════════════════════════════════

/**
 * 聚合所有已购物品的 onBaseline 效果——转生后基线层重建时调用。
 *
 * 遍历 prestige.shopPurchases，对每个 level > 0 的物品调用 item.onBaseline(state, level)。
 * 在 buildPrestigeBaseline 中、PRESTIGE_UNLOCKS 叠加之后调用（先叠 prestige 永久解锁，
 * 再叠商店 onBaseline——商店效果可在 prestige 解锁之上进一步加成）。
 *
 * 纯 mutate（直接改入参 state），不返回新对象。
 * 未知 itemId（注册表未注册）静默跳过，不抛异常——前向兼容旧存档中已移除的物品。
 */
export function applyShopBonuses(state: GameState): void {
  const purchases = state.prestige.shopPurchases;
  for (const itemId of Object.keys(purchases)) {
    const level = purchases[itemId];
    if (level <= 0) continue;
    const item = SHOP_ITEMS[itemId];
    if (!item) continue;
    if (item.onBaseline) {
      item.onBaseline(state, level);
    }
  }
}

// ════════════════════════════════════════════
// 派生乘子（持续效果）
// ════════════════════════════════════════════

/**
 * 矿石产量乘子——shop-ore-booster 每级 +20%。
 * 仅作用于采掘类设施（excavator / he3Excavator / deuteriumExcavator）的 rawRate。
 */
export function shopOreProductionMultiplier(state: GameState): number {
  return 1 + 0.2 * getItemLevel(state, 'shop-ore-booster');
}

/**
 * 设施速率乘子——shop-overdrive 每级 +10%。
 * 作用于所有设施的 rawRate（全局加速）。
 */
export function shopFacilityRateMultiplier(state: GameState): number {
  return 1 + 0.1 * getItemLevel(state, 'shop-overdrive');
}

/**
 * 同位素产量乘子——shop-isotope-enrichment 每级 +25%。
 * 作用于 tickProduction 中的同位素产出计算。
 */
export function shopIsotopeProductionMultiplier(state: GameState): number {
  return 1 + 0.25 * getItemLevel(state, 'shop-isotope-enrichment');
}

/**
 * 信用点收入乘子——shop-credit-amplifier 每级 +15%。
 * 作用于 sellResource 的出售收益（星尘售矿 + 晶体售矿）。
 */
export function shopCreditsIncomeMultiplier(state: GameState): number {
  return 1 + 0.15 * getItemLevel(state, 'shop-credit-amplifier');
}

/**
 * 研究成本乘子——shop-research-grant 每级 -10%。
 * level 0=1.0, 1=0.9, 2=0.8, 3=0.7。下限 0.1（防极端折扣归零）。
 * 作用于 canResearch 的成本校验 + researchTech 的实际扣减。
 */
export function shopResearchCostMultiplier(state: GameState): number {
  return Math.max(0.1, 1 - 0.1 * getItemLevel(state, 'shop-research-grant'));
}

/**
 * 转生收益乘子——shop-prestige-amplifier 每级 +25%。
 * level 0=1.0, 1=1.25, 2=1.50。
 * 作用于 computeStardustEarned（乘在 floor 之前）。
 *
 * 红线：prestigeCeremony.computeStardustBreakdown 必须同步应用此乘子，
 * 保持 stardustEarned === computeStardustEarned(state) 严格相等。
 */
export function shopPrestigeGainMultiplier(state: GameState): number {
  return 1 + 0.25 * getItemLevel(state, 'shop-prestige-amplifier');
}

// ════════════════════════════════════════════
// 设施等级上限
// ════════════════════════════════════════════

/**
 * 有效设施等级上限——MAX_LEVEL + shop-level-cap 每级 +1。
 * level 0 → 5, 1 → 6, 2 → 7。
 * 作用于 economy.canUpgrade 的满级判定 + save.validateState 的设施等级越界校验。
 *
 * 注意：不修改 MAX_LEVEL 常量（state.test.ts 断言 toBe 5），而是通过此函数动态计算。
 */
export function effectiveMaxLevel(state: GameState): number {
  return MAX_LEVEL + getItemLevel(state, 'shop-level-cap');
}

// ════════════════════════════════════════════
// T3 研究解锁
// ════════════════════════════════════════════

/**
 * 是否已解锁 T3 研究权限——shop-advanced-research 购买即解锁。
 * 作用于 research.canResearch 的 tier > 2 门禁：未购买时 tier 3+ 科技仍显示"后续版本开放"。
 */
export function hasAdvancedResearchUnlock(state: GameState): boolean {
  return getItemLevel(state, 'shop-advanced-research') >= 1;
}
