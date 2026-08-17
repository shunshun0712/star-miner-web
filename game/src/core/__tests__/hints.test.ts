import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { unlockFacility } from '../economy';
import { facilityHint, upgradePreview } from '../hints';
import { MAX_LEVEL } from '../config';

const T0 = 1_700_000_000_000;

describe('设施提示', () => {
  it('新档精炼厂未解锁时无提示', () => {
    const s = createNewGame(T0);
    expect(facilityHint(s, 'refinery')).toBeNull();
  });

  it('精炼厂已解锁但运输线未解锁：提示等待原料', () => {
    const s = createNewGame(T0);
    s.credits = 2000;
    unlockFacility(s, 'refinery');
    const hint = facilityHint(s, 'refinery');
    expect(hint).not.toBeNull();
    if (hint) expect(hint).toContain('运输线');
  });

  it('运输线已解锁后精炼厂提示消失', () => {
    const s = createNewGame(T0);
    s.credits = 2000;
    unlockFacility(s, 'transport');
    unlockFacility(s, 'refinery');
    expect(facilityHint(s, 'refinery')).toBeNull();
  });


  it('采掘器不显示原料提示', () => {
    const s = createNewGame(T0);
    expect(facilityHint(s, 'excavator')).toBeNull();
  });

  it('能源站未解锁时无提示，未研究储备时提示研究方向', () => {
    const s = createNewGame(T0);
    expect(facilityHint(s, 'energyStation')).toBeNull();
    s.credits = 10000;
    s.crystal = 15;
    unlockFacility(s, 'energyStation');
    const hint = facilityHint(s, 'energyStation');
    expect(hint).not.toBeNull();
    if (hint) expect(hint).toContain('能源储备');
  });
});

describe('升级预览与回本', () => {
  it('采掘器 Lv.1 升级预览：+0.24 星尘矿/秒，约 209 秒回本', () => {
    const s = createNewGame(T0);
    const p = upgradePreview(s, 'excavator', T0);
    expect(p).not.toBeNull();
    if (!p) return;
    expect(p.currentRate).toBeCloseTo(1.2, 5);
    expect(p.nextRate).toBeCloseTo(1.44, 5);
    expect(p.deltaRate).toBeCloseTo(0.24, 5);
    expect(p.costCredits).toBe(50);
    expect(p.costCrystal).toBe(0);
    expect(p.valuePerUnit).toBe(1);
    expect(p.paybackSeconds).toBe(Math.ceil(50 / 0.24));
  });

  it('满级设施无升级预览', () => {
    const s = createNewGame(T0);
    s.facilities.excavator.level = MAX_LEVEL;
    expect(upgradePreview(s, 'excavator', T0)).toBeNull();
  });

  it('未解锁设施无升级预览', () => {
    const s = createNewGame(T0);
    expect(upgradePreview(s, 'transport', T0)).toBeNull();
  });

  it('精炼厂按净收益 4 信用点/晶体计算回本', () => {
    const s = createNewGame(T0);
    s.credits = 1000;
    unlockFacility(s, 'refinery');
    const p = upgradePreview(s, 'refinery', T0);
    expect(p).not.toBeNull();
    if (!p) return;
    expect(p.valuePerUnit).toBe(4);
    expect(p.deltaRate).toBeCloseTo(0.05, 5);
    expect(p.paybackSeconds).toBeGreaterThanOrEqual(1499);
    expect(p.paybackSeconds).toBeLessThanOrEqual(1501);
  });

  it('采掘优先策略下预览按策略倍率计算', () => {
    const s = createNewGame(T0);
    s.energyStrategy = 'excavation';
    const p = upgradePreview(s, 'excavator', T0);
    expect(p).not.toBeNull();
    if (!p) return;
    expect(p.currentRate).toBeCloseTo(1.2 * 1.35, 5);
    expect(p.deltaRate).toBeCloseTo(0.24 * 1.35, 5);
  });
});

