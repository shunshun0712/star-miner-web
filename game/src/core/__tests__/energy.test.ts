import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { setEnergyStrategy, strategyMultipliers } from '../energy';

const T0 = 1_700_000_000_000;

describe('能源策略', () => {
  it('切换策略并读取倍率', () => {
    const s = createNewGame(T0);
    setEnergyStrategy(s, 'excavation');
    const m = strategyMultipliers('excavation');
    expect(m.excavator).toBe(1.35);
    expect(m.transport).toBe(0.9);
    expect(m.refinery).toBe(0.9);
    setEnergyStrategy(s, 'refinement');
    expect(s.energyStrategy).toBe('refinement');
    const m2 = strategyMultipliers('refinement');
    expect(m2.excavator).toBe(0.9);
    expect(m2.refinery).toBe(1.35);
  });

  it('非法策略不生效', () => {
    const s = createNewGame(T0);
    setEnergyStrategy(s, 'unknown' as never);
    expect(s.energyStrategy).toBe('balanced');
  });
});
