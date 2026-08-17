import { ENERGY_RESERVE_CAP } from '../core/config';
import { energyConsumptionPerSecond } from '../core/energy';
import { formatNumber } from '../core/format';
import { rateFor } from '../core/production';
import type { GameState } from '../core/types';

export class Hud {
  private creditsEl: HTMLElement;
  private stardustEl: HTMLElement;
  private crystalEl: HTMLElement;
  private energyEl: HTMLElement;

  constructor() {
    this.creditsEl = byId('stat-credits');
    this.stardustEl = byId('stat-stardust');
    this.crystalEl = byId('stat-crystal');
    this.energyEl = byId('stat-energy');
  }

  update(state: GameState): void {
    this.creditsEl.textContent = formatNumber(state.credits);
    this.stardustEl.textContent = formatNumber(state.stardust);
    this.crystalEl.textContent = formatNumber(state.crystal);
    const station = state.facilities.energyStation;
    if (!station.unlocked) {
      this.energyEl.textContent = '—';
      this.energyEl.className = 'stat-value energy-val';
    } else if (state.research.includes('energyReserve')) {
      this.energyEl.textContent = `${formatNumber(state.energy)} / ${ENERGY_RESERVE_CAP}`;
      this.energyEl.className = 'stat-value energy-val';
    } else {
      const balance = rateFor(state, 'energyStation', Date.now()) - energyConsumptionPerSecond(state);
      const sign = balance >= 0 ? '+' : '';
      this.energyEl.textContent = `${sign}${formatNumber(balance)}/秒`;
      this.energyEl.className = `stat-value ${balance < 0 ? 'danger' : 'energy-val'}`;
    }
  }
}

function byId(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing #${id}`);
  return el;
}
