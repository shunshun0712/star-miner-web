import { formatNumber } from '../core/format';
import { easeOutCubic } from '../art/easing';

/** 数字滚动：600ms easeOutCubic，用于升级后的数据反馈。 */
export function animateNumber(
  el: HTMLElement,
  from: number,
  to: number,
  duration = 600,
  formatter: (n: number) => string = formatNumber,
): void {
  const start = performance.now();
  const delta = to - from;
  const step = (now: number): void => {
    const t = Math.min(1, (now - start) / duration);
    el.textContent = formatter(from + delta * easeOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** 一次性脉冲类名：先移除再触发 reflow，保证动画可重播。 */
export function pulseOnce(el: HTMLElement, className: string, duration = 450): void {
  el.classList.remove(className);
  void el.offsetWidth;
  el.classList.add(className);
  window.setTimeout(() => el.classList.remove(className), duration);
}
