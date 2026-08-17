import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { unlockFacility } from '../economy';
import { researchTech } from '../research';
import { energyConsumptionPerSecond, canReleaseEnergy, releaseEnergy, setEnergyStrategy } from '../energy';
import { tickProduction, rateFor } from '../production';
import { ENERGY_BASE_CONSUMPTION, ENERGY_RELEASE_COST, ENERGY_RESERVE_CAP } from '../config';

const T0 = 1_700_000_000_000;

function withEnergyStation() {
  const s = createNewGame(T0);
  s.credits = 10000;
  s.crystal = 100;
  unlockFacility(s, 'energyStation');
  return s;
}

describe('能源系统', () => {
  it('均衡策略下每设施基础能耗 0.2/秒', () => {
    const s = createNewGame(T0);
    s.credits = 10000;
    unlockFacility(s, 'transport');
    unlockFacility(s, 'refinery');
    expect(energyConsumptionPerSecond(s)).toBeCloseTo(ENERGY_BASE_CONSUMPTION * 3, 5);
  });

  it('高效涡轮使能耗 -10%', () => {
    const s = createNewGame(T0);
    s.credits = 10000;
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'highEfficiencyTurbine');
    unlockFacility(s, 'transport');
    unlockFacility(s, 'refinery');
    expect(energyConsumptionPerSecond(s)).toBeCloseTo(ENERGY_BASE_CONSUMPTION * 3 * 0.9, 5);
  });

  it('能源站产出 1 能量/秒，均衡策略下自给自足不惩罚', () => {
    const s = withEnergyStation();
    const sum = tickProduction(s, 1000, { now: T0 });
    expect(sum.energyDeficit).toBe(false);
    expect(s.stats.totalEnergyProduced).toBeCloseTo(1.0, 5);
  });

  function withAllFacilities() {
    const s = createNewGame(T0);
    s.credits = 20000;
    s.crystal = 2000;
    for (const id of ['he3Excavator', 'deuteriumExcavator', 'transport', 'refinery', 'energyStation'] as const) {
      unlockFacility(s, id);
    }
    return s;
  }

  it('能源不足时全设施 -20%（精炼优先）', () => {
    const s = withAllFacilities();
    setEnergyStrategy(s, 'refinement');
    const sum = tickProduction(s, 1000, { now: T0 });
    expect(sum.energyDeficit).toBe(true);
    expect(sum.producedStardust).toBeCloseTo((1.2 + 1.2 + 1.4) * 0.9 * 0.8, 5);
  });

  it('能源储备池存储盈余（上限 200）', () => {
    const s = withEnergyStation();
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'highEfficiencyTurbine');
    researchTech(s, 'energyReserve');
    tickProduction(s, 10000, { now: T0 });
    // 产出 10，消耗 0.2*1*0.9*10=1.8 → 储备 8.2
    expect(s.energy).toBeCloseTo(8.2, 5);
    expect(s.energy).toBeLessThanOrEqual(ENERGY_RESERVE_CAP);
  });

  it('释放储备消耗 100 能量并进入 30 秒增益', () => {
    const s = withEnergyStation();
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'highEfficiencyTurbine');
    researchTech(s, 'energyReserve');
    s.energy = ENERGY_RELEASE_COST;
    const r = releaseEnergy(s, T0);
    expect(r.ok).toBe(true);
    expect(s.energy).toBe(0);
    expect(s.energyReleaseUntil).toBe(T0 + 30_000);
    const boosted = rateFor(s, 'excavator', T0 + 5000);
    const normal = rateFor(s, 'excavator', T0 + 40_000);
    expect(boosted).toBeCloseTo(normal * 1.2, 5);
  });

  it('冷却期间不能再次释放', () => {
    const s = withEnergyStation();
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'highEfficiencyTurbine');
    researchTech(s, 'energyReserve');
    s.energy = ENERGY_RELEASE_COST * 3;
    releaseEnergy(s, T0);
    const r = canReleaseEnergy(s, T0 + 10_000);
    expect(r.ok).toBe(false);
  });

  it('过载保护使惩罚降至 -10%（精炼优先）', () => {
    const s = withAllFacilities();
    s.crystal = 2000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'solarPanels');
    researchTech(s, 'overloadProtection');
    setEnergyStrategy(s, 'refinement');
    const sum = tickProduction(s, 1000, { now: T0 });
    expect(sum.producedStardust).toBeCloseTo((1.2 + 1.2 + 1.4) * 0.9 * 0.9, 5);
  });
});
