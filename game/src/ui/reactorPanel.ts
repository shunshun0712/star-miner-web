import {
  REACTOR_BUFFS,
  EXPLORATION_TARGETS,
  EXCHANGE_RECIPES,
  REACTOR_BUFF_BY_ID,
  EXPLORATION_TARGET_BY_ID,
  type ReactorRuntime,
} from '../core/reactor';
import { getResource, getResourceAmount } from '../core/resourceRegistry';
import { formatDuration, formatNumber } from '../core/format';
import type { GameState } from '../core/types';

export interface ReactorPanelCallbacks {
  onActivateBuff: (defId: string) => void;
  onDispatch: (targetId: string) => void;
  onExchange: (recipeId: string) => void;
}

/** 探索进度环 SVG 周长（r=26） */
const RING_CIRC = 2 * Math.PI * 26;

/**
 * T1-2 同位素反应堆面板。
 *
 * 三类入口均触发 ConsumptionEngine（经 ReactorRuntime）：
 * - buff 激活：倒计时进度条，墙钟驱动（update 传入 now），与 Three.js 渲染循环解耦
 * - 深空探索派遣：目标选择（3 选 1）+ 进度环
 * - 碎片兑换：资源转换器
 *
 * 面板在主循环 frame（非 GameScene 渲染 RAF）中按帧 update，倒计时/进度均由 now 计算。
 */
export class ReactorPanel {
  private body: HTMLElement;
  private heldIsotope: HTMLElement;
  private heldAntimatter: HTMLElement;
  private heldDarkmatter: HTMLElement;
  private reactorStatus: HTMLElement;

  private buffRows: {
    defId: string;
    btn: HTMLButtonElement;
    costEl: HTMLElement;
    activeEl: HTMLElement;
    bar: HTMLElement;
    remainEl: HTMLElement;
  }[] = [];

  private targetBtns: HTMLButtonElement[] = [];
  private dispatchBtn!: HTMLButtonElement;
  private exploreStatus!: HTMLElement;
  private exploreRing!: SVGCircleElement;
  private exploreLabel!: HTMLElement;
  private exploreRemain!: HTMLElement;

  private exchangeRows: { recipeId: string; btn: HTMLButtonElement; costEl: HTMLElement }[] = [];

  private selectedTarget = EXPLORATION_TARGETS[0]?.id ?? '';

  constructor(private cbs: ReactorPanelCallbacks) {
    const root = document.getElementById('reactor-body');
    if (!root) throw new Error('missing #reactor-body');
    this.body = root;
    this.body.innerHTML = this.renderShell();

    this.heldIsotope = this.byId('reactor-isotope');
    this.heldAntimatter = this.byId('reactor-antimatter');
    this.heldDarkmatter = this.byId('reactor-darkmatter');
    this.reactorStatus = this.byId('reactor-status');

    this.buildBuffRows();
    this.buildExploration();
    this.buildExchangeRows();
  }

  /** 面板可见性：仅当同位素开采研究完成后展示 */
  setVisible(visible: boolean): void {
    const card = document.getElementById('reactor-card');
    if (card) card.hidden = !visible;
  }

  update(state: GameState, runtime: ReactorRuntime, now: number): void {
    this.heldIsotope.textContent = formatNumber(Math.floor(getResourceAmount(state, 'isotope')));
    this.heldAntimatter.textContent = formatNumber(Math.floor(getResourceAmount(state, 'antimatter')));
    this.heldDarkmatter.textContent = formatNumber(Math.floor(getResourceAmount(state, 'darkmatter')));

    // 反应堆运行态指示
    const activity = runtime.reactorActivity(now);
    if (activity <= 0) {
      this.reactorStatus.textContent = '待机';
      this.reactorStatus.className = 'reactor-status muted';
    } else {
      const pct = Math.round(activity * 100);
      this.reactorStatus.textContent = `运行中 ${pct}%`;
      this.reactorStatus.className = 'reactor-status active';
    }

    this.updateBuffs(state, runtime, now);
    this.updateExploration(state, runtime, now);
    this.updateExchange(state, runtime);
  }

  // ----- 渲染骨架 -----

  private renderShell(): string {
    return `
      <div class="reactor-held">
        <span class="rh-item"><span class="rh-label">同位素</span><span class="rh-val cyan" id="reactor-isotope">0</span></span>
        <span class="rh-item"><span class="rh-label">反物质</span><span class="rh-val purple" id="reactor-antimatter">0</span></span>
        <span class="rh-item"><span class="rh-label">暗物质</span><span class="rh-val" id="reactor-darkmatter">0</span></span>
        <span class="reactor-status muted" id="reactor-status">待机</span>
      </div>

      <div class="reactor-section">
        <h3 class="reactor-h3">增益 buff</h3>
        <div id="reactor-buffs"></div>
      </div>

      <div class="reactor-section">
        <h3 class="reactor-h3">深空探索</h3>
        <div id="reactor-targets"></div>
        <div class="reactor-explore-status" id="reactor-explore-status"></div>
      </div>

      <div class="reactor-section">
        <h3 class="reactor-h3">碎片兑换</h3>
        <div id="reactor-exchange"></div>
      </div>`;
  }

  private buildBuffRows(): void {
    const host = this.byId('reactor-buffs');
    for (const def of REACTOR_BUFFS) {
      const row = document.createElement('div');
      row.className = 'buff-row';
      row.innerHTML = `
        <div class="buff-head">
          <span class="buff-name">${def.name}</span>
          <span class="buff-cost" data-cost></span>
        </div>
        <div class="buff-desc">${def.description}</div>
        <div class="buff-active" data-active hidden>
          <div class="buff-bar-track"><div class="buff-bar-fill" data-bar></div></div>
          <span class="buff-remain" data-remain></span>
        </div>
        <button class="btn buff-btn" type="button" data-buff="${def.id}">激活</button>`;
      host.appendChild(row);
      this.buffRows.push({
        defId: def.id,
        btn: row.querySelector<HTMLButtonElement>('.buff-btn')!,
        costEl: row.querySelector<HTMLElement>('[data-cost]')!,
        activeEl: row.querySelector<HTMLElement>('[data-active]')!,
        bar: row.querySelector<HTMLElement>('[data-bar]')!,
        remainEl: row.querySelector<HTMLElement>('[data-remain]')!,
      });
    }
    // 事件委托
    host.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.buff-btn');
      if (btn?.dataset.buff) this.cbs.onActivateBuff(btn.dataset.buff);
    });
  }

  private buildExploration(): void {
    const host = this.byId('reactor-targets');
    for (const t of EXPLORATION_TARGETS) {
      const opt = document.createElement('button');
      opt.type = 'button';
      opt.className = 'target-btn';
      opt.dataset.target = t.id;
      opt.innerHTML = `
        <span class="target-name">${t.name}</span>
        <span class="target-meta">${t.riskLabel}风险 · ${formatDuration(t.durationMs)} · 产 ${getResource(t.reward.resourceId)?.name ?? t.reward.resourceId} ×${t.reward.amount}</span>`;
      opt.addEventListener('click', () => {
        this.selectedTarget = t.id;
        this.refreshTargetSelection();
      });
      host.appendChild(opt);
      this.targetBtns.push(opt);
    }
    this.refreshTargetSelection();

    this.dispatchBtn = document.createElement('button');
    this.dispatchBtn.type = 'button';
    this.dispatchBtn.className = 'btn primary dispatch-btn';
    this.dispatchBtn.textContent = '派遣探索';
    this.dispatchBtn.addEventListener('click', () => this.cbs.onDispatch(this.selectedTarget));
    host.appendChild(this.dispatchBtn);

    this.exploreStatus = this.byId('reactor-explore-status');
    this.exploreStatus.innerHTML = `
      <div class="explore-active" data-explore-active hidden>
        <svg class="explore-ring" viewBox="0 0 60 60" width="60" height="60">
          <circle class="explore-ring-bg" cx="30" cy="30" r="26" />
          <circle class="explore-ring-fg" cx="30" cy="30" r="26" data-ring />
        </svg>
        <div class="explore-info">
          <span class="explore-label" data-explore-label></span>
          <span class="explore-remain" data-explore-remain></span>
        </div>
      </div>`;
    this.exploreRing = this.exploreStatus.querySelector<SVGCircleElement>('[data-ring]')!;
    this.exploreRing.style.strokeDasharray = String(RING_CIRC);
    this.exploreLabel = this.exploreStatus.querySelector<HTMLElement>('[data-explore-label]')!;
    this.exploreRemain = this.exploreStatus.querySelector<HTMLElement>('[data-explore-remain]')!;
  }

  private buildExchangeRows(): void {
    const host = this.byId('reactor-exchange');
    for (const r of EXCHANGE_RECIPES) {
      const row = document.createElement('div');
      row.className = 'exchange-row';
      const costName = getResource(r.cost.resourceId)?.name ?? r.cost.resourceId;
      const prodText = r.produces
        .map((p) => `${getResource(p.resourceId)?.name ?? p.resourceId} ×${p.amount}`)
        .join(' + ');
      row.innerHTML = `
        <div class="exchange-info">
          <span class="exchange-name">${r.name}</span>
          <span class="exchange-flow">${costName} ×${r.cost.amount} → ${prodText}</span>
        </div>
        <button class="btn exchange-btn" type="button" data-recipe="${r.id}">兑换</button>`;
      host.appendChild(row);
      this.exchangeRows.push({
        recipeId: r.id,
        btn: row.querySelector<HTMLButtonElement>('.exchange-btn')!,
        costEl: row.querySelector<HTMLElement>('.exchange-flow')!,
      });
    }
    host.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.exchange-btn');
      if (btn?.dataset.recipe) this.cbs.onExchange(btn.dataset.recipe);
    });
  }

  // ----- 按帧刷新 -----

  private updateBuffs(state: GameState, runtime: ReactorRuntime, now: number): void {
    for (const row of this.buffRows) {
      const def = REACTOR_BUFF_BY_ID[row.defId];
      const costName = getResource(def.cost.resourceId)?.name ?? def.cost.resourceId;
      row.costEl.textContent = `${costName} ×${def.cost.amount}`;
      const active = runtime.getActiveBuff(row.defId);
      if (active) {
        const remaining = Math.max(0, active.expiresAt - now);
        const total = def.durationMs;
        const pct = total > 0 ? Math.min(100, (remaining / total) * 100) : 0;
        row.activeEl.hidden = false;
        row.bar.style.width = `${pct}%`;
        row.remainEl.textContent = formatDuration(remaining);
        row.btn.textContent = '运行中';
        row.btn.disabled = true;
        row.btn.classList.add('running');
      } else {
        row.activeEl.hidden = true;
        row.btn.classList.remove('running');
        const check = runtime.canActivateBuff(state, row.defId, now);
        row.btn.textContent = '激活';
        row.btn.disabled = !check.ok;
        row.btn.title = check.ok ? '' : (check.reason ?? '');
      }
    }
  }

  private updateExploration(state: GameState, runtime: ReactorRuntime, now: number): void {
    const active = runtime.getActiveExplorations()[0];
    const activeWrap = this.exploreStatus.querySelector<HTMLElement>('[data-explore-active]')!;
    if (active) {
      const target = EXPLORATION_TARGET_BY_ID[active.targetId];
      const total = active.completesAt - active.startedAt;
      const elapsed = Math.min(total, now - active.startedAt);
      const progress = total > 0 ? elapsed / total : 0;
      const remaining = Math.max(0, active.completesAt - now);
      activeWrap.hidden = false;
      this.exploreRing.style.strokeDashoffset = String(RING_CIRC * (1 - progress));
      this.exploreLabel.textContent = target ? target.name : active.targetId;
      this.exploreRemain.textContent = `剩余 ${formatDuration(remaining)}`;
      this.dispatchBtn.disabled = true;
      this.dispatchBtn.textContent = '探索进行中';
      // 探索进行中时禁用目标切换
      this.targetBtns.forEach((b) => (b.disabled = true));
    } else {
      activeWrap.hidden = true;
      this.dispatchBtn.textContent = '派遣探索';
      const check = runtime.canDispatch(state, this.selectedTarget);
      this.dispatchBtn.disabled = !check.ok;
      this.dispatchBtn.title = check.ok ? '' : (check.reason ?? '');
      this.targetBtns.forEach((b) => (b.disabled = false));
    }
  }

  private updateExchange(state: GameState, runtime: ReactorRuntime): void {
    for (const row of this.exchangeRows) {
      const check = runtime.canExchange(state, row.recipeId);
      row.btn.disabled = !check.ok;
      row.btn.title = check.ok ? '' : (check.reason ?? '');
    }
  }

  private refreshTargetSelection(): void {
    this.targetBtns.forEach((b) => {
      b.classList.toggle('selected', b.dataset.target === this.selectedTarget);
    });
  }

  private byId<T extends HTMLElement = HTMLElement>(id: string): T {
    const el = document.getElementById(id);
    if (!el) throw new Error(`missing #${id}`);
    return el as T;
  }
}
