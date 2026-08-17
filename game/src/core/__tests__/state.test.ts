import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { EVENT_FIRST_AFTER_MS, MAX_LEVEL, SAVE_VERSION } from '../config';

const T0 = 1_700_000_000_000;

describe('初始状态', () => {
  it('新档初始 100 信用点，设施状态正确', () => {
    const s = createNewGame(T0);
    expect(s.version).toBe(SAVE_VERSION);
    expect(s.credits).toBe(100);
    expect(s.stardust).toBe(0);
    expect(s.crystal).toBe(0);
    expect(s.refineryBuffer).toBe(0);
    expect(s.facilities.excavator.unlocked).toBe(true);
    expect(s.facilities.excavator.level).toBe(1);
    expect(s.facilities.transport.unlocked).toBe(false);
    expect(s.facilities.refinery.unlocked).toBe(false);
    expect(s.facilities.he3Excavator.unlocked).toBe(false);
    expect(s.facilities.deuteriumExcavator.unlocked).toBe(false);
    expect(s.energyStrategy).toBe('balanced');
    expect(s.lastSavedAt).toBe(T0);
    expect(s.settings.autoSellStardust).toBe(false);
    expect(s.settings.stardustKeepAmount).toBe(50);
    expect(s.settings.autoSellCrystal).toBe(false);
    expect(s.settings.crystalKeepAmount).toBe(10);
    expect(s.facilities.energyStation.unlocked).toBe(false);
    expect(s.energy).toBe(0);
    expect(s.isotope).toBe(0);
    expect(s.researchCenterUnlocked).toBe(false);
    expect(s.research).toEqual([]);
    expect(s.achievements).toEqual([]);
    expect(s.stats.totalCrystalProduced).toBe(0);
    expect(s.stats.eventsTriggered).toBe(0);
  });

  it('事件状态默认值正确', () => {
    const s = createNewGame(T0);
    expect(s.eventState.pendingEvent).toBeNull();
    expect(s.eventState.nextEventAt).toBe(T0 + EVENT_FIRST_AFTER_MS);
    expect(s.eventState.droneBoostUntil).toBe(0);
    expect(s.eventState.solarStormUntil).toBe(0);
    expect(s.eventState.investUsed).toBe(false);
  });

  it('设施等级上限为 5', () => {
    expect(MAX_LEVEL).toBe(5);
  });
});


