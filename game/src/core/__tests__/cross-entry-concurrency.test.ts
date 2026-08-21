/**
 * 跨入口串行化测试——consume / 商店购买 / 转生重置共享同一条队列。
 *
 * 修复前：purchaseItem（starcoreShop）与 executePrestigeReset（prestige）
 * 直接用模块级 txRepo，与 ConsumptionEngine.consume 并发时会触发事务交错
 * （begin 自动清理覆盖前驱快照 → 扣减泄漏 / plan 读到半截状态）。
 * 修复后：三者都经 ConsumptionEngine.runSerialized 入队，顺序执行，无交错。
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createNewGame } from '../state';
import { ConsumptionEngine } from '../consumption';
import { purchaseItem } from '../starcoreShop';
import { executePrestigeReset } from '../prestige';
import { InMemoryBackend, TransactionalRepository } from '../../save/transactional';
import type { PersistenceBackend } from '../../save/transactional';
import type { GameState } from '../types';

const T0 = 1_700_000_000_000;

/**
 * 可控失败后端：前 `failFirst` 次 save 抛异常，之后成功。
 */
class FailingBackend<T> implements PersistenceBackend<T> {
  saveCallCount = 0;
  failFirst = 0;
  private data: T | null = null;
  constructor(initial: T | null = null) {
    this.data = initial;
  }
  async load(): Promise<T | null> {
    return this.data;
  }
  async save(state: T): Promise<void> {
    this.saveCallCount++;
    if (this.saveCallCount <= this.failFirst) {
      throw new Error('模拟写入失败: QuotaExceededError');
    }
    this.data = state;
  }
  peek(): T | null {
    return this.data;
  }
}

describe('跨入口串行化——consume / 商店购买 / 转生重置共享队列', () => {
  let backend: InMemoryBackend<GameState>;
  let repo: TransactionalRepository<GameState>;
  let engine: ConsumptionEngine;

  beforeEach(() => {
    backend = new InMemoryBackend<GameState>();
    repo = new TransactionalRepository<GameState>(backend, structuredClone);
    engine = new ConsumptionEngine(repo);
    engine.reset();
  });

  // ===== 1. 并发 consume + purchaseItem =====
  it('并发 consume + purchaseItem：consume 先入队扣同位素、purchase 后入队扣星核，余额精确', async () => {
    const state = createNewGame(T0);
    state.isotope = 200;
    state.prestige.stardust = 10;
    // createNewGame 默认 credits=100、shopPurchases={}

    const [rc, rp] = await Promise.all([
      engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 40 }),
      // shop-credit-injection：baseCost 3、无前置、onPurchase credits += 500
      engine.runSerialized(() => purchaseItem(repo, state, 'shop-credit-injection')),
    ]);

    expect(rc.ok).toBe(true);
    expect(rp.ok).toBe(true);

    // consume 先执行：isotope 200→160；purchase 后执行：stardust 10→7、credits 100→600、等级 1
    expect(state.isotope).toBe(160);
    expect(state.prestige.stardust).toBe(7);
    expect(state.credits).toBe(600);
    expect(state.prestige.shopPurchases['shop-credit-injection']).toBe(1);

    // 后端持久化最终状态
    expect(backend.peek()?.isotope).toBe(160);
    expect(backend.peek()?.credits).toBe(600);

    // 事务全部结束，无残留
    expect(repo.isActive()).toBe(false);
  });

  // ===== 2. 并发 consume(save 失败) + purchaseItem(成功) =====
  it('并发 consume(save失败) + purchaseItem(成功)：consume 完整回滚后 purchase 才执行', async () => {
    const failingBackend = new FailingBackend<GameState>();
    failingBackend.failFirst = 1;
    const fRepo = new TransactionalRepository<GameState>(failingBackend, structuredClone);
    const fEngine = new ConsumptionEngine(fRepo);
    fEngine.reset();

    const state = createNewGame(T0);
    state.isotope = 200;
    state.prestige.stardust = 10;

    const [rc, rp] = await Promise.all([
      fEngine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 40 }),
      fEngine.runSerialized(() => purchaseItem(fRepo, state, 'shop-credit-injection')),
    ]);

    // consume 失败（save 抛错 → rollback 完整恢复 40）
    expect(rc.ok).toBe(false);
    expect(rc.reason).toContain('异常');
    // purchase 成功
    expect(rp.ok).toBe(true);

    // consume 完整回滚：isotope 恢复 200；purchase 后 stardust 7、credits 600
    expect(state.isotope).toBe(200);
    expect(state.prestige.stardust).toBe(7);
    expect(state.credits).toBe(600);

    // save 被调用两次：consume 第 1 次失败、purchase 第 2 次成功
    expect(failingBackend.saveCallCount).toBe(2);
    expect(failingBackend.peek()?.credits).toBe(600);

    expect(fRepo.isActive()).toBe(false);
  });

  // ===== 3. 并发 consume + executePrestigeReset（consume 先执行）=====
  it('并发 consume + executePrestigeReset：consume 先扣、reset 的 plan 读到扣减后状态', async () => {
    const state = createNewGame(T0);
    state.isotope = 200;
    // createNewGame：crystal=0、stardust=0、antimatter=0、darkmatter=0、设施均 Lv1、research=[]
    // 无 shop-prestige-amplifier 购买 → 乘子 1.0，故 earned = floor(isotope/20)

    const [rc, rz] = await Promise.all([
      engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 40 }),
      engine.runSerialized(() => executePrestigeReset(repo, state, T0)),
    ]);

    expect(rc.ok).toBe(true);
    expect(rz.ok).toBe(true);
    if (!rz.ok) throw new Error('unreachable');

    // consume 先提交（isotope 200→160），reset 的 plan 在此后计算：
    // earned = floor(160/20) = 8（若交错读到 200 则为 10——此断言锁定串行化顺序）
    expect(rz.stardustEarned).toBe(8);

    // reset 重建后基线：isotope=0、prestigeLevel=1、stardust=8
    expect(state.isotope).toBe(0);
    expect(state.prestige.prestigeLevel).toBe(1);
    expect(state.prestige.stardust).toBe(8);

    // 后端持久化重建后状态
    expect(backend.peek()?.isotope).toBe(0);
    expect(backend.peek()?.prestige.stardust).toBe(8);

    expect(repo.isActive()).toBe(false);
  });

  // ===== 4. 并发 executePrestigeReset + consume（reset 先执行）=====
  it('并发 executePrestigeReset + consume：reset 先重建、consume 读到转生后 0 同位素而失败', async () => {
    const state = createNewGame(T0);
    state.isotope = 200;

    const [rz, rc] = await Promise.all([
      engine.runSerialized(() => executePrestigeReset(repo, state, T0)),
      engine.consume(state, { kind: 'buff', resourceId: 'isotope', amount: 40 }),
    ]);

    expect(rz.ok).toBe(true);
    // reset 先执行：earned = floor(200/20) = 10
    if (!rz.ok) throw new Error('unreachable');
    expect(rz.stardustEarned).toBe(10);

    // consume 后执行：转生后 isotope=0，40 > 0 → 余额不足
    expect(rc.ok).toBe(false);
    expect(rc.reason).toContain('不足');

    // 重建后状态保持，未被 consume 破坏
    expect(state.isotope).toBe(0);
    expect(state.prestige.prestigeLevel).toBe(1);
    expect(state.prestige.stardust).toBe(10);

    expect(repo.isActive()).toBe(false);
  });
});
