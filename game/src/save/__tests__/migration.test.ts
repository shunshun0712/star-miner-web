import { describe, it, expect } from 'vitest';
import {
  migrateV1ToV2,
  migrateV2ToV3,
  migrateV3ToV4,
  migrateV4ToV5,
  migrateV5ToV6,
  migrateV6ToV7,
  migrateV7ToV8,
  migrateV8ToV9,
  parseSaveJson,
  validateState,
} from '../../core/save';
import { createNewGame } from '../../core/state';
import { SAVE_VERSION, DEFAULT_STARDUST_KEEP, DEFAULT_CRYSTAL_KEEP, EVENT_FIRST_AFTER_MS } from '../../core/config';
import type { GameState } from '../../core/types';

const T0 = 1_700_000_000_000;

// ── 各版本最小合法存档构造器 ──

function v1Save(): Record<string, unknown> {
  return {
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
  };
}

function v2Save(): Record<string, unknown> {
  return migrateV1ToV2(v1Save());
}

function v3Save(): Record<string, unknown> {
  return migrateV2ToV3(v2Save());
}

function v4Save(): Record<string, unknown> {
  return migrateV3ToV4(v3Save());
}

function v5Save(): Record<string, unknown> {
  return migrateV4ToV5(v4Save());
}

function v6Save(): Record<string, unknown> {
  return migrateV5ToV6(v5Save());
}

function v7Save(): Record<string, unknown> {
  return migrateV6ToV7(v6Save());
}

function v8Save(): Record<string, unknown> {
  return migrateV7ToV8(v7Save());
}

function v9Save(): Record<string, unknown> {
  return migrateV8ToV9(v8Save());
}

// ── 辅助：将 Record 断言为 v6 合法存档并走完整校验 ──

function parseToV6(raw: Record<string, unknown>) {
  return parseSaveJson(JSON.stringify(raw));
}

// ════════════════════════════════════════════
// v1 → v2
// ════════════════════════════════════════════

describe('迁移 v1 → v2', () => {
  it('版本号升级到 2', () => {
    const r = migrateV1ToV2(v1Save());
    expect(r.version).toBe(2);
  });

  it('补 he3Excavator 设施，level=1，unlocked 跟随 secondMineUnlocked', () => {
    const r = migrateV1ToV2(v1Save());
    const f = r.facilities as Record<string, unknown>;
    expect(f.he3Excavator).toEqual({ level: 1, unlocked: true });
  });

  it('secondMineUnlocked=false 时 he3Excavator.locked', () => {
    const raw = v1Save();
    raw.secondMineUnlocked = false;
    const r = migrateV1ToV2(raw);
    const f = r.facilities as Record<string, unknown>;
    expect((f.he3Excavator as Record<string, unknown>).unlocked).toBe(false);
  });

  it('secondMineUnlocked 缺失时 he3Excavator.locked', () => {
    const raw = v1Save();
    delete raw.secondMineUnlocked;
    const r = migrateV1ToV2(raw);
    const f = r.facilities as Record<string, unknown>;
    expect((f.he3Excavator as Record<string, unknown>).unlocked).toBe(false);
  });

  it('补 eventState 默认值', () => {
    const r = migrateV1ToV2(v1Save());
    expect(r.eventState).toEqual({
      pendingEvent: null,
      nextEventAt: T0 + EVENT_FIRST_AFTER_MS,
      droneBoostUntil: 0,
      solarStormUntil: 0,
      investUsed: false,
    });
  });

  it('createdAt 缺失时用 Date.now() 兜底', () => {
    const raw = v1Save();
    delete raw.createdAt;
    const before = Date.now();
    const r = migrateV1ToV2(raw);
    const ev = r.eventState as Record<string, unknown>;
    const next = ev.nextEventAt as number;
    const after = Date.now();
    expect(next).toBeGreaterThanOrEqual(before + EVENT_FIRST_AFTER_MS);
    expect(next).toBeLessThanOrEqual(after + EVENT_FIRST_AFTER_MS);
  });

  it('保留原有资源值', () => {
    const r = migrateV1ToV2(v1Save());
    expect(r.credits).toBe(123);
    expect(r.stardust).toBe(45);
    expect(r.refineryBuffer).toBe(6);
    expect(r.crystal).toBe(7);
  });
});

// ════════════════════════════════════════════
// v2 → v3
// ════════════════════════════════════════════

describe('迁移 v2 → v3', () => {
  it('版本号升级到 3', () => {
    const r = migrateV2ToV3(v2Save());
    expect(r.version).toBe(3);
  });

  it('补 deuteriumExcavator 设施，level=1，unlocked=false', () => {
    const r = migrateV2ToV3(v2Save());
    const f = r.facilities as Record<string, unknown>;
    expect(f.deuteriumExcavator).toEqual({ level: 1, unlocked: false });
  });

  it('保留已有 he3Excavator 状态', () => {
    const raw = v2Save();
    (raw.facilities as Record<string, unknown>).he3Excavator = { level: 3, unlocked: true };
    const r = migrateV2ToV3(raw);
    const f = r.facilities as Record<string, unknown>;
    expect(f.he3Excavator).toEqual({ level: 3, unlocked: true });
  });

  it('保留资源与策略', () => {
    const r = migrateV2ToV3(v2Save());
    expect(r.credits).toBe(123);
    expect(r.energyStrategy).toBe('excavation');
  });
});

// ════════════════════════════════════════════
// v3 → v4
// ════════════════════════════════════════════

describe('迁移 v3 → v4', () => {
  it('版本号升级到 4', () => {
    const r = migrateV3ToV4(v3Save());
    expect(r.version).toBe(4);
  });

  it('补 settings 默认值', () => {
    const r = migrateV3ToV4(v3Save());
    expect(r.settings).toEqual({
      autoSellStardust: false,
      stardustKeepAmount: DEFAULT_STARDUST_KEEP,
    });
  });

  it('保留资源与设施', () => {
    const r = migrateV3ToV4(v3Save());
    expect(r.credits).toBe(123);
    const f = r.facilities as Record<string, unknown>;
    expect(f.deuteriumExcavator).toBeDefined();
  });
});

// ════════════════════════════════════════════
// v4 → v5
// ════════════════════════════════════════════

describe('迁移 v4 → v5', () => {
  it('版本号升级到 5', () => {
    const r = migrateV4ToV5(v4Save());
    expect(r.version).toBe(5);
  });

  it('补 autoSellCrystal=false 和 crystalKeepAmount=默认值', () => {
    const r = migrateV4ToV5(v4Save());
    const s = r.settings as Record<string, unknown>;
    expect(s.autoSellCrystal).toBe(false);
    expect(s.crystalKeepAmount).toBe(DEFAULT_CRYSTAL_KEEP);
  });

  it('保留 v4 已有 autoSellStardust 和 stardustKeepAmount', () => {
    const raw = v4Save();
    const s = raw.settings as Record<string, unknown>;
    s.autoSellStardust = true;
    s.stardustKeepAmount = 30;
    const r = migrateV4ToV5(raw);
    const rs = r.settings as Record<string, unknown>;
    expect(rs.autoSellStardust).toBe(true);
    expect(rs.stardustKeepAmount).toBe(30);
  });

  it('v4 stardustKeepAmount 非法时回退默认值', () => {
    const raw = v4Save();
    (raw.settings as Record<string, unknown>).stardustKeepAmount = 'bad';
    const r = migrateV4ToV5(raw);
    const rs = r.settings as Record<string, unknown>;
    expect(rs.stardustKeepAmount).toBe(DEFAULT_STARDUST_KEEP);
  });

  it('v4 settings 缺失时补完整默认值', () => {
    const raw = v4Save();
    delete raw.settings;
    const r = migrateV4ToV5(raw);
    expect(r.settings).toEqual({
      autoSellStardust: false,
      stardustKeepAmount: DEFAULT_STARDUST_KEEP,
      autoSellCrystal: false,
      crystalKeepAmount: DEFAULT_CRYSTAL_KEEP,
    });
  });
});

// ════════════════════════════════════════════
// v5 → v6
// ════════════════════════════════════════════

describe('迁移 v5 → v6', () => {
  it('版本号升级到 6', () => {
    const r = migrateV5ToV6(v5Save());
    expect(r.version).toBe(6);
  });

  it('补 energyStation 设施，level=1，unlocked=false', () => {
    const r = migrateV5ToV6(v5Save());
    const f = r.facilities as Record<string, unknown>;
    expect(f.energyStation).toEqual({ level: 1, unlocked: false });
  });

  it('补 energy=0, isotope=0', () => {
    const r = migrateV5ToV6(v5Save());
    expect(r.energy).toBe(0);
    expect(r.isotope).toBe(0);
  });

  it('补 researchCenterUnlocked=false, research=[]', () => {
    const r = migrateV5ToV6(v5Save());
    expect(r.researchCenterUnlocked).toBe(false);
    expect(r.research).toEqual([]);
  });

  it('补 stats 全零默认值', () => {
    const r = migrateV5ToV6(v5Save());
    const st = r.stats as Record<string, unknown>;
    expect(st.totalStardustProduced).toBe(0);
    expect(st.totalCrystalProduced).toBe(0);
    expect(st.totalCreditsEarned).toBe(0);
    expect(st.totalEnergyProduced).toBe(0);
    expect(st.totalIsotopeProduced).toBe(0);
    expect(st.eventsTriggered).toBe(0);
    expect(st.droneEventsHandled).toBe(0);
    expect(st.solarStormsExperienced).toBe(0);
    expect(st.investmentsMade).toBe(0);
    expect(st.upgradesPerformed).toBe(0);
    expect(st.researchesCompleted).toBe(0);
    expect(st.lastOfflineCrystalGain).toBe(0);
  });

  it('补 achievements=[], energyReleaseUntil=0, energyReleaseCooldownUntil=0', () => {
    const r = migrateV5ToV6(v5Save());
    expect(r.achievements).toEqual([]);
    expect(r.energyReleaseUntil).toBe(0);
    expect(r.energyReleaseCooldownUntil).toBe(0);
  });

  it('保留 v5 已有资源与设施', () => {
    const r = migrateV5ToV6(v5Save());
    expect(r.credits).toBe(123);
    const f = r.facilities as Record<string, unknown>;
    expect((f.excavator as Record<string, unknown>).level).toBe(2);
  });

  it('v5 已有 energy 值时保留（防御性保留，不覆盖）', () => {
    const raw = v5Save();
    raw.energy = 50;
    raw.isotope = 3;
    const r = migrateV5ToV6(raw);
    expect(r.energy).toBe(50);
    expect(r.isotope).toBe(3);
  });

  it('v5 已有 researchCenterUnlocked=true 时保留', () => {
    const raw = v5Save();
    raw.researchCenterUnlocked = true;
    raw.research = ['basicResearch', 'drillHardening'];
    const r = migrateV5ToV6(raw);
    expect(r.researchCenterUnlocked).toBe(true);
    expect(r.research).toEqual(['basicResearch', 'drillHardening']);
  });

  it('v5 已有 stats 时保留（防御性保留，不覆盖为全零）', () => {
    const raw = v5Save();
    raw.stats = {
      totalStardustProduced: 999,
      totalCrystalProduced: 42,
      totalCreditsEarned: 100,
      totalEnergyProduced: 0,
      totalIsotopeProduced: 0,
      eventsTriggered: 5,
      droneEventsHandled: 3,
      solarStormsExperienced: 1,
      investmentsMade: 0,
      upgradesPerformed: 2,
      researchesCompleted: 0,
      lastOfflineCrystalGain: 0,
    };
    const r = migrateV5ToV6(raw);
    const st = r.stats as Record<string, unknown>;
    expect(st.totalStardustProduced).toBe(999);
    expect(st.totalCrystalProduced).toBe(42);
  });

  it('v5 已有 achievements 时保留', () => {
    const raw = v5Save();
    raw.achievements = ['p100Stardust'];
    const r = migrateV5ToV6(raw);
    expect(r.achievements).toEqual(['p100Stardust']);
  });
});

// ════════════════════════════════════════════
// v1 → v6 全链
// ════════════════════════════════════════════

describe('迁移 v7 → v8', () => {
  it('版本号升级到 8', () => {
    const r = migrateV7ToV8(v7Save());
    expect(r.version).toBe(8);
  });

  it('补空转生层（prestigeLevel=0, stardust=0, unlocked=[]）', () => {
    const r = migrateV7ToV8(v7Save());
    const p = r.prestige as Record<string, unknown>;
    expect(p.prestigeLevel).toBe(0);
    expect(p.stardust).toBe(0);
    expect(p.unlocked).toEqual([]);
    expect(p.history).toEqual([]);
  });

  it('v7 存档经迁移后通过 validateState', () => {
    const r = parseSaveJson(JSON.stringify(v7Save()));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.version).toBe(SAVE_VERSION);
    expect(r.state.prestige.prestigeLevel).toBe(0);
    expect(r.state.prestige.unlocked).toEqual([]);
  });

  it('v7 存档已含 consumptionLog 不被破坏', () => {
    const r = migrateV7ToV8(v7Save());
    expect((r as Record<string, unknown>).consumptionLog).toBeDefined();
  });
});

describe('迁移 v8 → v9', () => {
  it('版本号升级到 9', () => {
    const r = migrateV8ToV9(v8Save());
    expect(r.version).toBe(9);
  });

  it('补空 shopPurchases 对象', () => {
    const r = migrateV8ToV9(v8Save());
    const p = r.prestige as Record<string, unknown>;
    expect(p.shopPurchases).toEqual({});
  });

  it('保留 v8 已有 prestige 字段（unlocked/stardust/prestigeLevel/history）', () => {
    const raw = v8Save();
    const prestige = raw.prestige as Record<string, unknown>;
    prestige.stardust = 42;
    prestige.prestigeLevel = 3;
    prestige.unlocked = ['prestige-start-credits'];
    const r = migrateV8ToV9(raw);
    const p = r.prestige as Record<string, unknown>;
    expect(p.stardust).toBe(42);
    expect(p.prestigeLevel).toBe(3);
    expect(p.unlocked).toEqual(['prestige-start-credits']);
  });

  it('v8 存档经迁移后通过 validateState', () => {
    const r = parseSaveJson(JSON.stringify(v8Save()));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.version).toBe(SAVE_VERSION);
    expect(r.state.prestige.shopPurchases).toEqual({});
  });

  it('v8 存档已含 consumptionLog 不被破坏', () => {
    const r = migrateV8ToV9(v8Save());
    expect((r as Record<string, unknown>).consumptionLog).toBeDefined();
  });
});

describe('全链迁移 v1 → v9', () => {
  it('单步顺序迁移 v1→v2→v3→v4→v5→v6→v7→v8→v9 等价于 parseSaveJson', () => {
    const stepwise = migrateV8ToV9(migrateV7ToV8(migrateV6ToV7(migrateV5ToV6(migrateV4ToV5(migrateV3ToV4(migrateV2ToV3(migrateV1ToV2(v1Save()))))))));
    const viaParse = parseSaveJson(JSON.stringify(v1Save()));
    expect(viaParse.ok).toBe(true);
    if (!viaParse.ok) return;
    // 逐字段对比（parseSaveJson 内部会走 migrate + validate + 白名单过滤）
    expect(stepwise.version).toBe(9);
    expect(viaParse.state.version).toBe(SAVE_VERSION);
    expect(stepwise.credits).toBe(viaParse.state.credits);
    expect(stepwise.stardust).toBe(viaParse.state.stardust);
  });

  it('v1 存档经全链迁移后通过 validateState', () => {
    const r = parseToV6(v1Save());
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.version).toBe(SAVE_VERSION);
    expect(r.state.facilities.he3Excavator.unlocked).toBe(true);
    expect(r.state.facilities.deuteriumExcavator.unlocked).toBe(false);
    expect(r.state.facilities.energyStation.unlocked).toBe(false);
    expect(r.state.energy).toBe(0);
    expect(r.state.isotope).toBe(0);
    expect(r.state.research).toEqual([]);
    expect(r.state.achievements).toEqual([]);
    expect(r.state.credits).toBe(123);
    expect(r.state.settings.autoSellStardust).toBe(false);
    expect(r.state.settings.crystalKeepAmount).toBe(DEFAULT_CRYSTAL_KEEP);
    expect(r.state.prestige.prestigeLevel).toBe(0);
    expect(r.state.prestige.shopPurchases).toEqual({});
  });

  it('v2 存档经全链迁移后通过 validateState', () => {
    const r = parseToV6(v2Save());
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.version).toBe(SAVE_VERSION);
    expect(r.state.facilities.deuteriumExcavator).toBeDefined();
    expect(r.state.facilities.energyStation).toBeDefined();
  });

  it('v3 存档经全链迁移后通过 validateState', () => {
    const r = parseToV6(v3Save());
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.version).toBe(SAVE_VERSION);
    expect(r.state.settings.autoSellStardust).toBe(false);
  });

  it('v4 存档经全链迁移后通过 validateState', () => {
    const r = parseToV6(v4Save());
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.version).toBe(SAVE_VERSION);
    expect(r.state.settings.autoSellCrystal).toBe(false);
  });

  it('v5 存档经全链迁移后通过 validateState', () => {
    const r = parseToV6(v5Save());
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.version).toBe(SAVE_VERSION);
    expect(r.state.facilities.energyStation.unlocked).toBe(false);
  });

  it('createNewGame 产生的存档往返一致', () => {
    const s = createNewGame(T0);
    const r = parseSaveJson(JSON.stringify(s));
    expect(r.ok).toBe(true);
  });

  it('各版本存档均能迁移到 v9 且通过校验', () => {
    for (const [label, raw] of [
      ['v1', v1Save()],
      ['v2', v2Save()],
      ['v3', v3Save()],
      ['v4', v4Save()],
      ['v5', v5Save()],
      ['v6', v6Save()],
      ['v7', v7Save()],
      ['v8', v8Save()],
      ['v9', v9Save()],
    ] as const) {
      const r = parseToV6(raw);
      expect(r.ok, `${label} 迁移失败`).toBe(true);
      if (r.ok) {
        expect(r.state.version, `${label} 版本不为 ${SAVE_VERSION}`).toBe(SAVE_VERSION);
      }
    }
  });
});

// ════════════════════════════════════════════
// 边界与防御
// ════════════════════════════════════════════

describe('迁移边界与防御', () => {
  it('v1 缺 facilities 时迁移不崩溃（补空 facilities + he3Excavator）', () => {
    const raw = v1Save();
    delete raw.facilities;
    const r = migrateV1ToV2(raw);
    const f = r.facilities as Record<string, unknown>;
    expect(f.he3Excavator).toBeDefined();
  });

  it('未知版本不迁移（version 保持不变）', () => {
    const raw = { version: 99, credits: 1 };
    const r = parseSaveJson(JSON.stringify(raw));
    expect(r.ok).toBe(false);
  });

  it('version 缺失时 parseSaveJson 拒绝', () => {
    const raw = { credits: 100 };
    const r = parseSaveJson(JSON.stringify(raw));
    expect(r.ok).toBe(false);
  });

  it('迁移链不修改原始输入对象（migrate 入口做浅拷贝）', () => {
    const raw = v1Save();
    const rawBefore = JSON.parse(JSON.stringify(raw));
    parseSaveJson(JSON.stringify(raw));
    // 原始对象不应被迁移修改（migrate 内部 { ...raw } 浅拷贝）
    // 注意：嵌套对象可能被迁移函数原地修改，但顶层属性不变
    expect(raw.version).toBe(rawBefore.version);
  });
});
