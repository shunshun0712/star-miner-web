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

/**
 * F1：转生动画期间是否应冻结交互（禁用 OrbitControls + 拦截点击）。
 *
 * 这是驱动 `controls.enabled` 的纯契约：
 * - 未开始（elapsedSec < 0，idle）→ false → controls.enabled = true
 * - 动画进行中（0 ≤ elapsedSec < TOTAL，collapse/burst/rebirth）→ true → controls.enabled = false
 * - 动画结束（elapsedSec ≥ TOTAL，done）→ false → controls.enabled = true
 *
 * 与 prestigeFX.isActive() 语义一致（isActive 跟踪 FX 实例的 active 标志 + 阶段计时），
 * 但本函数不依赖 Three.js，可在 node 环境单测；gameScene 的 frame 循环用 prestigeFX.isActive()
 * 作为实际门禁（与 resolve 触发点同源），本函数是并行表达的同一时间窗契约。
 */
export function isPrestigeAnimationActive(elapsedSec: number): boolean {
  return elapsedSec >= 0 && elapsedSec < PRESTIGE_FX_TOTAL;
}
