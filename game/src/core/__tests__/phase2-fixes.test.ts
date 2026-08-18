import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { unlockFacility } from '../economy';
import { researchTech } from '../research';
import { setEnergyStrategy } from '../energy';
import { tickProduction, rateFor, rawRate, getRates } from '../production';
import { upgradePreview } from '../hints';
import { achievementProductionMultiplier } from '../achievements';
import { parseSaveJson, serializeState } from '../save';
import { ACHIEVEMENTS, TECH_NODES } from '../config';

const T0 = 1_700_000_000_000;

describe('H5: rawRate 纯函数与升级预览一致性', () => {
  it('rawRate 与 rateFor 在当前等级下完全一致', () => {
    const s = createNewGame(T0);
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'drillHardening');
    researchTech(s, 'autoMiningArray');
    expect(rawRate(s, 'excavator', undefined, T0)).toBeCloseTo(rateFor(s, 'excavator', T0), 10);
  });

  it('rawRate 包含完整乘数链：自动采掘阵列 +1 级与钻头强化 +15%', () => {
    const s = createNewGame(T0);
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'drillHardening');
    researchTech(s, 'autoMiningArray');
    // 当前等级 1，autoMiningArray +1 → 实际按 2 级；drillHardening ×1.15
    // 1.2 * (1+0.2*1) * 1.15 = 1.656
    expect(rawRate(s, 'excavator', 1, T0)).toBeCloseTo(1.2 * 1.2 * 1.15, 5);
    // 下一级（levelOverride=2 → 实际 3 级）
    expect(rawRate(s, 'excavator', 2, T0)).toBeCloseTo(1.2 * 1.4 * 1.15, 5);
  });

  it('rawRate 包含成就产量加成（10 成就 → ×1.01）', () => {
    const s = createNewGame(T0);
    // 注入 10 个合法成就，触发成就产量加成
    s.achievements.push(...ACHIEVEMENTS.slice(0, 10).map((a) => a.id));
    expect(achievementProductionMultiplier(s)).toBeCloseTo(1.01, 5);
    expect(rateFor(s, 'excavator', T0)).toBeCloseTo(1.2 * 1.01, 5);
  });

  it('升级预览 currentRate 与 rateFor 一致（不再漏乘 m / AUTO_ARRAY_LEVELS）', () => {
    const s = createNewGame(T0);
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'drillHardening');
    researchTech(s, 'autoMiningArray');
    const p = upgradePreview(s, 'excavator', T0);
    expect(p).not.toBeNull();
    if (!p) return;
    expect(p.currentRate).toBeCloseTo(rateFor(s, 'excavator', T0), 10);
    expect(p.nextRate).toBeCloseTo(rawRate(s, 'excavator', 2, T0), 10);
    // deltaRate 应为 m 链作用后的每级增量，而非裸 baseSpeed*0.2
    expect(p.deltaRate).toBeCloseTo(1.2 * 1.15 * 0.2, 5);
  });
});

describe('M1: 同位素产量受能源不足惩罚', () => {
  function withAllFacilities() {
    const s = createNewGame(T0);
    s.credits = 20000;
    s.crystal = 2000;
    for (const id of ['he3Excavator', 'deuteriumExcavator', 'transport', 'refinery', 'energyStation'] as const) {
      unlockFacility(s, id);
    }
    return s;
  }

  it('能源不足时同位素产量按有效速率计算（受 deficitFactor 削减）', () => {
    const s = withAllFacilities();
    s.crystal = 5000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'veinProspecting');
    researchTech(s, 'rareIsotopeMining');
    setEnergyStrategy(s, 'refinement');
    const sum = tickProduction(s, 1000, { now: T0 });
    expect(sum.energyDeficit).toBe(true);
    const rawSum =
      sum.rates.excavator + sum.rates.he3Excavator + sum.rates.deuteriumExcavator;
    // 同位素产量 = eff(rawSum) * dt * 0.05，与产星尘同源（都乘 deficitFactor）
    expect(sum.isotopeProduced).toBeCloseTo(sum.producedStardust * 0.05, 5);
    // 关键：受惩罚后同位素产量严格小于未惩罚的原始速率估算
    expect(sum.isotopeProduced).toBeLessThan(rawSum * 0.05);
    expect(s.stats.totalIsotopeProduced).toBeCloseTo(sum.isotopeProduced, 5);
  });
});

describe('M4: 存档 research/achievements ID 白名单过滤', () => {
  it('过滤掉不在 TECH_NODES / ACHIEVEMENTS 白名单内的非法 ID', () => {
    const raw = JSON.parse(serializeState(createNewGame(T0))) as Record<string, unknown>;
    raw.research = ['basicResearch', 'FAKE_TECH_X', 'drillHardening'];
    raw.achievements = ['p100Stardust', 'FAKE_ACH_Y', 'p1000Stardust'];
    const r = parseSaveJson(JSON.stringify(raw));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.research).toEqual(['basicResearch', 'drillHardening']);
    expect(r.state.achievements).toEqual(['p100Stardust', 'p1000Stardust']);
  });

  it('非法 ID 不再计入 achievementPoints / 产量加成', () => {
    const raw = JSON.parse(serializeState(createNewGame(T0))) as Record<string, unknown>;
    // 5 个合法 + 5 个非法：过滤后仅 5 个，不触发 10 成就的产量加成
    raw.achievements = [
      ...ACHIEVEMENTS.slice(0, 5).map((a) => a.id),
      'FAKE1', 'FAKE2', 'FAKE3', 'FAKE4', 'FAKE5',
    ];
    const r = parseSaveJson(JSON.stringify(raw));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.achievements.length).toBe(5);
    expect(achievementProductionMultiplier(r.state)).toBeCloseTo(1, 5);
  });

  it('合法 ID 全量保留（白名单完整，无误删）', () => {
    const raw = JSON.parse(serializeState(createNewGame(T0))) as Record<string, unknown>;
    const validResearch = TECH_NODES.filter((n) => n.tier <= 2).map((n) => n.id);
    const validAchievements = ACHIEVEMENTS.map((a) => a.id);
    raw.research = validResearch;
    raw.achievements = validAchievements;
    const r = parseSaveJson(JSON.stringify(raw));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.research.length).toBe(validResearch.length);
    expect(r.state.achievements.length).toBe(validAchievements.length);
  });
});
