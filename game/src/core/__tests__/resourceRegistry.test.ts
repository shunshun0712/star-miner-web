import { describe, it, expect, beforeEach } from 'vitest';
import { createNewGame } from '../state';
import { RESOURCE_SCHEMAS, RESOURCE_SCHEMA_VERSION, NODE_SCHEMA_VERSION, CONFIG_SCHEMA_VERSION, validateConfigSchema } from '../config';
import {
  registerResource,
  getResource,
  listResources,
  isRegistered,
  clearRegistry,
  initResourceRegistry,
  isInitialized,
  validateRegistry,
  getResourceAmount,
  canConsumeResource,
  consumeResource,
  addResourceAmount,
} from '../resourceRegistry';
import type { ResourceSchema } from '../types';

const T0 = 1_700_000_000_000;

describe('资源注册表 - 自动初始化', () => {
  it('模块加载时自动注册现有三资源', () => {
    expect(isInitialized()).toBe(true);
    expect(isRegistered('credits')).toBe(true);
    expect(isRegistered('crystal')).toBe(true);
    expect(isRegistered('isotope')).toBe(true);
  });

  it('已注册资源 schema 字段完整', () => {
    const credits = getResource('credits');
    expect(credits).toBeDefined();
    expect(credits!.name).toBe('信用点');
    expect(credits!.category).toBe('currency');
    expect(credits!.consumable).toBe(true);
    expect(credits!.stateKey).toBe('credits');
    expect(credits!.schemaVersion).toBe(1);

    const crystal = getResource('crystal');
    expect(crystal).toBeDefined();
    expect(crystal!.name).toBe('晶体');
    expect(crystal!.category).toBe('material');
    expect(crystal!.sellable).toBe(true);

    const isotope = getResource('isotope');
    expect(isotope).toBeDefined();
    expect(isotope!.name).toBe('同位素');
    expect(isotope!.category).toBe('rare');
    expect(isotope!.consumable).toBe(true);
  });

  it('listResources 返回全部已注册资源', () => {
    const all = listResources();
    expect(all.length).toBeGreaterThanOrEqual(3);
    const ids = all.map((s) => s.id);
    expect(ids).toContain('credits');
    expect(ids).toContain('crystal');
    expect(ids).toContain('isotope');
  });
});

describe('资源注册表 - 手动注册与校验', () => {
  beforeEach(() => {
    clearRegistry();
    initResourceRegistry(RESOURCE_SCHEMAS);
  });

  it('registerResource 注册新资源后可通过 getResource 获取', () => {
    const newResource: ResourceSchema = {
      id: 'antimatter',
      name: '反物质',
      description: 'T3 节点消耗的预留资源',
      category: 'rare',
      sellable: false,
      consumable: true,
      stateKey: 'isotope',
      schemaVersion: 1,
    };
    registerResource(newResource);
    expect(isRegistered('antimatter')).toBe(true);
    expect(getResource('antimatter')!.name).toBe('反物质');
  });

  it('registerResource 不影响已有注册', () => {
    const before = listResources().length;
    registerResource({
      id: 'test-res',
      name: '测试资源',
      description: '',
      category: 'intermediate',
      sellable: false,
      consumable: false,
      schemaVersion: 1,
    });
    expect(listResources().length).toBe(before + 1);
    expect(isRegistered('credits')).toBe(true);
  });

  it('validateRegistry 对合法注册表返回 valid', () => {
    const result = validateRegistry();
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('validateRegistry 检测可消耗资源缺少 stateKey', () => {
    registerResource({
      id: 'broken-res',
      name: '缺 stateKey 的可消耗资源',
      description: '',
      category: 'material',
      sellable: false,
      consumable: true,
      schemaVersion: 1,
    });
    const result = validateRegistry();
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('可消耗资源 broken-res 缺少 stateKey 映射');
  });

  it('clearRegistry 清空后可重新初始化', () => {
    clearRegistry();
    expect(isInitialized()).toBe(false);
    expect(listResources()).toHaveLength(0);
    initResourceRegistry(RESOURCE_SCHEMAS);
    expect(isInitialized()).toBe(true);
    expect(isRegistered('credits')).toBe(true);
  });
});

describe('通用消耗引擎 - canConsumeResource', () => {
  beforeEach(() => {
    clearRegistry();
    initResourceRegistry(RESOURCE_SCHEMAS);
  });

  it('资源充足时返回 ok', () => {
    const s = createNewGame(T0);
    s.credits = 100;
    const r = canConsumeResource(s, 'credits', 50);
    expect(r.ok).toBe(true);
    expect(r.consumed).toBe(50);
  });

  it('资源不足时返回失败及原因', () => {
    const s = createNewGame(T0);
    s.credits = 30;
    const r = canConsumeResource(s, 'credits', 50);
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('信用点不足');
    expect(r.reason).toContain('需 50');
    expect(r.reason).toContain('持有 30');
  });

  it('消耗数量为 0 时返回 ok', () => {
    const s = createNewGame(T0);
    const r = canConsumeResource(s, 'credits', 0);
    expect(r.ok).toBe(true);
    expect(r.consumed).toBe(0);
  });

  it('消耗负数返回失败', () => {
    const s = createNewGame(T0);
    const r = canConsumeResource(s, 'credits', -10);
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('负');
  });

  it('未注册资源返回失败', () => {
    const s = createNewGame(T0);
    const r = canConsumeResource(s, 'unknown-res', 10);
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('未知资源类型');
  });

  it('不可消耗资源返回失败', () => {
    registerResource({
      id: 'display-only',
      name: '展示资源',
      description: '不可消耗',
      category: 'intermediate',
      sellable: false,
      consumable: false,
      schemaVersion: 1,
    });
    const s = createNewGame(T0);
    const r = canConsumeResource(s, 'display-only', 1);
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('不可消耗');
  });
});

describe('通用消耗引擎 - consumeResource', () => {
  beforeEach(() => {
    clearRegistry();
    initResourceRegistry(RESOURCE_SCHEMAS);
  });

  it('成功消耗信用点', () => {
    const s = createNewGame(T0);
    s.credits = 100;
    const r = consumeResource(s, 'credits', 30);
    expect(r.ok).toBe(true);
    expect(s.credits).toBe(70);
  });

  it('成功消耗晶体', () => {
    const s = createNewGame(T0);
    s.crystal = 50;
    const r = consumeResource(s, 'crystal', 20);
    expect(r.ok).toBe(true);
    expect(s.crystal).toBe(30);
  });

  it('成功消耗同位素——不硬编码 isotope，走通用路径', () => {
    const s = createNewGame(T0);
    s.isotope = 10;
    const r = consumeResource(s, 'isotope', 3);
    expect(r.ok).toBe(true);
    expect(s.isotope).toBe(7);
  });

  it('消耗数量为 0 不改变状态', () => {
    const s = createNewGame(T0);
    s.credits = 100;
    const r = consumeResource(s, 'credits', 0);
    expect(r.ok).toBe(true);
    expect(s.credits).toBe(100);
  });

  it('资源不足时不消耗', () => {
    const s = createNewGame(T0);
    s.crystal = 5;
    const r = consumeResource(s, 'crystal', 10);
    expect(r.ok).toBe(false);
    expect(s.crystal).toBe(5);
  });

  it('消耗后余额不会变负（Math.max 保护）', () => {
    const s = createNewGame(T0);
    s.credits = 10;
    consumeResource(s, 'credits', 10);
    expect(s.credits).toBe(0);
  });
});

describe('通用消耗引擎 - getResourceAmount & addResourceAmount', () => {
  beforeEach(() => {
    clearRegistry();
    initResourceRegistry(RESOURCE_SCHEMAS);
  });

  it('getResourceAmount 读取已注册资源数量', () => {
    const s = createNewGame(T0);
    s.credits = 500;
    s.crystal = 42;
    s.isotope = 7;
    expect(getResourceAmount(s, 'credits')).toBe(500);
    expect(getResourceAmount(s, 'crystal')).toBe(42);
    expect(getResourceAmount(s, 'isotope')).toBe(7);
  });

  it('getResourceAmount 对未注册资源返回 0', () => {
    const s = createNewGame(T0);
    expect(getResourceAmount(s, 'nonexistent')).toBe(0);
  });

  it('addResourceAmount 增加已注册资源', () => {
    const s = createNewGame(T0);
    s.credits = 100;
    addResourceAmount(s, 'credits', 50);
    expect(s.credits).toBe(150);
  });

  it('addResourceAmount 对未注册资源无操作', () => {
    const s = createNewGame(T0);
    addResourceAmount(s, 'nonexistent', 100);
    expect(s.credits).toBe(100);
  });
});

describe('可扩展性 - 新增资源类型', () => {
  beforeEach(() => {
    clearRegistry();
    initResourceRegistry(RESOURCE_SCHEMAS);
  });

  it('新增资源只需 register 调用，消耗引擎即适用', () => {
    // 模拟 v0.6 新增 T3 资源：反物质
    registerResource({
      id: 'antimatter',
      name: '反物质',
      description: 'T3 节点消耗的预留资源',
      category: 'rare',
      sellable: false,
      consumable: true,
      stateKey: 'isotope', // v0.5 借用 isotope 槽位演示；v0.6 会扩展 GameState
      schemaVersion: 1,
    });

    const s = createNewGame(T0);
    s.isotope = 20;

    // 通用消耗引擎自动适配新资源——无需修改任何消耗代码
    const can = canConsumeResource(s, 'antimatter', 5);
    expect(can.ok).toBe(true);

    const r = consumeResource(s, 'antimatter', 5);
    expect(r.ok).toBe(true);
    expect(s.isotope).toBe(15);

    // 注册表校验仍通过
    expect(validateRegistry().valid).toBe(true);
  });

  it('新增资源不影响现有三资源消耗', () => {
    registerResource({
      id: 'dark-matter',
      name: '暗物质',
      description: 'T4 节点消耗',
      category: 'rare',
      sellable: false,
      consumable: true,
      stateKey: 'isotope',
      schemaVersion: 1,
    });

    const s = createNewGame(T0);
    s.credits = 100;
    s.crystal = 50;
    s.isotope = 10;

    // 现有资源消耗不受影响
    expect(consumeResource(s, 'credits', 30).ok).toBe(true);
    expect(s.credits).toBe(70);
    expect(consumeResource(s, 'crystal', 20).ok).toBe(true);
    expect(s.crystal).toBe(30);
    expect(consumeResource(s, 'isotope', 3).ok).toBe(true);
    expect(s.isotope).toBe(7);
  });
});

describe('Config Schema 版本化', () => {
  it('schema 版本号已定义', () => {
    expect(RESOURCE_SCHEMA_VERSION).toBe(1);
    expect(NODE_SCHEMA_VERSION).toBe(1);
    expect(CONFIG_SCHEMA_VERSION).toBe(1);
  });

  it('validateConfigSchema 对当前 config 返回 valid', () => {
    const result = validateConfigSchema();
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('RESOURCE_SCHEMAS 包含现有三资源', () => {
    const ids = RESOURCE_SCHEMAS.map((s) => s.id);
    expect(ids).toContain('credits');
    expect(ids).toContain('crystal');
    expect(ids).toContain('isotope');
  });

  it('所有资源 schema 版本号不超过 RESOURCE_SCHEMA_VERSION', () => {
    for (const schema of RESOURCE_SCHEMAS) {
      expect(schema.schemaVersion).toBeLessThanOrEqual(RESOURCE_SCHEMA_VERSION);
    }
  });

  it('所有可消耗资源都有 stateKey', () => {
    for (const schema of RESOURCE_SCHEMAS) {
      if (schema.consumable) {
        expect(schema.stateKey).toBeDefined();
      }
    }
  });
});
