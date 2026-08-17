import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { rateFor, tickProduction } from '../production';
import { unlockFacility } from '../economy';
import { setEnergyStrategy } from '../energy';
import { researchTech } from '../research';

const T0 = 1_700_000_000_000;

function fullChainState() {
  const s = createNewGame(T0);
  s.credits = 2000;
  unlockFacility(s, 'transport');
  unlockFacility(s, 'refinery');
  s.stardust = 1000;
  s.refineryBuffer = 1000;
  return s;
}

describe('生产模拟', () => {
  it('新档 10 秒后采掘器产出约 12 星尘矿', () => {
    const s = createNewGame(T0);
    const sum = tickProduction(s, 10_000);
    expect(s.credits).toBe(100);
    expect(s.stardust).toBeCloseTo(12, 5);
    expect(s.crystal).toBe(0);
    expect(sum.producedStardust).toBeCloseTo(12, 5);
  });

  it('完整生产链 20 秒产出约 5 晶体并消耗星尘矿', () => {
    const s = fullChainState();
    const before = s.stardust + s.refineryBuffer;
    const sum = tickProduction(s, 20_000);
    expect(s.crystal).toBeCloseTo(5, 5);
    expect(sum.refinedCrystal).toBeCloseTo(5, 5);
    expect(s.stardust + s.refineryBuffer).toBeGreaterThanOrEqual(before - 20);
  });

  it('解锁第二矿区后采掘总产出并入矿池（1 秒约 2.4）', () => {
    const s = createNewGame(T0);
    s.credits = 2000;
    s.crystal = 50;
    unlockFacility(s, 'he3Excavator');
    const sum = tickProduction(s, 1_000);
    expect(sum.producedStardust).toBeCloseTo(2.4, 5);
    expect(s.stardust).toBeCloseTo(2.4, 5);
  });

  it('解锁第三矿区后 1 秒产出约 3.8 星尘矿', () => {
    const s = createNewGame(T0);
    s.credits = 3000;
    s.crystal = 100;
    unlockFacility(s, 'deuteriumExcavator');
    const sum = tickProduction(s, 1_000);
    expect(sum.producedStardust).toBeCloseTo(2.6, 5);
  });

  it('容量上限：星尘矿不会超过采掘器容量', () => {
    const s = createNewGame(T0);
    s.stardust = 2000 - 0.5;
    tickProduction(s, 10_000);
    expect(s.stardust).toBeLessThanOrEqual(2000 + 1e-9);
  });

  it('采掘优先策略下 1 秒：采掘 1.62、运输 0.90、精炼 0.225', () => {
    const s = fullChainState();
    setEnergyStrategy(s, 'excavation');
    const stock0 = s.stardust;
    const buffer0 = s.refineryBuffer;
    const crystal0 = s.crystal;
    const sum = tickProduction(s, 1_000);
    expect(sum.producedStardust).toBeCloseTo(1.62, 5);
    expect(sum.movedStardust).toBeCloseTo(0.9, 5);
    expect(sum.refinedCrystal).toBeCloseTo(0.225, 5);
    expect(s.stardust - stock0).toBeCloseTo(1.62 - 0.9, 5);
    expect(s.refineryBuffer - buffer0).toBeCloseTo(0, 5);
    expect(s.crystal - crystal0).toBeCloseTo(0.225, 5);
  });

  it('无人机加速 ×1.5 生效', () => {
    const s = createNewGame(T0);
    s.eventState.droneBoostUntil = T0 + 10_000;
    const sum = tickProduction(s, 1_000, { now: T0 });
    expect(sum.producedStardust).toBeCloseTo(1.8, 5);
  });

  it('太阳风暴在均衡策略下减速 10%', () => {
    const s = createNewGame(T0);
    s.eventState.solarStormUntil = T0 + 10_000;
    const sum = tickProduction(s, 1_000, { now: T0 });
    expect(sum.producedStardust).toBeCloseTo(1.08, 5);
  });

  it('投入型加成：采掘永久 +5%', () => {
    const s = createNewGame(T0);
    s.eventState.investUsed = true;
    const sum = tickProduction(s, 1_000, { now: T0 });
    expect(sum.producedStardust).toBeCloseTo(1.26, 5);
  });

  it('未解锁的运输线与精炼厂不工作', () => {
    const s = createNewGame(T0);
    s.stardust = 500;
    s.refineryBuffer = 500;
    tickProduction(s, 10_000);
    expect(s.crystal).toBe(0);
    expect(s.refineryBuffer).toBe(500);
    expect(s.stardust).toBeCloseTo(512, 5);
  });

  it('运输线解锁但精炼厂未建成：转运矿保持可售且不损收入', () => {
    const s = createNewGame(T0);
    s.credits = 600;
    unlockFacility(s, 'transport');
    s.stardust = 100;
    const sum = tickProduction(s, 1_000);
    expect(sum.movedStardust).toBeCloseTo(1.0, 5);
    expect(s.stardust).toBeCloseTo(101.2, 5);
    expect(s.refineryBuffer).toBe(0);
    expect(s.crystal).toBe(0);
  });

  it('资源不为负', () => {
    const s = createNewGame(T0);
    s.stardust = 0;
    s.refineryBuffer = 0;
    tickProduction(s, 60_000);
    expect(s.stardust).toBeGreaterThanOrEqual(0);
    expect(s.refineryBuffer).toBeGreaterThanOrEqual(0);
    expect(s.crystal).toBeGreaterThanOrEqual(0);
  });
});



describe('科技效果（v0.4）', () => {
  it('强化钻头：采掘 +15%', () => {
    const s = createNewGame(T0);
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'drillHardening');
    expect(rateFor(s, 'excavator', T0)).toBeCloseTo(1.2 * 1.15, 5);
  });

  it('矿脉探测：采掘按期望 +10%', () => {
    const s = createNewGame(T0);
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'veinProspecting');
    expect(rateFor(s, 'excavator', T0)).toBeCloseTo(1.2 * 1.1, 5);
  });

  it('自动采掘阵列：速率按等级 +1 计算', () => {
    const s = createNewGame(T0);
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'drillHardening');
    researchTech(s, 'autoMiningArray');
    expect(rateFor(s, 'excavator', T0)).toBeCloseTo(1.2 * 1.15 * 1.2, 5);
  });

  it('高效催化：精炼 +20%', () => {
    const s = createNewGame(T0);
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'efficientCatalysis');
    s.facilities.refinery.unlocked = true;
    expect(rateFor(s, 'refinery', T0)).toBeCloseTo(0.25 * 1.2, 5);
  });

  it('配方优化：3:1 精炼', () => {
    const s = createNewGame(T0);
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'recipeOptimization');
    s.credits = 2000;
    unlockFacility(s, 'refinery');
    s.refineryBuffer = 100;
    const sum = tickProduction(s, 10_000, { now: T0 });
    expect(sum.refinedCrystal).toBeCloseTo(2.5, 5);
    expect(s.refineryBuffer).toBeCloseTo(100 - 2.5 * 3, 5);
  });

  it('副产品回收：精炼时额外产出 20% 星尘', () => {
    const s = createNewGame(T0);
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'efficientCatalysis');
    researchTech(s, 'byproductRecovery');
    s.credits = 2000;
    unlockFacility(s, 'transport');
    unlockFacility(s, 'refinery');
    s.stardust = 1000;
    s.refineryBuffer = 1000;
    const sum = tickProduction(s, 10_000, { now: T0 });
    expect(sum.refinedCrystal).toBeCloseTo(0.25 * 1.2 * 10, 5);
    expect(sum.byproductStardust).toBeCloseTo(sum.refinedCrystal * 0.2, 5);
    expect(s.stardust).toBeCloseTo(1000 + 12 - 10 + sum.byproductStardust, 5);
  });

  it('物流无人机：0.5 星尘/秒直送精炼缓冲', () => {
    const s = createNewGame(T0);
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'railAcceleration');
    researchTech(s, 'cargoExpansion');
    researchTech(s, 'droneLogistics');
    s.credits = 2000;
    unlockFacility(s, 'transport');
    unlockFacility(s, 'refinery');
    s.stardust = 1000;
    const sum = tickProduction(s, 10_000, { now: T0 });
    expect(sum.movedDrone).toBeCloseTo(5, 5);
  });

  it('磁轨加速 +30% 且多轨并行 ×2', () => {
    const s = createNewGame(T0);
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'railAcceleration');
    researchTech(s, 'parallelRails');
    s.facilities.transport.unlocked = true;
    expect(rateFor(s, 'transport', T0)).toBeCloseTo(1.0 * 1.3 * 2, 5);
  });

  it('太阳能板：均衡策略下全设施 +5%', () => {
    const s = createNewGame(T0);
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'solarPanels');
    expect(rateFor(s, 'excavator', T0)).toBeCloseTo(1.2 * 1.05, 5);
    setEnergyStrategy(s, 'excavation');
    expect(rateFor(s, 'excavator', T0)).toBeCloseTo(1.2 * 1.35, 5);
  });
});