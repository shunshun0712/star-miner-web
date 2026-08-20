import {
  ACHIEVEMENT_BY_ID,
  DEFAULT_CRYSTAL_KEEP,
  DEFAULT_STARDUST_KEEP,
  ENERGY_STRATEGY_IDS,
  EVENT_FIRST_AFTER_MS,
  FACILITY_ORDER,
  MAX_LEVEL,
  SAVE_VERSION,
  TECH_BY_ID,
} from './config';
import type { EventKind, EventState, GameState, LifetimeStats } from './types';

export type ParseResult = { ok: true; state: GameState } | { ok: false; error: string };

export function serializeState(state: GameState): string {
  return JSON.stringify(state, null, 2);
}

function isFiniteNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v);
}

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

const EVENT_KINDS: EventKind[] = ['drone', 'solar-storm', 'invest'];

function defaultEventState(now: number): EventState {
  return {
    pendingEvent: null,
    nextEventAt: now + EVENT_FIRST_AFTER_MS,
    droneBoostUntil: 0,
    solarStormUntil: 0,
    investUsed: false,
  };
}

// ── 迁移链 v1→v6：每段独立函数，便于单测 ──

export function migrateV1ToV2(raw: Record<string, unknown>): Record<string, unknown> {
  const facilities = (raw.facilities as Record<string, unknown> | undefined) ?? {};
  facilities.he3Excavator = {
    level: 1,
    unlocked: raw.secondMineUnlocked === true,
  };
  const createdAt = isFiniteNumber(raw.createdAt) ? (raw.createdAt as number) : Date.now();
  return { ...raw, version: 2, facilities, eventState: defaultEventState(createdAt) };
}

export function migrateV2ToV3(raw: Record<string, unknown>): Record<string, unknown> {
  const facilities = (raw.facilities as Record<string, unknown> | undefined) ?? {};
  facilities.deuteriumExcavator = { level: 1, unlocked: false };
  return { ...raw, version: 3, facilities };
}

export function migrateV3ToV4(raw: Record<string, unknown>): Record<string, unknown> {
  return {
    ...raw,
    version: 4,
    settings: {
      autoSellStardust: false,
      stardustKeepAmount: DEFAULT_STARDUST_KEEP,
    },
  };
}

export function migrateV4ToV5(raw: Record<string, unknown>): Record<string, unknown> {
  const settings = (raw.settings as Record<string, unknown> | undefined) ?? {};
  return {
    ...raw,
    version: 5,
    settings: {
      autoSellStardust: settings.autoSellStardust === true,
      stardustKeepAmount: isFiniteNumber(settings.stardustKeepAmount)
        ? (settings.stardustKeepAmount as number)
        : DEFAULT_STARDUST_KEEP,
      autoSellCrystal: false,
      crystalKeepAmount: DEFAULT_CRYSTAL_KEEP,
    },
  };
}

export function migrateV5ToV6(raw: Record<string, unknown>): Record<string, unknown> {
  const facilities = (raw.facilities as Record<string, unknown> | undefined) ?? {};
  facilities.energyStation = { level: 1, unlocked: false };
  return {
    ...raw,
    version: 6,
    facilities,
    energy: isFiniteNumber(raw.energy) ? (raw.energy as number) : 0,
    isotope: isFiniteNumber(raw.isotope) ? (raw.isotope as number) : 0,
    researchCenterUnlocked: raw.researchCenterUnlocked === true,
    research: Array.isArray(raw.research) ? raw.research : [],
    stats: typeof raw.stats === 'object' && raw.stats !== null ? raw.stats : defaultStats(),
    achievements: Array.isArray(raw.achievements) ? raw.achievements : [],
    energyReleaseUntil: isFiniteNumber(raw.energyReleaseUntil) ? (raw.energyReleaseUntil as number) : 0,
    energyReleaseCooldownUntil: isFiniteNumber(raw.energyReleaseCooldownUntil) ? (raw.energyReleaseCooldownUntil as number) : 0,
  };
}

function migrate(raw: Record<string, unknown>): unknown {
  let s: Record<string, unknown> = { ...raw };
  if (s.version === 1) s = migrateV1ToV2(s);
  if (s.version === 2) s = migrateV2ToV3(s);
  if (s.version === 3) s = migrateV3ToV4(s);
  if (s.version === 4) s = migrateV4ToV5(s);
  if (s.version === 5) s = migrateV5ToV6(s);
  return s;
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === 'string');
}

export function validateState(rawIn: unknown): ParseResult {
  if (typeof rawIn !== 'object' || rawIn === null) return { ok: false, error: '存档不是有效的对象' };
  const migrated = migrate(rawIn as Record<string, unknown>);
  if (typeof migrated !== 'object' || migrated === null) return { ok: false, error: '存档不是有效的对象' };
  const s = migrated as Record<string, unknown>;

  if (s.version !== SAVE_VERSION) {
    return { ok: false, error: `存档版本不支持（当前版本 ${SAVE_VERSION}）` };
  }

  for (const res of ['credits', 'stardust', 'refineryBuffer', 'crystal', 'energy', 'isotope'] as const) {
    if (!isFiniteNumber(s[res]) || (s[res] as number) < 0) {
      return { ok: false, error: `资源 ${res} 不能为负数或非法值` };
    }
  }

  if (typeof s.facilities !== 'object' || s.facilities === null) {
    return { ok: false, error: '存档缺少设施数据' };
  }
  const facilities = s.facilities as Record<string, unknown>;
  for (const id of FACILITY_ORDER) {
    const f = facilities[id];
    if (typeof f !== 'object' || f === null) {
      return { ok: false, error: `缺少设施 ${id}` };
    }
    const ff = f as Record<string, unknown>;
    if (!isFiniteNumber(ff.level) || (ff.level as number) < 1 || (ff.level as number) > MAX_LEVEL) {
      return { ok: false, error: `设施 ${id} 等级越界` };
    }
    if (typeof ff.unlocked !== 'boolean') {
      return { ok: false, error: `设施 ${id} 解锁状态非法` };
    }
  }

  if (typeof s.energyStrategy !== 'string' || !(ENERGY_STRATEGY_IDS as string[]).includes(s.energyStrategy)) {
    return { ok: false, error: '能源策略未知' };
  }

  if (typeof s.eventState !== 'object' || s.eventState === null) {
    return { ok: false, error: '存档缺少事件状态' };
  }
  const ev = s.eventState as Record<string, unknown>;
  if (ev.pendingEvent !== null) {
    if (typeof ev.pendingEvent !== 'object' || ev.pendingEvent === null) {
      return { ok: false, error: '事件状态非法' };
    }
    const pe = ev.pendingEvent as Record<string, unknown>;
    if (typeof pe.id !== 'string' || typeof pe.kind !== 'string' || !(EVENT_KINDS as string[]).includes(pe.kind)) {
      return { ok: false, error: '事件状态非法' };
    }
    if (!isFiniteNumber(pe.createdAt)) return { ok: false, error: '事件状态非法' };
  }
  for (const key of ['nextEventAt', 'droneBoostUntil', 'solarStormUntil'] as const) {
    if (!isFiniteNumber(ev[key])) return { ok: false, error: `字段 ${key} 非法` };
  }
  if (typeof ev.investUsed !== 'boolean') return { ok: false, error: '投入型事件状态非法' };

  const settings = (s.settings as Record<string, unknown> | undefined) ?? null;
  if (typeof settings !== 'object' || settings === null) {
    return { ok: false, error: '存档缺少设置数据' };
  }
  if (typeof settings.autoSellStardust !== 'boolean') {
    return { ok: false, error: '自动出售设置非法' };
  }
  if (!isFiniteNumber(settings.stardustKeepAmount) || (settings.stardustKeepAmount as number) < 0) {
    return { ok: false, error: '保留数量非法' };
  }
  if (typeof settings.autoSellCrystal !== 'boolean') {
    return { ok: false, error: '晶体自动出售设置非法' };
  }
  if (!isFiniteNumber(settings.crystalKeepAmount) || (settings.crystalKeepAmount as number) < 0) {
    return { ok: false, error: '晶体保留数量非法' };
  }

  if (typeof s.researchCenterUnlocked !== 'boolean') return { ok: false, error: '研究中心状态非法' };
  if (!isStringArray(s.research)) return { ok: false, error: '研究列表非法' };
  if (!isStringArray(s.achievements)) return { ok: false, error: '成就列表非法' };
  // M4：过滤掉不在 TECH_NODES / ACHIEVEMENTS 白名单内的 ID，防止恶意存档注入任意字符串
  // 经 achievementPoints 把非法 ID 算入产量加成。白名单取自 config 的 TECH_BY_ID / ACHIEVEMENT_BY_ID。
  s.research = (s.research as string[]).filter((id) => id in TECH_BY_ID);
  s.achievements = (s.achievements as string[]).filter((id) => id in ACHIEVEMENT_BY_ID);
  for (const key of ['energyReleaseUntil', 'energyReleaseCooldownUntil'] as const) {
    if (!isFiniteNumber(s[key])) return { ok: false, error: `字段 ${key} 非法` };
  }

  if (typeof s.stats !== 'object' || s.stats === null) {
    return { ok: false, error: '存档缺少统计数据' };
  }
  const st = s.stats as Record<string, unknown>;
  for (const key of Object.keys(defaultStats()) as (keyof LifetimeStats)[]) {
    if (!isFiniteNumber(st[key]) || (st[key] as number) < 0) {
      return { ok: false, error: `统计字段 ${key} 非法` };
    }
  }

  for (const key of ['createdAt', 'lastSavedAt'] as const) {
    if (!isFiniteNumber(s[key])) return { ok: false, error: `字段 ${key} 非法` };
  }

  return { ok: true, state: s as unknown as GameState };
}

export function parseSaveJson(json: string): ParseResult {
  let raw: unknown;
  try {
    raw = JSON.parse(json);
  } catch {
    return { ok: false, error: 'JSON 格式错误' };
  }
  return validateState(raw);
}