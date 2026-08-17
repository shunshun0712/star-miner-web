import {
  DEFAULT_CRYSTAL_KEEP,
  DEFAULT_STARDUST_KEEP,
  ENERGY_STRATEGY_IDS,
  EVENT_FIRST_AFTER_MS,
  FACILITY_ORDER,
  MAX_LEVEL,
  SAVE_VERSION,
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

function migrate(raw: Record<string, unknown>): unknown {
  let s: Record<string, unknown> = { ...raw };
  if (s.version === 1) {
    const facilities = (s.facilities as Record<string, unknown> | undefined) ?? {};
    (facilities as Record<string, unknown>).he3Excavator = {
      level: 1,
      unlocked: s.secondMineUnlocked === true,
    };
    const createdAt = isFiniteNumber(s.createdAt) ? (s.createdAt as number) : Date.now();
    s = { ...s, version: 2, facilities, eventState: defaultEventState(createdAt) };
  }
  if (s.version === 2) {
    const facilities = (s.facilities as Record<string, unknown> | undefined) ?? {};
    (facilities as Record<string, unknown>).deuteriumExcavator = { level: 1, unlocked: false };
    s = { ...s, version: 3, facilities };
  }
  if (s.version === 3) {
    s = {
      ...s,
      version: 4,
      settings: {
        autoSellStardust: false,
        stardustKeepAmount: DEFAULT_STARDUST_KEEP,
      },
    };
  }
  if (s.version === 4) {
    const settings = (s.settings as Record<string, unknown> | undefined) ?? {};
    s = {
      ...s,
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
  if (s.version === 5) {
    const facilities = (s.facilities as Record<string, unknown> | undefined) ?? {};
    (facilities as Record<string, unknown>).energyStation = { level: 1, unlocked: false };
    s = {
      ...s,
      version: 6,
      facilities,
      energy: 0,
      isotope: 0,
      researchCenterUnlocked: false,
      research: [],
      stats: defaultStats(),
      achievements: [],
      energyReleaseUntil: 0,
      energyReleaseCooldownUntil: 0,
    };
  }
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