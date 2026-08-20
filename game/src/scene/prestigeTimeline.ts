/**
 * T2-3: 转生动画时间线——纯函数，不依赖 Three.js，可在 node 环境单测。
 *
 * 阶段划分（总时长 4.2s，落在 3-5s 验收区间）：
 * - [0, 1.6)   collapse：星体收缩坍缩
 * - [1.6, 2.4) burst：爆发闪光 + 粒子外冲
 * - [2.4, 4.2) rebirth：新星展开、世界淡入
 * - ≥4.2       done
 */

/** 转生动画阶段 */
export type PrestigePhase = 'idle' | 'collapse' | 'burst' | 'rebirth' | 'done';

/** 各阶段时长（秒） */
export const PRESTIGE_FX_DURATIONS = {
  collapse: 1.6,
  burst: 0.8,
  rebirth: 1.8,
} as const;

/** 动画总时长（秒） */
export const PRESTIGE_FX_TOTAL =
  PRESTIGE_FX_DURATIONS.collapse + PRESTIGE_FX_DURATIONS.burst + PRESTIGE_FX_DURATIONS.rebirth;

/** 某时刻的动画阶段状态 */
export interface PrestigePhaseState {
  phase: PrestigePhase;
  /** 当前阶段内进度 0..1 */
  phaseProgress: number;
  /** 全程进度 0..1 */
  overall: number;
  /** 自动画开始经过的秒数（clamp 到 [0, TOTAL]） */
  elapsed: number;
}

/** 根据已过秒数计算当前阶段——纯函数 */
export function prestigePhaseAt(elapsedSec: number): PrestigePhaseState {
  const { collapse, burst, rebirth } = PRESTIGE_FX_DURATIONS;
  if (elapsedSec < 0) return { phase: 'idle', phaseProgress: 0, overall: 0, elapsed: 0 };
  if (elapsedSec >= PRESTIGE_FX_TOTAL) {
    return { phase: 'done', phaseProgress: 1, overall: 1, elapsed: PRESTIGE_FX_TOTAL };
  }
  if (elapsedSec < collapse) {
    return {
      phase: 'collapse',
      phaseProgress: elapsedSec / collapse,
      overall: elapsedSec / PRESTIGE_FX_TOTAL,
      elapsed: elapsedSec,
    };
  }
  if (elapsedSec < collapse + burst) {
    const t = elapsedSec - collapse;
    return { phase: 'burst', phaseProgress: t / burst, overall: elapsedSec / PRESTIGE_FX_TOTAL, elapsed: elapsedSec };
  }
  const t = elapsedSec - collapse - burst;
  return { phase: 'rebirth', phaseProgress: t / rebirth, overall: elapsedSec / PRESTIGE_FX_TOTAL, elapsed: elapsedSec };
}
