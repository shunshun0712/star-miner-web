import { TECH_BY_ID, TECH_NODES } from './config';
import type { GameState } from './types';

export interface ResearchResult {
  ok: boolean;
  reason?: string;
}

export function hasResearch(state: GameState, id: string): boolean {
  return state.research.includes(id);
}

export function canResearch(state: GameState, id: string): ResearchResult {
  const node = TECH_BY_ID[id];
  if (!node) return { ok: false, reason: '未知科技' };
  if (hasResearch(state, id)) return { ok: false, reason: '已研究' };
  if (node.tier > 2) return { ok: false, reason: '后续版本开放' };
  for (const req of node.requires) {
    if (!hasResearch(state, req)) {
      return { ok: false, reason: `需先研究「${TECH_BY_ID[req]?.name ?? req}」` };
    }
  }
  if (state.crystal < node.cost) return { ok: false, reason: `晶体不足（需 ${node.cost}）` };
  return { ok: true };
}

export function researchTech(state: GameState, id: string): ResearchResult {
  const check = canResearch(state, id);
  if (!check.ok) return check;
  state.crystal -= TECH_BY_ID[id].cost;
  state.research.push(id);
  state.stats.researchesCompleted += 1;
  return { ok: true };
}

export function branchTierDone(state: GameState, branch: (typeof TECH_NODES)[number]['branch'], minTier: number, maxTier: number): boolean {
  const nodes = TECH_NODES.filter((n) => n.branch === branch && n.tier >= minTier && n.tier <= maxTier);
  return nodes.length > 0 && nodes.every((n) => hasResearch(state, n.id));
}