import {
  CRYSTAL_PRICE,
  CRYSTAL_QUALITY_MULT,
  CRYSTAL_UPGRADE_THRESHOLD,
  ENERGY_STATION_UNLOCK_CRYSTALS,
  FACILITIES,
  MAX_LEVEL,
  SECOND_MINE_UNLOCK_CRYSTALS,
  STARDUST_PRICE,
  THIRD_MINE_UNLOCK_CRYSTALS,
  UPGRADE_COST_GROWTH,
} from './config';
import { hasResearch } from './research';
import type { FacilityId, GameState, ResourceId } from './types';

export function crystalPrice(state: GameState): number {
  const base = CRYSTAL_PRICE;
  return hasResearch(state, 'crystalQuality') ? base * CRYSTAL_QUALITY_MULT : base;
}

export interface ActionResult {
  ok: boolean;
  reason?: string;
}

export function upgradeCost(state: GameState, id: FacilityId): number {
  const cfg = FACILITIES[id];
  return Math.round(cfg.baseUpgradeCost * Math.pow(UPGRADE_COST_GROWTH, state.facilities[id].level - 1) + 1e-9);
}

export function crystalUpgradeCost(state: GameState, id: FacilityId): number {
  const f = state.facilities[id];
  if (f.level < CRYSTAL_UPGRADE_THRESHOLD) return 0;
  const cfg = FACILITIES[id];
  return Math.round(
    cfg.baseCrystalUpgradeCost * Math.pow(UPGRADE_COST_GROWTH, f.level - CRYSTAL_UPGRADE_THRESHOLD) + 1e-9,
  );
}

export function canUpgrade(state: GameState, id: FacilityId): ActionResult {
  const f = state.facilities[id];
  if (!f.unlocked) return { ok: false, reason: '设施未解锁' };
  if (f.level >= MAX_LEVEL) return { ok: false, reason: '已达最高等级' };
  const cost = upgradeCost(state, id);
  if (state.credits < cost) return { ok: false, reason: `信用点不足（需 ${cost}）` };
  const crystal = crystalUpgradeCost(state, id);
  if (state.crystal < crystal) return { ok: false, reason: `晶体不足（需 ${crystal}）` };
  return { ok: true };
}

export function upgradeFacility(state: GameState, id: FacilityId): ActionResult {
  const check = canUpgrade(state, id);
  if (!check.ok) return check;
  const cost = upgradeCost(state, id);
  const crystal = crystalUpgradeCost(state, id);
  state.credits -= cost;
  state.crystal -= crystal;
  state.facilities[id].level += 1;
  state.stats.upgradesPerformed += 1;
  return { ok: true };
}

export function unlockCost(state: GameState, id: FacilityId): number {
  return FACILITIES[id].unlockCost;
}

export function unlockCrystalCost(state: GameState, id: FacilityId): number {
  if (id === 'he3Excavator') return SECOND_MINE_UNLOCK_CRYSTALS;
  if (id === 'deuteriumExcavator') return THIRD_MINE_UNLOCK_CRYSTALS;
  if (id === 'energyStation') return ENERGY_STATION_UNLOCK_CRYSTALS;
  return 0;
}

export function canUnlock(state: GameState, id: FacilityId): ActionResult {
  const f = state.facilities[id];
  if (f.unlocked) return { ok: false, reason: '设施已解锁' };
  const cost = unlockCost(state, id);
  if (state.credits < cost) return { ok: false, reason: `信用点不足（需 ${cost}）` };
  const crystal = unlockCrystalCost(state, id);
  if (state.crystal < crystal) return { ok: false, reason: `晶体不足（需 ${crystal}）` };
  return { ok: true };
}

export function unlockFacility(state: GameState, id: FacilityId): ActionResult {
  const check = canUnlock(state, id);
  if (!check.ok) return check;
  state.credits -= unlockCost(state, id);
  state.crystal -= unlockCrystalCost(state, id);
  state.facilities[id].unlocked = true;
  return { ok: true };
}

export function sellResource(state: GameState, resource: ResourceId, amount?: number): number {
  if (resource === 'stardust') {
    const held = state.stardust;
    if (held <= 0) return 0;
    const qty = amount === undefined ? held : Math.max(0, Math.min(Math.floor(amount), held));
    if (qty <= 0) return 0;
    const gained = qty * STARDUST_PRICE;
    state.credits += gained;
    state.stardust -= qty;
    state.stats.totalCreditsEarned += gained;
    return gained;
  }
  if (resource === 'crystal') {
    const held = state.crystal;
    if (held <= 0) return 0;
    const qty = amount === undefined ? held : Math.max(0, Math.min(Math.floor(amount), held));
    if (qty <= 0) return 0;
    const gained = qty * crystalPrice(state);
    state.credits += gained;
    state.crystal -= qty;
    state.stats.totalCreditsEarned += gained;
    return gained;
  }
  return 0;
}

export interface AutoSellResult {
  stardust: number;
  crystal: number;
}

export function applyAutoSell(state: GameState): AutoSellResult {
  const result: AutoSellResult = { stardust: 0, crystal: 0 };
  if (state.settings.autoSellStardust) {
    const over = Math.floor(state.stardust - state.settings.stardustKeepAmount);
    if (over > 0) result.stardust += sellResource(state, 'stardust', over);
  }
  if (state.settings.autoSellCrystal) {
    const over = Math.floor(state.crystal - state.settings.crystalKeepAmount);
    if (over > 0) result.crystal += sellResource(state, 'crystal', over);
  }
  return result;
}

