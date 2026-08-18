import { MAX_LEVEL, STARDUST_PRICE } from './config';
import { crystalPrice, crystalUpgradeCost, upgradeCost } from './economy';
import { effectiveRecipe, rawRate } from './production';
import { hasResearch } from './research';
import type { FacilityId, GameState } from './types';

export interface UpgradePreview {
  currentRate: number;
  nextRate: number;
  deltaRate: number;
  costCredits: number;
  costCrystal: number;
  valuePerUnit: number;
  paybackSeconds: number | null;
}

export function upgradePreview(state: GameState, id: FacilityId, now = Date.now()): UpgradePreview | null {
  const f = state.facilities[id];
  if (!f.unlocked || f.level >= MAX_LEVEL) return null;
  // H5：currentRate/nextRate 复用 rawRate，包含完整乘数链（能源策略、自动采掘阵列、
  // 钻头/矿脉/催化/磁轨/太阳能、能量释放、成就加成、事件修饰），与 rateFor 完全一致，
  // 避免回本时间被高估 m 倍。
  const currentRate = rawRate(state, id, f.level, now);
  const nextRate = rawRate(state, id, f.level + 1, now);
  const deltaRate = nextRate - currentRate;
  const costCredits = upgradeCost(state, id);
  const costCrystal = crystalUpgradeCost(state, id);
  const valuePerUnit =
    id === 'refinery' ? crystalPrice(state) - effectiveRecipe(state) * STARDUST_PRICE : STARDUST_PRICE;
  const paybackSeconds = deltaRate > 0 ? Math.ceil(costCredits / (deltaRate * valuePerUnit)) : null;
  return {
    currentRate,
    nextRate,
    deltaRate,
    costCredits,
    costCrystal,
    valuePerUnit,
    paybackSeconds,
  };
}

export function facilityHint(state: GameState, id: FacilityId): string | null {
  if (id === 'refinery') {
    if (!state.facilities.refinery.unlocked) return null;
    if (!state.facilities.transport.unlocked) {
      return '等待原料：需先解锁磁轨运输线（600 信用点）';
    }
  }
  if (id === 'energyStation') {
    if (!state.facilities.energyStation.unlocked) return null;
    if (!hasResearch(state, 'energyReserve')) {
      return '研究「能源储备」后，盈余能量会存入储备池，并可释放获得 30 秒 ×1.2 加成';
    }
  }
  return null;
}


