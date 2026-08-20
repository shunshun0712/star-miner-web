import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { InMemoryBackend, TransactionalRepository } from '../../save/transactional';
import type { GameState } from '../types';
import { createEmptyPrestigeLayer, PRESTIGE_UNLOCKS } from '../prestigeLayer';
import {
  STARDUST_EARN_RATES,
  STARDUST_PER_FACILITY_LEVEL,
  STARDUST_PER_RESEARCH,
  buildPrestigeBaseline,
  captureFullBaseline,
  computeStardustEarned,
  createBaselineSnapshot,
  executePrestigeReset,
  planPrestigeReset,
  previewPrestigeReset,
  rollbackPrestigeReset,
} from '../prestige';

const T0 = 1_700_000_000_000;
const T1 = T0 + 10_000;

/** 有一定进度的存档：晶体 + 设施等级 + 成就 */
function progressedState(crystal: number): GameState {
  const s = createNewGame(T0);
  s.crystal = crystal;
  s.facilities.excavator.level = 3;
  s.facilities.transport.level = 2;
  s.achievements = ['p100Stardust'];
  return s;
}

/** progressedState 的星核：crystal/100 + 2×(3-1) + 2×(2-1) = crystal/100 + 6 */
function progressedEarned(crystal: number): number {
  return Math.floor(crystal / 100 + 6);
}

// ════════════════════════════════════════════
// 星核定价公式（验收：公式可测）
// ════════════════════════════════════════════

describe('computeStardustEarned — 正式定价公式', () => {
  it('裸初始态（设施 1 级、无研究、无资源）得 0', () => {
    expect(computeStardustEarned(createNewGame(T0))).toBe(0);
  });

  it('crystal 按 1/100 折算（250 → 2，floor 截断）', () => {
    const s = createNewGame(T0);
    s.crystal = 250;
    expect(computeStardustEarned(s)).toBe(2);
    expect(STARDUST_EARN_RATES.crystal).toBe(1 / 100);
  });

  it('isotope 按 1/20 折算', () => {
    const s = createNewGame(T0);
    s.isotope = 20;
    expect(computeStardustEarned(s)).toBe(1);
  });

  it('antimatter 按 1/5 折算', () => {
    const s = createNewGame(T0);
    s.antimatter = 5;
    expect(computeStardustEarned(s)).toBe(1);
  });

  it('darkmatter 按 1/2 折算', () => {
    const s = createNewGame(T0);
    s.darkmatter = 2;
    expect(computeStardustEarned(s)).toBe(1);
  });

  it('stardust 按 1/1000 折算', () => {
    const s = createNewGame(T0);
    s.stardust = 1000;
    expect(computeStardustEarned(s)).toBe(1);
  });

  it('设施每高于 1 级贡献 2 点（excavator 3 级 → 4 点）', () => {
    const s = createNewGame(T0);
    s.facilities.excavator.level = 3;
    expect(computeStardustEarned(s)).toBe(2 * (3 - 1) * 1);
    expect(STARDUST_PER_FACILITY_LEVEL).toBe(2);
  });

  it('每项研究贡献 5 点（2 项 → 10 点）', () => {
    const s = createNewGame(T0);
    s.research = ['t1', 't2'];
    expect(computeStardustEarned(s)).toBe(10);
    expect(STARDUST_PER_RESEARCH).toBe(5);
  });

  it('多因子叠加：crystal 100 + excavator 2 级 → 1 + 2 = 3', () => {
    const s = createNewGame(T0);
    s.crystal = 100;
    s.facilities.excavator.level = 2;
    expect(computeStardustEarned(s)).toBe(3);
  });

  it('credits / energy 不计入定价', () => {
    const s = createNewGame(T0);
    s.credits = 999_999;
    s.energy = 999_999;
    expect(computeStardustEarned(s)).toBe(0);
  });
});

// ════════════════════════════════════════════
// 重置计划（纯函数）
// ════════════════════════════════════════════

describe('planPrestigeReset — 标记 dirty → 批量重建', () => {
  it('纯函数：不 mutate 入参', () => {
    const s = progressedState(250);
    const before = structuredClone(s);
    planPrestigeReset(s, T1);
    expect(s).toEqual(before);
  });

  it('dirtyFields 覆盖基线层全字段（资源/设施/研究/成就等）', () => {
    const plan = planPrestigeReset(progressedState(250), T1);
    for (const f of ['credits', 'crystal', 'facilities', 'research', 'achievements', 'consumptionLog', 'stats']) {
      expect(plan.dirtyFields).toContain(f);
    }
    expect(plan.dirtyFields).not.toContain('prestige'); // 转生层不属于 dirty 基线层
  });

  it('rebuiltState：基线归零 + 转生层结算（prestigeLevel+1、stardust 累加、history 追加）', () => {
    const s = progressedState(250);
    const plan = planPrestigeReset(s, T1);
    expect(plan.rebuiltState.crystal).toBe(0);
    expect(plan.rebuiltState.facilities.excavator.level).toBe(1);
    expect(plan.rebuiltState.achievements).toEqual([]);
    expect(plan.newPrestige.prestigeLevel).toBe(1);
    expect(plan.newPrestige.stardust).toBe(progressedEarned(250));
    expect(plan.newPrestige.history).toHaveLength(1);
    expect(plan.newPrestige.history[0].stardustEarned).toBe(progressedEarned(250));
  });

  it('preSnapshot 含转生前完整基线层 + 转生层', () => {
    const s = progressedState(250);
    const plan = planPrestigeReset(s, T1);
    expect(plan.preSnapshot.baseline.crystal).toBe(250);
    expect(plan.preSnapshot.baseline.facilities.excavator.level).toBe(3);
    expect((plan.preSnapshot.baseline as Record<string, unknown>).prestige).toBeUndefined();
    expect(plan.preSnapshot.prestige.prestigeLevel).toBe(0);
  });
});

// ════════════════════════════════════════════
// 快照
// ════════════════════════════════════════════

describe('快照', () => {
  it('captureFullBaseline：完整基线层深拷贝，改副本不影响原状态', () => {
    const s = progressedState(250);
    const snap = captureFullBaseline(s);
    expect((snap as Record<string, unknown>).prestige).toBeUndefined();
    expect(snap.crystal).toBe(250);
    snap.crystal = -1;
    snap.facilities.excavator.level = 99;
    expect(s.crystal).toBe(250);
    expect(s.facilities.excavator.level).toBe(3);
  });

  it('createBaselineSnapshot：紧凑摘要（history 留档）', () => {
    const s = progressedState(250);
    const snap = createBaselineSnapshot(s);
    expect(snap.crystal).toBe(250);
    expect(snap.facilityLevels.excavator).toBe(3);
    expect(snap.facilityLevels.transport).toBe(2);
    expect(snap.achievementCount).toBe(1);
    expect(snap.createdAt).toBe(T0);
  });
});

// ════════════════════════════════════════════
// buildPrestigeBaseline（T2-1 语义保持）
// ════════════════════════════════════════════

describe('buildPrestigeBaseline — 转生后初始态含永久加成', () => {
  it('空 unlocked 时为裸初始基线', () => {
    const s = buildPrestigeBaseline(T0, createEmptyPrestigeLayer());
    expect(s.credits).toBe(100);
    expect(s.facilities.he3Excavator.unlocked).toBe(false);
    expect(s.prestige.prestigeLevel).toBe(0);
  });

  it('prestige-start-credits 解锁：初始信用点 +500', () => {
    const prestige = { ...createEmptyPrestigeLayer(), unlocked: ['prestige-start-credits'] };
    expect(buildPrestigeBaseline(T0, prestige).credits).toBe(600);
  });

  it('prestige-he3-unlock 解锁：初始解锁氦-3 采矿器', () => {
    const prestige = { ...createEmptyPrestigeLayer(), unlocked: ['prestige-he3-unlock'] };
    expect(buildPrestigeBaseline(T0, prestige).facilities.he3Excavator.unlocked).toBe(true);
  });

  it('转生后初始态 ≠ createNewGame 裸初始态', () => {
    const prestige = { ...createEmptyPrestigeLayer(), unlocked: ['prestige-start-credits', 'prestige-he3-unlock'] };
    const rebuilt = buildPrestigeBaseline(T0, prestige);
    const fresh = createNewGame(T0);
    expect(rebuilt.credits).toBe(600);
    expect(fresh.credits).toBe(100);
    expect(rebuilt.facilities.he3Excavator.unlocked).toBe(true);
    expect(fresh.facilities.he3Excavator.unlocked).toBe(false);
  });

  it('未注册的 unlocked id 被忽略', () => {
    const prestige = { ...createEmptyPrestigeLayer(), unlocked: ['prestige-start-credits', 'ghost-id'] };
    expect(buildPrestigeBaseline(T0, prestige).credits).toBe(600);
  });

  it('PRESTIGE_UNLOCKS 注册表含两条解锁', () => {
    expect(Object.keys(PRESTIGE_UNLOCKS).sort()).toEqual(['prestige-he3-unlock', 'prestige-start-credits']);
  });
});

// ════════════════════════════════════════════
// 预览（UI 确认/取消）
// ════════════════════════════════════════════

describe('previewPrestigeReset — 转生前快照支持回滚预览', () => {
  it('预览数据：收益 / 新等级 / 永久加成 / 将失去的内容', () => {
    const s = progressedState(250);
    s.research = ['t1'];
    s.prestige.unlocked = ['prestige-start-credits'];
    const p = previewPrestigeReset(s, T1);
    // earned: 2.5 + 6 + 5 = 13.5 → 13
    expect(p.stardustEarned).toBe(13);
    expect(p.newPrestigeLevel).toBe(1);
    expect(p.newStardustBalance).toBe(13);
    expect(p.permanentBonuses).toEqual(['prestige-start-credits']);
    expect(p.resets.researchCount).toBe(1);
    expect(p.resets.achievementCount).toBe(1);
    expect(p.resets.facilityCount).toBe(6);
    expect(p.resets.resourceIds).toContain('crystal');
  });

  it('预览是纯函数：不 mutate 入参、无任何写操作（取消零成本）', () => {
    const s = progressedState(250);
    const before = structuredClone(s);
    previewPrestigeReset(s, T1);
    expect(s).toEqual(before);
  });

  it('baselineBefore / stateAfter 前后对比可用', () => {
    const s = progressedState(250);
    s.prestige.unlocked = ['prestige-start-credits'];
    const p = previewPrestigeReset(s, T1);
    expect(p.baselineBefore.crystal).toBe(250);
    expect(p.baselineBefore.facilities.excavator.level).toBe(3);
    expect(p.stateAfter.crystal).toBe(0);
    expect(p.stateAfter.credits).toBe(600); // 永久加成
    expect(p.stateAfter.prestige.prestigeLevel).toBe(1);
  });
});

// ════════════════════════════════════════════
// 执行（T0-1 事务）
// ════════════════════════════════════════════

describe('executePrestigeReset — 转生重置事务', () => {
  it('基线层重置、转生层保留且 +1（验收 #2）', async () => {
    const initial = progressedState(250);
    const backend = new InMemoryBackend<GameState>(initial);
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const r = await executePrestigeReset(repo, initial, T1);
    expect(r.ok).toBe(true);
    if (!r.ok) return;

    expect(r.state.crystal).toBe(0);
    expect(r.state.credits).toBe(100);
    expect(r.state.facilities.excavator.level).toBe(1);
    expect(r.state.facilities.transport.unlocked).toBe(false);
    expect(r.state.research).toEqual([]);
    expect(r.state.achievements).toEqual([]);

    expect(r.state.prestige.prestigeLevel).toBe(1);
    expect(r.state.prestige.stardust).toBe(progressedEarned(250));
    expect(r.state.prestige.unlocked).toEqual([]);
    expect(r.state.prestige.history).toHaveLength(1);
    expect(r.state.prestige.history[0].stardustEarned).toBe(progressedEarned(250));
    expect(r.state.prestige.history[0].baselineSnapshot.crystal).toBe(250);
  });

  it('返回转生前快照 preSnapshot（回滚凭据）', async () => {
    const initial = progressedState(250);
    const backend = new InMemoryBackend<GameState>(initial);
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const r = await executePrestigeReset(repo, initial, T1);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.preSnapshot.baseline.crystal).toBe(250);
    expect(r.preSnapshot.baseline.facilities.excavator.level).toBe(3);
    expect(r.preSnapshot.prestige.prestigeLevel).toBe(0);
  });

  it('转生后初始态含永久加成（验收 #3）', async () => {
    const initial = progressedState(300);
    initial.prestige.unlocked = ['prestige-start-credits', 'prestige-he3-unlock'];
    const backend = new InMemoryBackend<GameState>(initial);
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const r = await executePrestigeReset(repo, initial, T1);
    expect(r.ok).toBe(true);
    if (!r.ok) return;

    expect(r.state.credits).toBe(600);
    expect(r.state.facilities.he3Excavator.unlocked).toBe(true);
    expect(r.state.prestige.unlocked).toEqual(['prestige-start-credits', 'prestige-he3-unlock']);
    expect(r.state.prestige.stardust).toBe(progressedEarned(300));
  });

  it('不走 createNewGame 代码路径', async () => {
    const initial = progressedState(200);
    initial.prestige.unlocked = ['prestige-start-credits'];
    const backend = new InMemoryBackend<GameState>(initial);
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const r = await executePrestigeReset(repo, initial, T1);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.credits).toBe(600);
    expect(createNewGame(T1).credits).toBe(100);
  });

  it('commit 前基线层不变（验收 #1：模拟事务进行中刷新页面）', () => {
    const initial = progressedState(250);
    // backend 持有独立副本，事务内原地改动不污染持久层
    const backend = new InMemoryBackend<GameState>(structuredClone(initial));
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const tx = repo.begin(initial);
    tx.getState().crystal = 0; // 事务内改动，未提交
    const persisted = backend.peek();
    expect(persisted!.crystal).toBe(250); // 后端仍是事务前基线层
    expect(persisted!.credits).toBe(100);
    expect(tx.isDone()).toBe(false);
  });

  it('事务 rollback 恢复工作状态、后端未写入', () => {
    const initial = progressedState(250);
    const backend = new InMemoryBackend<GameState>(structuredClone(initial));
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const tx = repo.begin(initial);
    tx.getState().credits = 99999;
    tx.rollback();
    expect(initial.credits).toBe(100);
    expect(backend.peek()!.credits).toBe(100);
    expect(tx.isDone()).toBe(true);
  });

  it('已有活跃事务时启动新事务失败', async () => {
    const initial = progressedState(250);
    const backend = new InMemoryBackend<GameState>(initial);
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const tx = repo.begin(initial);
    const r = await executePrestigeReset(repo, initial, T1);
    expect(r.ok).toBe(false);
    tx.rollback();
  });

  it('连续两次转生：prestigeLevel 与 history 累积', async () => {
    let state = progressedState(250);
    const backend = new InMemoryBackend<GameState>(state);
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const r1 = await executePrestigeReset(repo, state, T1);
    expect(r1.ok).toBe(true);
    if (!r1.ok) return;
    state = r1.state;
    // 下一世：设施已重置回 1 级，只有 crystal 贡献（250 → 2）
    state.crystal = 250;
    backend.poke(state);

    const r2 = await executePrestigeReset(repo, state, T1 + 1000);
    expect(r2.ok).toBe(true);
    if (!r2.ok) return;
    expect(r2.state.prestige.prestigeLevel).toBe(2);
    expect(r2.state.prestige.stardust).toBe(progressedEarned(250) + 2);
    expect(r2.state.prestige.history).toHaveLength(2);
    expect(r2.state.prestige.history[1].sequence).toBe(2);
  });
});

// ════════════════════════════════════════════
// 回滚（快照恢复到转生前）
// ════════════════════════════════════════════

describe('rollbackPrestigeReset — 快照回滚可用（验收 #4）', () => {
  it('回滚后两层状态逐字段等于转生前', async () => {
    const initial = progressedState(250);
    initial.prestige.unlocked = ['prestige-start-credits'];
    const backend = new InMemoryBackend<GameState>(initial);
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const preState = structuredClone(initial);

    const r = await executePrestigeReset(repo, initial, T1);
    expect(r.ok).toBe(true);
    if (!r.ok) return;

    // 转生后状态 ≠ 转生前
    expect(initial.crystal).toBe(0);
    expect(initial.prestige.prestigeLevel).toBe(1);

    const rb = await rollbackPrestigeReset(repo, initial, r.preSnapshot);
    expect(rb.ok).toBe(true);
    if (!rb.ok) return;

    // 基线层逐字段恢复
    expect(initial.crystal).toBe(250);
    expect(initial.facilities.excavator.level).toBe(3);
    expect(initial.facilities.transport.level).toBe(2);
    expect(initial.achievements).toEqual(['p100Stardust']);
    expect(initial.createdAt).toBe(preState.createdAt);
    // 转生层也还原（prestigeLevel/stardust/history 回到转生前）
    expect(initial.prestige.prestigeLevel).toBe(0);
    expect(initial.prestige.stardust).toBe(0);
    expect(initial.prestige.history).toEqual([]);
    expect(initial.prestige.unlocked).toEqual(['prestige-start-credits']);
    // 整体等于转生前
    expect(initial).toEqual(preState);
  });

  it('回滚经事务原子落盘：后端已是恢复后的状态', async () => {
    const initial = progressedState(250);
    const backend = new InMemoryBackend<GameState>(structuredClone(initial));
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const r = await executePrestigeReset(repo, initial, T1);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(backend.peek()!.crystal).toBe(0); // 转生已落盘

    const rb = await rollbackPrestigeReset(repo, initial, r.preSnapshot);
    expect(rb.ok).toBe(true);
    // 回滚也已落盘——后端恢复到转生前
    expect(backend.peek()!.crystal).toBe(250);
    expect(backend.peek()!.prestige.prestigeLevel).toBe(0);
  });
});
