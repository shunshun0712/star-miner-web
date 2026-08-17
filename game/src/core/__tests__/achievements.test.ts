import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { unlockFacility, sellResource } from '../economy';
import { researchTech } from '../research';
import { tickProduction } from '../production';
import { checkAchievements, achievementPoints, achievementProductionMultiplier } from '../achievements';
import { ENERGY_RESERVE_CAP, TECH_NODES } from '../config';

const T0 = 1_700_000_000_000;

describe('成就系统', () => {
  it('新档无成就，全局倍率 1.0', () => {
    const s = createNewGame(T0);
    expect(achievementPoints(s)).toBe(0);
    expect(achievementProductionMultiplier(s)).toBe(1);
  });

  it('累计产出 100 星尘解锁「初出茅庐」并发放奖励', () => {
    const s = createNewGame(T0);
    s.stats.totalStardustProduced = 100;
    const newly = checkAchievements(s);
    expect(newly.some((a) => a.id === 'p100Stardust')).toBe(true);
    expect(s.achievements).toContain('p100Stardust');
    expect(s.credits).toBe(100 + 50);
    expect(s.crystal).toBe(1);
  });

  it('已解锁成就不会重复发放', () => {
    const s = createNewGame(T0);
    s.stats.totalStardustProduced = 1000;
    checkAchievements(s);
    const credits = s.credits;
    const crystal = s.crystal;
    checkAchievements(s);
    expect(s.credits).toBe(credits);
    expect(s.crystal).toBe(crystal);
  });

  it('每 10 点成就 +1% 全局产量', () => {
    const s = createNewGame(T0);
    for (const id of TECH_NODES.filter((n) => n.tier <= 2).map((n) => n.id).slice(0, 10)) {
      s.achievements.push(id);
    }
    expect(achievementPoints(s)).toBe(10);
    expect(achievementProductionMultiplier(s)).toBe(1.01);
  });

  it('能源储备 200 解锁「能量富余」', () => {
    const s = createNewGame(T0);
    s.energy = ENERGY_RESERVE_CAP;
    const newly = checkAchievements(s);
    expect(newly.some((a) => a.id === 'hEnergyFull')).toBe(true);
  });

  it('单次离线收益 ≥500 晶体解锁隐藏成就（经由生产统计触发）', () => {
    const s = createNewGame(T0);
    s.stats.lastOfflineCrystalGain = 500;
    const newly = checkAchievements(s);
    expect(newly.some((a) => a.id === 'hOffline')).toBe(true);
  });

  it('累计研究 5 个解锁「科技新星」（经由 researchTech 统计）', () => {
    const s = createNewGame(T0);
    s.crystal = 100000;
    const order = [
      'basicResearch',
      'drillHardening',
      'veinProspecting',
      'autoMiningArray',
      'rareIsotopeMining',
    ];
    for (const id of order) researchTech(s, id);
    const newly = checkAchievements(s);
    expect(newly.some((a) => a.id === 't5')).toBe(true);
    expect(s.achievements).toContain('t5');
  });

  it('事件计数驱动事件成就（via tick/spawn 统计）', () => {
    const s = createNewGame(T0);
    s.stats.eventsTriggered = 10;
    const newly = checkAchievements(s);
    expect(newly.some((a) => a.id === 'ev10')).toBe(true);
  });

  it('生产统计随产出累计（能量与同位素）', () => {
    const s = createNewGame(T0);
    s.credits = 10000;
    s.crystal = 1000;
    unlockFacility(s, 'energyStation');
    researchTech(s, 'basicResearch');
    researchTech(s, 'veinProspecting');
    researchTech(s, 'rareIsotopeMining');
    tickProduction(s, 1000, { now: T0 });
    expect(s.stats.totalEnergyProduced).toBeCloseTo(1.0, 5);
    expect(s.stats.totalIsotopeProduced).toBeCloseTo(1.2 * 1.1 * 0.05, 5);
  });

  it('出售收入计入累计收入统计', () => {
    const s = createNewGame(T0);
    s.stardust = 10;
    sellResource(s, 'stardust');
    expect(s.stats.totalCreditsEarned).toBe(10);
  });
});
