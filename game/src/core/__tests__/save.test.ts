import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { serializeState, parseSaveJson } from '../save';
import { SAVE_VERSION } from '../config';

const T0 = 1_700_000_000_000;

function v1SaveJson(): string {
  return JSON.stringify({
    version: 1,
    credits: 123,
    stardust: 45,
    refineryBuffer: 6,
    crystal: 7,
    facilities: {
      excavator: { level: 2, unlocked: true },
      transport: { level: 1, unlocked: true },
      refinery: { level: 1, unlocked: false },
    },
    energyStrategy: 'excavation',
    secondMineUnlocked: true,
    createdAt: T0,
    lastSavedAt: T0,
  });
}

describe('存档校验', () => {
  it('序列化与解析往返一致（v6）', () => {
    const s = createNewGame(T0);
    const parsed = parseSaveJson(serializeState(s));
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.state.credits).toBe(100);
    expect(parsed.state.facilities.he3Excavator.unlocked).toBe(false);
    expect(parsed.state.facilities.deuteriumExcavator.unlocked).toBe(false);
    expect(parsed.state.facilities.energyStation.unlocked).toBe(false);
    expect(parsed.state.energy).toBe(0);
    expect(parsed.state.isotope).toBe(0);
    expect(parsed.state.researchCenterUnlocked).toBe(false);
    expect(parsed.state.research).toEqual([]);
    expect(parsed.state.achievements).toEqual([]);
    expect(parsed.state.stats.totalCrystalProduced).toBe(0);
    expect(parsed.state.version).toBe(SAVE_VERSION);
    expect(parsed.state.settings.autoSellStardust).toBe(false);
    expect(parsed.state.settings.stardustKeepAmount).toBe(50);
    expect(parsed.state.settings.autoSellCrystal).toBe(false);
    expect(parsed.state.settings.crystalKeepAmount).toBe(10);
  });

  it('v1 存档迁移到 v6：补齐设施、事件状态、设置与 v0.4 字段', () => {
    const r = parseSaveJson(v1SaveJson());
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.version).toBe(6);
    expect(r.state.facilities.he3Excavator.unlocked).toBe(true);
    expect(r.state.facilities.deuteriumExcavator.unlocked).toBe(false);
    expect(r.state.facilities.energyStation.unlocked).toBe(false);
    expect(r.state.facilities.he3Excavator.level).toBe(1);
    expect(r.state.eventState.pendingEvent).toBeNull();
    expect(r.state.eventState.investUsed).toBe(false);
    expect(r.state.settings.autoSellStardust).toBe(false);
    expect(r.state.settings.stardustKeepAmount).toBe(50);
    expect(r.state.settings.autoSellCrystal).toBe(false);
    expect(r.state.settings.crystalKeepAmount).toBe(10);
    expect(r.state.researchCenterUnlocked).toBe(false);
    expect(r.state.research).toEqual([]);
    expect(r.state.credits).toBe(123);
    expect(r.state.energyStrategy).toBe('excavation');
  });

  it('v3 存档迁移到 v6：补充默认设置与 v0.4 字段', () => {
    const raw = JSON.parse(serializeState(createNewGame(T0))) as Record<string, unknown>;
    raw.version = 3;
    delete raw.settings;
    const r = parseSaveJson(JSON.stringify(raw));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.version).toBe(6);
    expect(r.state.settings.autoSellStardust).toBe(false);
    expect(r.state.settings.stardustKeepAmount).toBe(50);
    expect(r.state.settings.autoSellCrystal).toBe(false);
    expect(r.state.settings.crystalKeepAmount).toBe(10);
    expect(r.state.facilities.energyStation.unlocked).toBe(false);
  });

  it('v4 存档迁移到 v6：保留旧设置并补默认值', () => {
    const raw = JSON.parse(serializeState(createNewGame(T0))) as Record<string, unknown>;
    const settings = raw.settings as Record<string, unknown>;
    settings.autoSellStardust = true;
    settings.stardustKeepAmount = 30;
    raw.version = 4;
    delete settings.autoSellCrystal;
    delete settings.crystalKeepAmount;
    const r = parseSaveJson(JSON.stringify(raw));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.version).toBe(6);
    expect(r.state.settings.autoSellStardust).toBe(true);
    expect(r.state.settings.stardustKeepAmount).toBe(30);
    expect(r.state.settings.autoSellCrystal).toBe(false);
    expect(r.state.settings.crystalKeepAmount).toBe(10);
  });

  it('v5 存档迁移到 v6：补能源站与 v0.4 字段', () => {
    const raw = JSON.parse(serializeState(createNewGame(T0))) as Record<string, unknown>;
    raw.version = 5;
    delete (raw.facilities as Record<string, unknown>).energyStation;
    delete raw.energy;
    delete raw.isotope;
    delete raw.researchCenterUnlocked;
    delete raw.research;
    delete raw.stats;
    delete raw.achievements;
    delete raw.energyReleaseUntil;
    delete raw.energyReleaseCooldownUntil;
    const r = parseSaveJson(JSON.stringify(raw));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.version).toBe(6);
    expect(r.state.facilities.energyStation.unlocked).toBe(false);
    expect(r.state.energy).toBe(0);
    expect(r.state.researchCenterUnlocked).toBe(false);
    expect(r.state.research).toEqual([]);
    expect(r.state.stats.totalCrystalProduced).toBe(0);
  });

  it('设置字段非法时拒绝', () => {
    const raw = JSON.parse(serializeState(createNewGame(T0))) as Record<string, unknown>;
    (raw.settings as Record<string, unknown>).stardustKeepAmount = -3;
    const r = parseSaveJson(JSON.stringify(raw));
    expect(r.ok).toBe(false);
  });

  it('晶体设置字段非法时拒绝', () => {
    const raw = JSON.parse(serializeState(createNewGame(T0))) as Record<string, unknown>;
    (raw.settings as Record<string, unknown>).crystalKeepAmount = -1;
    const r = parseSaveJson(JSON.stringify(raw));
    expect(r.ok).toBe(false);
  });

  it('非法 JSON 拒绝', () => {
    const r = parseSaveJson('not json at all');
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error.length).toBeGreaterThan(0);
  });

  it('负资源拒绝', () => {
    const s = createNewGame(T0);
    s.credits = -5;
    const r = parseSaveJson(serializeState(s));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain('负数');
  });

  it('能量为负拒绝', () => {
    const s = createNewGame(T0);
    s.energy = -1;
    const r = parseSaveJson(serializeState(s));
    expect(r.ok).toBe(false);
  });

  it('统计字段非法拒绝', () => {
    const raw = JSON.parse(serializeState(createNewGame(T0))) as Record<string, unknown>;
    (raw.stats as Record<string, unknown>).totalCrystalProduced = -1;
    const r = parseSaveJson(JSON.stringify(raw));
    expect(r.ok).toBe(false);
  });

  it('未知版本拒绝', () => {
    const s = createNewGame(T0) as unknown as { version: number };
    s.version = 99;
    const r = parseSaveJson(JSON.stringify(s));
    expect(r.ok).toBe(false);
  });

  it('设施等级越界拒绝', () => {
    const s = createNewGame(T0);
    s.facilities.excavator.level = 6;
    const r = parseSaveJson(serializeState(s));
    expect(r.ok).toBe(false);
  });

  it('未知能源策略拒绝', () => {
    const raw = JSON.parse(serializeState(createNewGame(T0))) as Record<string, unknown>;
    raw.energyStrategy = 'turbo';
    const r = parseSaveJson(JSON.stringify(raw));
    expect(r.ok).toBe(false);
  });

  it('缺少设施字段拒绝', () => {
    const raw = JSON.parse(serializeState(createNewGame(T0))) as Record<string, unknown>;
    delete (raw.facilities as Record<string, unknown>).refinery;
    const r = parseSaveJson(JSON.stringify(raw));
    expect(r.ok).toBe(false);
  });
});

