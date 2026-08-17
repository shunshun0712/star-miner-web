import { describe, expect, it } from 'vitest';
import { cubicBezier, easeInOutSine, easeOutCubic } from '../easing';

describe('easing', () => {
  it('easeOutCubic endpoints', () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(0.5)).toBeCloseTo(0.875);
  });

  it('easeInOutSine endpoints', () => {
    expect(easeInOutSine(0)).toBe(0);
    expect(easeInOutSine(1)).toBe(1);
    expect(easeInOutSine(0.5)).toBeCloseTo(0.5);
  });

  it('upgrade cubicBezier overshoots mid', () => {
    const f = cubicBezier(0.34, 1.56, 0.64, 1);
    expect(f(0)).toBe(0);
    expect(f(1)).toBe(1);
    const mid = f(0.5);
    expect(mid).toBeGreaterThan(1);
    expect(mid).toBeLessThan(1.2);
  });
});
