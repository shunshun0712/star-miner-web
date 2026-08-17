import {
  ENERGY_BASE_CONSUMPTION,
  ENERGY_CONSUMPTION_MULTS,
  ENERGY_CONSUMERS,
  ENERGY_RELEASE_COOLDOWN_MS,
  ENERGY_RELEASE_COST,
  ENERGY_RELEASE_MS,
  ENERGY_STRATEGIES,
  ENERGY_STRATEGY_IDS,
  TURBINE_MULT,
} from './config';
import { hasResearch } from './research';
import type { EnergyStrategyId, FacilityId, GameState } from './types';

export interface ActionResult {
  ok: boolean;
  reason?: string;
}

export function strategyMultipliers(id: EnergyStrategyId): Record<FacilityId, number> {
  return ENERGY_STRATEGIES[id];
}

export function setEnergyStrategy(state: GameState, id: EnergyStrategyId): void {
  if (ENERGY_STRATEGY_IDS.includes(id)) state.energyStrategy = id;
}

export function energyConsumptionPerSecond(state: GameState): number {
  const turb = hasResearch(state, 'highEfficiencyTurbine') ? TURBINE_MULT : 1;
  const mults = ENERGY_CONSUMPTION_MULTS[state.energyStrategy];
  let total = 0;
  for (const id of ENERGY_CONSUMERS) {
    if (state.facilities[id].unlocked) total += ENERGY_BASE_CONSUMPTION * mults[id];
  }
  return total * turb;
}

export function releaseActive(state: GameState, now: number): boolean {
  return state.energyReleaseUntil > now;
}

export function canReleaseEnergy(state: GameState, now: number): ActionResult {
  if (!hasResearch(state, 'energyReserve')) return { ok: false, reason: '需先研究「能源储备」' };
  if (now < state.energyReleaseCooldownUntil) return { ok: false, reason: '储备释放冷却中' };
  if (state.energy < ENERGY_RELEASE_COST) return { ok: false, reason: `能量不足（需 ${ENERGY_RELEASE_COST}）` };
  return { ok: true };
}

export function releaseEnergy(state: GameState, now: number): ActionResult {
  const check = canReleaseEnergy(state, now);
  if (!check.ok) return check;
  state.energy -= ENERGY_RELEASE_COST;
  state.energyReleaseUntil = now + ENERGY_RELEASE_MS;
  state.energyReleaseCooldownUntil = now + ENERGY_RELEASE_COOLDOWN_MS;
  return { ok: true };
}