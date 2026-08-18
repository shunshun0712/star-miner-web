import {
  DRONE_A_CREDITS,
  DRONE_BOOST_MULT,
  DRONE_BOOST_MS,
  EVENT_INTERVAL_MAX_MS,
  EVENT_INTERVAL_MIN_MS,
  INVEST_BOOST,
  INVEST_COST,
  STORM_BALANCED_MULT,
  STORM_MULT,
  STORM_MS,
} from './config';
import type { EventKind, FacilityId, GameState, PendingEvent } from './types';

export interface EventResult {
  ok: boolean;
  kind?: EventKind;
  choice?: 'A' | 'B';
  creditsGained?: number;
  applied?: boolean;
  reason?: string;
}

export function activeModifier(state: GameState, id: FacilityId, now: number): number {
  let m = 1;
  if (state.eventState.investUsed && id === 'excavator') m *= 1 + INVEST_BOOST;
  if (now < state.eventState.droneBoostUntil) m *= DRONE_BOOST_MULT;
  if (now < state.eventState.solarStormUntil) {
    m *= state.energyStrategy === 'balanced' ? STORM_BALANCED_MULT : STORM_MULT;
  }
  return m;
}

export function rollNextEventAt(state: GameState, now: number, rand: () => number = Math.random): number {
  const delay = EVENT_INTERVAL_MIN_MS + rand() * (EVENT_INTERVAL_MAX_MS - EVENT_INTERVAL_MIN_MS);
  return now + delay;
}

export function pickEventKind(state: GameState, rand: () => number = Math.random): EventKind {
  const r = rand();
  const investAvailable = !state.eventState.investUsed && state.credits >= INVEST_COST;
  if (investAvailable && r < 0.15) return 'invest';
  // M2：投入型事件不可用时，原本 [0,0.15) 区间会整体落入太阳风暴分支，
  // 导致后期太阳风暴概率从 25% 膨胀到 40%。这里对该区间重新 roll 一次，
  // 使风暴/无人机仍按约 25:60 的比例分配，而非把投入的 15% 全部塞给风暴。
  let rr = r;
  if (!investAvailable && r < 0.15) rr = rand();
  if (rr < 0.4) return 'solar-storm';
  return 'drone';
}

export function maybeSpawnEvent(state: GameState, now: number, rand: () => number = Math.random): PendingEvent | null {
  if (state.eventState.pendingEvent) return null;
  if (now < state.eventState.nextEventAt) return null;
  const kind = pickEventKind(state, rand);
  const ev: PendingEvent = {
    id: `ev-${now}-${Math.floor(rand() * 1e6)}`,
    kind,
    createdAt: now,
  };
  state.stats.eventsTriggered += 1;
  if (kind === 'solar-storm') {
    state.eventState.solarStormUntil = now + STORM_MS;
    state.stats.solarStormsExperienced += 1;
  } else {
    state.eventState.pendingEvent = ev;
  }
  state.eventState.nextEventAt = rollNextEventAt(state, now, rand);
  return ev;
}

export function resolveEvent(
  state: GameState,
  id: string,
  opts: { choice?: 'A' | 'B'; confirm?: boolean; now?: number } = {},
): EventResult {
  const ev = state.eventState.pendingEvent;
  if (!ev || ev.id !== id) return { ok: false, reason: '事件不存在' };

  if (ev.kind === 'drone') {
    const choice = opts.choice;
    if (!choice) return { ok: false, reason: '请选择 A 或 B' };
    state.eventState.pendingEvent = null;
    state.stats.droneEventsHandled += 1;
    if (choice === 'A') {
      state.credits += DRONE_A_CREDITS;
      state.stats.totalCreditsEarned += DRONE_A_CREDITS;
      return { ok: true, kind: 'drone', choice, creditsGained: DRONE_A_CREDITS };
    }
    state.eventState.droneBoostUntil = (opts.now ?? Date.now()) + DRONE_BOOST_MS;
    return { ok: true, kind: 'drone', choice };
  }

  if (ev.kind === 'invest') {
    state.eventState.pendingEvent = null;
    if (opts.confirm !== true) return { ok: true, kind: 'invest', applied: false };
    if (state.credits < INVEST_COST) return { ok: false, reason: '信用点不足' };
    state.credits -= INVEST_COST;
    state.eventState.investUsed = true;
    state.stats.investmentsMade += 1;
    return { ok: true, kind: 'invest', applied: true };
  }

  return { ok: false, reason: '无需结算的事件' };
}
