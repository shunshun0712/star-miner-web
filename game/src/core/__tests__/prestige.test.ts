import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { InMemoryBackend, TransactionalRepository } from '../../save/transactional';
import type { GameState } from '../types';
import {
  createEmptyPrestigeLayer,
  PRESTIGE_UNLOCKS,
} from '../prestigeLayer';
import {
  buildPrestigeBaseline,
  computeStardustEarned,
  createBaselineSnapshot,
  executePrestigeReset,
} from '../prestige';

const T0 = 1_700_000_000_000;
const T1 = T0 + 10_000;

function stateWithCrystal(crystal: number): GameState {
  const s = createNewGame(T0);
  s.crystal = crystal;
  s.facilities.excavator.level = 3;
  s.facilities.transport.level = 2;
  s.achievements = ['p100Stardust'];
  return s;
}

describe('createEmptyPrestigeLayer', () => {
  it('空转生层字段', () => {
    const p = createEmptyPrestigeLayer();
    expect(p.unlocked).toEqual([]);
    expect(p.stardust).toBe(0);
    expect(p.prestigeLevel).toBe(0);
    expect(p.history).toEqual([]);
  });
});

describe('buildPrestigeBaseline — 转生后初始态含永久加成', () => {
  it('空 unlocked 时为裸初始基线（与新游戏一致的字段，但走独立路径）', () => {
    const s = buildPrestigeBaseline(T0, createEmptyPrestigeLayer());
    expect(s.credits).toBe(100);
    expect(s.facilities.he3Excavator.unlocked).toBe(false);
    expect(s.facilities.excavator.level).toBe(1);
    expect(s.prestige.prestigeLevel).toBe(0);
  });

  it('prestige-start-credits 解锁：初始信用点 +500（600 而非 100）', () => {
    const prestige = { ...createEmptyPrestigeLayer(), unlocked: ['prestige-start-credits'] };
    const s = buildPrestigeBaseline(T0, prestige);
    expect(s.credits).toBe(600);
  });

  it('prestige-he3-unlock 解锁：初始解锁氦-3 采矿器', () => {
    const prestige = { ...createEmptyPrestigeLayer(), unlocked: ['prestige-he3-unlock'] };
    const s = buildPrestigeBaseline(T0, prestige);
    expect(s.facilities.he3Excavator.unlocked).toBe(true);
  });

  it('转生后初始态 ≠ createNewGame 裸初始态（含永久加成）', () => {
    const prestige = { ...createEmptyPrestigeLayer(), unlocked: ['prestige-start-credits', 'prestige-he3-unlock'] };
    const rebuilt = buildPrestigeBaseline(T0, prestige);
    const fresh = createNewGame(T0);
    expect(rebuilt.credits).toBe(600);
    expect(fresh.credits).toBe(100);
    expect(rebuilt.facilities.he3Excavator.unlocked).toBe(true);
    expect(fresh.facilities.he3Excavator.unlocked).toBe(false);
  });

  it('未注册的 unlocked id 被忽略（不抛错，仅白名单项生效）', () => {
    const prestige = { ...createEmptyPrestigeLayer(), unlocked: ['prestige-start-credits', 'ghost-id'] };
    const s = buildPrestigeBaseline(T0, prestige);
    expect(s.credits).toBe(600);
  });

  it('PRESTIGE_UNLOCKS 注册表含两条解锁', () => {
    expect(Object.keys(PRESTIGE_UNLOCKS).sort()).toEqual([
      'prestige-he3-unlock',
      'prestige-start-credits',
    ]);
  });
});

describe('computeStardustEarned', () => {
  it('每 100 晶体 → 1 星核（v0.5 占位公式）', () => {
    expect(computeStardustEarned(stateWithCrystal(0))).toBe(0);
    expect(computeStardustEarned(stateWithCrystal(99))).toBe(0);
    expect(computeStardustEarned(stateWithCrystal(250))).toBe(2);
    expect(computeStardustEarned(stateWithCrystal(1000))).toBe(10);
  });
});

describe('createBaselineSnapshot', () => {
  it('采集基线层摘要', () => {
    const s = stateWithCrystal(250);
    const snap = createBaselineSnapshot(s);
    expect(snap.crystal).toBe(250);
    expect(snap.credits).toBe(100);
    expect(snap.facilityLevels.excavator).toBe(3);
    expect(snap.facilityLevels.transport).toBe(2);
    expect(snap.achievementCount).toBe(1);
    expect(snap.researchCount).toBe(0);
    expect(snap.createdAt).toBe(T0);
  });
});

describe('executePrestigeReset — 转生重置事务', () => {
  it('基线层重置、转生层保留且 +1（验收 #2）', async () => {
    const initial = stateWithCrystal(250);
    const backend = new InMemoryBackend<GameState>(initial);
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const r = await executePrestigeReset(repo, initial, T1);
    expect(r.ok).toBe(true);
    if (!r.ok) return;

    // 基线层回到初始态：资源归零、设施重置
    expect(r.state.crystal).toBe(0);
    expect(r.state.credits).toBe(100);
    expect(r.state.facilities.excavator.level).toBe(1);
    expect(r.state.facilities.excavator.unlocked).toBe(true);
    expect(r.state.facilities.transport.level).toBe(1);
    expect(r.state.facilities.transport.unlocked).toBe(false);
    expect(r.state.achievements).toEqual([]);

    // 转生层保留且 +1
    expect(r.state.prestige.prestigeLevel).toBe(1);
    expect(r.state.prestige.stardust).toBe(2);
    expect(r.state.prestige.unlocked).toEqual([]);
    expect(r.state.prestige.history).toHaveLength(1);
    expect(r.state.prestige.history[0].sequence).toBe(1);
    expect(r.state.prestige.history[0].stardustEarned).toBe(2);
    expect(r.state.prestige.history[0].baselineSnapshot.crystal).toBe(250);
  });

  it('转生后初始态含永久加成（验收 #3）—— unlocked 保留并生效', async () => {
    const initial = stateWithCrystal(300);
    initial.prestige.unlocked = ['prestige-start-credits', 'prestige-he3-unlock'];
    const backend = new InMemoryBackend<GameState>(initial);
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const r = await executePrestigeReset(repo, initial, T1);
    expect(r.ok).toBe(true);
    if (!r.ok) return;

    // 永久加成生效：credits 600、he3 解锁
    expect(r.state.credits).toBe(600);
    expect(r.state.facilities.he3Excavator.unlocked).toBe(true);
    // unlocked 列表原样保留
    expect(r.state.prestige.unlocked).toEqual(['prestige-start-credits', 'prestige-he3-unlock']);
    expect(r.state.prestige.stardust).toBe(3);
  });

  it('不走 createNewGame 代码路径（转生后初始态含永久 buff，区别于裸新档）', async () => {
    const initial = stateWithCrystal(200);
    initial.prestige.unlocked = ['prestige-start-credits'];
    const backend = new InMemoryBackend<GameState>(initial);
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const r = await executePrestigeReset(repo, initial, T1);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    // 转生后 credits=600，而非 createNewGame 的 100
    expect(r.state.credits).toBe(600);
    expect(createNewGame(T1).credits).toBe(100);
  });

  it('commit 前任意时刻刷新页面：IDB 无半写态（验收 #4）', async () => {
    // 直接用事务接口模拟"事务进行中刷新"：begin 后 mutate 但不 commit
    const initial = stateWithCrystal(250);
    // backend 持有独立副本，确保事务内的原地改动不污染持久层
    const backend = new InMemoryBackend<GameState>(structuredClone(initial));
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const tx = repo.begin(initial);
    tx.getState().credits -= 50; // 事务内改动，未提交
    // 此时"刷新页面"——后端（模拟 IDB）仍是事务前的状态
    const persisted = backend.peek();
    expect(persisted!.credits).toBe(100);
    expect(persisted!.crystal).toBe(250);
    expect(tx.isDone()).toBe(false);
  });

  it('rollback 恢复事务前状态、后端未写入', () => {
    const initial = stateWithCrystal(250);
    const backend = new InMemoryBackend<GameState>(initial);
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const tx = repo.begin(initial);
    tx.getState().credits = 99999;
    tx.rollback();
    expect(initial.credits).toBe(100); // 工作状态已恢复
    expect(backend.peek()).toEqual(initial); // 后端未写入
    expect(tx.isDone()).toBe(true);
  });

  it('已有活跃事务时启动新事务失败', async () => {
    const initial = stateWithCrystal(250);
    const backend = new InMemoryBackend<GameState>(initial);
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const tx = repo.begin(initial); // 活跃事务未结束
    const r = await executePrestigeReset(repo, initial, T1);
    expect(r.ok).toBe(false);
    tx.rollback();
  });

  it('连续两次转生：prestigeLevel 与 history 累积', async () => {
    let state = stateWithCrystal(250);
    const backend = new InMemoryBackend<GameState>(state);
    const repo = new TransactionalRepository<GameState>(backend, structuredClone);

    const r1 = await executePrestigeReset(repo, state, T1);
    expect(r1.ok).toBe(true);
    if (!r1.ok) return;
    state = r1.state;
    state.crystal = 250; // 下一世再攒 250
    backend.poke(state);

    const r2 = await executePrestigeReset(repo, state, T1 + 1000);
    expect(r2.ok).toBe(true);
    if (!r2.ok) return;
    expect(r2.state.prestige.prestigeLevel).toBe(2);
    expect(r2.state.prestige.stardust).toBe(4); // 2 + 2（每次 250 晶体 → 2 星核）
    expect(r2.state.prestige.history).toHaveLength(2);
    expect(r2.state.prestige.history[1].sequence).toBe(2);
  });
});
