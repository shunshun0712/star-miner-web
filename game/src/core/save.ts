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
import type { EventKind, EventState, GameState, LifetimeStats, PrestigeLayer } from './types';
import { createEmptyConsumptionLog } from './consumptionLog';
import { createEmptyPrestigeLayer, isRegisteredPrestigeUnlock } from './prestigeLayer';

export type ParseResult = { ok: true; state: GameState } | { ok: false; error: string };

export function serializeState(state: GameState): string {
  return JSON.stringify(state, null, 2);
}

/**
 * T2-4: 分层导出序列化——把完整 GameState 拆成 main（基线层）+ prestige（转生层），
 * 导出 JSON 含顶层 `version` + `main` + `prestige` 三个 key。
 *
 * 与 `serializeState`（扁平全态 JSON）的分工：
 * - `serializeState`：扁平全态，供 layeredBackend / stateBackend / localStorage 快照等
 *   **内部持久化**使用——这些消费者依赖"JSON.parse 后即扁平字段"的契约（测试里直接
 *   `raw.settings`、`raw.version = 3` 改字段）。改其语义会连锁破坏 4 处内部消费者 + 25 个测试。
 * - `serializeLayeredExport`：分层结构，供**文件导出/导入**用，镜像 IDB 双键持久化的分层语义。
 *
 * 最小改动原则：保留 serializeState 扁平语义不变，新增独立的分层导出函数，零回归。
 */
export function serializeLayeredExport(state: GameState): string {
  const { prestige, ...main } = state;
  return JSON.stringify({ version: SAVE_VERSION, main, prestige }, null, 2);
}

/**
 * T2-4: 分层导出 JSON 解析——检测格式（分层 v8 vs 扁平旧版），统一走迁移链 + 校验。
 *
 * - **分层格式**（顶层同时含 `main`（对象）+ `prestige`（对象））：合并为扁平全态后走 validateState
 * - **扁平格式**（v1~v8 单键）：直接走 validateState（含 migrate 链，v7 及以下自动补空 prestige 层）
 *
 * 两种格式都经 validateState 兜底——旧版导入缺失 prestige 时由 migrateV7ToV8 回填空层，不触发 corruption。
 * 检测依据：扁平 v8 存档虽有顶层 `prestige`，但无顶层 `main`，故 `main` 是否为对象是分层的可靠判据。
 */
export function parseLayeredExport(json: string): ParseResult {
  let raw: unknown;
  try {
    raw = JSON.parse(json);
  } catch {
    return { ok: false, error: 'JSON 格式错误' };
  }
  if (typeof raw !== 'object' || raw === null) return { ok: false, error: '存档不是有效的对象' };
  const obj = raw as Record<string, unknown>;

  // 分层格式检测：顶层同时含 main（对象）+ prestige（对象）
  if (typeof obj.main === 'object' && obj.main !== null && typeof obj.prestige === 'object' && obj.prestige !== null) {
    const main = obj.main as Record<string, unknown>;
    const prestige = obj.prestige as Record<string, unknown>;
    // 合并为扁平全态：main 字段 + prestige + version（顶层优先，缺失则回退 main 自带版本）
    const merged: Record<string, unknown> = { ...main, prestige };
    if (typeof obj.version === 'number') {
      merged.version = obj.version;
    } else if (typeof main.version === 'number') {
      merged.version = main.version;
    }
    return validateState(merged);
  }

  // 扁平格式（v1~v8 单键旧版存档）——走既有迁移链 + 校验
  return validateState(obj);
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

export function migrateV6ToV7(raw: Record<string, unknown>): Record<string, unknown> {
  // T1-4: v6 无消耗持久化，新增空 consumptionLog；版本号升到 7。
  // v6 旧存档的 antimatter/darkmatter 回填沿用 validateState 既有的 T1-3 逻辑（迁移后兜底）。
  return {
    ...raw,
    version: 7,
    consumptionLog: createEmptyConsumptionLog(),
  };
}

export function migrateV7ToV8(raw: Record<string, unknown>): Record<string, unknown> {
  // T2-1: v7 存档无转生层，自动获得空 prestige 层（prestigeLevel=0, stardust=0, unlocked=[])。
  // 分层存档（save/layeredBackend）下，'main' 键的基线 JSON 不含 prestige 字段；
  // load 时 LayeredStateBackend 会把独立的 'prestige' 键并入，再走本迁移链兜底。
  return {
    ...raw,
    version: 8,
    prestige: createEmptyPrestigeLayer(),
  };
}

export function migrateV8ToV9(raw: Record<string, unknown>): Record<string, unknown> {
  // T3-1: v8 转生层无 shopPurchases 字段，回填空对象。
  // prestige 可能已被 migrateV7ToV8 回填为空层（含 unlocked/stardust/prestigeLevel/history），
  // 也可能是 v8 玩家的真实存档（有数据），只需补 shopPurchases: {}。
  const prestige = (raw.prestige as Record<string, unknown> | undefined) ?? {};
  return {
    ...raw,
    version: 9,
    prestige: {
      ...prestige,
      shopPurchases: {},
    },
  };
}

function migrate(raw: Record<string, unknown>): unknown {
  let s: Record<string, unknown> = { ...raw };
  if (s.version === 1) s = migrateV1ToV2(s);
  if (s.version === 2) s = migrateV2ToV3(s);
  if (s.version === 3) s = migrateV3ToV4(s);
  if (s.version === 4) s = migrateV4ToV5(s);
  if (s.version === 5) s = migrateV5ToV6(s);
  if (s.version === 6) s = migrateV6ToV7(s);
  if (s.version === 7) s = migrateV7ToV8(s);
  if (s.version === 8) s = migrateV8ToV9(s);
  return s;
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === 'string');
}

const CONSUMPTION_LOG_KINDS = ['buff', 'exploration', 'exchange'] as const;

/** T1-4: 校验 consumptionLog 结构——返回错误信息或 null（合法） */
export function validateConsumptionLog(rawIn: unknown): string | null {
  if (typeof rawIn !== 'object' || rawIn === null) return '存档缺少消耗日志';
  const log = rawIn as Record<string, unknown>;

  if (!Array.isArray(log.active)) return '消耗日志活跃列表非法';
  for (const e of log.active as unknown[]) {
    if (typeof e !== 'object' || e === null) return '消耗日志条目非法';
    const entry = e as Record<string, unknown>;
    if (typeof entry.id !== 'string') return '消耗日志条目 id 非法';
    if (typeof entry.kind !== 'string' || !(CONSUMPTION_LOG_KINDS as readonly string[]).includes(entry.kind)) {
      return '消耗日志条目 kind 非法';
    }
    if (typeof entry.resourceId !== 'string') return '消耗日志条目 resourceId 非法';
    if (!isFiniteNumber(entry.amount) || (entry.amount as number) < 0) return '消耗日志条目 amount 非法';
    if (!Array.isArray(entry.produced)) return '消耗日志条目 produced 非法';
    for (const p of entry.produced as unknown[]) {
      if (typeof p !== 'object' || p === null) return '消耗日志产出条目非法';
      const pe = p as Record<string, unknown>;
      if (typeof pe.resourceId !== 'string') return '消耗日志产出 resourceId 非法';
      if (!isFiniteNumber(pe.amount) || (pe.amount as number) < 0) return '消耗日志产出 amount 非法';
    }
    if (!isFiniteNumber(entry.timestamp)) return '消耗日志条目 timestamp 非法';
    if (entry.expiresAt !== undefined && !isFiniteNumber(entry.expiresAt)) return '消耗日志条目 expiresAt 非法';
    if (entry.idempotencyKey !== undefined && typeof entry.idempotencyKey !== 'string') {
      return '消耗日志条目 idempotencyKey 非法';
    }
  }

  const agg = log.aggregate;
  if (typeof agg !== 'object' || agg === null) return '消耗日志聚合非法';
  const a = agg as Record<string, unknown>;
  if (!isFiniteNumber(a.completedEvents) || (a.completedEvents as number) < 0) {
    return '消耗日志聚合 completedEvents 非法';
  }
  for (const mapKey of ['consumedByResource', 'producedByResource'] as const) {
    const m = a[mapKey];
    if (typeof m !== 'object' || m === null) return `消耗日志聚合 ${mapKey} 非法`;
    for (const v of Object.values(m as Record<string, unknown>)) {
      if (!isFiniteNumber(v) || (v as number) < 0) return `消耗日志聚合 ${mapKey} 值非法`;
    }
  }
  return null;
}

/**
 * T2-1: 校验转生层结构——返回错误信息或 null（合法）。
 *
 * 字段约束：
 * - unlocked：string[]，仅保留 PRESTIGE_UNLOCKS 白名单内的 id（防恶意存档注入）
 * - stardust：星核余额，非负有限数
 * - prestigeLevel：转生等级，非负整数
 * - history：快照条目数组，每条 sequence/timestamp/stardustEarned/snapshot 合法
 */
export function validatePrestigeLayer(rawIn: unknown): string | null {
  if (typeof rawIn !== 'object' || rawIn === null) return '存档缺少转生层';
  const p = rawIn as Record<string, unknown>;

  if (!Array.isArray(p.unlocked)) return '转生层解锁列表非法';
  for (const id of p.unlocked as unknown[]) {
    if (typeof id !== 'string') return '转生层解锁项非法';
  }
  if (!isFiniteNumber(p.stardust) || (p.stardust as number) < 0) return '转生层星核余额非法';
  if (!isFiniteNumber(p.prestigeLevel) || !Number.isInteger(p.prestigeLevel) || (p.prestigeLevel as number) < 0) {
    return '转生层等级非法';
  }
  if (!Array.isArray(p.history)) return '转生层历史快照非法';
  for (const h of p.history as unknown[]) {
    if (typeof h !== 'object' || h === null) return '转生层历史条目非法';
    const entry = h as Record<string, unknown>;
    if (!isFiniteNumber(entry.sequence) || !Number.isInteger(entry.sequence) || (entry.sequence as number) < 1) {
      return '转生层历史 sequence 非法';
    }
    if (!isFiniteNumber(entry.timestamp)) return '转生层历史 timestamp 非法';
    if (!isFiniteNumber(entry.stardustEarned) || (entry.stardustEarned as number) < 0) {
      return '转生层历史 stardustEarned 非法';
    }
    const snap = entry.baselineSnapshot;
    if (typeof snap !== 'object' || snap === null) return '转生层历史快照非法';
    const s = snap as Record<string, unknown>;
    for (const k of ['credits', 'stardust', 'crystal', 'isotope', 'antimatter', 'darkmatter', 'createdAt'] as const) {
      if (!isFiniteNumber(s[k])) return `转生层历史快照 ${k} 非法`;
    }
    if (typeof s.facilityLevels !== 'object' || s.facilityLevels === null) return '转生层历史快照 facilityLevels 非法';
    for (const v of Object.values(s.facilityLevels as Record<string, unknown>)) {
      if (!isFiniteNumber(v) || (v as number) < 1) return '转生层历史快照 facilityLevels 值非法';
    }
    if (!isFiniteNumber(s.achievementCount) || (s.achievementCount as number) < 0) return '转生层历史快照 achievementCount 非法';
    if (!isFiniteNumber(s.researchCount) || (s.researchCount as number) < 0) return '转生层历史快照 researchCount 非法';
  }
  // T3-1: 校验 shopPurchases——itemId → 购买等级，值须为非负整数
  // 不做白名单过滤（与 unlocked 不同）：T3-2 会扩充物品注册表，未知 itemId 前向保留
  const sp = p.shopPurchases;
  if (typeof sp !== 'object' || sp === null) return '转生层商店购买记录非法';
  for (const v of Object.values(sp as Record<string, unknown>)) {
    if (!isFiniteNumber(v) || !Number.isInteger(v) || (v as number) < 0) {
      return '转生层商店购买等级非法';
    }
  }
  return null;
}

export function validateState(rawIn: unknown): ParseResult {
  if (typeof rawIn !== 'object' || rawIn === null) return { ok: false, error: '存档不是有效的对象' };
  const migrated = migrate(rawIn as Record<string, unknown>);
  if (typeof migrated !== 'object' || migrated === null) return { ok: false, error: '存档不是有效的对象' };
  const s = migrated as Record<string, unknown>;

  if (s.version !== SAVE_VERSION) {
    return { ok: false, error: `存档版本不支持（当前版本 ${SAVE_VERSION}）` };
  }

  // T1-3: 回填 antimatter/darkmatter 字段——旧版 v6 存档不含这些字段
  if (!isFiniteNumber(s.antimatter)) s.antimatter = 0;
  if (!isFiniteNumber(s.darkmatter)) s.darkmatter = 0;

  for (const res of ['credits', 'stardust', 'refineryBuffer', 'crystal', 'energy', 'isotope', 'antimatter', 'darkmatter'] as const) {
    if (!isFiniteNumber(s[res]) || (s[res] as number) < 0) {
      return { ok: false, error: `资源 ${res} 不能为负数或非法值` };
    }
  }

  // T1-4: 校验 consumptionLog（v7 新增）——只持久化活跃 buff/进行中任务
  const clogErr = validateConsumptionLog(s.consumptionLog);
  if (clogErr !== null) return { ok: false, error: clogErr };

  // T2-1: 校验转生层（v8 新增）——独立持久化、跨转生保留
  const prestigeErr = validatePrestigeLayer(s.prestige);
  if (prestigeErr !== null) return { ok: false, error: prestigeErr };
  // M4 惯例：过滤掉不在 PRESTIGE_UNLOCKS 白名单内的 unlocked id，防恶意存档注入
  const prestige = s.prestige as PrestigeLayer;
  prestige.unlocked = prestige.unlocked.filter((id) => isRegisteredPrestigeUnlock(id));

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