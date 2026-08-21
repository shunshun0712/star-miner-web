/**
 * T2-3: 转生仪式 UI 数据装配层——纯函数，不触碰 DOM / Three.js。
 *
 * T2-2 的 prestige.ts 提供"做了什么"（preview / execute / computeStardustEarned），
 * 本模块提供"怎么展示"：
 * - computeStardustBreakdown：把 computeStardustEarned 的公式拆成各资源/设施/研究的独立贡献，
 *   供仪式步骤二「星核结算」逐行展示，且总和与 computeStardustEarned 严格一致。
 * - buildBaselineReview：把转生前基线层压成"成就回顾"摘要（步骤一）。
 * - describePrestigeBonuses：把 prestige.unlocked id 列表映射成带名称/描述的展示条目（步骤三）。
 *
 * 纯函数 + 复用 T2-2 常量，v0.6 调参只改 prestige.ts 一处，本模块自动跟随。
 */
import {
  STARDUST_EARN_RATES,
  STARDUST_PER_FACILITY_LEVEL,
  STARDUST_PER_RESEARCH,
  computeStardustEarned,
} from './prestige';
import { PRESTIGE_UNLOCKS } from './prestigeLayer';
import { shopPrestigeGainMultiplier } from './shopBonuses';
import type { FacilityId, GameState } from './types';

/** 单项星核贡献（资源 / 设施 / 研究通用结构） */
export interface StardustBreakdownItem {
  /** 资源 id（crystal/isotope/...）或 'facility' / 'research' */
  id: string;
  /** 展示名 */
  label: string;
  /** 资源量 / Σ(等级-1) / 研究数 */
  amount: number;
  /** 折算比率（每单位贡献的点数） */
  rate: number;
  /** 该项贡献的点数 */
  points: number;
}

/** 星核结算拆解——仪式步骤二逐行展示 */
export interface StardustBreakdown {
  /** 5 种资源各自贡献（按稀有度从低到高） */
  resourceItems: StardustBreakdownItem[];
  /** 设施等级贡献汇总 */
  facility: { totalLevelsAboveOne: number; rate: number; points: number };
  /** 研究进度贡献汇总 */
  research: { count: number; rate: number; points: number };
  /** floor 前的总点数（浮点） */
  totalPoints: number;
  /** T3-2: shop-prestige-amplifier 转生收益乘子（1.0 = 无加成） */
  shopGainMultiplier: number;
  /** floor 后的星核（与 computeStardustEarned 一致） */
  stardustEarned: number;
}

/** 资源展示名（与资源注册表一致，避免 UI 层反向依赖 resourceRegistry） */
export const STARDUST_BREAKDOWN_RESOURCE_LABELS: Record<string, string> = {
  stardust: '星尘矿',
  crystal: '晶体',
  isotope: '同位素',
  antimatter: '反物质',
  darkmatter: '暗物质',
};

/** 拆解展示顺序：按稀有度从低到高（星尘→晶体→同位素→反物质→暗物质） */
const BREAKDOWN_RESOURCE_ORDER: Array<keyof typeof STARDUST_EARN_RATES> = [
  'stardust',
  'crystal',
  'isotope',
  'antimatter',
  'darkmatter',
];

/**
 * 拆解 computeStardustEarned 公式为各项独立贡献。
 *
 * 红线：stardustEarned 必须与 computeStardustEarned(state) 严格相等——
 * 本函数复用同一组常量、同一 floor，只是把求和过程展开成可逐行展示的结构。
 */
export function computeStardustBreakdown(state: GameState): StardustBreakdown {
  const resourceItems: StardustBreakdownItem[] = BREAKDOWN_RESOURCE_ORDER.map((id) => {
    const amount = state[id] as number;
    const rate = STARDUST_EARN_RATES[id];
    return { id, label: STARDUST_BREAKDOWN_RESOURCE_LABELS[id], amount, rate, points: amount * rate };
  });

  const totalLevelsAboveOne = Object.values(state.facilities).reduce(
    (sum, f) => sum + Math.max(0, f.level - 1),
    0,
  );
  const facilityPoints = totalLevelsAboveOne * STARDUST_PER_FACILITY_LEVEL;

  const researchCount = state.research.length;
  const researchPoints = researchCount * STARDUST_PER_RESEARCH;

  const totalPoints =
    resourceItems.reduce((s, i) => s + i.points, 0) + facilityPoints + researchPoints;

  // T3-2: 同步 shop-prestige-amplifier 转生收益乘子，保持 stardustEarned === computeStardustEarned
  const shopGainMultiplier = shopPrestigeGainMultiplier(state);

  return {
    resourceItems,
    facility: { totalLevelsAboveOne, rate: STARDUST_PER_FACILITY_LEVEL, points: facilityPoints },
    research: { count: researchCount, rate: STARDUST_PER_RESEARCH, points: researchPoints },
    totalPoints,
    shopGainMultiplier,
    stardustEarned: Math.floor(totalPoints * shopGainMultiplier),
  };
}

/** 仪式步骤枚举（与 UI 三步引导一一对应） */
export type CeremonyStep = 'review' | 'settlement' | 'confirm';

/** 三步顺序常量（UI 渲染步骤指示器用） */
export const CEREMONY_STEPS: CeremonyStep[] = ['review', 'settlement', 'confirm'];

/** 步骤展示名 */
export const CEREMONY_STEP_LABELS: Record<CeremonyStep, string> = {
  review: '成就回顾',
  settlement: '星核结算',
  confirm: '确认转生',
};

/** 成就回顾摘要（步骤一）——把转生前基线层压成展示用结构 */
export interface BaselineReviewSummary {
  /** 本世开始时间戳 */
  createdAt: number;
  credits: number;
  stardust: number;
  crystal: number;
  isotope: number;
  antimatter: number;
  darkmatter: number;
  /** 已解锁设施数 */
  facilityCount: number;
  /** 各设施等级 */
  facilityLevels: Record<FacilityId, number>;
  /** 完成研究数 */
  researchCount: number;
  /** 达成成就数 */
  achievementCount: number;
}

/**
 * 构造"成就回顾"摘要——从完整 GameState（或 previewPrestigeReset 返回的 baselineBefore）读取。
 * 接受 GameState 子集（BaselineState 即剔除 prestige 后的字段集），只要含展示所需字段即可。
 */
export function buildBaselineReview(state: GameState): BaselineReviewSummary {
  const facilityLevels = {} as Record<FacilityId, number>;
  let facilityCount = 0;
  (Object.keys(state.facilities) as FacilityId[]).forEach((id) => {
    facilityLevels[id] = state.facilities[id].level;
    if (state.facilities[id].unlocked) facilityCount += 1;
  });
  return {
    createdAt: state.createdAt,
    credits: state.credits,
    stardust: state.stardust,
    crystal: state.crystal,
    isotope: state.isotope,
    antimatter: state.antimatter,
    darkmatter: state.darkmatter,
    facilityCount,
    facilityLevels,
    researchCount: state.research.length,
    achievementCount: state.achievements.length,
  };
}

/** 永久加成展示条目（步骤三）——映射 PRESTIGE_UNLOCKS schema */
export interface PrestigeBonusView {
  id: string;
  name: string;
  description: string;
}

/** 把 prestige.unlocked id 列表映射成带名称/描述的展示条目（未注册的 id 过滤掉） */
export function describePrestigeBonuses(unlocked: string[]): PrestigeBonusView[] {
  return unlocked
    .map((id) => PRESTIGE_UNLOCKS[id])
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({ id: s.id, name: s.name, description: s.description }));
}

/** 重申 T2-2 入口，便于 UI 单点 import（避免 UI 直接依赖 prestige.ts 的公式常量） */
export { computeStardustEarned } from './prestige';
