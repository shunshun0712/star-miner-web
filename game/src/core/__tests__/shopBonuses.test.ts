/**
 * T3-2: 星核商店永久加成效果系统测试。
 *
 * 覆盖：
 * - 每个物品的 onPurchase/onBaseline 效果
 * - applyShopBonuses 聚合（多物品叠加、未知 id 跳过、空记录 no-op）
 * - 派生乘子（矿石/设施/同位素/信用点/研究成本/转生收益/等级上限/T3 解锁）
 * - 跨转生持久化（shopPurchases 保留 + onBaseline 在重建时重新叠加）
 * - 集成钩子（production rawRate / economy sellResource / research canResearch / prestige computeStardustEarned）
 */
import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { buildPrestigeBaseline } from '../prestige';
import { createEmptyPrestigeLayer } from '../prestigeLayer';
import {
  SHOP_ITEMS,
  canPurchase,
  getItemCost,
  getItemLevel,
  purchaseItem,
} from '../starcoreShop';
import {
  applyShopBonuses,
  shopOreProductionMultiplier,
  shopFacilityRateMultiplier,
  shopIsotopeProductionMultiplier,
  shopCreditsIncomeMultiplier,
  shopResearchCostMultiplier,
  shopPrestigeGainMultiplier,
  effectiveMaxLevel,
  hasAdvancedResearchUnlock,
} from '../shopBonuses';
import { rawRate, tickProduction } from '../production';
import { sellResource, canUpgrade, upgradeFacility } from '../economy';
import { canResearch, researchTech, researchCost, hasResearch } from '../research';
import { computeStardustEarned } from '../prestige';
import { computeStardustBreakdown } from '../prestigeCeremony';
import { TransactionalRepository, InMemoryBackend } from '../../save/transactional';
import { LayeredStateBackend, type LayeredKeyValueStore } from '../../save/layeredBackend';
import { MAX_LEVEL } from '../config';
import type { GameState, PrestigeLayer } from '../types';

const T0 = 1_700_000_000_000;

/** 构造有足够星核的状态 */
function stateWithStardust(stardust: number): GameState {
  const s = createNewGame(T0);
  s.prestige.stardust = stardust;
  return s;
}

/** 内存分层存储 mock（与 starcoreShop.test.ts 一致） */
class InMemoryLayeredStore implements LayeredKeyValueStore {
  main: string | null = null;
  prestige: string | null = null;
  async load(): Promise<string | null> { return this.main; }
  async save(json: string): Promise<void> { this.main = json; }
  async loadPrestige(): Promise<string | null> { return this.prestige; }
  async savePrestige(json: string): Promise<void> { this.prestige = json; }
  async saveBoth(baselineJson: string, prestigeJson: string): Promise<void> {
    this.main = baselineJson;
    this.prestige = prestigeJson;
  }
}

function makeRepo(state: GameState): { repo: TransactionalRepository<GameState>; backend: LayeredStateBackend } {
  const store = new InMemoryLayeredStore();
  const backend = new LayeredStateBackend(store);
  const repo = new TransactionalRepository<GameState>(backend, structuredClone);
  return { repo, backend };
}

// ═══════════════════════════════════════════════════════════════
// SHOP_ITEMS 注册表扩充验证
// ═══════════════════════════════════════════════════════════════

describe('SHOP_ITEMS 注册表扩充（T3-2）', () => {
  it('扩充到 ~12-15 个物品', () => {
    const count = Object.keys(SHOP_ITEMS).length;
    expect(count).toBeGreaterThanOrEqual(12);
    expect(count).toBeLessThanOrEqual(15);
  });

  it('覆盖全部 5 种分类', () => {
    const categories = new Set(Object.values(SHOP_ITEMS).map((i) => i.category));
    expect(categories).toEqual(new Set(['economy', 'production', 'research', 'facility', 'prestige']));
  });

  it('每个分类至少 2 个物品', () => {
    const counts: Record<string, number> = {};
    for (const item of Object.values(SHOP_ITEMS)) {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
    }
    for (const cat of ['economy', 'production', 'research', 'facility', 'prestige']) {
      expect(counts[cat]).toBeGreaterThanOrEqual(2);
    }
  });

  it('保留 T3-1 的 5 个原有 ID 且数值不变', () => {
    const original = SHOP_ITEMS['shop-credit-injection'];
    expect(original.baseCost).toBe(3);
    expect(original.costMultiplier).toBe(1.5);
    expect(original.maxLevel).toBe(5);

    const tuning = SHOP_ITEMS['shop-excavator-tuning'];
    expect(tuning.baseCost).toBe(5);
    expect(tuning.maxLevel).toBe(3);
    expect(tuning.prerequisites).toEqual([{ itemId: 'shop-credit-injection', level: 1 }]);

    const subsidy = SHOP_ITEMS['shop-research-subsidy'];
    expect(subsidy.baseCost).toBe(8);
    expect(subsidy.maxLevel).toBe(1);

    const he3 = SHOP_ITEMS['shop-he3-permit'];
    expect(he3.baseCost).toBe(10);
    expect(he3.maxLevel).toBe(1);

    const resonance = SHOP_ITEMS['shop-stardust-resonance'];
    expect(resonance.baseCost).toBe(15);
    expect(resonance.maxLevel).toBe(3);
    expect(resonance.prerequisites).toEqual([{ itemId: 'shop-credit-injection', level: 2 }]);
  });
});

// ═══════════════════════════════════════════════════════════════
// onPurchase 立即效果
// ═══════════════════════════════════════════════════════════════

describe('onPurchase 立即效果', () => {
  it('shop-credit-injection：购买后 credits +500', () => {
    const s = stateWithStardust(100);
    s.credits = 0;
    s.prestige.shopPurchases['shop-credit-injection'] = 1;
    SHOP_ITEMS['shop-credit-injection'].onPurchase!(s, 1);
    expect(s.credits).toBe(500);
  });

  it('shop-research-subsidy：购买后 researchCenterUnlocked = true', () => {
    const s = stateWithStardust(100);
    expect(s.researchCenterUnlocked).toBe(false);
    s.prestige.shopPurchases['shop-research-subsidy'] = 1;
    SHOP_ITEMS['shop-research-subsidy'].onPurchase!(s, 1);
    expect(s.researchCenterUnlocked).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// onBaseline 转生后基线叠加
// ═══════════════════════════════════════════════════════════════

describe('onBaseline 转生后基线叠加', () => {
  it('shop-excavator-tuning：转生后采掘器等级 +level（上限 5）', () => {
    const s = buildPrestigeBaseline(T0, createEmptyPrestigeLayer());
    expect(s.facilities.excavator.level).toBe(1);

    const prestige: PrestigeLayer = {
      ...createEmptyPrestigeLayer(),
      shopPurchases: { 'shop-excavator-tuning': 2 },
    };
    const rebuilt = buildPrestigeBaseline(T0, prestige);
    expect(rebuilt.facilities.excavator.level).toBe(3); // 1 + 2
  });

  it('shop-excavator-tuning：等级不超 5（裸上限）', () => {
    const prestige: PrestigeLayer = {
      ...createEmptyPrestigeLayer(),
      shopPurchases: { 'shop-excavator-tuning': 3 },
    };
    const rebuilt = buildPrestigeBaseline(T0, prestige);
    expect(rebuilt.facilities.excavator.level).toBe(4); // min(5, 1+3) = 4
  });

  it('shop-he3-permit：转生后 he3Excavator 解锁', () => {
    const prestige: PrestigeLayer = {
      ...createEmptyPrestigeLayer(),
      shopPurchases: { 'shop-he3-permit': 1 },
    };
    const rebuilt = buildPrestigeBaseline(T0, prestige);
    expect(rebuilt.facilities.he3Excavator.unlocked).toBe(true);
  });

  it('shop-deuterium-permit：转生后 deuteriumExcavator 解锁', () => {
    const prestige: PrestigeLayer = {
      ...createEmptyPrestigeLayer(),
      shopPurchases: { 'shop-deuterium-permit': 1 },
    };
    const rebuilt = buildPrestigeBaseline(T0, prestige);
    expect(rebuilt.facilities.deuteriumExcavator.unlocked).toBe(true);
  });

  it('shop-stardust-resonance：转生后 stardust +50×level', () => {
    const prestige: PrestigeLayer = {
      ...createEmptyPrestigeLayer(),
      shopPurchases: { 'shop-stardust-resonance': 3 },
    };
    const rebuilt = buildPrestigeBaseline(T0, prestige);
    // 裸基线 stardust=0 + 50*3 = 150（注意 stardust 在基线层是星尘矿，prestige.stardust 是星核）
    expect(rebuilt.stardust).toBe(150);
  });

  it('shop-starting-fund：转生后 credits +300×level', () => {
    const prestige: PrestigeLayer = {
      ...createEmptyPrestigeLayer(),
      shopPurchases: { 'shop-starting-fund': 2 },
    };
    const rebuilt = buildPrestigeBaseline(T0, prestige);
    // 裸基线 credits=100 + 300*2 = 700
    expect(rebuilt.credits).toBe(700);
  });

  it('多物品 onBaseline 叠加', () => {
    const prestige: PrestigeLayer = {
      ...createEmptyPrestigeLayer(),
      shopPurchases: {
        'shop-excavator-tuning': 1,
        'shop-he3-permit': 1,
        'shop-stardust-resonance': 2,
        'shop-starting-fund': 1,
      },
    };
    const rebuilt = buildPrestigeBaseline(T0, prestige);
    expect(rebuilt.facilities.excavator.level).toBe(2); // 1 + 1
    expect(rebuilt.facilities.he3Excavator.unlocked).toBe(true);
    expect(rebuilt.stardust).toBe(100); // 50 * 2
    expect(rebuilt.credits).toBe(400); // 100 + 300
  });
});

// ═══════════════════════════════════════════════════════════════
// applyShopBonuses 聚合
// ═══════════════════════════════════════════════════════════════

describe('applyShopBonuses 聚合函数', () => {
  it('空 shopPurchases 是 no-op', () => {
    const s = createNewGame(T0);
    const before = structuredClone(s);
    applyShopBonuses(s);
    // 只比较基线层（stardust/credits/facilities 等不变）
    expect(s.credits).toBe(before.credits);
    expect(s.stardust).toBe(before.stardust);
    expect(s.facilities.excavator.level).toBe(before.facilities.excavator.level);
  });

  it('level=0 的物品被跳过', () => {
    const s = createNewGame(T0);
    s.prestige.shopPurchases['shop-stardust-resonance'] = 0;
    applyShopBonuses(s);
    expect(s.stardust).toBe(0); // 未叠加
  });

  it('未知 itemId 静默跳过（前向兼容）', () => {
    const s = createNewGame(T0);
    s.prestige.shopPurchases['shop-removed-future'] = 5;
    // 不抛异常
    expect(() => applyShopBonuses(s)).not.toThrow();
    expect(s.credits).toBe(100); // 未被未知物品修改
  });

  it('迭代全部已购物品并叠加', () => {
    const s = createNewGame(T0);
    s.prestige.shopPurchases = {
      'shop-stardust-resonance': 2,
      'shop-starting-fund': 1,
    };
    applyShopBonuses(s);
    expect(s.stardust).toBe(100); // 50 * 2
    expect(s.credits).toBe(400); // 100 + 300
  });
});

// ═══════════════════════════════════════════════════════════════
// 派生乘子
// ═══════════════════════════════════════════════════════════════

describe('派生乘子', () => {
  it('shopOreProductionMultiplier：每级 +20%', () => {
    const s = stateWithStardust(100);
    expect(shopOreProductionMultiplier(s)).toBe(1.0); // 未购买
    s.prestige.shopPurchases['shop-ore-booster'] = 1;
    expect(shopOreProductionMultiplier(s)).toBe(1.2);
    s.prestige.shopPurchases['shop-ore-booster'] = 3;
    expect(shopOreProductionMultiplier(s)).toBe(1.6); // 1 + 0.2*3
  });

  it('shopFacilityRateMultiplier：每级 +10%', () => {
    const s = stateWithStardust(100);
    expect(shopFacilityRateMultiplier(s)).toBe(1.0);
    s.prestige.shopPurchases['shop-overdrive'] = 1;
    expect(shopFacilityRateMultiplier(s)).toBe(1.1);
    s.prestige.shopPurchases['shop-overdrive'] = 2;
    expect(shopFacilityRateMultiplier(s)).toBe(1.2);
  });

  it('shopIsotopeProductionMultiplier：每级 +25%', () => {
    const s = stateWithStardust(100);
    expect(shopIsotopeProductionMultiplier(s)).toBe(1.0);
    s.prestige.shopPurchases['shop-isotope-enrichment'] = 2;
    expect(shopIsotopeProductionMultiplier(s)).toBe(1.5); // 1 + 0.25*2
  });

  it('shopCreditsIncomeMultiplier：每级 +15%', () => {
    const s = stateWithStardust(100);
    expect(shopCreditsIncomeMultiplier(s)).toBe(1.0);
    s.prestige.shopPurchases['shop-credit-amplifier'] = 2;
    expect(shopCreditsIncomeMultiplier(s)).toBe(1.3); // 1 + 0.15*2
  });

  it('shopResearchCostMultiplier：每级 -10%（下限 0.1）', () => {
    const s = stateWithStardust(100);
    expect(shopResearchCostMultiplier(s)).toBe(1.0);
    s.prestige.shopPurchases['shop-research-grant'] = 1;
    expect(shopResearchCostMultiplier(s)).toBe(0.9);
    s.prestige.shopPurchases['shop-research-grant'] = 3;
    expect(shopResearchCostMultiplier(s)).toBe(0.7); // 1 - 0.1*3
  });

  it('shopPrestigeGainMultiplier：每级 +25%', () => {
    const s = stateWithStardust(100);
    expect(shopPrestigeGainMultiplier(s)).toBe(1.0);
    s.prestige.shopPurchases['shop-prestige-amplifier'] = 1;
    expect(shopPrestigeGainMultiplier(s)).toBe(1.25);
    s.prestige.shopPurchases['shop-prestige-amplifier'] = 2;
    expect(shopPrestigeGainMultiplier(s)).toBe(1.5);
  });

  it('effectiveMaxLevel：MAX_LEVEL + shop-level-cap 等级', () => {
    const s = stateWithStardust(100);
    expect(effectiveMaxLevel(s)).toBe(MAX_LEVEL); // 5
    s.prestige.shopPurchases['shop-level-cap'] = 1;
    expect(effectiveMaxLevel(s)).toBe(6);
    s.prestige.shopPurchases['shop-level-cap'] = 2;
    expect(effectiveMaxLevel(s)).toBe(7);
  });

  it('hasAdvancedResearchUnlock：shop-advanced-research >= 1 时 true', () => {
    const s = stateWithStardust(100);
    expect(hasAdvancedResearchUnlock(s)).toBe(false);
    s.prestige.shopPurchases['shop-advanced-research'] = 1;
    expect(hasAdvancedResearchUnlock(s)).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// 集成钩子 — production
// ═══════════════════════════════════════════════════════════════

describe('集成钩子 — production.rawRate', () => {
  it('shop-ore-booster 提升采掘器产量', () => {
    const s = stateWithStardust(100);
    s.facilities.excavator.unlocked = true;
    const baseRate = rawRate(s, 'excavator', undefined, T0);

    s.prestige.shopPurchases['shop-ore-booster'] = 1; // +20%
    const boostedRate = rawRate(s, 'excavator', undefined, T0);
    expect(boostedRate).toBeCloseTo(baseRate * 1.2, 5);
  });

  it('shop-overdrive 提升全部设施速率', () => {
    const s = stateWithStardust(100);
    s.facilities.excavator.unlocked = true;
    s.facilities.transport.unlocked = true;
    const baseExcavator = rawRate(s, 'excavator', undefined, T0);
    const baseTransport = rawRate(s, 'transport', undefined, T0);

    s.prestige.shopPurchases['shop-overdrive'] = 1; // +10%
    expect(rawRate(s, 'excavator', undefined, T0)).toBeCloseTo(baseExcavator * 1.1, 5);
    expect(rawRate(s, 'transport', undefined, T0)).toBeCloseTo(baseTransport * 1.1, 5);
  });

  it('shop-ore-booster 只作用于采掘类（transport 不受影响）', () => {
    const s = stateWithStardust(100);
    s.facilities.transport.unlocked = true;
    const baseTransport = rawRate(s, 'transport', undefined, T0);

    s.prestige.shopPurchases['shop-ore-booster'] = 3; // +60%
    expect(rawRate(s, 'transport', undefined, T0)).toBeCloseTo(baseTransport, 5); // 不变
  });

  it('shop-ore-booster + shop-overdrive 乘法叠加', () => {
    const s = stateWithStardust(100);
    s.facilities.excavator.unlocked = true;
    const baseRate = rawRate(s, 'excavator', undefined, T0);

    s.prestige.shopPurchases['shop-ore-booster'] = 1; // +20%
    s.prestige.shopPurchases['shop-overdrive'] = 1; // +10%
    const boosted = rawRate(s, 'excavator', undefined, T0);
    expect(boosted).toBeCloseTo(baseRate * 1.2 * 1.1, 5);
  });

  it('shop-isotope-enrichment 提升同位素产量', () => {
    const s = stateWithStardust(100);
    s.facilities.excavator.unlocked = true;
    s.research.push('rareIsotopeMining'); // 解锁同位素

    // 基线同位素产出
    const before1 = structuredClone(s);
    tickProduction(before1, 1000, { now: T0, unboundedCapacity: true });
    const baseIso = before1.isotope;

    // +25% 同位素
    s.prestige.shopPurchases['shop-isotope-enrichment'] = 1;
    const before2 = structuredClone(s);
    tickProduction(before2, 1000, { now: T0, unboundedCapacity: true });
    expect(before2.isotope).toBeCloseTo(baseIso * 1.25, 4);
  });
});

// ═══════════════════════════════════════════════════════════════
// 集成钩子 — economy
// ═══════════════════════════════════════════════════════════════

describe('集成钩子 — economy', () => {
  it('shop-credit-amplifier 提升出售收益', () => {
    const s1 = stateWithStardust(100);
    s1.stardust = 10;
    const gain1 = sellResource(s1, 'stardust', 10);

    const s2 = stateWithStardust(100);
    s2.stardust = 10;
    s2.prestige.shopPurchases['shop-credit-amplifier'] = 2; // +30%
    const gain2 = sellResource(s2, 'stardust', 10);
    expect(gain2).toBe(Math.floor(gain1 * 1.3));
  });

  it('effectiveMaxLevel 允许突破裸 MAX_LEVEL', () => {
    const s = stateWithStardust(1000);
    s.facilities.excavator.unlocked = true;
    s.facilities.excavator.level = MAX_LEVEL; // 5
    s.credits = 1_000_000; // 确保信用点足够
    s.crystal = 1_000_000; // level>=3 需晶体升级成本

    // 未购买 level-cap：不能升级
    expect(canUpgrade(s, 'excavator').ok).toBe(false);

    // 购买 level-cap 1 级：上限 6，可以升到 6
    s.prestige.shopPurchases['shop-level-cap'] = 1;
    expect(canUpgrade(s, 'excavator').ok).toBe(true);
    const r = upgradeFacility(s, 'excavator');
    expect(r.ok).toBe(true);
    expect(s.facilities.excavator.level).toBe(6);
  });

  it('level-cap 2 级允许升到 7', () => {
    const s = stateWithStardust(1000);
    s.facilities.excavator.unlocked = true;
    s.facilities.excavator.level = 6;
    s.prestige.shopPurchases['shop-level-cap'] = 2;
    s.credits = 1_000_000;
    s.crystal = 1_000_000;
    expect(canUpgrade(s, 'excavator').ok).toBe(true);
    upgradeFacility(s, 'excavator');
    expect(s.facilities.excavator.level).toBe(7);
    // 到 7 后不能再升
    expect(canUpgrade(s, 'excavator').ok).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════
// 集成钩子 — research
// ═══════════════════════════════════════════════════════════════

describe('集成钩子 — research', () => {
  it('shop-research-grant 降低研究成本', () => {
    const s = stateWithStardust(100);
    // basicResearch cost = 15
    expect(researchCost(s, 'basicResearch')).toBe(15); // 无折扣

    s.prestige.shopPurchases['shop-research-grant'] = 1; // -10%
    expect(researchCost(s, 'basicResearch')).toBe(13); // floor(15 * 0.9) = 13

    s.prestige.shopPurchases['shop-research-grant'] = 3; // -30%
    expect(researchCost(s, 'basicResearch')).toBe(10); // floor(15 * 0.7) = 10
  });

  it('canResearch + researchTech 使用折扣后成本', () => {
    const s = stateWithStardust(100);
    s.prestige.shopPurchases['shop-research-grant'] = 1; // -10% → cost 13
    s.crystal = 13; // 刚好够折扣后成本
    expect(canResearch(s, 'basicResearch').ok).toBe(true);
    const r = researchTech(s, 'basicResearch');
    expect(r.ok).toBe(true);
    expect(s.crystal).toBe(0); // 扣了 13
  });

  it('shop-advanced-research 解锁 T3 科技', () => {
    const s = stateWithStardust(100);
    // quantumMining 是 tier 3，需 autoMiningArray 前置
    s.research.push('basicResearch', 'drillHardening', 'autoMiningArray');
    s.crystal = 1000;

    // 未购买 advanced-research：tier 3 仍"后续版本开放"
    expect(canResearch(s, 'quantumMining').ok).toBe(false);
    expect(canResearch(s, 'quantumMining').reason).toContain('后续版本');

    // 购买后：tier 3 可研究
    s.prestige.shopPurchases['shop-advanced-research'] = 1;
    expect(canResearch(s, 'quantumMining').ok).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// 集成钩子 — prestige
// ═══════════════════════════════════════════════════════════════

describe('集成钩子 — prestige.computeStardustEarned', () => {
  it('shop-prestige-amplifier 提升转生收益', () => {
    const s = stateWithStardust(100);
    s.crystal = 100; // 1 点
    const baseEarned = computeStardustEarned(s);

    s.prestige.shopPurchases['shop-prestige-amplifier'] = 1; // +25%
    const boostedEarned = computeStardustEarned(s);
    expect(boostedEarned).toBe(Math.floor(baseEarned * 1.25));
  });

  it('computeStardustBreakdown.stardustEarned === computeStardustEarned（红线）', () => {
    const s = stateWithStardust(100);
    s.crystal = 300;
    s.isotope = 40;
    s.facilities.excavator.level = 3;
    s.research.push('basicResearch', 'drillHardening');
    s.prestige.shopPurchases['shop-prestige-amplifier'] = 2; // +50%

    const earned = computeStardustEarned(s);
    const breakdown = computeStardustBreakdown(s);
    expect(breakdown.stardustEarned).toBe(earned);
    expect(breakdown.shopGainMultiplier).toBe(1.5);
  });

  it('breakdown shopGainMultiplier=1.0 时与无乘子行为一致', () => {
    const s = stateWithStardust(100);
    s.crystal = 200;
    const earned = computeStardustEarned(s);
    const breakdown = computeStardustBreakdown(s);
    expect(breakdown.shopGainMultiplier).toBe(1.0);
    expect(breakdown.stardustEarned).toBe(earned);
    expect(breakdown.stardustEarned).toBe(Math.floor(breakdown.totalPoints));
  });
});

// ═══════════════════════════════════════════════════════════════
// 跨转生持久化
// ═══════════════════════════════════════════════════════════════

describe('跨转生持久化', () => {
  it('onBaseline 效果在转生后重新叠加', () => {
    // 第一世：购买了 shop-stardust-resonance 2 级
    const prestige: PrestigeLayer = {
      ...createEmptyPrestigeLayer(),
      stardust: 50, // 有星核余额
      shopPurchases: { 'shop-stardust-resonance': 2 },
    };
    // 转生后重建
    const rebuilt = buildPrestigeBaseline(T0, prestige);
    // shop-stardust-resonance 2 级 → +50*2 = 100 星尘矿
    expect(rebuilt.stardust).toBe(100);
  });

  it('多物品 onBaseline 跨转生全部叠加', () => {
    const prestige: PrestigeLayer = {
      ...createEmptyPrestigeLayer(),
      shopPurchases: {
        'shop-excavator-tuning': 2,
        'shop-he3-permit': 1,
        'shop-starting-fund': 3,
        'shop-stardust-resonance': 1,
      },
    };
    const rebuilt = buildPrestigeBaseline(T0, prestige);
    expect(rebuilt.facilities.excavator.level).toBe(3); // 1 + 2
    expect(rebuilt.facilities.he3Excavator.unlocked).toBe(true);
    expect(rebuilt.credits).toBe(1000); // 100 + 300*3
    expect(rebuilt.stardust).toBe(50); // 50 * 1
  });

  it('purchaseItem 购买后转生，shopPurchases 保留且 onBaseline 在新世界生效', async () => {
    const s = stateWithStardust(1000);
    s.crystal = 300; // 够转生
    const { repo } = makeRepo(s);

    // 购买 shop-stardust-resonance（需先买 credit-injection 2 级）
    await purchaseItem(repo, s, 'shop-credit-injection');
    await purchaseItem(repo, s, 'shop-credit-injection');
    await purchaseItem(repo, s, 'shop-stardust-resonance');
    expect(getItemLevel(s, 'shop-stardust-resonance')).toBe(1);

    // 转生
    const { executePrestigeReset } = await import('../prestige');
    const resetResult = await executePrestigeReset(repo, s, T0 + 1000);
    expect(resetResult.ok).toBe(true);

    // 转生后 shopPurchases 保留
    expect(getItemLevel(s, 'shop-stardust-resonance')).toBe(1);
    // onBaseline 已叠加：stardust = 50 * 1 = 50（裸基线 0 + 50）
    expect(s.stardust).toBe(50);
  });

  it('派生乘子跨转生持续生效（shopPurchases 保留）', async () => {
    const s = stateWithStardust(1000);
    s.crystal = 300;
    const { repo } = makeRepo(s);

    // 购买 shop-ore-booster（需先买 credit-injection 1 + excavator-tuning 1）
    await purchaseItem(repo, s, 'shop-credit-injection');
    await purchaseItem(repo, s, 'shop-excavator-tuning');
    await purchaseItem(repo, s, 'shop-ore-booster');
    expect(shopOreProductionMultiplier(s)).toBe(1.2);

    // 转生
    const { executePrestigeReset } = await import('../prestige');
    await executePrestigeReset(repo, s, T0 + 1000);

    // 转生后乘子仍生效
    expect(getItemLevel(s, 'shop-ore-booster')).toBe(1);
    expect(shopOreProductionMultiplier(s)).toBe(1.2);
  });
});
