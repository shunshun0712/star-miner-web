import type {
  AchievementCategory,
  EnergyStrategyId,
  FacilityId,
  ResearchBranch,
  ResourceId,
} from './types';

export const GAME_VERSION = 'v0.4';
export const SAVE_VERSION = 6;
export const MAX_LEVEL = 5;
export const OFFLINE_CAP_MS = 8 * 3600 * 1000;
export const CRYSTAL_RECIPE_STARDUST = 4;
export const CRYSTAL_PRICE = 8;
export const STARDUST_PRICE = 1;
export const UPGRADE_COST_GROWTH = 1.7;
export const SPEED_GROWTH_PER_LEVEL = 0.2;
export const CAPACITY_GROWTH_PER_LEVEL = 0.25;
export const CRYSTAL_UPGRADE_THRESHOLD = 3;
export const SECOND_MINE_UNLOCK_CREDITS = 1250;
export const SECOND_MINE_UNLOCK_CRYSTALS = 20;
export const THIRD_MINE_UNLOCK_CRYSTALS = 100;

export const EVENT_FIRST_AFTER_MS = 2 * 60 * 1000;
export const EVENT_INTERVAL_MIN_MS = 3 * 60 * 1000;
export const EVENT_INTERVAL_MAX_MS = 5 * 60 * 1000;
export const DRONE_BOOST_MS = 30 * 1000;
export const DRONE_BOOST_MULT = 1.5;
export const DRONE_A_CREDITS = 50;
export const STORM_MS = 60 * 1000;
export const STORM_MULT = 0.8;
export const STORM_BALANCED_MULT = 0.9;
export const INVEST_COST = 200;
export const INVEST_BOOST = 0.05;
export const DEFAULT_STARDUST_KEEP = 50;
export const DEFAULT_CRYSTAL_KEEP = 10;

// 研究中心与科技树
export const RESEARCH_CENTER_UNLOCK_CRYSTALS = 50;

// 能源系统
export const ENERGY_STATION_UNLOCK_CREDITS = 1000;
export const ENERGY_STATION_UNLOCK_CRYSTALS = 15;
export const ENERGY_BASE_CONSUMPTION = 0.2;
export const ENERGY_RESERVE_CAP = 200;
export const ENERGY_RELEASE_COST = 100;
export const ENERGY_RELEASE_MS = 30 * 1000;
export const ENERGY_RELEASE_COOLDOWN_MS = 60 * 1000;
export const ENERGY_RELEASE_MULT = 1.2;
export const ENERGY_DEFICIT_MULT = 0.8;
export const ENERGY_DEFICIT_PROTECTED_MULT = 0.9;

// 科技效果数值
export const DRILL_MULT = 1.15;
export const VEIN_MULT = 1.1;
export const CATALYSIS_MULT = 1.2;
export const RAIL_MULT = 1.3;
export const PARALLEL_RAILS_MULT = 2;
export const SOLAR_BALANCED_MULT = 1.05;
export const TURBINE_MULT = 0.9;
export const CRYSTAL_QUALITY_MULT = 1.25;
export const BYPRODUCT_MULT = 0.2;
export const ISOTOPE_CHANCE = 0.05;
export const DRONE_CHANNEL_RATE = 0.5;
export const AUTO_ARRAY_LEVELS = 1;
export const RECIPE_3 = 3;

// 成就点数加成：每 10 点 +1% 全局产量
export const ACHIEVEMENT_POINTS_PER_MULT = 10;
export const ACHIEVEMENT_MULT_STEP = 0.01;

export interface FacilityConfig {
  id: FacilityId;
  name: string;
  baseSpeed: number;
  baseCapacity: number;
  baseUpgradeCost: number;
  baseCrystalUpgradeCost: number;
  unlockCost: number;
  produces: ResourceId;
  consumes?: { resource: ResourceId; amountPerOutput: number };
  rateUnit: string;
}

export const FACILITIES: Record<FacilityId, FacilityConfig> = {
  excavator: {
    id: 'excavator',
    name: '星尘采掘器',
    baseSpeed: 1.2,
    baseCapacity: 2000,
    baseUpgradeCost: 50,
    baseCrystalUpgradeCost: 4,
    unlockCost: 0,
    produces: 'stardust',
    rateUnit: '星尘矿/秒',
  },
  he3Excavator: {
    id: 'he3Excavator',
    name: '氦-3 采掘器',
    baseSpeed: 1.2,
    baseCapacity: 2000,
    baseUpgradeCost: 50,
    baseCrystalUpgradeCost: 4,
    unlockCost: SECOND_MINE_UNLOCK_CREDITS,
    produces: 'stardust',
    rateUnit: '星尘矿/秒',
  },
  deuteriumExcavator: {
    id: 'deuteriumExcavator',
    name: '氘采掘器',
    baseSpeed: 1.4,
    baseCapacity: 2500,
    baseUpgradeCost: 80,
    baseCrystalUpgradeCost: 6,
    unlockCost: 3000,
    produces: 'stardust',
    rateUnit: '星尘矿/秒',
  },
  transport: {
    id: 'transport',
    name: '磁轨运输线',
    baseSpeed: 1.0,
    baseCapacity: 2000,
    baseUpgradeCost: 120,
    baseCrystalUpgradeCost: 6,
    unlockCost: 600,
    produces: 'stardust',
    rateUnit: '星尘矿/秒',
  },
  refinery: {
    id: 'refinery',
    name: '晶体精炼厂',
    baseSpeed: 0.25,
    baseCapacity: 1000,
    baseUpgradeCost: 300,
    baseCrystalUpgradeCost: 10,
    unlockCost: 1000,
    produces: 'crystal',
    consumes: { resource: 'stardust', amountPerOutput: 4 },
    rateUnit: '晶体/秒',
  },
  energyStation: {
    id: 'energyStation',
    name: '能源站',
    baseSpeed: 1.0,
    baseCapacity: 0,
    baseUpgradeCost: 200,
    baseCrystalUpgradeCost: 8,
    unlockCost: ENERGY_STATION_UNLOCK_CREDITS,
    produces: 'energy',
    rateUnit: '能量/秒',
  },
};

export const FACILITY_ORDER: FacilityId[] = [
  'excavator',
  'he3Excavator',
  'deuteriumExcavator',
  'transport',
  'refinery',
  'energyStation',
];

export const ENERGY_STRATEGIES: Record<EnergyStrategyId, Record<FacilityId, number>> = {
  excavation: {
    excavator: 1.35,
    he3Excavator: 1.35,
    deuteriumExcavator: 1.35,
    transport: 0.9,
    refinery: 0.9,
    energyStation: 1,
  },
  balanced: {
    excavator: 1,
    he3Excavator: 1,
    deuteriumExcavator: 1,
    transport: 1,
    refinery: 1,
    energyStation: 1,
  },
  refinement: {
    excavator: 0.9,
    he3Excavator: 0.9,
    deuteriumExcavator: 0.9,
    transport: 0.9,
    refinery: 1.35,
    energyStation: 1,
  },
};

// 各策略下设施的能源消耗倍率（能源站不消耗能源）
export const ENERGY_CONSUMPTION_MULTS: Record<EnergyStrategyId, Record<FacilityId, number>> = {
  excavation: {
    excavator: 0.6,
    he3Excavator: 0.6,
    deuteriumExcavator: 0.6,
    transport: 1.3,
    refinery: 1.3,
    energyStation: 0,
  },
  balanced: {
    excavator: 1,
    he3Excavator: 1,
    deuteriumExcavator: 1,
    transport: 1,
    refinery: 1,
    energyStation: 0,
  },
  refinement: {
    excavator: 1.3,
    he3Excavator: 1.3,
    deuteriumExcavator: 1.3,
    transport: 1.3,
    refinery: 0.6,
    energyStation: 0,
  },
};

export const ENERGY_CONSUMERS: FacilityId[] = ['excavator', 'he3Excavator', 'deuteriumExcavator', 'transport', 'refinery'];

export const ENERGY_STRATEGY_IDS: EnergyStrategyId[] = ['excavation', 'balanced', 'refinement'];

export const ENERGY_STRATEGY_LABELS: Record<EnergyStrategyId, string> = {
  excavation: '采掘优先',
  balanced: '均衡运行',
  refinement: '精炼优先',
};

export interface TechNode {
  id: string;
  branch: ResearchBranch;
  tier: number;
  name: string;
  description: string;
  cost: number;
  requires: string[];
}

export const TECH_BRANCH_ORDER: ResearchBranch[] = ['excavation', 'energy', 'refinement', 'transport'];

export const TECH_BRANCH_LABELS: Record<ResearchBranch, string> = {
  excavation: '采掘科技',
  energy: '能源科技',
  refinement: '精炼科技',
  transport: '运输科技',
};

export const TECH_NODES: TechNode[] = [
  { id: 'basicResearch', branch: 'excavation', tier: 0, name: '基础研究', description: '建立研究中心，解锁四大科技分支', cost: 15, requires: [] },
  { id: 'drillHardening', branch: 'excavation', tier: 1, name: '强化钻头', description: '所有采掘器 +15% 产量', cost: 20, requires: ['basicResearch'] },
  { id: 'veinProspecting', branch: 'excavation', tier: 1, name: '矿脉探测', description: '采掘按期望 +10% 产量（10% 概率双倍）', cost: 25, requires: ['basicResearch'] },
  { id: 'autoMiningArray', branch: 'excavation', tier: 2, name: '自动采掘阵列', description: '每个采掘器额外 +1 级自动产出（不占等级上限）', cost: 80, requires: ['drillHardening'] },
  { id: 'rareIsotopeMining', branch: 'excavation', tier: 2, name: '稀有矿同位素', description: '采掘时有概率获得「同位素」（按期望 5%/秒）', cost: 100, requires: ['veinProspecting'] },
  { id: 'quantumMining', branch: 'excavation', tier: 3, name: '量子采掘', description: '采掘速度 +50%（后续版本开放）', cost: 300, requires: ['autoMiningArray'] },
  { id: 'nanoCollector', branch: 'excavation', tier: 3, name: '纳米采集器', description: '同位素获取概率提升（后续版本开放）', cost: 350, requires: ['rareIsotopeMining'] },
  { id: 'coreMiningProtocol', branch: 'excavation', tier: 4, name: '星核采掘协议', description: '所有采掘器产量 ×2（后续版本开放）', cost: 800, requires: ['quantumMining', 'nanoCollector'] },
  { id: 'highEfficiencyTurbine', branch: 'energy', tier: 1, name: '高效涡轮', description: '全设施能源消耗 -10%', cost: 20, requires: ['basicResearch'] },
  { id: 'solarPanels', branch: 'energy', tier: 1, name: '太阳能板', description: '均衡策略下全设施产量 +5%', cost: 25, requires: ['basicResearch'] },
  { id: 'energyReserve', branch: 'energy', tier: 2, name: '能源储备', description: '解锁能量储备池（200 容量）与「释放储备」', cost: 80, requires: ['highEfficiencyTurbine'] },
  { id: 'overloadProtection', branch: 'energy', tier: 2, name: '过载保护', description: '能源不足惩罚由 -20% 降至 -10%', cost: 100, requires: ['solarPanels'] },
  { id: 'fusionReactor', branch: 'energy', tier: 3, name: '聚变反应堆', description: '解锁第四档聚变模式（后续版本开放）', cost: 300, requires: ['energyReserve'] },
  { id: 'smartGrid', branch: 'energy', tier: 3, name: '智能电网', description: '设施独立能源策略（后续版本开放）', cost: 350, requires: ['overloadProtection'] },
  { id: 'zeroPointExtraction', branch: 'energy', tier: 4, name: '零点能提取', description: '能源不再受限（后续版本开放）', cost: 800, requires: ['fusionReactor', 'smartGrid'] },
  { id: 'efficientCatalysis', branch: 'refinement', tier: 1, name: '高效催化', description: '精炼速度 +20%', cost: 20, requires: ['basicResearch'] },
  { id: 'recipeOptimization', branch: 'refinement', tier: 1, name: '配方优化', description: '精炼配方 4:1 → 3:1', cost: 30, requires: ['basicResearch'] },
  { id: 'byproductRecovery', branch: 'refinement', tier: 2, name: '副产品回收', description: '精炼时额外产出 20% 星尘', cost: 80, requires: ['efficientCatalysis'] },
  { id: 'crystalQuality', branch: 'refinement', tier: 2, name: '晶体品质', description: '晶体售价 +25%', cost: 100, requires: ['recipeOptimization'] },
  { id: 'quantumRefining', branch: 'refinement', tier: 3, name: '量子精炼', description: '2:1 配方与高品质晶体（后续版本开放）', cost: 350, requires: ['byproductRecovery'] },
  { id: 'autoRefiningChain', branch: 'refinement', tier: 3, name: '自动精炼链', description: '精炼厂等级上限 +2（后续版本开放）', cost: 300, requires: ['crystalQuality'] },
  { id: 'matterRecomposition', branch: 'refinement', tier: 4, name: '物质重组', description: '1:1 配方与晶体裂变（后续版本开放）', cost: 900, requires: ['quantumRefining', 'autoRefiningChain'] },
  { id: 'railAcceleration', branch: 'transport', tier: 1, name: '磁轨加速', description: '运输速度 +30%', cost: 20, requires: ['basicResearch'] },
  { id: 'cargoExpansion', branch: 'transport', tier: 1, name: '扩容货舱', description: '运输容量 +50%', cost: 25, requires: ['basicResearch'] },
  { id: 'parallelRails', branch: 'transport', tier: 2, name: '多轨并行', description: '运输速度 ×2', cost: 120, requires: ['railAcceleration'] },
  { id: 'droneLogistics', branch: 'transport', tier: 2, name: '无人机配送', description: '解锁物流无人机：0.5 星尘/秒直送精炼缓冲', cost: 100, requires: ['cargoExpansion'] },
  { id: 'quantumTeleport', branch: 'transport', tier: 3, name: '量子传送', description: '运输瞬间到达（后续版本开放）', cost: 400, requires: ['parallelRails'] },
  { id: 'logisticsAI', branch: 'transport', tier: 3, name: '物流 AI', description: '自动优化运输优先级（后续版本开放）', cost: 300, requires: ['droneLogistics'] },
  { id: 'spaceFold', branch: 'transport', tier: 4, name: '空间折叠', description: '所有矿区共享库存池（后续版本开放）', cost: 850, requires: ['quantumTeleport', 'logisticsAI'] },
];

export const TECH_BY_ID: Record<string, TechNode> = Object.fromEntries(TECH_NODES.map((n) => [n.id, n]));

export interface AchievementDef {
  id: string;
  category: AchievementCategory;
  name: string;
  description: string;
  rewardCredits: number;
  rewardCrystals: number;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'p100Stardust', category: 'production', name: '初出茅庐', description: '累计产出 100 星尘矿', rewardCredits: 50, rewardCrystals: 1 },
  { id: 'p1000Stardust', category: 'production', name: '星尘大户', description: '累计产出 1000 星尘矿', rewardCredits: 150, rewardCrystals: 3 },
  { id: 'p100Crystal', category: 'production', name: '晶体学徒', description: '累计产出 100 晶体', rewardCredits: 300, rewardCrystals: 5 },
  { id: 'p500Crystal', category: 'production', name: '晶体工匠', description: '累计产出 500 晶体', rewardCredits: 800, rewardCrystals: 10 },
  { id: 'p1000Crystal', category: 'production', name: '晶体大师', description: '累计产出 1000 晶体', rewardCredits: 1500, rewardCrystals: 20 },
  { id: 'c1000Credits', category: 'production', name: '第一桶金', description: '累计获得 1000 信用点', rewardCredits: 100, rewardCrystals: 2 },
  { id: 'c10000Credits', category: 'production', name: '致富之路', description: '累计获得 10000 信用点', rewardCredits: 500, rewardCrystals: 8 },
  { id: 'e1000Energy', category: 'production', name: '能源先驱', description: '累计产出 1000 能量', rewardCredits: 200, rewardCrystals: 4 },
  { id: 'allFacilities', category: 'construction', name: '设施齐全', description: '解锁全部 6 个设施', rewardCredits: 400, rewardCrystals: 6 },
  { id: 'allLevel3', category: 'construction', name: '全员三级', description: '所有已解锁设施达到 3 级', rewardCredits: 500, rewardCrystals: 8 },
  { id: 'anyLevel5', category: 'construction', name: '满级王者', description: '任一设施达到 5 级', rewardCredits: 600, rewardCrystals: 10 },
  { id: 'researchCenter', category: 'construction', name: '研究中心成立', description: '解锁研究中心', rewardCredits: 300, rewardCrystals: 5 },
  { id: 'allMines', category: 'construction', name: '矿区全开', description: '解锁第二与第三矿区', rewardCredits: 350, rewardCrystals: 6 },
  { id: 'tBasic', category: 'tech', name: '启蒙', description: '完成基础研究', rewardCredits: 100, rewardCrystals: 2 },
  { id: 'tBranchT1', category: 'tech', name: '分支奠基', description: '任一分支完成全部 T1 科技', rewardCredits: 200, rewardCrystals: 4 },
  { id: 't5', category: 'tech', name: '科技新星', description: '累计研究 5 个科技', rewardCredits: 400, rewardCrystals: 6 },
  { id: 't10', category: 'tech', name: '科技学者', description: '累计研究 10 个科技', rewardCredits: 800, rewardCrystals: 12 },
  { id: 'tExcavation', category: 'tech', name: '采掘学成', description: '完成采掘分支 T1–T2 全部科技', rewardCredits: 600, rewardCrystals: 10 },
  { id: 'tRefinement', category: 'tech', name: '精炼学成', description: '完成精炼分支 T1–T2 全部科技', rewardCredits: 600, rewardCrystals: 10 },
  { id: 'ev10', category: 'event', name: '事件初体验', description: '累计触发 10 次事件', rewardCredits: 150, rewardCrystals: 3 },
  { id: 'evDrone20', category: 'event', name: '无人机常客', description: '处理 20 次无人机事件', rewardCredits: 300, rewardCrystals: 5 },
  { id: 'evStorm3', category: 'event', name: '风暴见证者', description: '经历 3 次太阳风暴', rewardCredits: 250, rewardCrystals: 4 },
  { id: 'evInvest1', category: 'event', name: '投资有道', description: '完成 1 次投入型事件', rewardCredits: 200, rewardCrystals: 4 },
  { id: 'ev30', category: 'event', name: '事件达人', description: '累计触发 30 次事件', rewardCredits: 500, rewardCrystals: 8 },
  { id: 'xIsotope10', category: 'exploration', name: '同位素收藏家', description: '累计获得 10 个同位素', rewardCredits: 300, rewardCrystals: 5 },
  { id: 'xHe3L3', category: 'exploration', name: '氦三深潜', description: '氦-3 采掘器达到 3 级', rewardCredits: 250, rewardCrystals: 4 },
  { id: 'xDeutL3', category: 'exploration', name: '氘三远征', description: '氘-3 采掘器达到 3 级', rewardCredits: 350, rewardCrystals: 6 },
  { id: 'hOffline', category: 'hidden', name: '深空静默', description: '单次离线收益达到 500 晶体', rewardCredits: 1000, rewardCrystals: 20 },
  { id: 'hEnergyFull', category: 'hidden', name: '能量富余', description: '能量储备达到 200', rewardCredits: 400, rewardCrystals: 8 },
  { id: 'hCombo', category: 'hidden', name: '科技能源双修', description: '研究科技 ≥6 个且能量储备 ≥100', rewardCredits: 700, rewardCrystals: 12 },
];

export const ACHIEVEMENT_BY_ID: Record<string, AchievementDef> = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]));

export const ACHIEVEMENT_CATEGORY_LABELS: Record<AchievementCategory, string> = {
  production: '生产',
  construction: '建设',
  tech: '科技',
  event: '事件',
  exploration: '探索',
  hidden: '隐藏',
};