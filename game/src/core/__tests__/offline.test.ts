import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { settleOffline } from '../offline';
import { unlockFacility } from '../economy';
import { OFFLINE_CAP_MS, EVENT_INTERVAL_MIN_MS } from '../config';

const T0 = 1_700_000_000_000;
const EIGHT_HOURS = OFFLINE_CAP_MS;

describe('离线收益', () => {
  it('超过 8 小时按 8 小时结算', () => {
    const s = createNewGame(T0);
    s.lastSavedAt = T0 - 10 * 3600 * 1000;
    const r = settleOffline(s, T0);
    expect(r.applied).toBe(true);
    expect(r.effectiveMs).toBe(EIGHT_HOURS);
    expect(s.stardust).toBeCloseTo(1.2 * 28800, 5);
    expect(r.summary.producedStardust).toBeCloseTo(1.2 * 28800, 5);
  });

  it('时间倒退按 0 秒处理，不产生收益', () => {
    const s = createNewGame(T0);
    s.stardust = 5;
    s.lastSavedAt = T0 + 3600 * 1000;
    const r = settleOffline(s, T0);
    expect(r.applied).toBe(false);
    expect(r.effectiveMs).toBe(0);
    expect(s.stardust).toBe(5);
  });

  it('完整生产链离线 8 小时：运输 28800、精炼 7200 晶体', () => {
    const s = createNewGame(T0);
    s.credits = 2000;
    unlockFacility(s, 'transport');
    unlockFacility(s, 'refinery');
    s.lastSavedAt = T0 - EIGHT_HOURS;
    const r = settleOffline(s, T0);
    expect(r.summary.movedStardust).toBeCloseTo(1.0 * 28800, 5);
    expect(r.summary.refinedCrystal).toBeCloseTo(0.25 * 28800, 5);
    expect(s.crystal).toBeCloseTo(0.25 * 28800, 5);
  });

  it('投入型加成在离线时生效（采掘 +5%）', () => {
    const s = createNewGame(T0);
    s.eventState.investUsed = true;
    s.lastSavedAt = T0 - 3600 * 1000;
    const r = settleOffline(s, T0);
    expect(r.summary.producedStardust).toBeCloseTo(1.2 * 1.05 * 3600, 5);
  });

  it('离线清空待处理事件与临时增益，并重排下次事件', () => {
    const s = createNewGame(T0);
    s.eventState.pendingEvent = { id: 'ev-1', kind: 'drone', createdAt: T0 - 1000 };
    s.eventState.droneBoostUntil = T0 + 9999;
    s.eventState.solarStormUntil = T0 + 9999;
    s.eventState.nextEventAt = T0 - 1000;
    s.lastSavedAt = T0 - 60 * 1000;
    settleOffline(s, T0);
    expect(s.eventState.pendingEvent).toBeNull();
    expect(s.eventState.droneBoostUntil).toBe(0);
    expect(s.eventState.solarStormUntil).toBe(0);
    expect(s.eventState.nextEventAt).toBeGreaterThanOrEqual(T0 + EVENT_INTERVAL_MIN_MS);
  });

  it('结算后更新最后保存时间', () => {
    const s = createNewGame(T0);
    s.lastSavedAt = T0 - 60 * 1000;
    settleOffline(s, T0);
    expect(s.lastSavedAt).toBe(T0);
  });

  it('离线不产生信用点收益', () => {
    const s = createNewGame(T0);
    s.lastSavedAt = T0 - 3600 * 1000;
    settleOffline(s, T0);
    expect(s.credits).toBe(100);
  });
});
