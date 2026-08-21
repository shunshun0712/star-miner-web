export type ResourceId = 'credits' | 'stardust' | 'crystal' | 'energy' | 'isotope';
export type FacilityId = 'excavator' | 'he3Excavator' | 'deuteriumExcavator' | 'transport' | 'refinery' | 'energyStation';
export type EnergyStrategyId = 'excavation' | 'balanced' | 'refinement';
export type FacilityStatus = 'ONLINE' | 'LOCKED' | 'BUILDING' | 'UPGRADING' | 'OFFLINE';
export type EventKind = 'drone' | 'solar-storm' | 'invest';
export type ResearchBranch = 'excavation' | 'energy' | 'refinement' | 'transport';
export type AchievementCategory = 'production' | 'construction' | 'tech' | 'event' | 'exploration' | 'hidden';

export interface FacilityState {
  level: number;
  unlocked: boolean;
}

export interface PendingEvent {
  id: string;
  kind: EventKind;
  createdAt: number;
}

export interface GameSettings {
  autoSellStardust: boolean;
  stardustKeepAmount: number;
  autoSellCrystal: boolean;
  crystalKeepAmount: number;
}

export interface EventState {
  pendingEvent: PendingEvent | null;
  nextEventAt: number;
  droneBoostUntil: number;
  solarStormUntil: number;
  investUsed: boolean;
}

export interface LifetimeStats {
  totalStardustProduced: number;
  totalCrystalProduced: number;
  totalCreditsEarned: number;
  totalEnergyProduced: number;
  totalIsotopeProduced: number;
  eventsTriggered: number;
  droneEventsHandled: number;
  solarStormsExperienced: number;
  investmentsMade: number;
  upgradesPerformed: number;
  researchesCompleted: number;
  lastOfflineCrystalGain: number;
}

export interface GameState {
  /**
   * T2-1: 存档版本升至 8——引入转生层（prestige）。
   * T3-1: 存档版本升至 9——转生层新增 shopPurchases（星核商店购买等级表）。
   * 基线层（除 prestige 外的全部字段）随转生重置；转生层独立持久化、跨转生保留。
   */
  version: 9;
  credits: number;
  stardust: number;
  refineryBuffer: number;
  crystal: number;
  energy: number;
  isotope: number;
  /** T1-3: T3 稀有资源（反物质），v0.5 只注册 schema 不配数值 */
  antimatter: number;
  /** T1-3: T4 稀有资源（暗物质），v0.5 只注册 schema 不配数值 */
  darkmatter: number;
  /** T1-4: 消耗日志——只持久化活跃 buff/进行中任务，历史消耗聚合后丢弃（防存档臃肿） */
  consumptionLog: ConsumptionLog;
  facilities: Record<FacilityId, FacilityState>;
  energyStrategy: EnergyStrategyId;
  eventState: EventState;
  settings: GameSettings;
  researchCenterUnlocked: boolean;
  research: string[];
  stats: LifetimeStats;
  achievements: string[];
  energyReleaseUntil: number;
  energyReleaseCooldownUntil: number;
  createdAt: number;
  lastSavedAt: number;
  /**
   * T2-1: 转生层（v8 新增）——独立持久化、跨转生保留。
   * 转生只重置基线层，prestige 永不随重置清空（prestigeLevel +1、永久解锁不变）。
   */
  prestige: PrestigeLayer;
}

/**
 * T2-1: 转生层——基线层重置后仍保留的"永久进度"。
 *
 * 字段（与派单一致：永久解锁列表 / 星核余额 / 转生次数 / 转生历史快照）：
 * - unlocked：永久解锁列表，每个 id 在 PRESTIGE_UNLOCKS 注册；转生后基线层据此获得永久 buff
 * - stardust：星核余额（转生货币，用于商店购买永久解锁；注意区别于基线层的星尘资源同名）
 * - prestigeLevel：当前转生等级（转生次数；首次转生后 +1）
 * - history：转生历史快照列表，每条记录转生时刻的基线层摘要，供转生仪式"成就回顾"展示
 */
export interface PrestigeLayer {
  /**
   * 永久解锁列表——转生后基线层据此获得永久 buff（不随重置清空）。
   *
   * @deprecated M4 星核商店（shopPurchases + applyShopBonuses）已替代此字段的永久加成功能。
   * 本字段无生产代码写入路径（createEmptyPrestigeLayer 初始化为 []，planPrestigeReset 仅原样拷贝），
   * 新功能应使用 shopPurchases + SHOP_ITEMS.onBaseline 回调。
   * 保留此字段以兼容旧存档迁移（unlocked 非空时 buildPrestigeBaseline 仍会 apply PRESTIGE_UNLOCKS）。
   */
  unlocked: string[];
  /** 星核余额——转生货币（区别于基线层的星尘资源 stardust） */
  stardust: number;
  /** 转生等级（即转生次数，首次转生后 +1） */
  prestigeLevel: number;
  /** 转生历史快照（按时间顺序，最近的在末尾） */
  history: PrestigeHistoryEntry[];
  /**
   * T3-1: 星核商店购买等级表——itemId → 已购买等级（0 级 = 未购买）。
   *
   * 支持可重复购买物品（成本递增）：每购买一次 level +1，下一级成本按
   * baseCost × costMultiplier^level 计算。跨转生持久化（转生不清空购物记录）。
   */
  shopPurchases: Record<string, number>;
}

/** 转生历史快照条目——记录单次转生时刻的基线层摘要 */
export interface PrestigeHistoryEntry {
  /** 第几次转生（从 1 开始，与 prestigeLevel 增量对齐） */
  sequence: number;
  /** 转生时间戳 */
  timestamp: number;
  /** 转生时基线层快照（用于"成就回顾"） */
  baselineSnapshot: PrestigeBaselineSnapshot;
  /** 本次转生获得的星核 */
  stardustEarned: number;
}

/** 转生时刻的基线层快照——只保留摘要字段，避免存档随转生次数臃肿 */
export interface PrestigeBaselineSnapshot {
  credits: number;
  stardust: number;
  crystal: number;
  isotope: number;
  antimatter: number;
  darkmatter: number;
  facilityLevels: Record<FacilityId, number>;
  achievementCount: number;
  researchCount: number;
  /** 本轮（即将被重置的"一世"）的开始时间 */
  createdAt: number;
}

/**
 * T2-1: 基线层类型——剔除 prestige 字段后的 GameState，即"随转生重置"的部分。
 * save/ 分层持久化时用它表示存到 'main' 键的基线数据。
 */
export type BaselineState = Omit<GameState, 'prestige'>;

export interface ProductionRates {
  excavator: number;
  he3Excavator: number;
  deuteriumExcavator: number;
  transport: number;
  refinery: number;
  energyStation: number;
}

export interface ProductionSummary {
  producedStardust: number;
  movedStardust: number;
  movedDrone: number;
  refinedCrystal: number;
  byproductStardust: number;
  isotopeProduced: number;
  energyDeficit: boolean;
  rates: ProductionRates;
  bottlenecks: FacilityId[];
  transportCongested: boolean;
}

// ===== M1 v0.5: Resource Schema & Config Schema Versioning =====

export type ResourceCategory = 'currency' | 'material' | 'energy' | 'rare' | 'intermediate';

/**
 * 可注册的资源 schema。描述一种资源类型的元数据，供资源注册表统一管理。
 * v0.5 只注册 schema 不配 T3/T4 数值（数值平衡留 v0.6）。
 */
export interface ResourceSchema {
  id: string;
  name: string;
  description: string;
  category: ResourceCategory;
  /** 是否可出售换取信用点 */
  sellable: boolean;
  /** 是否可被设施/科技节点消耗 */
  consumable: boolean;
  /** 映射到 GameState 的数值属性名，consumable/sellable 资源必填 */
  stateKey?: keyof GameState;
  /** 该资源 schema 的版本号，用于前向兼容检测 */
  schemaVersion: number;
}

// ===== T1-4: 消耗日志（v7 新增） =====

/**
 * 活跃消耗条目的种类——与 ConsumptionKind 对应，但持久层自洽定义，
 * 不从 consumption.ts 反向导入，避免 types.ts ↔ consumption.ts 循环依赖。
 */
export type ConsumptionLogKind = 'buff' | 'exploration' | 'exchange';

/** 活跃消耗条目的产出条目（与 consumption.ts 的 ProductionEntry 同构，持久层自洽定义） */
export interface ConsumptionLogProduction {
  resourceId: string;
  amount: number;
}

/**
 * 活跃消耗日志条目——只持久化未到期 buff / 进行中任务。
 * 历史消耗（已完结/过期/回滚）折叠进 aggregate 后丢弃明细，防止存档随游玩臃肿。
 */
export interface ConsumptionLogEntry {
  /** 事件唯一 ID（与 ConsumptionEngine 的 ConsumptionEvent.id 对应） */
  id: string;
  kind: ConsumptionLogKind;
  /** 被消耗的资源 ID（必须已在资源注册表注册） */
  resourceId: string;
  /** 消耗数量 */
  amount: number;
  /** 消耗产出 */
  produced: ConsumptionLogProduction[];
  /** 激活/发起时间戳 */
  timestamp: number;
  /** 到期/完成时间戳——buff 倒计时结束、探索任务完成；undefined 表示无截止（持续进行中） */
  expiresAt?: number;
  /** 幂等键——离线结算防重复 */
  idempotencyKey?: string;
}

/** 历史消耗聚合——已完结/过期/回滚的消耗折叠到此，不保留明细 */
export interface ConsumptionAggregate {
  /** 累计已完结的消耗事件数 */
  completedEvents: number;
  /** 按资源 ID 聚合的累计消耗量 */
  consumedByResource: Record<string, number>;
  /** 按资源 ID 聚合的累计产出量 */
  producedByResource: Record<string, number>;
}

/**
 * 消耗日志（v7 新增 GameState 字段）。
 * - active：只含活跃项（未到期 buff / 进行中任务），存档时由 pruneConsumptionLog 修剪
 * - aggregate：历史消耗折叠至此，明细丢弃
 */
export interface ConsumptionLog {
  active: ConsumptionLogEntry[];
  aggregate: ConsumptionAggregate;
}