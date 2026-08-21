/**
 * T3-3: 星核商店 UI 面板。
 *
 * 架构分两层，保证 UI 逻辑在 node 环境（无 DOM）下可测：
 * - 纯视图模型层 buildShopViewModel(state)：遍历 SHOP_ITEMS 注册表，按 category 分组，
 *   逐项计算 purchaseState（purchasable / locked / maxed / insufficient）。**动态读取注册表**，
 *   T3-2 扩充 SHOP_ITEMS 后面板自动适配（零硬编码物品 id / 名称 / 数量）。
 * - DOM 渲染层 StarcoreShopPanel：自建 modal（backdrop + 分类 tab + 物品卡网格 + 购买按钮），
 *   购买后原地刷新（state 由 purchaseItem 原地 mutate，引用不变）。
 *
 * 与 T3-1 引擎的契约：只读 canPurchase / getItemCost / getItemLevel，购买走调用方注入的
 * onPurchase 回调（main.ts 中接线 purchaseItem 事务）。本模块不直接开事务。
 *
 * 设计要点：
 * - buildShopViewModel 是纯函数，purchaseState 分类逻辑独立于 canPurchase 的字符串 reason，
 *   但语义一致（测试断言 purchasable ⇔ canPurchase.ok）。
 * - 分类顺序 SHOP_CATEGORY_ORDER 固定（5 类），与 ShopItemCategory 对齐。
 * - 购买按钮三态：purchasable(高亮可点) / locked(锁定禁用) / maxed(满级禁用) / insufficient(星核不足禁用)。
 */
import {
  SHOP_ITEMS,
  getItemCost,
  getItemLevel,
  type ShopItemCategory,
  type ShopItemSchema,
} from '../core/starcoreShop';
import { formatNumber } from '../core/format';
import { toast } from './toasts';
import type { GameState } from '../core/types';

// ════════════════════════════════════════════
// 分类元数据（固定 5 类，与 ShopItemCategory 对齐）
// ════════════════════════════════════════════

/** 分类展示顺序——固定 5 类，T3-2 扩充物品时不改这里 */
export const SHOP_CATEGORY_ORDER: readonly ShopItemCategory[] = [
  'economy',
  'production',
  'research',
  'facility',
  'prestige',
];

/** 分类中文标签 */
export const SHOP_CATEGORY_LABELS: Record<ShopItemCategory, string> = {
  economy: '经济',
  production: '生产',
  research: '研究',
  facility: '设施',
  prestige: '转生',
};

// ════════════════════════════════════════════
// 纯视图模型层（node 可测，无 DOM）
// ════════════════════════════════════════════

/** 物品购买态——驱动按钮三态显示 */
export type ShopPurchaseState = 'purchasable' | 'locked' | 'maxed' | 'insufficient';

/** 前置依赖的展示视图 */
export interface ShopPrerequisiteView {
  itemId: string;
  name: string;
  requiredLevel: number;
  currentLevel: number;
  met: boolean;
}

/** 单个物品的展示视图——驱动一张物品卡渲染 */
export interface ShopItemView {
  id: string;
  name: string;
  description: string;
  category: ShopItemCategory;
  categoryLabel: string;
  level: number;
  maxLevel: number;
  /** 下一级成本；满级或未知物品为 Infinity */
  nextCost: number;
  /** 成本展示文本（满级时为「已满级」） */
  costDisplay: string;
  /** 购买态 */
  purchaseState: ShopPurchaseState;
  /** 锁定/不足原因（purchaseState 非 purchasable 时有值） */
  lockReason?: string;
  /** 前置依赖视图 */
  prerequisites: ShopPrerequisiteView[];
  /** 是否已购（level > 0） */
  purchased: boolean;
}

/** 商店整体视图模型 */
export interface ShopViewModel {
  /** 星核余额（prestige.stardust） */
  balance: number;
  balanceDisplay: string;
  /** 全部分类（固定 5 类顺序） */
  categories: readonly ShopItemCategory[];
  /** 分类 → 物品视图列表 */
  itemsByCategory: Record<ShopItemCategory, ShopItemView[]>;
  /** 全部物品扁平列表（按分类顺序、注册表插入顺序） */
  items: ShopItemView[];
  /** 物品总数 */
  totalItems: number;
  /** 已购物品数（level > 0） */
  purchasedCount: number;
}

/**
 * 计算单个物品的购买态。
 *
 * 分类优先级（UI 展示语义，独立于 canPurchase 的 reason 顺序但结果一致）：
 * 1. maxed：当前等级 ≥ maxLevel
 * 2. locked：存在未满足的前置依赖（即使星核也不足，也优先显示「锁定」，更符合 UX）
 * 3. insufficient：前置满足但星核不足
 * 4. purchasable：可购买
 *
 * 注意：canPurchase 内部先查余额再查前置（reason 会先报余额不足）；
 * 此处 UI 取「前置锁定优先于余额不足」——前置未满足时玩家根本不该考虑买，
 * 显示「锁定」比「星核不足」更准确。两路径在「最终能否购买」上一致（都不能买）。
 */
export function classifyShopItem(state: GameState, item: ShopItemSchema): {
  purchaseState: ShopPurchaseState;
  lockReason?: string;
} {
  const level = getItemLevel(state, item.id);
  if (level >= item.maxLevel) {
    return { purchaseState: 'maxed', lockReason: `已满级（${item.maxLevel} 级）` };
  }
  for (const prereq of item.prerequisites) {
    const currentLevel = getItemLevel(state, prereq.itemId);
    if (currentLevel < prereq.level) {
      const name = SHOP_ITEMS[prereq.itemId]?.name ?? prereq.itemId;
      return {
        purchaseState: 'locked',
        lockReason: `需要${name}达到 ${prereq.level} 级（当前 ${currentLevel}）`,
      };
    }
  }
  const cost = getItemCost(state, item.id);
  if (state.prestige.stardust < cost) {
    return { purchaseState: 'insufficient', lockReason: `星核不足（需 ${formatNumber(cost)}）` };
  }
  return { purchaseState: 'purchasable' };
}

/**
 * 构建商店视图模型——纯函数，遍历 SHOP_ITEMS 注册表，按 category 分组。
 *
 * 动态读取注册表：T3-2 扩充物品后无需改本函数，自动适配新物品。
 */
export function buildShopViewModel(state: GameState): ShopViewModel {
  const itemsByCategory = {
    economy: [] as ShopItemView[],
    production: [] as ShopItemView[],
    research: [] as ShopItemView[],
    facility: [] as ShopItemView[],
    prestige: [] as ShopItemView[],
  };

  const items: ShopItemView[] = [];
  let purchasedCount = 0;

  for (const item of Object.values(SHOP_ITEMS)) {
    const level = getItemLevel(state, item.id);
    const maxLevel = item.maxLevel;
    const nextCost = level >= maxLevel ? Infinity : getItemCost(state, item.id);
    const { purchaseState, lockReason } = classifyShopItem(state, item);

    const prerequisites: ShopPrerequisiteView[] = item.prerequisites.map((p) => {
      const currentLevel = getItemLevel(state, p.itemId);
      return {
        itemId: p.itemId,
        name: SHOP_ITEMS[p.itemId]?.name ?? p.itemId,
        requiredLevel: p.level,
        currentLevel,
        met: currentLevel >= p.level,
      };
    });

    const purchased = level > 0;
    if (purchased) purchasedCount += 1;

    const view: ShopItemView = {
      id: item.id,
      name: item.name,
      description: item.description,
      category: item.category,
      categoryLabel: SHOP_CATEGORY_LABELS[item.category],
      level,
      maxLevel,
      nextCost,
      costDisplay: level >= maxLevel ? '已满级' : formatNumber(nextCost),
      purchaseState,
      lockReason,
      prerequisites,
      purchased,
    };

    itemsByCategory[item.category].push(view);
    items.push(view);
  }

  return {
    balance: state.prestige.stardust,
    balanceDisplay: formatNumber(state.prestige.stardust),
    categories: SHOP_CATEGORY_ORDER,
    itemsByCategory,
    items,
    totalItems: items.length,
    purchasedCount,
  };
}

// ════════════════════════════════════════════
// DOM 渲染层（仅在浏览器执行；node 测试不实例化）
// ════════════════════════════════════════════

/** 购买回调——由调用方注入（main.ts 接线 purchaseItem 事务 + toast 反馈） */
export interface StarcoreShopCallbacks {
  onPurchase: (itemId: string) => Promise<void> | void;
}

/**
 * 星核商店面板——自建 modal（backdrop + 分类 tab + 物品卡网格）。
 *
 * 生命周期：
 * - 构造时挂载到 #modal-root，dispatch modal:open（触发 scene.setPaused）
 * - refresh(state)：购买后原地刷新余额与卡片态（state 引用不变）
 * - close()：移除 backdrop，dispatch modal:closed（恢复 scene）
 */
export class StarcoreShopPanel {
  private backdrop!: HTMLElement;
  private modal!: HTMLElement;
  private balanceEl!: HTMLElement;
  private tabsHost!: HTMLElement;
  private gridHost!: HTMLElement;
  private closeBtn!: HTMLButtonElement;
  private activeCategory: ShopItemCategory = SHOP_CATEGORY_ORDER[0];
  private state: GameState;

  constructor(state: GameState, private cbs: StarcoreShopCallbacks) {
    this.state = state;
    this.mount();
    this.refresh(state);
  }

  /** 挂载 modal 骨架到 #modal-root */
  private mount(): void {
    const root = document.getElementById('modal-root');
    if (!root) return;

    // 收口已有弹窗（与 openModal 一致）
    document.querySelectorAll('.modal-backdrop').forEach(() => {
      document.dispatchEvent(new CustomEvent('modal:close'));
    });

    this.backdrop = document.createElement('div');
    this.backdrop.className = 'modal-backdrop';

    this.modal = document.createElement('div');
    this.modal.className = 'modal shop-modal';
    this.modal.innerHTML = `
      <div class="shop-header">
        <h2>星核商店</h2>
        <div class="shop-balance">
          <span class="shop-balance-label">星核余额</span>
          <span class="shop-balance-val" id="shop-balance">0</span>
        </div>
        <button type="button" class="btn ghost shop-close" id="shop-close" aria-label="关闭">×</button>
      </div>
      <div class="shop-tabs" id="shop-tabs"></div>
      <div class="shop-grid" id="shop-grid"></div>`;

    this.balanceEl = this.modal.querySelector<HTMLElement>('#shop-balance')!;
    this.tabsHost = this.modal.querySelector<HTMLElement>('#shop-tabs')!;
    this.gridHost = this.modal.querySelector<HTMLElement>('#shop-grid')!;
    this.closeBtn = this.modal.querySelector<HTMLButtonElement>('#shop-close')!;

    this.backdrop.appendChild(this.modal);
    root.appendChild(this.backdrop);

    // 分类 tab
    this.tabsHost.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-category]');
      if (btn?.dataset.category) {
        this.activeCategory = btn.dataset.category as ShopItemCategory;
        this.refresh(this.state);
      }
    });

    // 购买按钮事件委托
    this.gridHost.addEventListener('click', async (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-buy]');
      if (btn?.dataset.buy) {
        const itemId = btn.dataset.buy;
        btn.disabled = true;
        try {
          await this.cbs.onPurchase(itemId);
        } finally {
          // state 由 purchaseItem 原地 mutate，刷新取最新值
          this.refresh(this.state);
        }
      }
    });

    // 关闭
    this.closeBtn.addEventListener('click', () => this.close());
    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) this.close();
    });

    document.dispatchEvent(new CustomEvent('modal:open'));
  }

  /** 刷新余额 + 分类 tab + 当前分类物品卡 */
  refresh(state: GameState): void {
    this.state = state;
    const vm = buildShopViewModel(state);

    this.balanceEl.textContent = vm.balanceDisplay;

    // 分类 tab（展示每类已购物品数）
    this.tabsHost.innerHTML = vm.categories
      .map((cat) => {
        const list = vm.itemsByCategory[cat];
        const owned = list.filter((i) => i.purchased).length;
        const isActive = cat === this.activeCategory ? ' active' : '';
        return `<button type="button" class="shop-tab${isActive}" data-category="${cat}">
          <span class="shop-tab-label">${SHOP_CATEGORY_LABELS[cat]}</span>
          <span class="shop-tab-count">${owned}/${list.length}</span>
        </button>`;
      })
      .join('');

    // 当前分类物品卡
    const list = vm.itemsByCategory[this.activeCategory] ?? [];
    if (list.length === 0) {
      this.gridHost.innerHTML = `<p class="muted-text shop-empty">该分类暂无物品</p>`;
      return;
    }
    this.gridHost.innerHTML = list.map((item) => this.renderCard(item)).join('');
  }

  /** 渲染单张物品卡 */
  private renderCard(item: ShopItemView): string {
    const levelBadge = `<span class="shop-level">Lv.${item.level}/${item.maxLevel}</span>`;
    const costLine =
      item.purchaseState === 'maxed'
        ? `<span class="shop-cost maxed">${item.costDisplay}</span>`
        : `<span class="shop-cost">下一级 · ${item.costDisplay} 星核</span>`;

    // 前置提示（有未满足前置时展示）
    const unmetPrereqs = item.prerequisites.filter((p) => !p.met);
    const prereqLine =
      unmetPrereqs.length > 0
        ? `<div class="shop-prereq">${unmetPrereqs
            .map((p) => `需 ${p.name} Lv.${p.requiredLevel}（当前 ${p.currentLevel}）`)
            .join('；')}</div>`
        : '';

    // 购买按钮三态
    let btnCls = 'btn primary';
    let btnLabel = '购买';
    let disabled = '';
    switch (item.purchaseState) {
      case 'purchasable':
        btnCls = 'btn primary';
        btnLabel = `购买（${item.costDisplay}）`;
        break;
      case 'locked':
        btnCls = 'btn shop-buy-locked';
        btnLabel = '锁定';
        disabled = 'disabled';
        break;
      case 'maxed':
        btnCls = 'btn shop-buy-maxed';
        btnLabel = '已满级';
        disabled = 'disabled';
        break;
      case 'insufficient':
        btnCls = 'btn shop-buy-insufficient';
        btnLabel = '星核不足';
        disabled = 'disabled';
        break;
    }

    return `<div class="shop-card state-${item.purchaseState}${item.purchased ? ' purchased' : ''}">
      <div class="shop-card-head">
        <span class="shop-card-name">${item.name}</span>
        <span class="shop-cat-tag">${item.categoryLabel}</span>
      </div>
      <div class="shop-card-level">${levelBadge}</div>
      <div class="shop-card-desc">${item.description}</div>
      ${prereqLine}
      <div class="shop-card-foot">
        ${costLine}
        <button type="button" class="${btnCls} shop-buy" data-buy="${item.id}" ${disabled}>${btnLabel}</button>
      </div>
    </div>`;
  }

  /** 关闭面板 */
  close(): void {
    if (this.backdrop?.parentNode) {
      this.backdrop.remove();
    }
    document.dispatchEvent(new CustomEvent('modal:closed'));
  }

  /** 面板是否仍挂载在 DOM（供导航按钮做打开/关闭切换） */
  isOpen(): boolean {
    return !!this.backdrop && document.body.contains(this.backdrop);
  }
}

/**
 * 打开星核商店面板的工厂函数（供 main.ts 调用）。
 *
 * 返回面板实例，调用方持有引用以便购买后 refresh 或手动 close。
 */
export function showStarcoreShop(state: GameState, cbs: StarcoreShopCallbacks): StarcoreShopPanel {
  return new StarcoreShopPanel(state, cbs);
}

/** 给购买回调用的便捷 toast 包装（main.ts 可直接用） */
export function toastPurchaseResult(ok: boolean, message: string): void {
  toast(message, ok ? 'info' : 'error');
}
