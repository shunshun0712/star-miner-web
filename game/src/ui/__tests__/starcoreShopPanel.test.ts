/**
 * T3-3: 星核商店 UI 面板测试。
 *
 * vitest 运行在 node 环境（无 DOM），因此测试聚焦在纯视图模型层 buildShopViewModel /
 * classifyShopItem —— 这是驱动面板渲染的契约：分类分组、purchaseState 三态、购买交互后的
 * 状态刷新、满级/锁定态展示、动态注册表兼容（T3-2 扩充后自动适配）。
 *
 * 关键不变量（贯穿所有用例）：
 * - 对每个物品，buildShopViewModel 的 purchaseState 与 canPurchase 的 ok 语义一致
 *   （ purchasable ⇔ canPurchase.ok=true；非 purchasable ⇔ ok=false）
 * - 视图模型动态遍历 SHOP_ITEMS，不硬编码物品 id/数量——T3-2 扩充后测试仍成立
 */
import { describe, it, expect } from 'vitest';
import { createNewGame } from '../../core/state';
import { TransactionalRepository } from '../../save/transactional';
import { LayeredStateBackend, type LayeredKeyValueStore } from '../../save/layeredBackend';
import type { GameState } from '../../core/types';
import {
  SHOP_ITEMS,
  canPurchase,
  getItemCost,
  getItemLevel,
  purchaseItem,
  type ShopItemCategory,
} from '../../core/starcoreShop';
import { executePrestigeReset } from '../../core/prestige';
import {
  buildShopViewModel,
  classifyShopItem,
  SHOP_CATEGORY_ORDER,
  SHOP_CATEGORY_LABELS,
  type ShopViewModel,
} from '../starcoreShopPanel';

const T0 = 1_700_000_000_000;

/** 构造有指定星核余额的状态 */
function stateWithStardust(stardust: number): GameState {
  const s = createNewGame(T0);
  s.prestige.stardust = stardust;
  return s;
}

/** 内存分层存储 mock（与 starcoreShop.test.ts 同构） */
class InMemoryLayeredStore implements LayeredKeyValueStore {
  main: string | null = null;
  prestige: string | null = null;
  async load(): Promise<string | null> { return this.main; }
  async save(json: string): Promise<void> { this.main = json; }
  async loadPrestige(): Promise<string | null> { return this.prestige; }
  async savePrestige(json: string): Promise<void> { this.prestige = json; }
  async saveBoth(baselineJson: string, prestigeJson: string): Promise<void> {
    this.main = baselineJson;
    this.prestige = prestigeJson;
  }
}

function makeRepo(state: GameState): { repo: TransactionalRepository<GameState>; backend: LayeredStateBackend; store: InMemoryLayeredStore } {
  const store = new InMemoryLayeredStore();
  const backend = new LayeredStateBackend(store);
  const repo = new TransactionalRepository<GameState>(backend, structuredClone);
  return { repo, backend, store };
}

// ════════════════════════════════════════════
// 视图模型结构
// ════════════════════════════════════════════

describe('buildShopViewModel — 结构', () => {
  it('物品总数 = SHOP_ITEMS 注册表大小（动态，非硬编码）', () => {
    const vm = buildShopViewModel(stateWithStardust(100));
    expect(vm.totalItems).toBe(Object.keys(SHOP_ITEMS).length);
    expect(vm.items.length).toBe(Object.keys(SHOP_ITEMS).length);
  });

  it('categories 固定 5 类且顺序稳定', () => {
    const vm = buildShopViewModel(stateWithStardust(100));
    expect(vm.categories).toEqual(['economy', 'production', 'research', 'facility', 'prestige']);
    expect(vm.categories).toBe(SHOP_CATEGORY_ORDER);
  });

  it('itemsByCategory 覆盖全部 5 类，每项归入正确分类桶', () => {
    const vm = buildShopViewModel(stateWithStardust(100));
    for (const cat of SHOP_CATEGORY_ORDER) {
      expect(Array.isArray(vm.itemsByCategory[cat])).toBe(true);
    }
    // 每个物品归入与自身 category 一致的桶
    for (const item of vm.items) {
      expect(vm.itemsByCategory[item.category]).toContain(item);
    }
    // 各桶并集 = 全部物品，无重复
    const all = SHOP_CATEGORY_ORDER.flatMap((c) => vm.itemsByCategory[c]);
    expect(all.length).toBe(vm.totalItems);
    const ids = new Set(all.map((i) => i.id));
    expect(ids.size).toBe(vm.totalItems);
  });

  it('balance 与 balanceDisplay 反映 prestige.stardust', () => {
    const vm = buildShopViewModel(stateWithStardust(42));
    expect(vm.balance).toBe(42);
    expect(Number(vm.balanceDisplay)).toBe(42);
  });

  it('初始新游戏 purchasedCount=0', () => {
    const vm = buildShopViewModel(stateWithStardust(0));
    expect(vm.purchasedCount).toBe(0);
    expect(vm.items.every((i) => !i.purchased)).toBe(true);
    expect(vm.items.every((i) => i.level === 0)).toBe(true);
  });
});

// ════════════════════════════════════════════
// 动态注册表兼容（T3-2 扩充后自动适配）
// ════════════════════════════════════════════

describe('动态注册表兼容（T3-2 扩充后自动适配）', () => {
  it('遍历 SHOP_ITEMS 注册表，每个物品都出现在视图模型中', () => {
    const vm = buildShopViewModel(stateWithStardust(100));
    for (const id of Object.keys(SHOP_ITEMS)) {
      const found = vm.items.find((i) => i.id === id);
      expect(found, `物品 ${id} 应出现在视图模型`).toBeTruthy();
    }
  });

  it('每个物品视图的 name/categoryLabel 来自注册表，非硬编码', () => {
    const vm = buildShopViewModel(stateWithStardust(100));
    for (const item of vm.items) {
      const schema = SHOP_ITEMS[item.id];
      expect(schema).toBeTruthy();
      expect(item.name).toBe(schema!.name);
      expect(item.categoryLabel).toBe(SHOP_CATEGORY_LABELS[schema!.category]);
    }
  });

  it('若 T3-2 新增分类为空的桶，仍展示该 tab（分类顺序固定）', () => {
    const vm = buildShopViewModel(stateWithStardust(100));
    // 即便某分类无物品，categories 仍含全部 5 类
    expect(vm.categories.length).toBe(5);
  });
});

// ════════════════════════════════════════════
// purchaseState 分类
// ════════════════════════════════════════════

describe('classifyShopItem — 初始态分类（足够星核）', () => {
  it('无前置且星核足够 → purchasable（credit-injection / research-subsidy）', () => {
    const s = stateWithStardust(100);
    expect(classifyShopItem(s, SHOP_ITEMS['shop-credit-injection']).purchaseState).toBe('purchasable');
    expect(classifyShopItem(s, SHOP_ITEMS['shop-research-subsidy']).purchaseState).toBe('purchasable');
  });

  it('前置未满足 → locked（excavator-tuning 需 credit-injection 1 级）', () => {
    const s = stateWithStardust(100);
    const r = classifyShopItem(s, SHOP_ITEMS['shop-excavator-tuning']);
    expect(r.purchaseState).toBe('locked');
    expect(r.lockReason).toContain('信用点注入');
    expect(r.lockReason).toContain('1');
  });

  it('多级前置未满足 → locked（stardust-resonance 需 credit-injection 2 级）', () => {
    const s = stateWithStardust(100);
    // 先买 1 级 credit-injection，resonance 仍锁定（需 2 级）
    s.prestige.shopPurchases['shop-credit-injection'] = 1;
    const r = classifyShopItem(s, SHOP_ITEMS['shop-stardust-resonance']);
    expect(r.purchaseState).toBe('locked');
    expect(r.lockReason).toContain('2');
  });

  it('facility 类前置未满足 → locked（he3-permit 需 credit-injection 1 级）', () => {
    const s = stateWithStardust(100);
    expect(classifyShopItem(s, SHOP_ITEMS['shop-he3-permit']).purchaseState).toBe('locked');
  });
});

describe('classifyShopItem — purchasable ⇔ canPurchase.ok 一致', () => {
  // 对每个物品、跨多种状态断言：视图模型分类与 canPurchase 的最终可购性一致
  const states: { name: string; setup: (s: GameState) => void }[] = [
    { name: '初始(0星核)', setup: () => {} },
    { name: '100星核', setup: (s) => { s.prestige.stardust = 100; } },
    { name: 'credit-injection满级', setup: (s) => { s.prestige.shopPurchases['shop-credit-injection'] = 5; s.prestige.stardust = 1000; } },
    { name: 'credit-injection 2级', setup: (s) => { s.prestige.shopPurchases['shop-credit-injection'] = 2; s.prestige.stardust = 1000; } },
  ];

  for (const { name, setup } of states) {
    it(`[${name}] 每个物品 purchasable ⇔ canPurchase.ok`, () => {
      const s = stateWithStardust(0);
      setup(s);
      for (const item of Object.values(SHOP_ITEMS)) {
        const cls = classifyShopItem(s, item);
        const chk = canPurchase(s, item.id);
        // purchasable ⇔ canPurchase.ok（最终可购性一致）
        expect(cls.purchaseState === 'purchasable').toBe(chk.ok);
      }
    });
  }
});

// ════════════════════════════════════════════
// 满级态 / 星核不足态展示
// ════════════════════════════════════════════

describe('满级态展示', () => {
  it('research-subsidy 达 maxLevel(1) → maxed，costDisplay=已满级，nextCost=Infinity', () => {
    const s = stateWithStardust(1000);
    s.prestige.shopPurchases['shop-research-subsidy'] = 1;
    const vm = buildShopViewModel(s);
    const item = vm.itemsByCategory.research.find((i) => i.id === 'shop-research-subsidy')!;
    expect(item.purchaseState).toBe('maxed');
    expect(item.costDisplay).toBe('已满级');
    expect(item.nextCost).toBe(Infinity);
    expect(item.level).toBe(1);
    expect(item.maxLevel).toBe(1);
  });

  it('credit-injection 达 maxLevel(5) → maxed', () => {
    const s = stateWithStardust(1000);
    s.prestige.shopPurchases['shop-credit-injection'] = 5;
    const vm = buildShopViewModel(s);
    const item = vm.itemsByCategory.economy.find((i) => i.id === 'shop-credit-injection')!;
    expect(item.purchaseState).toBe('maxed');
  });
});

describe('星核不足态展示', () => {
  it('0 星核时 credit-injection → insufficient，lockReason 含成本', () => {
    const s = stateWithStardust(0);
    const vm = buildShopViewModel(s);
    const item = vm.itemsByCategory.economy.find((i) => i.id === 'shop-credit-injection')!;
    expect(item.purchaseState).toBe('insufficient');
    expect(item.lockReason).toContain('星核不足');
    // 成本展示仍显示下一级成本数值（非「已满级」）
    expect(item.costDisplay).not.toBe('已满级');
    expect(item.nextCost).toBe(getItemCost(s, 'shop-credit-injection'));
  });

  it('星核介于成本之间 → insufficient', () => {
    const s = stateWithStardust(2); // credit-injection 首级成本 3
    const vm = buildShopViewModel(s);
    const item = vm.itemsByCategory.economy.find((i) => i.id === 'shop-credit-injection')!;
    expect(item.purchaseState).toBe('insufficient');
  });
});

// ════════════════════════════════════════════
// 分类切换子集
// ════════════════════════════════════════════

describe('分类切换子集', () => {
  it('itemsByCategory[cat] 中每个物品的 category === cat', () => {
    const vm = buildShopViewModel(stateWithStardust(100));
    for (const cat of SHOP_CATEGORY_ORDER) {
      for (const item of vm.itemsByCategory[cat]) {
        expect(item.category).toBe(cat);
      }
    }
  });

  it('每个分类桶的物品互不重叠（按 id）', () => {
    const vm = buildShopViewModel(stateWithStardust(100));
    const seen = new Set<string>();
    for (const cat of SHOP_CATEGORY_ORDER) {
      for (const item of vm.itemsByCategory[cat]) {
        expect(seen.has(item.id)).toBe(false);
        seen.add(item.id);
      }
    }
  });
});

// ════════════════════════════════════════════
// 购买交互（视图模型刷新）
// ════════════════════════════════════════════

describe('购买交互 — 视图模型刷新', () => {
  it('购买后 level +1、purchased=true、余额扣减、purchasedCount +1', async () => {
    const s = stateWithStardust(100);
    const { repo } = makeRepo(s);
    const cost = getItemCost(s, 'shop-credit-injection');

    const r = await purchaseItem(repo, s, 'shop-credit-injection');
    expect(r.ok).toBe(true);

    const vm = buildShopViewModel(s);
    const item = vm.itemsByCategory.economy.find((i) => i.id === 'shop-credit-injection')!;
    expect(item.level).toBe(1);
    expect(item.purchased).toBe(true);
    expect(vm.balance).toBe(100 - cost);
    expect(vm.purchasedCount).toBe(1);
  });

  it('连续购买后等级递增、下一级成本递增', async () => {
    const s = stateWithStardust(1000);
    const { repo } = makeRepo(s);

    await purchaseItem(repo, s, 'shop-credit-injection');
    let vm = buildShopViewModel(s);
    let item = vm.itemsByCategory.economy.find((i) => i.id === 'shop-credit-injection')!;
    expect(item.level).toBe(1);
    const cost1 = item.nextCost;

    await purchaseItem(repo, s, 'shop-credit-injection');
    vm = buildShopViewModel(s);
    item = vm.itemsByCategory.economy.find((i) => i.id === 'shop-credit-injection')!;
    expect(item.level).toBe(2);
    expect(item.nextCost).toBeGreaterThan(cost1);
  });

  it('购买后前置满足，依赖物品从 locked → purchasable', async () => {
    const s = stateWithStardust(1000);
    const { repo } = makeRepo(s);

    // 初始 excavator-tuning 锁定
    expect(classifyShopItem(s, SHOP_ITEMS['shop-excavator-tuning']).purchaseState).toBe('locked');

    await purchaseItem(repo, s, 'shop-credit-injection'); // credit-injection → lv1
    const vm = buildShopViewModel(s);
    const excavator = vm.itemsByCategory.production.find((i) => i.id === 'shop-excavator-tuning')!;
    expect(excavator.purchaseState).toBe('purchasable');
    // 前置视图 met=true
    expect(excavator.prerequisites.every((p) => p.met)).toBe(true);
  });

  it('买满 credit-injection 2 级后 stardust-resonance 解锁', async () => {
    const s = stateWithStardust(1000);
    const { repo } = makeRepo(s);

    await purchaseItem(repo, s, 'shop-credit-injection');
    let vm = buildShopViewModel(s);
    expect(vm.itemsByCategory.prestige.find((i) => i.id === 'shop-stardust-resonance')!.purchaseState).toBe('locked');

    await purchaseItem(repo, s, 'shop-credit-injection');
    vm = buildShopViewModel(s);
    expect(vm.itemsByCategory.prestige.find((i) => i.id === 'shop-stardust-resonance')!.purchaseState).toBe('purchasable');
  });

  it('购买失败（星核不足）时视图模型不变', async () => {
    const s = stateWithStardust(1);
    const { repo } = makeRepo(s);
    const before = buildShopViewModel(s);

    const r = await purchaseItem(repo, s, 'shop-credit-injection');
    expect(r.ok).toBe(false);

    const after = buildShopViewModel(s);
    expect(after.purchasedCount).toBe(before.purchasedCount);
    expect(after.balance).toBe(before.balance);
  });
});

// ════════════════════════════════════════════
// 锁定/满级态卡片字段
// ════════════════════════════════════════════

describe('锁定/满级态卡片字段', () => {
  it('锁定态物品有 lockReason 且 prerequisites 含未满足项', () => {
    const s = stateWithStardust(100);
    const vm = buildShopViewModel(s);
    const excavator = vm.itemsByCategory.production.find((i) => i.id === 'shop-excavator-tuning')!;
    expect(excavator.purchaseState).toBe('locked');
    expect(excavator.lockReason).toBeTruthy();
    expect(excavator.prerequisites.some((p) => !p.met)).toBe(true);
  });

  it('满级态物品 nextCost=Infinity、costDisplay=已满级', () => {
    const s = stateWithStardust(1000);
    s.prestige.shopPurchases['shop-research-subsidy'] = 1;
    const vm = buildShopViewModel(s);
    const item = vm.itemsByCategory.research.find((i) => i.id === 'shop-research-subsidy')!;
    expect(item.nextCost).toBe(Infinity);
    expect(item.costDisplay).toBe('已满级');
  });
});

// ════════════════════════════════════════════
// 跨转生持久化（视图模型角度）
// ════════════════════════════════════════════

describe('跨转生持久化 — 视图模型仍显示已购物品', () => {
  it('购买后转生，视图模型仍显示已购等级', async () => {
    const s = stateWithStardust(1000);
    s.crystal = 300; // 转生条件
    const { repo } = makeRepo(s);

    await purchaseItem(repo, s, 'shop-credit-injection');
    expect(getItemLevel(s, 'shop-credit-injection')).toBe(1);

    const reset = await executePrestigeReset(repo, s, T0 + 1000);
    expect(reset.ok).toBe(true);

    // 转生后 shopPurchases 保留 → 视图模型仍显示已购
    const vm = buildShopViewModel(s);
    const item = vm.itemsByCategory.economy.find((i) => i.id === 'shop-credit-injection')!;
    expect(item.level).toBe(1);
    expect(item.purchased).toBe(true);
    expect(vm.purchasedCount).toBeGreaterThanOrEqual(1);
  });
});
