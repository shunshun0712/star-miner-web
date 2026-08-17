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