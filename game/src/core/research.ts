import { TECH_BY_ID, TECH_NODES } from './config';
import { shopResearchCostMultiplier, hasAdvancedResearchUnlock } from './shopBonuses';
import type { GameState } from './types';

export interface ResearchResult {
  ok: boolean;
  reason?: string;
}

export function hasResearch(state: GameState, id: string): boolean {
  return state.research.includes(id);
}

/**
 * T3-2: 计算某项科技的有效研究成本（含商店折扣）。
 * 基础成本 × shopResearchCostMultiplier(state)（shop-research-grant 每级 -10%，下限 0.1）。
 * canResearch 与 researchTech 共用此函数，保证校验与扣减一致。
 */
export function researchCost(state: GameState, id: string): number {
  const node = TECH_BY_ID[id];
  if (!node) return Infinity;
  return Math.max(0, Math.floor(node.cost * shopResearchCostMultiplier(state)));
}

export function canResearch(state: GameState, id: string): ResearchResult {
  const node = TECH_BY_ID[id];
  if (!node) return { ok: false, reason: '未知科技' };
  if (hasResearch(state, id)) return { ok: false, reason: '已研究' };
  // T3-2: shop-advanced-research 购买后解除 tier 3 门禁；未购买时 tier 3+ 仍显示"后续版本开放"
  if (node.tier > 2 && !hasAdvancedResearchUnlock(state)) return { ok: false, reason: '后续版本开放' };
  for (const req of node.requires) {
    if (!hasResearch(state, req)) {
      return { ok: false, reason: `需先研究「${TECH_BY_ID[req]?.name ?? req}」` };
    }
  }
  const cost = researchCost(state, id);
  if (state.crystal < cost) return { ok: false, reason: `晶体不足（需 ${cost}）` };
  return { ok: true };
}

export function researchTech(state: GameState, id: string): ResearchResult {
  const check = canResearch(state, id);
  if (!check.ok) return check;
  state.crystal -= researchCost(state, id);
  state.research.push(id);
  state.stats.researchesCompleted += 1;
  return { ok: true };
}

export function branchTierDone(state: GameState, branch: (typeof TECH_NODES)[number]['branch'], minTier: number, maxTier: number): boolean {
  const nodes = TECH_NODES.filter((n) => n.branch === branch && n.tier >= minTier && n.tier <= maxTier);
  return nodes.length > 0 && nodes.every((n) => hasResearch(state, n.id));
}