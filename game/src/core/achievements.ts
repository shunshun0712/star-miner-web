import {
  ACHIEVEMENT_BY_ID,
  ACHIEVEMENTS,
  ACHIEVEMENT_MULT_STEP,
  ACHIEVEMENT_POINTS_PER_MULT,
  ENERGY_RESERVE_CAP,
  FACILITY_ORDER,
  TECH_BRANCH_ORDER,
  TECH_NODES,
  type AchievementDef,
} from './config';
import { hasResearch, branchTierDone } from './research';
import type { GameState } from './types';

export function achievementPoints(state: GameState): number {
  return state.achievements.length;
}

export function achievementProductionMultiplier(state: GameState): number {
  return 1 + Math.floor(achievementPoints(state) / ACHIEVEMENT_POINTS_PER_MULT) * ACHIEVEMENT_MULT_STEP;
}

export function isAchievementUnlocked(state: GameState, id: string): boolean {
  return state.achievements.includes(id);
}

function check(state: GameState, id: string): boolean {
  const s = state.stats;
  switch (id) {
    case 'p100Stardust':
      return s.totalStardustProduced >= 100;
    case 'p1000Stardust':
      return s.totalStardustProduced >= 1000;
    case 'p100Crystal':
      return s.totalCrystalProduced >= 100;
    case 'p500Crystal':
      return s.totalCrystalProduced >= 500;
    case 'p1000Crystal':
      return s.totalCrystalProduced >= 1000;
    case 'c1000Credits':
      return s.totalCreditsEarned >= 1000;
    case 'c10000Credits':
      return s.totalCreditsEarned >= 10000;
    case 'e1000Energy':
      return s.totalEnergyProduced >= 1000;
    case 'allFacilities':
      return FACILITY_ORDER.every((fid) => state.facilities[fid].unlocked);
    case 'allLevel3': {
      const unlocked = FACILITY_ORDER.filter((fid) => state.facilities[fid].unlocked);
      return unlocked.length > 0 && unlocked.every((fid) => state.facilities[fid].level >= 3);
    }
    case 'anyLevel5':
      return FACILITY_ORDER.some((fid) => state.facilities[fid].level >= 5);
    case 'researchCenter':
      return state.researchCenterUnlocked;
    case 'allMines':
      return state.facilities.he3Excavator.unlocked && state.facilities.deuteriumExcavator.unlocked;
    case 'tBasic':
      return hasResearch(state, 'basicResearch');
    case 'tBranchT1':
      return TECH_BRANCH_ORDER.some((branch) => branchTierDone(state, branch, 1, 1));
    case 't5':
      return s.researchesCompleted >= 5;
    case 't10':
      return s.researchesCompleted >= 10;
    case 'tExcavation':
      return branchTierDone(state, 'excavation', 1, 2);
    case 'tRefinement':
      return branchTierDone(state, 'refinement', 1, 2);
    case 'ev10':
      return s.eventsTriggered >= 10;
    case 'evDrone20':
      return s.droneEventsHandled >= 20;
    case 'evStorm3':
      return s.solarStormsExperienced >= 3;
    case 'evInvest1':
      return s.investmentsMade >= 1;
    case 'ev30':
      return s.eventsTriggered >= 30;
    case 'xIsotope10':
      return s.totalIsotopeProduced >= 10;
    case 'xHe3L3':
      return state.facilities.he3Excavator.level >= 3;
    case 'xDeutL3':
      return state.facilities.deuteriumExcavator.level >= 3;
    case 'hOffline':
      return s.lastOfflineCrystalGain >= 500;
    case 'hEnergyFull':
      return state.energy >= ENERGY_RESERVE_CAP;
    case 'hCombo':
      return s.researchesCompleted >= 6 && state.energy >= 100;
    default:
      return false;
  }
}

export function checkAchievements(state: GameState): AchievementDef[] {
  const newly: AchievementDef[] = [];
  for (const def of ACHIEVEMENTS) {
    if (state.achievements.includes(def.id)) continue;
    if (check(state, def.id)) {
      state.achievements.push(def.id);
      state.credits += def.rewardCredits;
      state.crystal += def.rewardCrystals;
      newly.push(def);
    }
  }
  return newly;
}

export function achievementById(id: string): AchievementDef | undefined {
  return ACHIEVEMENT_BY_ID[id];
}