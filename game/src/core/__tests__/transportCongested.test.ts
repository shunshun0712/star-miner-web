import { describe, expect, it } from 'vitest';
import { createNewGame } from '../state';
import { capacityFor, tickProduction } from '../production';
import { unlockFacility } from '../economy';

const T0 = 1_700_000_000_000;

function chainState() {
  const s = createNewGame(T0);
  s.credits = 3000;
  unlockFacility(s, 'transport');
  unlockFacility(s, 'refinery');
  s.stardust = 500;
  s.refineryBuffer = 0;
  return s;
}

describe('运输拥堵信号', () => {
  it('运输未解锁时不拥堵', () => {
    const s = createNewGame(T0);
    const sum = tickProduction(s, 1_000);
    expect(sum.transportCongested).toBe(false);
  });

  it('采掘总产量超过运输运力时拥堵', () => {
    const s = chainState();
    const sum = tickProduction(s, 1_000);
    expect(sum.transportCongested).toBe(true);
  });

  it('精炼缓冲接近满时拥堵', () => {
    const s = chainState();
    s.facilities.transport.level = 5; // 先排除上游>运力因素
    s.refineryBuffer = capacityFor(s, 'transport');
    const sum = tickProduction(s, 1_000);
    expect(sum.transportCongested).toBe(true);
  });

  it('运输运力足够且缓冲不接近满时不拥堵', () => {
    const s = chainState();
    s.facilities.transport.level = 5;
    const sum = tickProduction(s, 1_000);
    expect(sum.transportCongested).toBe(false);
  });
});
