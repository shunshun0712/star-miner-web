import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { canResearch, researchTech, hasResearch, branchTierDone } from '../research';
import { TECH_NODES } from '../config';

const T0 = 1_700_000_000_000;

describe('科技树', () => {
  it('新档无任何研究，基础研究可研究（15 晶体）', () => {
    const s = createNewGame(T0);
    s.crystal = 15;
    expect(hasResearch(s, 'basicResearch')).toBe(false);
    expect(canResearch(s, 'basicResearch').ok).toBe(true);
    const r = researchTech(s, 'basicResearch');
    expect(r.ok).toBe(true);
    expect(s.crystal).toBe(0);
    expect(s.research).toContain('basicResearch');
    expect(s.stats.researchesCompleted).toBe(1);
  });

  it('晶体不足时无法研究', () => {
    const s = createNewGame(T0);
    s.crystal = 10;
    const r = researchTech(s, 'basicResearch');
    expect(r.ok).toBe(false);
    expect(s.research).toEqual([]);
  });

  it('前置未研究时无法研究 T1 科技', () => {
    const s = createNewGame(T0);
    s.crystal = 1000;
    const r = researchTech(s, 'drillHardening');
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toContain('需先研究');
  });

  it('重复研究被拒绝', () => {
    const s = createNewGame(T0);
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    const r = researchTech(s, 'basicResearch');
    expect(r.ok).toBe(false);
  });

  it('T3/T4 科技标记为后续开放，不可研究', () => {
    const s = createNewGame(T0);
    s.crystal = 100000;
    const future = TECH_NODES.filter((n) => n.tier > 2);
    for (const n of future) {
      const r = canResearch(s, n.id);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.reason).toContain('后续');
    }
  });

  it('按前置链研究强化钻头成功', () => {
    const s = createNewGame(T0);
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    const r = researchTech(s, 'drillHardening');
    expect(r.ok).toBe(true);
    expect(s.crystal).toBe(1000 - 15 - 20);
  });

  it('分支 T1–T2 完成判定', () => {
    const s = createNewGame(T0);
    s.crystal = 100000;
    expect(branchTierDone(s, 'refinement', 1, 2)).toBe(false);
    for (const id of ['basicResearch', 'efficientCatalysis', 'recipeOptimization', 'byproductRecovery', 'crystalQuality']) {
      const r = researchTech(s, id);
      expect(r.ok).toBe(true);
    }
    expect(branchTierDone(s, 'refinement', 1, 2)).toBe(true);
  });
});
