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
  version: 6;
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
}

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