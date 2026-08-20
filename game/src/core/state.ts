import { DEFAULT_CRYSTAL_KEEP, DEFAULT_STARDUST_KEEP, EVENT_FIRST_AFTER_MS, FACILITY_ORDER, SAVE_VERSION } from './config';
import type { GameState } from './types';
import { createEmptyConsumptionLog } from './consumptionLog';

export function createNewGame(now: number): GameState {
  const facilities = {} as GameState['facilities'];
  for (const id of FACILITY_ORDER) {
    facilities[id] = { level: 1, unlocked: id === 'excavator' };
  }
  return {
    version: SAVE_VERSION,
    credits: 100,
    stardust: 0,
    refineryBuffer: 0,
    crystal: 0,
    energy: 0,
    isotope: 0,
    antimatter: 0,
    darkmatter: 0,
    consumptionLog: createEmptyConsumptionLog(),
    facilities,
    energyStrategy: 'balanced',
    eventState: {
      pendingEvent: null,
      nextEventAt: now + EVENT_FIRST_AFTER_MS,
      droneBoostUntil: 0,
      solarStormUntil: 0,
      investUsed: false,
    },
    settings: {
      autoSellStardust: false,
      stardustKeepAmount: DEFAULT_STARDUST_KEEP,
      autoSellCrystal: false,
      crystalKeepAmount: DEFAULT_CRYSTAL_KEEP,
    },
    researchCenterUnlocked: false,
    research: [],
    stats: {
      totalStardustProduced: 0,
      totalCrystalProduced: 0,
      totalCreditsEarned: 0,
      totalEnergyProduced: 0,
      totalIsotopeProduced: 0,
      eventsTriggered: 0,
      droneEventsHandled: 0,
      solarStormsExperienced: 0,
      investmentsMade: 0,
      upgradesPerformed: 0,
      researchesCompleted: 0,
      lastOfflineCrystalGain: 0,
    },
    achievements: [],
    energyReleaseUntil: 0,
    energyReleaseCooldownUntil: 0,
    createdAt: now,
    lastSavedAt: now,
  };
}