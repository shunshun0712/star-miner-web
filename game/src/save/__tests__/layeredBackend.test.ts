import { describe, it, expect } from 'vitest';
import { createNewGame } from '../../core/state';
import { serializeState } from '../../core/save';
import type { GameState } from '../../core/types';
import { LayeredStateBackend, splitState, type LayeredKeyValueStore } from '../layeredBackend';

const T0 = 1_700_000_000_000;

/** 内存分层键值存储——mock IndexedDbSaveRepository 的 load/save/loadPrestige/savePrestige/saveBoth */
class InMemoryLayeredStore implements LayeredKeyValueStore {
  main: string | null = null;
  prestige: string | null = null;
  saveBothCalls = 0;
  saveCalls = 0;
  savePrestigeCalls = 0;

  async load(): Promise<string | null> {
    return this.main;
  }
  async save(json: string): Promise<void> {
    this.saveCalls++;
    this.main = json;
  }
  async loadPrestige(): Promise<string | null> {
    return this.prestige;
  }
  async savePrestige(json: string): Promise<void> {
    this.savePrestigeCalls++;
    this.prestige = json;
  }
  async saveBoth(baselineJson: string, prestigeJson: string): Promise<void> {
    this.saveBothCalls++;
    this.main = baselineJson;
    this.prestige = prestigeJson;
  }
}

describe('splitState', () => {
  it('基线层不含 prestige 字段', () => {
    const s = createNewGame(T0);
    const { baseline, prestige } = splitState(s);
    expect((baseline as unknown as Record<string, unknown>).prestige).toBeUndefined();
    expect(prestige).toEqual(s.prestige);
  });

  it('prestige 为原 state.prestige 引用（调用方不应原地改）', () => {
    const s = createNewGame(T0);
    const { prestige } = splitState(s);
    expect(prestige).toBe(s.prestige); // 解构取引用；save 路径只读序列化，不原地改
  });
});

describe('LayeredStateBackend — 两层数据隔离（验收 #1）', () => {
  it('save 把基线层与转生层分别写入两个键', async () => {
    const store = new InMemoryLayeredStore();
    const backend = new LayeredStateBackend(store);

    const s = createNewGame(T0);
    s.crystal = 42;
    s.prestige.stardust = 7;
    await backend.save(s);

    // 基线层 JSON 存在 'main'，且不含 prestige 字段
    expect(store.main).not.toBeNull();
    const baselineRaw = JSON.parse(store.main!) as Record<string, unknown>;
    expect(baselineRaw.prestige).toBeUndefined();
    expect(baselineRaw.crystal).toBe(42);

    // 转生层 JSON 单独存在 'prestige'
    expect(store.prestige).not.toBeNull();
    const prestigeRaw = JSON.parse(store.prestige!) as Record<string, unknown>;
    expect(prestigeRaw.stardust).toBe(7);
    expect(prestigeRaw.prestigeLevel).toBe(0);

    // 走的是原子双键写（saveBoth），而非两次独立 save
    expect(store.saveBothCalls).toBe(1);
    expect(store.saveCalls).toBe(0);
  });

  it('两层数据互不污染：改基线层不影响转生层 JSON', async () => {
    const store = new InMemoryLayeredStore();
    const backend = new LayeredStateBackend(store);

    const s = createNewGame(T0);
    s.prestige.stardust = 7;
    await backend.save(s);
    const prestigeJsonAfterFirst = store.prestige;

    // 只改基线层资源，prestige 不动
    s.crystal = 999;
    await backend.save(s);

    expect(store.prestige).toBe(prestigeJsonAfterFirst); // 转生层 JSON 完全没变
  });

  it('load 合并两层为完整 GameState（往返一致）', async () => {
    const store = new InMemoryLayeredStore();
    const backend = new LayeredStateBackend(store);

    const s = createNewGame(T0);
    s.crystal = 42;
    s.prestige.stardust = 7;
    s.prestige.prestigeLevel = 3;
    s.prestige.unlocked = ['prestige-start-credits'];
    await backend.save(s);

    const loaded = await backend.load();
    expect(loaded).not.toBeNull();
    expect(loaded!.crystal).toBe(42);
    expect(loaded!.prestige.stardust).toBe(7);
    expect(loaded!.prestige.prestigeLevel).toBe(3);
    expect(loaded!.prestige.unlocked).toEqual(['prestige-start-credits']);
  });

  it('无存档时 load 返回 null', async () => {
    const store = new InMemoryLayeredStore();
    const backend = new LayeredStateBackend(store);
    expect(await backend.load()).toBeNull();
  });

  it('缺失 prestige 键时回填空转生层（旧 v7 单键存档首次分层加载）', async () => {
    const store = new InMemoryLayeredStore();
    // 模拟旧 v7 存档：'main' 里是整份 v7 存档（无 prestige 字段），无 'prestige' 键
    const s = createNewGame(T0);
    const raw = JSON.parse(serializeState(s)) as Record<string, unknown>;
    raw.version = 7;
    delete raw.prestige;
    store.main = JSON.stringify(raw);
    store.prestige = null;

    const backend = new LayeredStateBackend(store);
    const loaded = await backend.load();
    expect(loaded).not.toBeNull();
    expect(loaded!.version).toBe(8); // 迁移链把 v7 升到 v8
    expect(loaded!.prestige.prestigeLevel).toBe(0);
    expect(loaded!.prestige.unlocked).toEqual([]);
  });

  it('prestige JSON 损坏时 load 抛错（不静默清空转生层，避免丢档）', async () => {
    const store = new InMemoryLayeredStore();
    const s = createNewGame(T0);
    store.main = serializeState(s);
    store.prestige = '{not valid json';

    const backend = new LayeredStateBackend(store);
    await expect(backend.load()).rejects.toThrow();
  });

  it('基线层 JSON 单独不是合法完整存档（缺 prestige 被拒绝）', async () => {
    // 设计预期：基线层 JSON 只在合并后校验；直接 parseSaveJson 一份基线 JSON 会失败
    const { parseSaveJson } = await import('../../core/save');
    const store = new InMemoryLayeredStore();
    const backend = new LayeredStateBackend(store);
    const s = createNewGame(T0);
    await backend.save(s);
    const baselineJson = store.main!;
    const r = parseSaveJson(baselineJson);
    expect(r.ok).toBe(false);
  });

  it('saveBoth 原子性：单次调用同时写两键', async () => {
    const store = new InMemoryLayeredStore();
    const backend = new LayeredStateBackend(store);
    const s = createNewGame(T0);
    await backend.save(s);
    expect(store.saveBothCalls).toBe(1);
    // saveBoth 一次写完两键
    expect(store.main).not.toBeNull();
    expect(store.prestige).not.toBeNull();
  });
});

describe('LayeredStateBackend 作为 TransactionalRepository 后端', () => {
  it('转生重置事务 commit 后两层同时落盘（无半写态）', async () => {
    const { TransactionalRepository } = await import('../transactional');
    const { executePrestigeReset } = await import('../../core/prestige');

    const store = new InMemoryLayeredStore();
    const backend = new LayeredStateBackend(store);

    const initial = createNewGame(T0);
    initial.crystal = 300;
    await backend.save(initial); // 先存一份
    store.saveBothCalls = 0; // 重置计数，只看转生事务的写入

    const repo = new TransactionalRepository<GameState>(backend, structuredClone);
    const r = await executePrestigeReset(repo, initial, T0 + 1000);
    expect(r.ok).toBe(true);

    // 事务 commit 触发一次原子双键写
    expect(store.saveBothCalls).toBe(1);
    // 重载验证：基线层已重置、转生层已结算
    const reloaded = await backend.load();
    expect(reloaded!.crystal).toBe(0);
    expect(reloaded!.prestige.prestigeLevel).toBe(1);
    expect(reloaded!.prestige.stardust).toBe(3);
  });

  it('转生事务 commit 前刷新：两层均未落盘（旧状态完整保留）', async () => {
    const { TransactionalRepository } = await import('../transactional');

    const store = new InMemoryLayeredStore();
    const backend = new LayeredStateBackend(store);
    const initial = createNewGame(T0);
    initial.crystal = 300;
    await backend.save(initial);
    const mainBefore = store.main;
    const prestigeBefore = store.prestige;
    store.saveBothCalls = 0;

    const repo = new TransactionalRepository<GameState>(backend, structuredClone);
    const tx = repo.begin(initial);
    tx.getState().crystal = 0; // 事务内改动，未 commit
    // 模拟"刷新"——后端仍是事务前的两键
    expect(store.main).toBe(mainBefore);
    expect(store.prestige).toBe(prestigeBefore);
    expect(store.saveBothCalls).toBe(0);
    tx.rollback();
  });
});
