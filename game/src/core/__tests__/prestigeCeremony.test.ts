import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { STARDUST_EARN_RATES, STARDUST_PER_FACILITY_LEVEL, STARDUST_PER_RESEARCH, computeStardustEarned } from '../prestige';
import {
  CEREMONY_STEPS,
  CEREMONY_STEP_LABELS,
  computeStardustBreakdown,
  buildBaselineReview,
  describePrestigeBonuses,
} from '../prestigeCeremony';
import {
  PRESTIGE_FX_DURATIONS,
  PRESTIGE_FX_TOTAL,
  prestigePhaseAt,
  isPrestigeAnimationActive,
} from '../../scene/prestigeTimeline';
import type { GameState } from '../types';

const T0 = 1_700_000_000_000;

/** 有进度的存档：多资源 + 设施等级 + 研究 */
function richState(): GameState {
  const s = createNewGame(T0);
  s.stardust = 5_000;
  s.crystal = 320;
  s.isotope = 60;
  s.antimatter = 15;
  s.darkmatter = 4;
  s.facilities.excavator.level = 4;
  s.facilities.transport.level = 3;
  s.facilities.refinery.level = 2;
  s.research = ['basicResearch', 'drillHardening'];
  s.achievements = ['p100Stardust', 'firstUpgrade'];
  return s;
}

// ════════════════════════════════════════════
// 星核结算拆解（验收②：三步引导数据与 preview 一致）
// ════════════════════════════════════════════

describe('computeStardustBreakdown — 公式拆解', () => {
  it('裸初始态得 0，各项全 0', () => {
    const b = computeStardustBreakdown(createNewGame(T0));
    expect(b.stardustEarned).toBe(0);
    expect(b.totalPoints).toBe(0);
    expect(b.facility.points).toBe(0);
    expect(b.research.points).toBe(0);
    for (const i of b.resourceItems) expect(i.points).toBe(0);
  });

  it('stardustEarned 与 computeStardustEarned 严格相等', () => {
    const s = richState();
    expect(computeStardustBreakdown(s).stardustEarned).toBe(computeStardustEarned(s));
  });

  it('各项之和 === totalPoints', () => {
    const s = richState();
    const b = computeStardustBreakdown(s);
    const sumResources = b.resourceItems.reduce((acc, i) => acc + i.points, 0);
    expect(sumResources + b.facility.points + b.research.points).toBeCloseTo(b.totalPoints, 10);
  });

  it('资源项按稀有度从低到高排序，rate 与常量一致', () => {
    const b = computeStardustBreakdown(richState());
    expect(b.resourceItems.map((i) => i.id)).toEqual([
      'stardust',
      'crystal',
      'isotope',
      'antimatter',
      'darkmatter',
    ]);
    expect(b.resourceItems[0].rate).toBe(STARDUST_EARN_RATES.stardust);
    expect(b.resourceItems[1].rate).toBe(STARDUST_EARN_RATES.crystal);
    expect(b.resourceItems[4].rate).toBe(STARDUST_EARN_RATES.darkmatter);
  });

  it('设施贡献 = Σ(level-1) × STARDUST_PER_FACILITY_LEVEL', () => {
    const s = richState();
    const expectedLevels = (4 - 1) + (3 - 1) + (2 - 1); // excavator+transport+refinery
    const b = computeStardustBreakdown(s);
    expect(b.facility.totalLevelsAboveOne).toBe(expectedLevels);
    expect(b.facility.rate).toBe(STARDUST_PER_FACILITY_LEVEL);
    expect(b.facility.points).toBe(expectedLevels * STARDUST_PER_FACILITY_LEVEL);
  });

  it('研究贡献 = research.length × STARDUST_PER_RESEARCH', () => {
    const s = richState();
    const b = computeStardustBreakdown(s);
    expect(b.research.count).toBe(2);
    expect(b.research.rate).toBe(STARDUST_PER_RESEARCH);
    expect(b.research.points).toBe(2 * STARDUST_PER_RESEARCH);
  });

  it('数值代入公式：5000/1000 + 320/100 + 60/20 + 15/5 + 4/2 + 6×2 + 2×5 = 5+3.2+3+3+2+12+10 = 38.2 → floor 38', () => {
    const b = computeStardustBreakdown(richState());
    expect(b.totalPoints).toBeCloseTo(38.2, 5);
    expect(b.stardustEarned).toBe(38);
  });
});

// ════════════════════════════════════════════
// 成就回顾摘要
// ════════════════════════════════════════════

describe('buildBaselineReview — 成就回顾', () => {
  it('正确统计已解锁设施数与等级', () => {
    const s = richState();
    s.facilities.he3Excavator.unlocked = true;
    const r = buildBaselineReview(s);
    expect(r.facilityCount).toBe(2); // excavator(默认) + he3Excavator
    expect(r.facilityLevels.excavator).toBe(4);
    expect(r.facilityLevels.transport).toBe(3);
    expect(r.researchCount).toBe(2);
    expect(r.achievementCount).toBe(2);
  });

  it('资源字段与 state 一致', () => {
    const s = richState();
    const r = buildBaselineReview(s);
    expect(r.credits).toBe(s.credits);
    expect(r.crystal).toBe(s.crystal);
    expect(r.antimatter).toBe(s.antimatter);
    expect(r.darkmatter).toBe(s.darkmatter);
  });

  it('createdAt 来自 state（用于计算游戏时长）', () => {
    const r = buildBaselineReview(richState());
    expect(r.createdAt).toBe(T0);
  });
});

// ════════════════════════════════════════════
// 永久加成展示
// ════════════════════════════════════════════

describe('describePrestigeBonuses — 永久加成映射', () => {
  it('已注册 id 映射成带 name/description 的条目', () => {
    const bonuses = describePrestigeBonuses(['prestige-start-credits']);
    expect(bonuses).toHaveLength(1);
    expect(bonuses[0].id).toBe('prestige-start-credits');
    expect(bonuses[0].name).toBeTruthy();
    expect(bonuses[0].description).toBeTruthy();
  });

  it('未注册的 id 被过滤掉（防恶意存档注入）', () => {
    const bonuses = describePrestigeBonuses(['prestige-start-credits', 'bogus-id', 'another-fake']);
    expect(bonuses).toHaveLength(1);
  });

  it('空列表返回空数组', () => {
    expect(describePrestigeBonuses([])).toEqual([]);
  });
});

// ════════════════════════════════════════════
// 仪式步骤常量
// ════════════════════════════════════════════

describe('CeremonyStep 常量', () => {
  it('三步顺序：review → settlement → confirm', () => {
    expect(CEREMONY_STEPS).toEqual(['review', 'settlement', 'confirm']);
  });

  it('每步都有展示名', () => {
    for (const step of CEREMONY_STEPS) {
      expect(CEREMONY_STEP_LABELS[step]).toBeTruthy();
    }
  });
});

// ════════════════════════════════════════════
// 转生动画时间线（验收①：3-5s 区间）
// ════════════════════════════════════════════

describe('prestigePhaseAt — 动画时间线', () => {
  it('总时长 4.2s，落在 3-5s 验收区间内', () => {
    expect(PRESTIGE_FX_TOTAL).toBe(4.2);
    expect(PRESTIGE_FX_TOTAL).toBeGreaterThanOrEqual(3);
    expect(PRESTIGE_FX_TOTAL).toBeLessThanOrEqual(5);
  });

  it('负值 → idle', () => {
    expect(prestigePhaseAt(-1).phase).toBe('idle');
  });

  it('0s → collapse 起始（progress 0）', () => {
    const s = prestigePhaseAt(0);
    expect(s.phase).toBe('collapse');
    expect(s.phaseProgress).toBeCloseTo(0, 5);
    expect(s.overall).toBeCloseTo(0, 5);
  });

  it('collapse 阶段中段 progress 0..1 递增', () => {
    const mid = prestigePhaseAt(PRESTIGE_FX_DURATIONS.collapse / 2);
    expect(mid.phase).toBe('collapse');
    expect(mid.phaseProgress).toBeCloseTo(0.5, 5);
    expect(mid.phaseProgress).toBeGreaterThan(0);
    expect(mid.phaseProgress).toBeLessThan(1);
  });

  it('1.6s 边界 → burst 起始', () => {
    expect(prestigePhaseAt(PRESTIGE_FX_DURATIONS.collapse).phase).toBe('burst');
    expect(prestigePhaseAt(PRESTIGE_FX_DURATIONS.collapse).phaseProgress).toBeCloseTo(0, 5);
  });

  it('2.4s 边界 → rebirth 起始', () => {
    const t = PRESTIGE_FX_DURATIONS.collapse + PRESTIGE_FX_DURATIONS.burst;
    expect(prestigePhaseAt(t).phase).toBe('rebirth');
    expect(prestigePhaseAt(t).phaseProgress).toBeCloseTo(0, 5);
  });

  it('≥4.2s → done', () => {
    expect(prestigePhaseAt(PRESTIGE_FX_TOTAL).phase).toBe('done');
    expect(prestigePhaseAt(PRESTIGE_FX_TOTAL + 1).phase).toBe('done');
    expect(prestigePhaseAt(PRESTIGE_FX_TOTAL).overall).toBe(1);
  });

  it('overall 全程单调递增', () => {
    let prev = -1;
    for (let i = 0; i <= 50; i += 1) {
      const o = prestigePhaseAt((i / 50) * PRESTIGE_FX_TOTAL).overall;
      expect(o).toBeGreaterThanOrEqual(prev);
      prev = o;
    }
  });
});

// ════════════════════════════════════════════
// F1：动画期间冻结交互契约（驱动 controls.enabled）
// ════════════════════════════════════════════
//
// GameScene 无法在 node 环境实例化（依赖 Three.js WebGLRenderer + DOM），
// 因此 controls.enabled 的赋值（DOM 接线）无法直接单测；这里测的是驱动它的
// 纯契约 isPrestigeAnimationActive——gameScene 的 frame 循环用 prestigeFX.isActive()
// 作实际门禁，与本函数表达同一时间窗（[0, TOTAL) 内冻结）。
// 映射关系：controls.enabled = !isPrestigeAnimationActive(elapsedSinceStart)。

describe('isPrestigeAnimationActive — 动画冻结交互契约（F1）', () => {
  it('未开始（elapsedSec < 0，idle）→ false → controls.enabled = true', () => {
    expect(isPrestigeAnimationActive(-1)).toBe(false);
    expect(isPrestigeAnimationActive(-0.01)).toBe(false);
  });

  it('动画起点 elapsedSec=0 → true → controls.enabled = false', () => {
    expect(isPrestigeAnimationActive(0)).toBe(true);
  });

  it('collapse 阶段（0 < t < 1.6）→ true → controls.enabled = false', () => {
    expect(isPrestigeAnimationActive(0.001)).toBe(true);
    expect(isPrestigeAnimationActive(PRESTIGE_FX_DURATIONS.collapse / 2)).toBe(true);
    expect(isPrestigeAnimationActive(PRESTIGE_FX_DURATIONS.collapse - 0.001)).toBe(true);
  });

  it('collapse→burst 边界（t=1.6）→ true（burst 仍在动画窗内）', () => {
    expect(isPrestigeAnimationActive(PRESTIGE_FX_DURATIONS.collapse)).toBe(true);
  });

  it('burst 阶段（1.6 ≤ t < 2.4）→ true → controls.enabled = false', () => {
    expect(isPrestigeAnimationActive(PRESTIGE_FX_DURATIONS.collapse + 0.4)).toBe(true);
    expect(isPrestigeAnimationActive(PRESTIGE_FX_DURATIONS.collapse + PRESTIGE_FX_DURATIONS.burst - 0.001)).toBe(true);
  });

  it('rebirth 阶段（2.4 ≤ t < 4.2）→ true → controls.enabled = false', () => {
    const rebirthStart = PRESTIGE_FX_DURATIONS.collapse + PRESTIGE_FX_DURATIONS.burst;
    expect(isPrestigeAnimationActive(rebirthStart)).toBe(true);
    expect(isPrestigeAnimationActive(rebirthStart + 0.9)).toBe(true);
    expect(isPrestigeAnimationActive(PRESTIGE_FX_TOTAL - 0.001)).toBe(true);
  });

  it('动画结束（elapsedSec ≥ TOTAL=4.2）→ false → controls.enabled = true', () => {
    expect(isPrestigeAnimationActive(PRESTIGE_FX_TOTAL)).toBe(false);
    expect(isPrestigeAnimationActive(PRESTIGE_FX_TOTAL + 0.01)).toBe(false);
    expect(isPrestigeAnimationActive(PRESTIGE_FX_TOTAL + 10)).toBe(false);
  });

  it('与 prestigePhaseAt 一致：active 当且仅当 phase ∈ {collapse,burst,rebirth}', () => {
    // 采样整个时间轴，断言两函数语义一致
    for (let i = 0; i <= 100; i += 1) {
      const t = (i / 100) * (PRESTIGE_FX_TOTAL + 1) - 0.5; // 覆盖 idle(-0.5) 到 done(4.7)
      const phase = prestigePhaseAt(t).phase;
      const active = isPrestigeAnimationActive(t);
      const inAnimationPhase = phase === 'collapse' || phase === 'burst' || phase === 'rebirth';
      expect(active).toBe(inAnimationPhase);
    }
  });

  it('动画窗内全程为 true（冻结不中断），窗外全程 false（无残留冻结）', () => {
    // 窗内：从 0 到 TOTAL-ε 每个采样点都 true
    let allActive = true;
    for (let i = 0; i < 200; i += 1) {
      const t = (i / 200) * (PRESTIGE_FX_TOTAL - 0.001);
      if (!isPrestigeAnimationActive(t)) allActive = false;
    }
    expect(allActive).toBe(true);

    // 窗外（结束后）：从 TOTAL 到 TOTAL+5 每个采样点都 false
    let allInactive = true;
    for (let i = 0; i <= 50; i += 1) {
      const t = PRESTIGE_FX_TOTAL + (i / 50) * 5;
      if (isPrestigeAnimationActive(t)) allInactive = false;
    }
    expect(allInactive).toBe(true);
  });

  it('controls.enabled 映射：动画期间 false，结束后恢复 true（契约断言）', () => {
    // 这条用例显式表达 orchestrator 要求的验收语义：
    // "动画期间 controls.enabled === false，动画结束后恢复 true"
    // controls.enabled = !isPrestigeAnimationActive(elapsedSinceStart)
    const controlsEnabledDuring = (elapsedSec: number): boolean => !isPrestigeAnimationActive(elapsedSec);

    // 动画期间（4 个采样点）→ enabled === false
    for (const t of [0, 0.8, 1.6, 2.0, 3.0, 4.19]) {
      expect(controlsEnabledDuring(t)).toBe(false);
    }
    // 动画结束后 → enabled === true
    for (const t of [PRESTIGE_FX_TOTAL, PRESTIGE_FX_TOTAL + 0.1, 100]) {
      expect(controlsEnabledDuring(t)).toBe(true);
    }
    // 未开始 → enabled === true
    expect(controlsEnabledDuring(-1)).toBe(true);
  });
});
