import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import {
  applyAutoSell,
  crystalPrice,
  unlockFacility,
  upgradeFacility,
  canUpgrade,
  canUnlock,
  crystalUpgradeCost,
  unlockCrystalCost,
} from '../economy';
import { researchTech } from '../research';
import { MAX_LEVEL } from '../config';

const T0 = 1_700_000_000_000;

describe('经济系统', () => {
  it('升级费用按 1.7^(等级-1) 增长', () => {
    const s = createNewGame(T0);
    expect(crystalUpgradeCost(s, 'excavator')).toBe(0);
    expect(upgradeFacility_costHelper(s, 'excavator')).toBe(50);
    s.facilities.excavator.level = 2;
    expect(upgradeFacility_costHelper(s, 'excavator')).toBe(85);
    s.facilities.excavator.level = 3;
    expect(upgradeFacility_costHelper(s, 'excavator')).toBe(145);
  });

  it('3 级以上升级需要晶体', () => {
    const s = createNewGame(T0);
    s.credits = 9999;
    s.facilities.excavator.level = 3;
    expect(crystalUpgradeCost(s, 'excavator')).toBe(4);
    const r = upgradeFacility(s, 'excavator');
    expect(r.ok).toBe(false);
    s.crystal = 4;
    const r2 = upgradeFacility(s, 'excavator');
    expect(r2.ok).toBe(true);
    expect(s.facilities.excavator.level).toBe(4);
    expect(s.crystal).toBe(0);
  });

  it('升级扣除信用点并提升等级（低级无需晶体）', () => {
    const s = createNewGame(T0);
    const r = upgradeFacility(s, 'excavator');
    expect(r.ok).toBe(true);
    expect(s.credits).toBe(50);
    expect(s.facilities.excavator.level).toBe(2);
  });

  it('信用点不足时无法升级', () => {
    const s = createNewGame(T0);
    s.credits = 10;
    const r = upgradeFacility(s, 'excavator');
    expect(r.ok).toBe(false);
    expect(s.facilities.excavator.level).toBe(1);
  });

  it('等级 5 封顶', () => {
    const s = createNewGame(T0);
    s.credits = 99999;
    s.facilities.excavator.level = MAX_LEVEL;
    const r = upgradeFacility(s, 'excavator');
    expect(r.ok).toBe(false);
    expect(s.facilities.excavator.level).toBe(MAX_LEVEL);
  });

  it('未解锁设施不能升级', () => {
    const s = createNewGame(T0);
    const r = upgradeFacility(s, 'transport');
    expect(r.ok).toBe(false);
  });

  it('解锁运输线花费 600 信用点，无需晶体', () => {
    const s = createNewGame(T0);
    s.credits = 600;
    const r = unlockFacility(s, 'transport');
    expect(r.ok).toBe(true);
    expect(s.facilities.transport.unlocked).toBe(true);
    expect(s.credits).toBe(0);
  });

  it('信用点不足时无法解锁', () => {
    const s = createNewGame(T0);
    s.credits = 100;
    const r = unlockFacility(s, 'transport');
    expect(r.ok).toBe(false);
    expect(s.facilities.transport.unlocked).toBe(false);
    expect(canUnlock(s, 'transport').ok).toBe(false);
  });

  it('已解锁设施再次解锁被拒绝', () => {
    const s = createNewGame(T0);
    s.credits = 600;
    unlockFacility(s, 'transport');
    s.credits = 600;
    const r = unlockFacility(s, 'transport');
    expect(r.ok).toBe(false);
    expect(s.credits).toBe(600);
  });

  it('解锁第二矿区需要 1250 信用点 + 20 晶体', () => {
    const s = createNewGame(T0);
    s.credits = 1250;
    const r = unlockFacility(s, 'he3Excavator');
    expect(r.ok).toBe(false);
    expect(unlockCrystalCost(s, 'he3Excavator')).toBe(20);
    s.crystal = 20;
    const r2 = unlockFacility(s, 'he3Excavator');
    expect(r2.ok).toBe(true);
    expect(s.facilities.he3Excavator.unlocked).toBe(true);
    expect(s.credits).toBe(0);
    expect(s.crystal).toBe(0);
  });

  it('解锁第三矿区需要 3000 信用点 + 100 晶体', () => {
    const s = createNewGame(T0);
    s.credits = 3000;
    const r = unlockFacility(s, 'deuteriumExcavator');
    expect(r.ok).toBe(false);
    expect(unlockCrystalCost(s, 'deuteriumExcavator')).toBe(100);
    s.crystal = 100;
    const r2 = unlockFacility(s, 'deuteriumExcavator');
    expect(r2.ok).toBe(true);
    expect(s.facilities.deuteriumExcavator.unlocked).toBe(true);
    expect(s.credits).toBe(0);
    expect(s.crystal).toBe(0);
  });

  it('出售星尘矿：1 信用点/个', () => {
    const s = createNewGame(T0);
    s.stardust = 10;
    const gained = sellHelper(s, 'stardust');
    expect(gained).toBe(10);
    expect(s.credits).toBe(110);
    expect(s.stardust).toBe(0);
  });

  it('出售晶体：8 信用点/个', () => {
    const s = createNewGame(T0);
    s.crystal = 5;
    const gained = sellHelper(s, 'crystal');
    expect(gained).toBe(40);
    expect(s.credits).toBe(140);
    expect(s.crystal).toBe(0);
  });

  it('出售指定数量星尘矿', () => {
    const s = createNewGame(T0);
    s.stardust = 25;
    const gained = sellResource(s, 'stardust', 10);
    expect(gained).toBe(10);
    expect(s.stardust).toBe(15);
    expect(s.credits).toBe(110);
  });

  it('出售指定数量晶体', () => {
    const s = createNewGame(T0);
    s.crystal = 20;
    const gained = sellResource(s, 'crystal', 5);
    expect(gained).toBe(40);
    expect(s.crystal).toBe(15);
    expect(s.credits).toBe(140);
  });

  it('出售数量超过持有量时按持有量出售', () => {
    const s = createNewGame(T0);
    s.stardust = 5;
    const gained = sellResource(s, 'stardust', 10);
    expect(gained).toBe(5);
    expect(s.stardust).toBe(0);
    expect(s.credits).toBe(105);
  });

  it('出售数量为 0 或负数时不产生收益', () => {
    const s = createNewGame(T0);
    s.stardust = 10;
    expect(sellResource(s, 'stardust', 0)).toBe(0);
    expect(sellResource(s, 'stardust', -5)).toBe(0);
    expect(s.stardust).toBe(10);
    expect(s.credits).toBe(100);
  });

  it('自动出售全部关闭时不卖矿', () => {
    const s = createNewGame(T0);
    s.stardust = 500;
    s.crystal = 500;
    s.settings.autoSellStardust = false;
    s.settings.autoSellCrystal = false;
    const r = applyAutoSell(s);
    expect(r.stardust).toBe(0);
    expect(r.crystal).toBe(0);
    expect(s.stardust).toBe(500);
    expect(s.crystal).toBe(500);
    expect(s.credits).toBe(100);
  });

  it('星尘矿自动出售开启：超出保留量自动卖出', () => {
    const s = createNewGame(T0);
    s.stardust = 60;
    s.settings.autoSellStardust = true;
    s.settings.stardustKeepAmount = 50;
    const r = applyAutoSell(s);
    expect(r.stardust).toBe(10);
    expect(r.crystal).toBe(0);
    expect(s.stardust).toBe(50);
    expect(s.credits).toBe(110);
  });

  it('晶体自动出售开启：超出保留量自动卖出', () => {
    const s = createNewGame(T0);
    s.crystal = 25;
    s.settings.autoSellCrystal = true;
    s.settings.crystalKeepAmount = 10;
    const r = applyAutoSell(s);
    expect(r.crystal).toBe(15 * 8);
    expect(r.stardust).toBe(0);
    expect(s.crystal).toBe(10);
    expect(s.credits).toBe(100 + 15 * 8);
  });

  it('星尘矿与晶体可同时自动出售', () => {
    const s = createNewGame(T0);
    s.stardust = 60;
    s.crystal = 30;
    s.settings.autoSellStardust = true;
    s.settings.stardustKeepAmount = 50;
    s.settings.autoSellCrystal = true;
    s.settings.crystalKeepAmount = 10;
    const r = applyAutoSell(s);
    expect(r.stardust).toBe(10);
    expect(r.crystal).toBe(20 * 8);
    expect(s.stardust).toBe(50);
    expect(s.crystal).toBe(10);
    expect(s.credits).toBe(100 + 10 + 20 * 8);
  });

  it('自动出售开启但未超保留量时不卖', () => {
    const s = createNewGame(T0);
    s.stardust = 50;
    s.crystal = 10;
    s.settings.autoSellStardust = true;
    s.settings.stardustKeepAmount = 50;
    s.settings.autoSellCrystal = true;
    s.settings.crystalKeepAmount = 10;
    const r = applyAutoSell(s);
    expect(r.stardust).toBe(0);
    expect(r.crystal).toBe(0);
    expect(s.stardust).toBe(50);
    expect(s.crystal).toBe(10);
  });

  it('自动出售保留量为 0 时全部卖出', () => {
    const s = createNewGame(T0);
    s.stardust = 25;
    s.crystal = 8;
    s.settings.autoSellStardust = true;
    s.settings.stardustKeepAmount = 0;
    s.settings.autoSellCrystal = true;
    s.settings.crystalKeepAmount = 0;
    const r = applyAutoSell(s);
    expect(r.stardust).toBe(25);
    expect(r.crystal).toBe(8 * 8);
    expect(s.stardust).toBe(0);
    expect(s.crystal).toBe(0);
    expect(s.credits).toBe(100 + 25 + 8 * 8);
  });
});

import { sellResource, upgradeCost } from '../economy';

function upgradeFacility_costHelper(s: ReturnType<typeof createNewGame>, id: 'excavator' | 'transport' | 'refinery' | 'he3Excavator'): number {
  return upgradeCost(s, id);
}

function sellHelper(s: ReturnType<typeof createNewGame>, res: 'stardust' | 'crystal'): number {
  return sellResource(s, res);
}







describe('v0.4 经济扩展', () => {
  it('晶体品质科技使售价 +25%（8 → 10）', () => {
    const s = createNewGame(T0);
    expect(crystalPrice(s)).toBe(8);
    s.crystal = 1000;
    researchTech(s, 'basicResearch');
    researchTech(s, 'recipeOptimization');
    researchTech(s, 'crystalQuality');
    expect(crystalPrice(s)).toBe(10);
    s.crystal = 4;
    const gained = sellResource(s, 'crystal', 2);
    expect(gained).toBe(20);
  });

  it('能源站解锁需要 1000 信用点 + 15 晶体', () => {
    const s = createNewGame(T0);
    s.credits = 1000;
    const r = unlockFacility(s, 'energyStation');
    expect(r.ok).toBe(false);
    expect(unlockCrystalCost(s, 'energyStation')).toBe(15);
    s.crystal = 15;
    const r2 = unlockFacility(s, 'energyStation');
    expect(r2.ok).toBe(true);
    expect(s.facilities.energyStation.unlocked).toBe(true);
  });

  it('升级计入累计升级统计', () => {
    const s = createNewGame(T0);
    upgradeFacility(s, 'excavator');
    expect(s.stats.upgradesPerformed).toBe(1);
  });
});