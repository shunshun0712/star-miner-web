import { describe, it, expect } from 'vitest';
import { createNewGame } from '../../core/state';
import { serializeLayeredExport, parseLayeredExport, serializeState } from '../../core/save';
import { SAVE_VERSION } from '../../core/config';
import { importSaveFile } from '../jsonTransfer';
import { buildPrestigeBaseline } from '../../core/prestige';
import type { GameState } from '../../core/types';

const T0 = 1_700_000_000_000;

/** 构造一份"有内容"的 GameState：资源/设施/研究/成就/转生层都非默认，便于往返断言 */
function progressedState(): GameState {
  const s = createNewGame(T0);
  s.credits = 12345;
  s.stardust = 67;
  s.refineryBuffer = 8;
  s.crystal = 9;
  s.energy = 42;
  s.isotope = 19_000;
  s.antimatter = 3;
  s.darkmatter = 1;
  s.facilities.excavator = { level: 5, unlocked: true };
  s.facilities.he3Excavator = { level: 3, unlocked: true };
  s.facilities.transport = { level: 2, unlocked: true };
  s.energyStrategy = 'excavation';
  s.researchCenterUnlocked = true;
  s.research = ['basicResearch', 'drillHardening'];
  s.achievements = ['p100Stardust', 'anyLevel5'];
  s.settings.autoSellStardust = true;
  s.settings.stardustKeepAmount = 30;
  s.settings.autoSellCrystal = true;
  s.settings.crystalKeepAmount = 5;
  s.stats.totalStardustProduced = 999;
  s.stats.totalCrystalProduced = 888;
  s.stats.researchesCompleted = 2;
  s.energyReleaseUntil = T0 + 1000;
  s.energyReleaseCooldownUntil = T0 + 2000;
  s.eventState.droneBoostUntil = T0 + 500;
  s.eventState.investUsed = true;
  s.lastSavedAt = T0 + 999;
  // 转生层也填上非默认值
  s.prestige.unlocked = ['prestige-start-credits', 'prestige-he3-unlock'];
  s.prestige.stardust = 13;
  s.prestige.prestigeLevel = 2;
  s.prestige.history = [
    {
      sequence: 1,
      timestamp: T0 + 100,
      stardustEarned: 5,
      baselineSnapshot: {
        credits: 500,
        stardust: 10,
        crystal: 200,
        isotope: 8000,
        antimatter: 0,
        darkmatter: 0,
        facilityLevels: {
          excavator: 4,
          he3Excavator: 2,
          deuteriumExcavator: 1,
          transport: 2,
          refinery: 1,
          energyStation: 1,
        },
        achievementCount: 1,
        researchCount: 1,
        createdAt: T0,
      },
    },
  ];
  return s;
}

describe('T2-4 JSON 导出升级', () => {
  // ── 验收标准 1：分层导出——导出 JSON 含 main + prestige 两个 key，prestige 层数据完整 ──
  describe('验收1 · 分层导出', () => {
    it('导出 JSON 含顶层 version + main + prestige 三个 key', () => {
      const json = serializeLayeredExport(progressedState());
      const obj = JSON.parse(json) as Record<string, unknown>;
      expect(obj.version).toBe(SAVE_VERSION);
      expect(typeof obj.main).toBe('object');
      expect(obj.main).not.toBeNull();
      expect(typeof obj.prestige).toBe('object');
      expect(obj.prestige).not.toBeNull();
    });

    it('main 层剔除 prestige——main 不含 prestige key', () => {
      const json = serializeLayeredExport(progressedState());
      const obj = JSON.parse(json) as { main: Record<string, unknown> };
      expect(obj.main.prestige).toBeUndefined();
      // main 层保留基线字段
      expect(obj.main.credits).toBe(12345);
      expect(obj.main.isotope).toBe(19_000);
    });

    it('prestige 层数据完整——unlocked/stardust/prestigeLevel/history 逐字段', () => {
      const s = progressedState();
      const obj = JSON.parse(serializeLayeredExport(s)) as {
        prestige: GameState['prestige'];
      };
      expect(obj.prestige.unlocked).toEqual(['prestige-start-credits', 'prestige-he3-unlock']);
      expect(obj.prestige.stardust).toBe(13);
      expect(obj.prestige.prestigeLevel).toBe(2);
      expect(obj.prestige.history).toHaveLength(1);
      expect(obj.prestige.history[0].sequence).toBe(1);
      expect(obj.prestige.history[0].stardustEarned).toBe(5);
      expect(obj.prestige.history[0].baselineSnapshot.credits).toBe(500);
    });
  });

  // ── 验收标准 2：旧版导入兼容——v7 单键格式导入后自动补空 prestige 层，无 corruption ──
  describe('验收2 · 旧版导入兼容', () => {
    it('v7 单键扁平格式导入——自动补空 prestige 层，无 corruption', () => {
      // 构造一份 v7 扁平存档（无 prestige 字段）
      const s = progressedState();
      const flat = JSON.parse(serializeState(s)) as Record<string, unknown>;
      flat.version = 7;
      delete flat.prestige;
      const v7Json = JSON.stringify(flat);

      const r = parseLayeredExport(v7Json);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      // v7→v8 迁移回填空 prestige 层
      expect(r.state.version).toBe(SAVE_VERSION);
      expect(r.state.prestige.prestigeLevel).toBe(0);
      expect(r.state.prestige.stardust).toBe(0);
      expect(r.state.prestige.unlocked).toEqual([]);
      expect(r.state.prestige.history).toEqual([]);
      // 基线层字段仍保留
      expect(r.state.credits).toBe(12345);
      expect(r.state.isotope).toBe(19_000);
    });

    it('v7 旧版导入不触发 corruption——基线层数据完整保留', () => {
      const s = progressedState();
      const flat = JSON.parse(serializeState(s)) as Record<string, unknown>;
      flat.version = 7;
      delete flat.prestige;
      const r = parseLayeredExport(JSON.stringify(flat));
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      // 关键基线字段无丢失（非 corruption）
      expect(r.state.facilities.excavator.level).toBe(5);
      expect(r.state.research).toEqual(['basicResearch', 'drillHardening']);
      expect(r.state.achievements).toEqual(['p100Stardust', 'anyLevel5']);
      expect(r.state.settings.autoSellStardust).toBe(true);
      expect(r.state.stats.totalStardustProduced).toBe(999);
    });

    it('更老的 v1 扁平存档导入——全链迁移到 v8 + 补空 prestige', () => {
      const v1Json = JSON.stringify({
        version: 1,
        credits: 123,
        stardust: 45,
        refineryBuffer: 6,
        crystal: 7,
        facilities: {
          excavator: { level: 2, unlocked: true },
          transport: { level: 1, unlocked: true },
          refinery: { level: 1, unlocked: false },
        },
        energyStrategy: 'excavation',
        secondMineUnlocked: true,
        createdAt: T0,
        lastSavedAt: T0,
      });
      const r = parseLayeredExport(v1Json);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.state.version).toBe(SAVE_VERSION);
      expect(r.state.prestige.prestigeLevel).toBe(0);
      expect(r.state.prestige.unlocked).toEqual([]);
      expect(r.state.facilities.he3Excavator.unlocked).toBe(true);
    });

    it('扁平 v8 存档（有 prestige 无 main）走扁平路径正确解析', () => {
      // 扁平 v8 有顶层 prestige 但无顶层 main → 不应误判为分层格式
      const s = progressedState();
      const flat = serializeState(s); // 扁平全态
      const r = parseLayeredExport(flat);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.state.prestige.prestigeLevel).toBe(2);
      expect(r.state.prestige.stardust).toBe(13);
    });
  });

  // ── 验收标准 3：往返一致——export → import 后 GameState 与 export 前逐字段一致 ──
  describe('验收3 · 往返一致', () => {
    it('分层 export → import 后 GameState 与 export 前逐字段一致', () => {
      const before = progressedState();
      const json = serializeLayeredExport(before);
      const r = parseLayeredExport(json);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.state).toEqual(before);
    });

    it('往返一致——含永久解锁的转生后基线（buildPrestigeBaseline 构造）', () => {
      // 构造一份真实的"转生后初始态"：裸基线 + 永久解锁已 apply
      const prestige: GameState['prestige'] = {
        unlocked: ['prestige-start-credits', 'prestige-he3-unlock'],
        stardust: 13,
        prestigeLevel: 2,
        history: [],
      };
      const before = buildPrestigeBaseline(T0, prestige);
      // 断言永久加成已生效（非裸初始态）：credits=600（100+500）、he3 解锁
      expect(before.credits).toBe(600);
      expect(before.facilities.he3Excavator.unlocked).toBe(true);

      const r = parseLayeredExport(serializeLayeredExport(before));
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.state).toEqual(before);
      // 转生层 unlocked 列表往返保留
      expect(r.state.prestige.unlocked).toEqual(['prestige-start-credits', 'prestige-he3-unlock']);
      expect(r.state.prestige.prestigeLevel).toBe(2);
      expect(r.state.prestige.stardust).toBe(13);
    });

    it('新游戏 export → import 往返一致（最小态）', () => {
      const before = createNewGame(T0);
      const r = parseLayeredExport(serializeLayeredExport(before));
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.state).toEqual(before);
    });

    it('importSaveFile 走分层解析——File.text() → parseLayeredExport 往返一致', async () => {
      const before = progressedState();
      const json = serializeLayeredExport(before);
      // 用结构化 stub 代替浏览器 File（importSaveFile 只调用 file.text()）
      const file = { text: async () => json } as unknown as File;
      const r = await importSaveFile(file);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.state).toEqual(before);
    });

    it('importSaveFile 兼容旧版 v7 文件——补空 prestige 层', async () => {
      const s = progressedState();
      const flat = JSON.parse(serializeState(s)) as Record<string, unknown>;
      flat.version = 7;
      delete flat.prestige;
      const file = { text: async () => JSON.stringify(flat) } as unknown as File;
      const r = await importSaveFile(file);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.state.prestige.prestigeLevel).toBe(0);
      expect(r.state.prestige.unlocked).toEqual([]);
    });

    it('非法 JSON 拒绝（不静默 corruption）', () => {
      const r = parseLayeredExport('not json at all');
      expect(r.ok).toBe(false);
    });

    it('分层格式但 prestige 层损坏拒绝（不静默 corruption）', () => {
      const s = progressedState();
      const obj = JSON.parse(serializeLayeredExport(s)) as Record<string, unknown>;
      // 把 prestige 改成非法（prestigeLevel 为负）
      (obj.prestige as Record<string, unknown>).prestigeLevel = -1;
      const r = parseLayeredExport(JSON.stringify(obj));
      expect(r.ok).toBe(false);
    });
  });
});
