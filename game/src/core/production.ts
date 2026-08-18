import {
  AUTO_ARRAY_LEVELS,
  BYPRODUCT_MULT,
  CAPACITY_GROWTH_PER_LEVEL,
  CATALYSIS_MULT,
  CRYSTAL_RECIPE_STARDUST,
  DRILL_MULT,
  DRONE_CHANNEL_RATE,
  ENERGY_DEFICIT_MULT,
  ENERGY_DEFICIT_PROTECTED_MULT,
  ENERGY_RELEASE_MULT,
  ENERGY_RESERVE_CAP,
  ENERGY_STRATEGIES,
  FACILITIES,
  ISOTOPE_CHANCE,
  PARALLEL_RAILS_MULT,
  RAIL_MULT,
  RECIPE_3,
  SOLAR_BALANCED_MULT,
  SPEED_GROWTH_PER_LEVEL,
  VEIN_MULT,
} from './config';
import { achievementProductionMultiplier } from './achievements';
import { energyConsumptionPerSecond, releaseActive } from './energy';
import { activeModifier } from './events';
import { hasResearch } from './research';
import type { FacilityId, GameState, ProductionRates, ProductionSummary } from './types';

const MINING_IDS: FacilityId[] = ['excavator', 'he3Excavator', 'deuteriumExcavator'];

function isMining(id: FacilityId): boolean {
  return MINING_IDS.includes(id);
}

export function effectiveRecipe(state: GameState): number {
  return hasResearch(state, 'recipeOptimization') ? RECIPE_3 : CRYSTAL_RECIPE_STARDUST;
}

/**
 * 纯函数：给定等级（可覆盖）计算设施原始速率，包含完整乘数链：
 * 能源策略倍率、自动采掘阵列等级加成、钻头/矿脉/催化/磁轨/太阳能等研究乘数、
 * 能量释放增益、成就产量加成以及临时事件修饰（activeModifier）。
 *
 * `levelOverride` 用于升级预览计算「下一级」速率；省略时取设施当前等级。
 * rateFor 与 upgradePreview 两边共用此函数，避免回本时间估算遗漏乘数（H5）。
 */
export function rawRate(
  state: GameState,
  id: FacilityId,
  levelOverride?: number,
  now: number = Date.now(),
): number {
  const f = state.facilities[id];
  if (!f.unlocked) return 0;
  const cfg = FACILITIES[id];
  const mult = ENERGY_STRATEGIES[state.energyStrategy][id];
  let level = levelOverride ?? f.level;
  if (isMining(id) && hasResearch(state, 'autoMiningArray')) level += AUTO_ARRAY_LEVELS;
  let m = 1;
  if (isMining(id)) {
    if (hasResearch(state, 'drillHardening')) m *= DRILL_MULT;
    if (hasResearch(state, 'veinProspecting')) m *= VEIN_MULT;
  }
  if (id === 'refinery' && hasResearch(state, 'efficientCatalysis')) m *= CATALYSIS_MULT;
  if (id === 'transport') {
    if (hasResearch(state, 'railAcceleration')) m *= RAIL_MULT;
    if (hasResearch(state, 'parallelRails')) m *= PARALLEL_RAILS_MULT;
  }
  if (hasResearch(state, 'solarPanels') && state.energyStrategy === 'balanced') m *= SOLAR_BALANCED_MULT;
  if (releaseActive(state, now)) m *= ENERGY_RELEASE_MULT;
  m *= achievementProductionMultiplier(state);
  return cfg.baseSpeed * mult * (1 + SPEED_GROWTH_PER_LEVEL * (level - 1)) * activeModifier(state, id, now) * m;
}

export function rateFor(state: GameState, id: FacilityId, now = Date.now()): number {
  return rawRate(state, id, undefined, now);
}

export function capacityFor(state: GameState, id: FacilityId): number {
  const f = state.facilities[id];
  if (!f.unlocked) return 0;
  const cfg = FACILITIES[id];
  return cfg.baseCapacity * (1 + CAPACITY_GROWTH_PER_LEVEL * (f.level - 1));
}

export function getRates(state: GameState, now = Date.now()): ProductionRates {
  return {
    excavator: rateFor(state, 'excavator', now),
    he3Excavator: rateFor(state, 'he3Excavator', now),
    deuteriumExcavator: rateFor(state, 'deuteriumExcavator', now),
    transport: rateFor(state, 'transport', now),
    refinery: rateFor(state, 'refinery', now),
    energyStation: rateFor(state, 'energyStation', now),
  };
}

export interface TickOptions {
  unboundedCapacity?: boolean;
  now?: number;
}

export function computeBottlenecks(state: GameState, rates: ProductionRates): FacilityId[] {
  const bottlenecks: FacilityId[] = [];
  if (!state.facilities.excavator.unlocked) return bottlenecks;
  const upstream = rates.excavator + rates.he3Excavator + rates.deuteriumExcavator;
  if (upstream > rates.transport) {
    // 上游采掘总量超过运输运力时，标记速率最低的矿区为瓶颈（H4）：
    // 纳入氘采掘器三选一取最小，语义直观——最慢的矿区拖低了整体上游供给。
    const mining: [FacilityId, number][] = [];
    if (state.facilities.excavator.unlocked) mining.push(['excavator', rates.excavator]);
    if (state.facilities.he3Excavator.unlocked) mining.push(['he3Excavator', rates.he3Excavator]);
    if (state.facilities.deuteriumExcavator.unlocked) mining.push(['deuteriumExcavator', rates.deuteriumExcavator]);
    if (mining.length > 0) {
      let slowest: FacilityId = mining[0][0];
      let slowestRate = mining[0][1];
      for (let i = 1; i < mining.length; i += 1) {
        if (mining[i][1] < slowestRate) {
          slowestRate = mining[i][1];
          slowest = mining[i][0];
        }
      }
      bottlenecks.push(slowest);
    }
  }
  const refineryStardustNeed = rates.refinery * effectiveRecipe(state);
  if (rates.transport > refineryStardustNeed) bottlenecks.push('transport');
  return bottlenecks;
}

function resolveEnergyBalance(
  state: GameState,
  producedPerSec: number,
  dt: number,
): { deficitFactor: number } {
  if (!state.facilities.energyStation.unlocked) return { deficitFactor: 1 };
  const reserveEnabled = hasResearch(state, 'energyReserve');
  const net = producedPerSec * dt - energyConsumptionPerSecond(state) * dt;
  let shortfall = 0;
  if (reserveEnabled) {
    const before = state.energy;
    state.energy = Math.max(0, Math.min(ENERGY_RESERVE_CAP, before + net));
    if (net < 0) shortfall = Math.max(0, -net - before);
  } else if (net < 0) {
    shortfall = -net;
  }
  const deficitFactor =
    shortfall > 1e-9
      ? hasResearch(state, 'overloadProtection')
        ? ENERGY_DEFICIT_PROTECTED_MULT
        : ENERGY_DEFICIT_MULT
      : 1;
  return { deficitFactor };
}

export function tickProduction(
  state: GameState,
  deltaMs: number,
  opts: TickOptions = {},
): ProductionSummary {
  const dt = deltaMs / 1000;
  const now = opts.now ?? Date.now();
  const rates = getRates(state, now);
  const unbounded = opts.unboundedCapacity === true;

  const energyProduced = rates.energyStation * dt;
  if (rates.energyStation > 0) state.stats.totalEnergyProduced += energyProduced;
  const { deficitFactor } = resolveEnergyBalance(state, rates.energyStation, dt);
  const eff = (r: number): number => r * deficitFactor;

  const stardustCap =
    capacityFor(state, 'excavator') +
    capacityFor(state, 'he3Excavator') +
    capacityFor(state, 'deuteriumExcavator');
  const bufferCap = capacityFor(state, 'transport');
  const crystalCap = capacityFor(state, 'refinery');

  const stockRoom = unbounded ? Infinity : Math.max(0, stardustCap - state.stardust);
  const produced = Math.min(eff(rates.excavator + rates.he3Excavator + rates.deuteriumExcavator) * dt, stockRoom);
  state.stardust = Math.max(0, state.stardust + produced);
  state.stats.totalStardustProduced += produced;

  let isotopeProduced = 0;
  if (hasResearch(state, 'rareIsotopeMining')) {
    // 同位素产量同样受能源不足惩罚（M1）：按有效上游采掘速率计算，而非原始速率。
    isotopeProduced = eff(rates.excavator + rates.he3Excavator + rates.deuteriumExcavator) * dt * ISOTOPE_CHANCE;
    state.isotope = Math.max(0, state.isotope + isotopeProduced);
    state.stats.totalIsotopeProduced += isotopeProduced;
  }

  // 运输线解锁即转运；精炼厂未建成时转运矿保持可售，建成后送入精炼缓冲
  const transportActive = state.facilities.transport.unlocked;
  const refineryActive = state.facilities.refinery.unlocked;
  const upstreamRate = rates.excavator + rates.he3Excavator + rates.deuteriumExcavator;
  const transportCongested =
    transportActive &&
    (upstreamRate > rates.transport || (refineryActive && state.refineryBuffer >= bufferCap - 0.01));
  const rawMoved = transportActive ? Math.min(eff(rates.transport) * dt, state.stardust) : 0;
  const bufferRoom = unbounded ? Infinity : Math.max(0, bufferCap - state.refineryBuffer);
  const moved = refineryActive ? Math.min(rawMoved, bufferRoom) : rawMoved;

  let movedDrone = 0;
  if (refineryActive && hasResearch(state, 'droneLogistics')) {
    movedDrone = Math.max(0, Math.min(DRONE_CHANNEL_RATE * dt, state.stardust - moved, bufferRoom - moved));
  }

  if (refineryActive) {
    state.stardust = Math.max(0, state.stardust - moved - movedDrone);
    state.refineryBuffer = Math.max(0, state.refineryBuffer + moved + movedDrone);
  }

  const recipe = effectiveRecipe(state);
  const crystalRoom = unbounded ? Infinity : Math.max(0, crystalCap - state.crystal);
  const maxRefine = state.refineryBuffer / recipe;
  const refined = Math.min(eff(rates.refinery) * dt, maxRefine, crystalRoom);
  state.refineryBuffer = Math.max(0, state.refineryBuffer - refined * recipe);
  state.crystal = Math.max(0, state.crystal + refined);
  state.stats.totalCrystalProduced += refined;

  let byproductStardust = 0;
  if (hasResearch(state, 'byproductRecovery')) {
    byproductStardust = refined * BYPRODUCT_MULT;
    state.stardust = Math.max(0, state.stardust + byproductStardust);
  }

  return {
    producedStardust: produced,
    movedStardust: moved,
    movedDrone,
    refinedCrystal: refined,
    byproductStardust,
    isotopeProduced,
    energyDeficit: deficitFactor < 1,
    rates,
    bottlenecks: computeBottlenecks(state, rates),
    transportCongested,
  };
}