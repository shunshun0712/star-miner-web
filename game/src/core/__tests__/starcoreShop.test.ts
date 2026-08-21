import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { TransactionalRepository, InMemoryBackend } from '../../save/transactional';
import { LayeredStateBackend, type LayeredKeyValueStore } from '../../save/layeredBackend';
import type { GameState } from '../types';
import {
  SHOP_ITEMS,
  canPurchase,
  getItemCost,
  getItemLevel,
  isRegisteredShopItem,
  purchaseItem,
} from '../starcoreShop';
import { executePrestigeReset } from '../prestige';

const T0 = 1_700_000_000_000;

/** 构造有足够星核的状态（用于购买测试） */
function stateWithStardust(stardust: number): GameState {
  const s = createNewGame(T0);
  s.prestige.stardust = stardust;
  return s;
}

/** 内存分层存储 mock */
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

/** 构造带分层后端的事务仓库 */
function makeRepo(state: GameState): { repo: TransactionalRepository<GameState>; backend: LayeredStateBackend; store: InMemoryLayeredStore } {
  const store = new InMemoryLayeredStore();
  const backend = new LayeredStateBackend(store);
  const repo = new TransactionalRepository<GameState>(backend, structuredClone);
  return { repo, backend, store };
}

// ════════════════════════════════════════════
// SHOP_ITEMS 注册表
// ════════════════════════════════════════════

describe('SHOP_ITEMS 注册表', () => {
  it('至少 3 个物品（T3-1 占位，T3-2 扩充）', () => {
    expect(Object.keys(SHOP_ITEMS).length).toBeGreaterThanOrEqual(3);
  });

  it('每个物品 schema 字段完整', () => {
    for (const item of Object.values(SHOP_ITEMS)) {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.description).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(item.baseCost).toBeGreaterThan(0);
      expect(item.costMultiplier).toBeGreaterThan(1);
      expect(item.maxLevel).toBeGreaterThanOrEqual(1);
      expect(Array.isArray(item.prerequisites)).toBe(true);
    }
  });

  it('至少覆盖 3 种分类（production/economy/research/facility/prestige）', () => {
    const categories = new Set(Object.values(SHOP_ITEMS).map((i) => i.category));
    expect(categories.size).toBeGreaterThanOrEqual(3);
  });

  it('id 与注册表 key 一致', () => {
    for (const [key, item] of Object.entries(SHOP_ITEMS)) {
      expect(item.id).toBe(key);
    }
  });

  it('isRegisteredShopItem 对注册物品返回 true，未注册返回 false', () => {
    for (const id of Object.keys(SHOP_ITEMS)) {
      expect(isRegisteredShopItem(id)).toBe(true);
    }
    expect(isRegisteredShopItem('nonexistent-item')).toBe(false);
  });
});

// ════════════════════════════════════════════
// getItemLevel
// ════════════════════════════════════════════

describe('getItemLevel', () => {
  it('未购买物品返回 0', () => {
    const s = stateWithStardust(100);
    expect(getItemLevel(s, 'shop-credit-injection')).toBe(0);
  });

  it('已购买物品返回已购等级', () => {
    const s = stateWithStardust(100);
    s.prestige.shopPurchases['shop-credit-injection'] = 3;
    expect(getItemLevel(s, 'shop-credit-injection')).toBe(3);
  });

  it('未知物品返回 0', () => {
    const s = stateWithStardust(100);
    expect(getItemLevel(s, 'unknown-item')).toBe(0);
  });
});

// ════════════════════════════════════════════
// getItemCost
// ════════════════════════════════════════════

describe('getItemCost', () => {
  it('第 1 级成本 = baseCost（level=0 时）', () => {
    const s = stateWithStardust(100);
    const item = SHOP_ITEMS['shop-credit-injection'];
    expect(getItemCost(s, 'shop-credit-injection')).toBe(item.baseCost);
  });

  it('第 2 级成本 = baseCost × costMultiplier^1', () => {
    const s = stateWithStardust(100);
    s.prestige.shopPurchases['shop-credit-injection'] = 1;
    const item = SHOP_ITEMS['shop-credit-injection'];
    expect(getItemCost(s, 'shop-credit-injection')).toBe(Math.floor(item.baseCost * item.costMultiplier));
  });

  it('第 3 级成本 = baseCost × costMultiplier^2', () => {
    const s = stateWithStardust(100);
    s.prestige.shopPurchases['shop-credit-injection'] = 2;
    const item = SHOP_ITEMS['shop-credit-injection'];
    expect(getItemCost(s, 'shop-credit-injection')).toBe(Math.floor(item.baseCost * item.costMultiplier ** 2));
  });

  it('成本逐级递增', () => {
    const s = stateWithStardust(100);
    const costs: number[] = [];
    for (let lvl = 0; lvl < 4; lvl++) {
      s.prestige.shopPurchases['shop-credit-injection'] = lvl;
      costs.push(getItemCost(s, 'shop-credit-injection'));
    }
    for (let i = 1; i < costs.length; i++) {
      expect(costs[i]).toBeGreaterThan(costs[i - 1]);
    }
  });

  it('未知物品返回 Infinity', () => {
    const s = stateWithStardust(100);
    expect(getItemCost(s, 'unknown-item')).toBe(Infinity);
  });
});

// ════════════════════════════════════════════
// canPurchase
// ════════════════════════════════════════════

describe('canPurchase', () => {
  it('星核足够、未满级、无前置时返回 ok=true', () => {
    const s = stateWithStardust(100);
    expect(canPurchase(s, 'shop-credit-injection').ok).toBe(true);
  });

  it('未知物品返回 ok=false', () => {
    const s = stateWithStardust(100);
    const r = canPurchase(s, 'unknown-item');
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('未知');
  });

  it('星核不足返回 ok=false', () => {
    const s = stateWithStardust(1);
    const r = canPurchase(s, 'shop-credit-injection');
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('不足');
  });

  it('满级后返回 ok=false', () => {
    const s = stateWithStardust(1000);
    const item = SHOP_ITEMS['shop-research-subsidy'];
    s.prestige.shopPurchases['shop-research-subsidy'] = item.maxLevel;
    const r = canPurchase(s, 'shop-research-subsidy');
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('满级');
  });

  it('前置不满足返回 ok=false', () => {
    const s = stateWithStardust(100);
    // shop-excavator-tuning 需要 shop-credit-injection 达到 1 级
    const r = canPurchase(s, 'shop-excavator-tuning');
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('需要');
  });

  it('前置满足后返回 ok=true', () => {
    const s = stateWithStardust(100);
    s.prestige.shopPurchases['shop-credit-injection'] = 1;
    expect(canPurchase(s, 'shop-excavator-tuning').ok).toBe(true);
  });

  it('多级前置——shop-stardust-resonance 需 shop-credit-injection 2 级', () => {
    const s = stateWithStardust(100);
    expect(canPurchase(s, 'shop-stardust-resonance').ok).toBe(false);
    s.prestige.shopPurchases['shop-credit-injection'] = 1;
    expect(canPurchase(s, 'shop-stardust-resonance').ok).toBe(false);
    s.prestige.shopPurchases['shop-credit-injection'] = 2;
    expect(canPurchase(s, 'shop-stardust-resonance').ok).toBe(true);
  });

  it('canPurchase 不 mutate 入参', () => {
    const s = stateWithStardust(100);
    const before = structuredClone(s);
    canPurchase(s, 'shop-credit-injection');
    expect(s).toEqual(before);
  });
});

// ════════════════════════════════════════════
// purchaseItem
// ════════════════════════════════════════════

describe('purchaseItem — 成功路径', () => {
  it('购买成功后星核扣除、等级 +1', async () => {
    const s = stateWithStardust(100);
    const { repo } = makeRepo(s);
    const cost = getItemCost(s, 'shop-credit-injection');

    const r = await purchaseItem(repo, s, 'shop-credit-injection');
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.newLevel).toBe(1);
    expect(r.cost).toBe(cost);
    expect(s.prestige.stardust).toBe(100 - cost);
    expect(s.prestige.shopPurchases['shop-credit-injection']).toBe(1);
  });

  it('onPurchase 立即生效——shop-credit-injection 购买后 credits +500', async () => {
    const s = stateWithStardust(100);
    const { repo } = makeRepo(s);
    const creditsBefore = s.credits;

    await purchaseItem(repo, s, 'shop-credit-injection');
    expect(s.credits).toBe(creditsBefore + 500);
  });

  it('onPurchase 立即生效——shop-research-subsidy 购买后研究中心解锁', async () => {
    const s = stateWithStardust(100);
    const { repo } = makeRepo(s);
    expect(s.researchCenterUnlocked).toBe(false);

    await purchaseItem(repo, s, 'shop-research-subsidy');
    expect(s.researchCenterUnlocked).toBe(true);
  });

  it('连续购买同一物品——等级递增、成本递增', async () => {
    const s = stateWithStardust(1000);
    const { repo } = makeRepo(s);
    const item = SHOP_ITEMS['shop-credit-injection'];

    const r1 = await purchaseItem(repo, s, 'shop-credit-injection');
    expect(r1.ok).toBe(true);
    if (!r1.ok) return;
    expect(r1.newLevel).toBe(1);
    expect(r1.cost).toBe(item.baseCost);

    const r2 = await purchaseItem(repo, s, 'shop-credit-injection');
    expect(r2.ok).toBe(true);
    if (!r2.ok) return;
    expect(r2.newLevel).toBe(2);
    expect(r2.cost).toBe(Math.floor(item.baseCost * item.costMultiplier));
  });

  it('购买 commit 后数据持久化到后端', async () => {
    const s = stateWithStardust(100);
    const { repo, backend, store } = makeRepo(s);
    await backend.save(s);

    await purchaseItem(repo, s, 'shop-credit-injection');

    // 重载验证
    const reloaded = await backend.load();
    expect(reloaded!.prestige.shopPurchases['shop-credit-injection']).toBe(1);
    expect(reloaded!.prestige.stardust).toBeLessThan(100);
  });
});

describe('purchaseItem — 失败路径', () => {
  it('星核不足时不购买、不扣星核', async () => {
    const s = stateWithStardust(1);
    const { repo } = makeRepo(s);
    const stardustBefore = s.prestige.stardust;

    const r = await purchaseItem(repo, s, 'shop-credit-injection');
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.error).toContain('不足');
    expect(s.prestige.stardust).toBe(stardustBefore);
    expect(s.prestige.shopPurchases['shop-credit-injection']).toBeUndefined();
  });

  it('满级后不购买', async () => {
    const s = stateWithStardust(1000);
    const { repo } = makeRepo(s);
    s.prestige.shopPurchases['shop-research-subsidy'] = 1; // maxLevel=1

    const r = await purchaseItem(repo, s, 'shop-research-subsidy');
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.error).toContain('满级');
  });

  it('前置不满足时不购买', async () => {
    const s = stateWithStardust(100);
    const { repo } = makeRepo(s);

    const r = await purchaseItem(repo, s, 'shop-excavator-tuning');
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.error).toContain('需要');
  });

  it('未知物品不购买', async () => {
    const s = stateWithStardust(100);
    const { repo } = makeRepo(s);

    const r = await purchaseItem(repo, s, 'unknown-item');
    expect(r.ok).toBe(false);
  });
});

describe('purchaseItem — 事务原子性', () => {
  it('commit 前状态已 mutate 但后端未落盘', async () => {
    const s = stateWithStardust(100);
    const { repo, store } = makeRepo(s);
    // 不预先 backend.save——store.main 为 null

    const r = await purchaseItem(repo, s, 'shop-credit-injection');
    expect(r.ok).toBe(true);
    // commit 触发 backend.save → store 有数据
    expect(store.main).not.toBeNull();
  });

  it('购买事务是原子写（saveBoth 一次写两键）', async () => {
    const s = stateWithStardust(100);
    const { repo, store } = makeRepo(s);
    let saveBothCount = 0;
    const origSaveBoth = store.saveBoth.bind(store);
    store.saveBoth = async (b: string, p: string) => {
      saveBothCount++;
      await origSaveBoth(b, p);
    };

    await purchaseItem(repo, s, 'shop-credit-injection');
    expect(saveBothCount).toBe(1);
  });
});

// ════════════════════════════════════════════
// 跨转生持久化
// ════════════════════════════════════════════

describe('商店购买跨转生持久化', () => {
  it('转生后 shopPurchases 保留', async () => {
    const s = stateWithStardust(100);
    s.crystal = 300; // 够转生条件
    const { repo } = makeRepo(s);

    // 先购买一个物品
    await purchaseItem(repo, s, 'shop-credit-injection');
    expect(s.prestige.shopPurchases['shop-credit-injection']).toBe(1);

    // 执行转生
    const resetResult = await executePrestigeReset(repo, s, T0 + 1000);
    expect(resetResult.ok).toBe(true);

    // 转生后 shopPurchases 仍在
    expect(s.prestige.shopPurchases['shop-credit-injection']).toBe(1);
  });

  it('转生后可继续购买已购物品的下一级', async () => {
    const s = stateWithStardust(1000);
    s.crystal = 300;
    const { repo } = makeRepo(s);

    // 先买 1 级
    await purchaseItem(repo, s, 'shop-credit-injection');
    expect(getItemLevel(s, 'shop-credit-injection')).toBe(1);

    // 转生
    const resetResult = await executePrestigeReset(repo, s, T0 + 1000);
    expect(resetResult.ok).toBe(true);
    if (!resetResult.ok) return;

    // 转生后等级保留，可继续购买第 2 级
    expect(getItemLevel(s, 'shop-credit-injection')).toBe(1);
    expect(canPurchase(s, 'shop-credit-injection').ok).toBe(true);

    const r2 = await purchaseItem(repo, s, 'shop-credit-injection');
    expect(r2.ok).toBe(true);
    if (!r2.ok) return;
    expect(r2.newLevel).toBe(2);
  });
});
