import { DEFAULT_CRYSTAL_KEEP, DEFAULT_STARDUST_KEEP, EVENT_FIRST_AFTER_MS, FACILITY_ORDER, SAVE_VERSION } from './config';
import type { BaselineState, GameState, LifetimeStats } from './types';
import { createEmptyConsumptionLog } from './consumptionLog';
import { createEmptyPrestigeLayer } from './prestigeLayer';

function defaultStats(): LifetimeStats {
  return {
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
  };
}

/**
 * T2-1: 构造"裸初始基线层"——除 prestige 外的全部 GameState 字段，资源归零、设施重置。
 *
 * 这是「初始基线字段的唯一来源」：createNewGame（新玩家）与 buildPrestigeBaseline
 * （转生重建）都从这里取裸基线，再各自叠加自己的层。
 *
 * 注意（红线）：转生重置**不直接调用 createNewGame**——createNewGame 拼装的是
 * "新玩家首存档"（裸初始态 + 空 prestige），而转生后初始态必须根据 prestige.unlocked
 * 叠加永久 buff（见 core/prestige.ts 的 buildPrestigeBaseline）。两个路径共享这层
 * 纯初始基线工厂，但各自的"初始态语义"互不污染。
 */
export function createInitialBaseline(now: number): BaselineState {
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
    stats: defaultStats(),
    achievements: [],
    energyReleaseUntil: 0,
    energyReleaseCooldownUntil: 0,
    createdAt: now,
    lastSavedAt: now,
  };
}

/** 新游戏（新玩家首存档）：裸初始基线 + 空转生层 */
export function createNewGame(now: number): GameState {
  return { ...createInitialBaseline(now), prestige: createEmptyPrestigeLayer() };
}
