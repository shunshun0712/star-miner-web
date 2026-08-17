import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import {
  maybeSpawnEvent,
  resolveEvent,
  activeModifier,
  rollNextEventAt,
} from '../events';
import {
  DRONE_A_CREDITS,
  DRONE_BOOST_MULT,
  EVENT_INTERVAL_MAX_MS,
  EVENT_INTERVAL_MIN_MS,
  INVEST_BOOST,
  INVEST_COST,
  STORM_BALANCED_MULT,
  STORM_MULT,
} from '../config';
import { setEnergyStrategy } from '../energy';

const T0 = 1_700_000_000_000;

function stateWithCredits(credits: number) {
  const s = createNewGame(T0);
  s.credits = credits;
  return s;
}

describe('事件系统', () => {
  it('未到时间不生成事件', () => {
    const s = createNewGame(T0);
    expect(maybeSpawnEvent(s, T0 + 1000)).toBeNull();
  });

  it('到期后生成事件并重排下次时间', () => {
    const s = createNewGame(T0);
    const ev = maybeSpawnEvent(s, T0 + 200_000, () => 0.5);
    expect(ev).not.toBeNull();
    expect(s.eventState.pendingEvent).not.toBeNull();
    const next = s.eventState.nextEventAt;
    expect(next).toBeGreaterThanOrEqual(T0 + 200_000 + EVENT_INTERVAL_MIN_MS);
    expect(next).toBeLessThanOrEqual(T0 + 200_000 + EVENT_INTERVAL_MAX_MS);
  });

  it('有待处理事件时不生成新事件', () => {
    const s = createNewGame(T0);
    maybeSpawnEvent(s, T0 + 200_000, () => 0.5);
    const ev2 = maybeSpawnEvent(s, T0 + 500_000, () => 0.5);
    expect(ev2).toBeNull();
  });

  it('太阳风暴事件直接生效并通知', () => {
    const s = stateWithCredits(100);
    setEnergyStrategy(s, 'excavation');
    const ev = maybeSpawnEvent(s, T0 + 200_000, () => 0.35);
    expect(ev).not.toBeNull();
    if (!ev) return;
    expect(ev.kind).toBe('solar-storm');
    expect(s.eventState.solarStormUntil).toBe(T0 + 200_000 + 60_000);
    expect(activeModifier(s, 'excavator', T0 + 200_001)).toBe(STORM_MULT);
  });

  it('太阳风暴在均衡策略下减速减半', () => {
    const s = stateWithCredits(100);
    maybeSpawnEvent(s, T0 + 200_000, () => 0.35);
    setEnergyStrategy(s, 'balanced');
    expect(activeModifier(s, 'excavator', T0 + 200_001)).toBe(STORM_BALANCED_MULT);
  });

  it('无人机 A：立即获得 50 信用点', () => {
    const s = stateWithCredits(100);
    const ev = maybeSpawnEvent(s, T0 + 200_000, () => 0.9);
    if (!ev) throw new Error('expected event');
    expect(ev.kind).toBe('drone');
    const r = resolveEvent(s, ev.id, { choice: 'A' });
    expect(r.ok).toBe(true);
    expect(s.credits).toBe(100 + DRONE_A_CREDITS);
    expect(s.eventState.pendingEvent).toBeNull();
  });

  it('无人机 B：全设施 30 秒 ×1.5', () => {
    const s = stateWithCredits(100);
    const ev = maybeSpawnEvent(s, T0 + 200_000, () => 0.9);
    if (!ev) throw new Error('expected event');
    const r = resolveEvent(s, ev.id, { choice: 'B', now: T0 + 200_000 });
    expect(r.ok).toBe(true);
    expect(s.eventState.droneBoostUntil).toBe(T0 + 200_000 + 30_000);
    expect(activeModifier(s, 'excavator', T0 + 200_001)).toBe(DRONE_BOOST_MULT);
  });

  it('投入型事件：确认后扣 200 信用点并永久 +5% 采掘', () => {
    const s = stateWithCredits(500);
    const ev = maybeSpawnEvent(s, T0 + 200_000, () => 0.05);
    if (!ev) throw new Error('expected event');
    expect(ev.kind).toBe('invest');
    const r = resolveEvent(s, ev.id, { confirm: true });
    expect(r.ok).toBe(true);
    expect(s.credits).toBe(300);
    expect(s.eventState.investUsed).toBe(true);
    expect(activeModifier(s, 'excavator', T0 + 1)).toBeCloseTo(1 + INVEST_BOOST, 10);
    expect(activeModifier(s, 'transport', T0 + 1)).toBe(1);
  });

  it('投入型事件可忽略', () => {
    const s = stateWithCredits(500);
    const ev = maybeSpawnEvent(s, T0 + 200_000, () => 0.05);
    if (!ev) throw new Error('expected event');
    const r = resolveEvent(s, ev.id, { confirm: false });
    expect(r.ok).toBe(true);
    expect(s.credits).toBe(500);
    expect(s.eventState.investUsed).toBe(false);
  });

  it('未知事件 ID 拒绝结算', () => {
    const s = stateWithCredits(100);
    const r = resolveEvent(s, 'nope', { choice: 'A' });
    expect(r.ok).toBe(false);
  });

  it('rollNextEventAt 落在 3–5 分钟区间', () => {
    const s = createNewGame(T0);
    const next = rollNextEventAt(s, T0, () => 0);
    expect(next).toBe(T0 + EVENT_INTERVAL_MIN_MS);
    const next2 = rollNextEventAt(s, T0, () => 1);
    expect(next2).toBe(T0 + EVENT_INTERVAL_MAX_MS);
  });
});

