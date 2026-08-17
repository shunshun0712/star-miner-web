import { ENERGY_RELEASE_COST, ENERGY_RESERVE_CAP, ENERGY_STRATEGIES, ENERGY_STRATEGY_LABELS, FACILITIES } from '../core/config';
import { canReleaseEnergy, energyConsumptionPerSecond } from '../core/energy';
import { canUnlock, canUpgrade, crystalPrice, crystalUpgradeCost, unlockCost, unlockCrystalCost, upgradeCost } from '../core/economy';
import { formatDuration, formatNumber, formatRate } from '../core/format';
import { facilityHint, upgradePreview } from '../core/hints';
import { capacityFor, rateFor } from '../core/production';
import { hasResearch } from '../core/research';
import { easeOutCubic } from '../art/easing';
import { pulseOnce } from './feedback';
import { renderUpgradePreview, setBottleneck, setCapacityBar } from './visualize';
import type { EnergyStrategyId, FacilityId, GameState, ProductionSummary } from '../core/types';

export interface PanelCallbacks {
  onFacilityAction: () => void;
  onEnergy: (id: EnergyStrategyId) => void;
  onSell: (resource: 'stardust' | 'crystal', amount?: number) => void;
  onAutoSell: (resource: 'stardust' | 'crystal', enabled: boolean, keepAmount: number) => void;
  onReleaseEnergy: () => void;
}

export class Panel {
  private name: HTMLElement;
  private status: HTMLElement;
  private level: HTMLElement;
  private rate: HTMLElement;
  private capacity: HTMLElement;
  private bottleneck: HTMLElement;
  private hintEl: HTMLElement;
  private actionBtn: HTMLButtonElement;
  private costHint: HTMLElement;
  private sellStardust: HTMLButtonElement;
  private sellStardustAll: HTMLButtonElement;
  private sellCrystal: HTMLButtonElement;
  private sellCrystalAll: HTMLButtonElement;
  private qtyStardust: HTMLInputElement;
  private qtyCrystal: HTMLInputElement;
  private heldStardust: HTMLElement;
  private heldCrystal: HTMLElement;
  private crystalPriceLabel: HTMLElement;
  private energyBtns: HTMLButtonElement[];
  private autoSellEl: HTMLInputElement;
  private autoSellKeepEl: HTMLInputElement;
  private autoSellCrystalEl: HTMLInputElement;
  private autoSellCrystalKeepEl: HTMLInputElement;
  private autoSellHintEl: HTMLElement;
  private energyEffectEl: HTMLElement;
  private upgradePreviewEl: HTMLElement;
  private releaseBtn: HTMLButtonElement;
  private capacityLabel: HTMLElement;
  private bottleneckLabel: HTMLElement;
  private capacityFill: HTMLElement;
  private bottleneckRow: HTMLElement;
  private bottleneckArrow: HTMLElement;
  private facilityCard: HTMLElement;
  private rateTween: { from: number; to: number; start: number; duration: number } | null = null;

  constructor(cbs: PanelCallbacks) {
    this.name = byId('facility-name');
    this.status = byId('facility-status');
    this.level = byId('facility-level');
    this.rate = byId('facility-rate');
    this.capacity = byId('facility-capacity');
    this.bottleneck = byId('bottleneck-text');
    this.hintEl = byId('facility-hint');
    this.actionBtn = byId<HTMLButtonElement>('btn-facility');
    this.costHint = byId('facility-cost');
    this.sellStardust = byId<HTMLButtonElement>('btn-sell-stardust');
    this.sellStardustAll = byId<HTMLButtonElement>('btn-sell-stardust-all');
    this.sellCrystal = byId<HTMLButtonElement>('btn-sell-crystal');
    this.sellCrystalAll = byId<HTMLButtonElement>('btn-sell-crystal-all');
    this.qtyStardust = byId<HTMLInputElement>('qty-stardust');
    this.qtyCrystal = byId<HTMLInputElement>('qty-crystal');
    this.heldStardust = byId('held-stardust');
    this.heldCrystal = byId('held-crystal');
    this.crystalPriceLabel = byId('crystal-price-label');
    this.energyBtns = [...document.querySelectorAll<HTMLButtonElement>('.energy-btn')];
    this.autoSellEl = byId<HTMLInputElement>('auto-sell-stardust');
    this.autoSellKeepEl = byId<HTMLInputElement>('auto-sell-keep');
    this.autoSellCrystalEl = byId<HTMLInputElement>('auto-sell-crystal');
    this.autoSellCrystalKeepEl = byId<HTMLInputElement>('auto-sell-crystal-keep');
    this.autoSellHintEl = byId('auto-sell-hint');
    this.energyEffectEl = byId('energy-effect');
    this.upgradePreviewEl = byId('upgrade-preview');
    this.releaseBtn = byId<HTMLButtonElement>('btn-release-energy');
    this.capacityLabel = (byId('facility-capacity').parentElement?.querySelector('dt') as HTMLElement | null) ?? byId('facility-capacity');
    this.bottleneckLabel = (byId('bottleneck-row').querySelector('dt') as HTMLElement | null) ?? byId('bottleneck-text');
    this.capacityFill = byId('capacity-fill');
    this.bottleneckRow = byId('bottleneck-row');
    this.bottleneckArrow = byId('bottleneck-arrow');
    this.facilityCard = byId('facility-card');

    this.actionBtn.addEventListener('click', () => cbs.onFacilityAction());
    this.energyBtns.forEach((btn) =>
      btn.addEventListener('click', () => cbs.onEnergy(btn.dataset.strategy as EnergyStrategyId)),
    );
    this.sellStardust.addEventListener('click', () => cbs.onSell('stardust', parseQty(this.qtyStardust)));
    this.sellStardustAll.addEventListener('click', () => cbs.onSell('stardust'));
    this.sellCrystal.addEventListener('click', () => cbs.onSell('crystal', parseQty(this.qtyCrystal)));
    this.sellCrystalAll.addEventListener('click', () => cbs.onSell('crystal'));
    this.autoSellEl.addEventListener('change', () => cbs.onAutoSell('stardust', this.autoSellEl.checked, parseKeep(this.autoSellKeepEl)));
    this.autoSellKeepEl.addEventListener('change', () => cbs.onAutoSell('stardust', this.autoSellEl.checked, parseKeep(this.autoSellKeepEl)));
    this.autoSellCrystalEl.addEventListener('change', () => cbs.onAutoSell('crystal', this.autoSellCrystalEl.checked, parseKeep(this.autoSellCrystalKeepEl)));
    this.autoSellCrystalKeepEl.addEventListener('change', () => cbs.onAutoSell('crystal', this.autoSellCrystalEl.checked, parseKeep(this.autoSellCrystalKeepEl)));
    this.releaseBtn.addEventListener('click', () => cbs.onReleaseEnergy());
  }

  update(state: GameState, selected: FacilityId, summary: ProductionSummary | null): void {
    const f = state.facilities[selected];
    const cfg = FACILITIES[selected];

    this.name.textContent = cfg.name;
    this.status.textContent = f.unlocked ? 'ONLINE' : 'LOCKED';
    this.status.className = `status-badge ${f.unlocked ? 'ONLINE' : 'LOCKED'}`;
    this.level.textContent = f.unlocked ? `Lv.${f.level} / 5` : '—';

    const rate = rateFor(state, selected);
    const cap = capacityFor(state, selected);
    if (this.rateTween && f.unlocked) {
      const t = Math.min(1, (performance.now() - this.rateTween.start) / this.rateTween.duration);
      this.rate.textContent = formatRate(
        this.rateTween.from + (this.rateTween.to - this.rateTween.from) * easeOutCubic(t),
        cfg.rateUnit,
      );
      if (t >= 1) this.rateTween = null;
    } else {
      this.rateTween = null;
      this.rate.textContent = f.unlocked ? formatRate(rate, cfg.rateUnit) : '—';
    }
    this.capacityLabel.textContent = selected === 'energyStation' ? '储备' : '容量';
    this.capacity.textContent = f.unlocked
      ? selected === 'energyStation'
        ? hasResearch(state, 'energyReserve')
          ? `${formatNumber(state.energy)} / ${ENERGY_RESERVE_CAP}`
          : '未解锁（研究能源储备）'
        : formatNumber(cap)
      : '—';
    if (selected !== 'energyStation' && f.unlocked) {
      const current = cfg.produces === 'stardust' ? state.stardust : cfg.produces === 'crystal' ? state.crystal : 0;
      setCapacityBar(this.capacityFill, current, cap);
    } else {
      this.capacityFill.style.width = '0%';
      this.capacityFill.classList.remove('full');
    }

    const isBottleneck = summary?.bottlenecks.includes(selected) ?? false;
    if (selected === 'energyStation' && f.unlocked) {
      const produced = rateFor(state, 'energyStation', Date.now());
      const consumed = energyConsumptionPerSecond(state);
      const deficit = consumed > produced;
      this.bottleneckLabel.textContent = '收支';
      this.bottleneck.textContent = `产出 ${produced.toFixed(2)} / 消耗 ${consumed.toFixed(2)} /秒`;
      this.bottleneck.style.color = deficit ? 'var(--warn)' : '';
      setBottleneck(this.bottleneckRow, this.bottleneckArrow, deficit);
    } else {
      this.bottleneckLabel.textContent = '瓶颈';
      this.bottleneck.textContent = isBottleneck ? '下游处理不足' : '无';
      this.bottleneck.style.color = isBottleneck ? 'var(--warn)' : '';
      setBottleneck(this.bottleneckRow, this.bottleneckArrow, isBottleneck);
    }

    this.releaseBtn.hidden = !(selected === 'energyStation' && f.unlocked && hasResearch(state, 'energyReserve'));
    if (!this.releaseBtn.hidden) {
      const rel = canReleaseEnergy(state, Date.now());
      this.releaseBtn.disabled = !rel.ok;
      this.releaseBtn.textContent = `释放储备（-${ENERGY_RELEASE_COST} 能量）`;
      this.releaseBtn.title = rel.ok ? '30 秒全设施 ×1.2，冷却 60 秒' : (rel.reason ?? '');
    }

    const stratMult = ENERGY_STRATEGIES[state.energyStrategy][selected];
    const stratPct = Math.round((stratMult - 1) * 100);
    this.energyEffectEl.textContent =
      stratPct === 0
        ? `${ENERGY_STRATEGY_LABELS[state.energyStrategy]}：对${cfg.name}无加成`
        : `${ENERGY_STRATEGY_LABELS[state.energyStrategy]}：对${cfg.name} ${stratPct > 0 ? '+' : ''}${stratPct}%`;

    const hint = facilityHint(state, selected);
    this.hintEl.hidden = !hint;
    this.hintEl.textContent = hint ?? '';

    if (!f.unlocked) {
      const cost = unlockCost(state, selected);
      const crystalCost = unlockCrystalCost(state, selected);
      this.actionBtn.textContent =
        crystalCost > 0
          ? `解锁（${formatNumber(cost)} 信用点 + ${formatNumber(crystalCost)} 晶体）`
          : `解锁（${formatNumber(cost)} 信用点）`;
      const check = canUnlock(state, selected);
      this.actionBtn.disabled = !check.ok;
      this.costHint.textContent = check.ok ? '' : (check.reason ?? '');
      this.upgradePreviewEl.hidden = true;
    } else if (f.level >= 5) {
      this.actionBtn.textContent = '已满级';
      this.actionBtn.disabled = true;
      this.costHint.textContent = '';
      this.upgradePreviewEl.hidden = true;
    } else {
      const cost = upgradeCost(state, selected);
      const crystalCost = crystalUpgradeCost(state, selected);
      this.actionBtn.textContent =
        crystalCost > 0
          ? `升级（U）· ${formatNumber(cost)} 信用点 + ${formatNumber(crystalCost)} 晶体`
          : `升级（U）· ${formatNumber(cost)} 信用点`;
      const check = canUpgrade(state, selected);
      this.actionBtn.disabled = !check.ok;
      this.costHint.textContent = check.ok ? '' : (check.reason ?? '');
      const preview = selected === 'energyStation' ? null : upgradePreview(state, selected);
      if (preview && preview.deltaRate > 0) {
        this.upgradePreviewEl.hidden = false;
        const payback =
          preview.paybackSeconds === null ? '' : `，约 ${formatDuration(preview.paybackSeconds * 1000)}回本`;
        renderUpgradePreview(
          this.upgradePreviewEl,
          formatRate(rate, cfg.rateUnit),
          formatRate(rate + preview.deltaRate, cfg.rateUnit),
          `+${formatRate(preview.deltaRate, cfg.rateUnit)}${payback}`,
        );
      } else {
        this.upgradePreviewEl.hidden = true;
      }
    }

    this.energyBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.strategy === state.energyStrategy);
      btn.title = `${ENERGY_STRATEGY_LABELS[btn.dataset.strategy as EnergyStrategyId]}（快捷键 ${
        btn.dataset.strategy === 'excavation' ? '1' : btn.dataset.strategy === 'balanced' ? '2' : '3'
      }）`;
    });

    this.heldStardust.textContent = formatNumber(state.stardust);
    this.heldCrystal.textContent = formatNumber(state.crystal);
    this.crystalPriceLabel.textContent = String(crystalPrice(state));
    this.autoSellEl.checked = state.settings.autoSellStardust;
    this.autoSellCrystalEl.checked = state.settings.autoSellCrystal;
    this.autoSellHintEl.hidden = !state.settings.autoSellStardust && !state.settings.autoSellCrystal;
    if (document.activeElement !== this.autoSellKeepEl) {
      this.autoSellKeepEl.value = String(state.settings.stardustKeepAmount);
    }
    if (document.activeElement !== this.autoSellCrystalKeepEl) {
      this.autoSellCrystalKeepEl.value = String(state.settings.crystalKeepAmount);
    }
    const stardustQty = parseQty(this.qtyStardust);
    const crystalQty = parseQty(this.qtyCrystal);
    this.sellStardust.textContent = stardustQty > 0 ? `出售 ${formatNumber(stardustQty)}` : '出售';
    this.sellStardust.disabled = state.stardust <= 0 || stardustQty <= 0;
    this.sellStardustAll.disabled = state.stardust <= 0;
    this.sellCrystal.textContent = crystalQty > 0 ? `出售 ${formatNumber(crystalQty)}` : '出售';
    this.sellCrystal.disabled = state.crystal <= 0 || crystalQty <= 0;
    this.sellCrystalAll.disabled = state.crystal <= 0;
  }

  flashUpgrade(beforeRate: number, afterRate: number): void {
    this.rateTween = { from: beforeRate, to: afterRate, start: performance.now(), duration: 600 };
    pulseOnce(this.actionBtn, 'btn-jump', 450);
    pulseOnce(this.facilityCard, 'card-pulse', 600);
  }
}

function byId<T extends HTMLElement = HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing #${id}`);
  return el as T;
}

function parseQty(input: HTMLInputElement): number {
  const v = Number.parseInt(input.value, 10);
  return Number.isFinite(v) && v > 0 ? v : 0;
}

function parseKeep(input: HTMLInputElement): number {
  const v = Number.parseInt(input.value, 10);
  return Number.isFinite(v) && v >= 0 ? v : 50;
}




