import { describe, it, expect } from 'vitest';
import {
  createEmptyConsumptionLog,
  isActiveEntry,
  pruneConsumptionLog,
  recordActiveConsumption,
  completeConsumption,
  isActiveIdempotencyKey,
} from '../consumptionLog';
import { migrateV6ToV7, validateConsumptionLog, serializeState, parseSaveJson } from '../save';
import { createNewGame } from '../state';
import type { ConsumptionLog, ConsumptionLogEntry } from '../types';

const T0 = 1_700_000_000_000;

function buffEntry(id: string, expiresAt: number): ConsumptionLogEntry {
  return {
    id,
    kind: 'buff',
    resourceId: 'isotope',
    amount: 10,
    produced: [],
    timestamp: T0,
    expiresAt,
    idempotencyKey: `key-${id}`,
  };
}

function exchangeEntry(id: string): ConsumptionLogEntry {
  return {
    id,
    kind: 'exchange',
    resourceId: 'crystal',
    amount: 5,
    produced: [{ resourceId: 'credits', amount: 50 }],
    timestamp: T0,
    idempotencyKey: `key-${id}`,
    // 无 expiresAt——持续进行中
  };
}

// ════════════════════════════════════════════
// 空日志构造
// ════════════════════════════════════════════

describe('createEmptyConsumptionLog', () => {
  it('active 为空数组、aggregate 全零', () => {
    const log = createEmptyConsumptionLog();
    expect(log.active).toEqual([]);
    expect(log.aggregate.completedEvents).toBe(0);
    expect(log.aggregate.consumedByResource).toEqual({});
    expect(log.aggregate.producedByResource).toEqual({});
  });

  it('通过 validateConsumptionLog 校验', () => {
    expect(validateConsumptionLog(createEmptyConsumptionLog())).toBeNull();
  });
});

// ════════════════════════════════════════════
// isActiveEntry
// ════════════════════════════════════════════

describe('isActiveEntry', () => {
  it('无 expiresAt 视为持续活跃', () => {
    expect(isActiveEntry(exchangeEntry('e1'), T0 + 9999)).toBe(true);
  });

  it('expiresAt 在未来时活跃', () => {
    expect(isActiveEntry(buffEntry('b1', T0 + 100), T0)).toBe(true);
  });

  it('expiresAt 已过期时不活跃', () => {
    expect(isActiveEntry(buffEntry('b1', T0 + 100), T0 + 200)).toBe(false);
  });

  it('expiresAt 恰好等于 now 视为已过期', () => {
    expect(isActiveEntry(buffEntry('b1', T0 + 100), T0 + 100)).toBe(false);
  });
});

// ════════════════════════════════════════════
// recordActiveConsumption + pruneConsumptionLog（验收②：只含活跃项）
// ════════════════════════════════════════════

describe('pruneConsumptionLog', () => {
  it('过期条目从 active 移除并折叠进 aggregate', () => {
    const log = createEmptyConsumptionLog();
    recordActiveConsumption(log, buffEntry('b1', T0 + 100)); // 过期
    recordActiveConsumption(log, buffEntry('b2', T0 + 500)); // 活跃
    recordActiveConsumption(log, exchangeEntry('e1')); // 活跃（无截止）

    const changed = pruneConsumptionLog(log, T0 + 200);

    expect(changed).toBe(true);
    expect(log.active.map((e) => e.id)).toEqual(['b2', 'e1']);
    expect(log.aggregate.completedEvents).toBe(1);
    expect(log.aggregate.consumedByResource).toEqual({ isotope: 10 });
  });

  it('产出也折叠进 aggregate.producedByResource', () => {
    const log = createEmptyConsumptionLog();
    recordActiveConsumption(log, exchangeEntry('e1')); // 产出 credits 50，无截止→活跃
    recordActiveConsumption(log, {
      id: 'e2',
      kind: 'exchange',
      resourceId: 'crystal',
      amount: 3,
      produced: [{ resourceId: 'credits', amount: 30 }],
      timestamp: T0,
      expiresAt: T0 + 10, // 过期
    });
    pruneConsumptionLog(log, T0 + 20);

    expect(log.active.map((e) => e.id)).toEqual(['e1']);
    expect(log.aggregate.producedByResource).toEqual({ credits: 30 });
    expect(log.aggregate.consumedByResource).toEqual({ crystal: 3 });
  });

  it('全部活跃时 changed=false、aggregate 不变', () => {
    const log = createEmptyConsumptionLog();
    recordActiveConsumption(log, buffEntry('b1', T0 + 500));
    recordActiveConsumption(log, exchangeEntry('e1'));
    const changed = pruneConsumptionLog(log, T0);
    expect(changed).toBe(false);
    expect(log.active.length).toBe(2);
    expect(log.aggregate.completedEvents).toBe(0);
  });

  it('多次 prune 累加聚合、不重复折叠', () => {
    const log = createEmptyConsumptionLog();
    recordActiveConsumption(log, buffEntry('b1', T0 + 100));
    pruneConsumptionLog(log, T0 + 200); // b1 折叠
    expect(log.aggregate.completedEvents).toBe(1);
    // 再 prune 不应重复折叠（b1 已不在 active）
    const changed = pruneConsumptionLog(log, T0 + 300);
    expect(changed).toBe(false);
    expect(log.aggregate.completedEvents).toBe(1);
  });

  it('空日志 prune 安全', () => {
    const log = createEmptyConsumptionLog();
    expect(pruneConsumptionLog(log, T0)).toBe(false);
    expect(log.active).toEqual([]);
  });
});

// ════════════════════════════════════════════
// completeConsumption（显式完结，如 buff 提前结束/回滚）
// ════════════════════════════════════════════

describe('completeConsumption', () => {
  it('按 id 完结并折叠进 aggregate', () => {
    const log = createEmptyConsumptionLog();
    recordActiveConsumption(log, buffEntry('b1', T0 + 500));
    recordActiveConsumption(log, exchangeEntry('e1'));
    const ok = completeConsumption(log, 'b1');
    expect(ok).toBe(true);
    expect(log.active.map((e) => e.id)).toEqual(['e1']);
    expect(log.aggregate.completedEvents).toBe(1);
    expect(log.aggregate.consumedByResource).toEqual({ isotope: 10 });
  });

  it('未知 id 返回 false 且不改动', () => {
    const log = createEmptyConsumptionLog();
    recordActiveConsumption(log, buffEntry('b1', T0 + 500));
    const ok = completeConsumption(log, 'nope');
    expect(ok).toBe(false);
    expect(log.active.length).toBe(1);
    expect(log.aggregate.completedEvents).toBe(0);
  });
});

// ════════════════════════════════════════════
// isActiveIdempotencyKey（防离线重复扣）
// ════════════════════════════════════════════

describe('isActiveIdempotencyKey', () => {
  it('活跃条目命中', () => {
    const log = createEmptyConsumptionLog();
    recordActiveConsumption(log, buffEntry('b1', T0 + 500));
    expect(isActiveIdempotencyKey(log, 'key-b1')).toBe(true);
  });

  it('完结后不再命中', () => {
    const log = createEmptyConsumptionLog();
    recordActiveConsumption(log, buffEntry('b1', T0 + 500));
    completeConsumption(log, 'b1');
    expect(isActiveIdempotencyKey(log, 'key-b1')).toBe(false);
  });

  it('过期 prune 后不再命中', () => {
    const log = createEmptyConsumptionLog();
    recordActiveConsumption(log, buffEntry('b1', T0 + 100));
    pruneConsumptionLog(log, T0 + 200);
    expect(isActiveIdempotencyKey(log, 'key-b1')).toBe(false);
  });
});

// ════════════════════════════════════════════
// 迁移 v6 → v7（验收①/③）
// ════════════════════════════════════════════

describe('迁移 v6 → v7', () => {
  it('版本号升到 7', () => {
    const r = migrateV6ToV7({ version: 6, credits: 100 });
    expect(r.version).toBe(7);
  });

  it('补空 consumptionLog', () => {
    const r = migrateV6ToV7({ version: 6, credits: 100 });
    expect(r.consumptionLog).toEqual(createEmptyConsumptionLog());
  });

  it('保留 v6 已有全部字段（无数据丢失）', () => {
    const v6 = {
      version: 6,
      credits: 999,
      stardust: 50,
      isotope: 19,
      research: ['basicResearch'],
      achievements: ['p100Stardust'],
      stats: { totalStardustProduced: 1234 },
      someExtraField: 'keep-me',
    };
    const r = migrateV6ToV7(v6);
    expect(r.credits).toBe(999);
    expect(r.stardust).toBe(50);
    expect(r.isotope).toBe(19);
    expect(r.research).toEqual(['basicResearch']);
    expect(r.achievements).toEqual(['p100Stardust']);
    expect((r.stats as Record<string, unknown>).totalStardustProduced).toBe(1234);
    expect(r.someExtraField).toBe('keep-me');
  });

  it('迁移产生的 consumptionLog 通过校验', () => {
    const r = migrateV6ToV7({ version: 6, credits: 100 });
    expect(validateConsumptionLog(r.consumptionLog)).toBeNull();
  });
});

// ════════════════════════════════════════════
// 消耗日志序列化往返（验收③：无数据丢失）
// ════════════════════════════════════════════

describe('消耗日志序列化往返', () => {
  it('含活跃条目的存档 serialize → parse 往返一致', () => {
    const s = createNewGame(T0);
    recordActiveConsumption(s.consumptionLog, buffEntry('b1', T0 + 500));
    recordActiveConsumption(s.consumptionLog, exchangeEntry('e1'));

    const parsed = parseSaveJson(serializeState(s));
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    const log = parsed.state.consumptionLog as ConsumptionLog;
    expect(log.active.map((e) => e.id)).toEqual(['b1', 'e1']);
    expect(log.active[0].expiresAt).toBe(T0 + 500);
    expect(log.active[1].idempotencyKey).toBe('key-e1');
    expect(log.aggregate.completedEvents).toBe(0);
  });

  it('prune 后再序列化只持久化活跃项（验收②）', () => {
    const s = createNewGame(T0);
    recordActiveConsumption(s.consumptionLog, buffEntry('b1', T0 + 100)); // 将过期
    recordActiveConsumption(s.consumptionLog, buffEntry('b2', T0 + 500)); // 活跃
    // 存档前修剪（模拟存档路径）
    pruneConsumptionLog(s.consumptionLog, T0 + 200);

    const parsed = parseSaveJson(serializeState(s));
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    const log = parsed.state.consumptionLog as ConsumptionLog;
    expect(log.active.map((e) => e.id)).toEqual(['b2']);
    expect(log.aggregate.completedEvents).toBe(1);
    expect(log.aggregate.consumedByResource).toEqual({ isotope: 10 });
  });

  it('聚合统计也往返一致', () => {
    const s = createNewGame(T0);
    recordActiveConsumption(s.consumptionLog, exchangeEntry('e1')); // 产出 credits 50
    completeConsumption(s.consumptionLog, 'e1'); // 折叠进 aggregate
    const parsed = parseSaveJson(serializeState(s));
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    const agg = (parsed.state.consumptionLog as ConsumptionLog).aggregate;
    expect(agg.completedEvents).toBe(1);
    expect(agg.consumedByResource).toEqual({ crystal: 5 });
    expect(agg.producedByResource).toEqual({ credits: 50 });
  });
});

// ════════════════════════════════════════════
// consumptionLog 校验防御
// ════════════════════════════════════════════

describe('validateConsumptionLog 防御', () => {
  it('合法日志返回 null', () => {
    expect(validateConsumptionLog(createEmptyConsumptionLog())).toBeNull();
  });

  it('缺 consumptionLog 拒绝', () => {
    expect(validateConsumptionLog(null)).toBe('存档缺少消耗日志');
    expect(validateConsumptionLog(undefined)).toBe('存档缺少消耗日志');
  });

  it('active 非数组拒绝', () => {
    expect(validateConsumptionLog({ active: 'no', aggregate: {} })).toBe('消耗日志活跃列表非法');
  });

  it('条目 kind 非法拒绝', () => {
    const bad = {
      active: [{ id: 'x', kind: 'hack', resourceId: 'isotope', amount: 1, produced: [], timestamp: T0 }],
      aggregate: { completedEvents: 0, consumedByResource: {}, producedByResource: {} },
    };
    expect(validateConsumptionLog(bad)).toBe('消耗日志条目 kind 非法');
  });

  it('条目 amount 为负拒绝', () => {
    const bad = {
      active: [{ id: 'x', kind: 'buff', resourceId: 'isotope', amount: -1, produced: [], timestamp: T0 }],
      aggregate: { completedEvents: 0, consumedByResource: {}, producedByResource: {} },
    };
    expect(validateConsumptionLog(bad)).toBe('消耗日志条目 amount 非法');
  });

  it('聚合 completedEvents 为负拒绝', () => {
    const bad = createEmptyConsumptionLog();
    bad.aggregate.completedEvents = -1;
    expect(validateConsumptionLog(bad)).toBe('消耗日志聚合 completedEvents 非法');
  });
});
