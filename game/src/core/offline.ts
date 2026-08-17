import { OFFLINE_CAP_MS } from './config';
import { rollNextEventAt } from './events';
import { tickProduction } from './production';
import type { GameState, ProductionSummary } from './types';

export interface OfflineResult {
  applied: boolean;
  elapsedMs: number;
  effectiveMs: number;
  summary: ProductionSummary;
}

export function settleOffline(state: GameState, now: number): OfflineResult {
  const elapsedMs = now - state.lastSavedAt;
  const effectiveMs = Math.max(0, Math.min(elapsedMs, OFFLINE_CAP_MS));
  if (effectiveMs <= 0) {
    const summary: ProductionSummary = {
      producedStardust: 0,
      movedStardust: 0,
      movedDrone: 0,
      refinedCrystal: 0,
      byproductStardust: 0,
      isotopeProduced: 0,
      energyDeficit: false,
      rates: { excavator: 0, he3Excavator: 0, deuteriumExcavator: 0, transport: 0, refinery: 0, energyStation: 0 },
      bottlenecks: [],
      transportCongested: false,
    };
    return { applied: false, elapsedMs, effectiveMs, summary };
  }

  // 离线规则：不触发事件；清空待处理事件与临时增益；重排下次事件时间
  state.eventState.pendingEvent = null;
  state.eventState.droneBoostUntil = 0;
  state.eventState.solarStormUntil = 0;
  if (state.eventState.nextEventAt <= now) {
    state.eventState.nextEventAt = rollNextEventAt(state, now);
  }

  const summary = tickProduction(state, effectiveMs, { unboundedCapacity: true, now });
  state.lastSavedAt = now;
  state.stats.lastOfflineCrystalGain = summary.refinedCrystal;
  return { applied: true, elapsedMs, effectiveMs, summary };
}

