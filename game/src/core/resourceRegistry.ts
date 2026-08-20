import { RESOURCE_SCHEMAS } from './config';
import type { GameState, ResourceSchema } from './types';

/**
 * M1 v0.5 资源注册表 + 通用消耗引擎
 *
 * 设计目标：
 * - 资源模型抽象为可注册 schema（registerResource(type, config)）
 * - 消耗口针对「任意资源类型」通用，不硬编码具体资源 ID
 * - 新增资源类型只需 register 调用，不改 production/economy/consumption 代码
 *
 * v0.5 只注册 schema 不配 T3/T4 数值（数值平衡留 v0.6）。
 */

export interface ConsumptionResult {
  ok: boolean;
  reason?: string;
  consumed?: number;
}

// ===== 模块级注册表 =====

const registry = new Map<string, ResourceSchema>();
let initialized = false;

/**
 * 注册一种资源类型。
 * 新增资源只需调用此函数并传入 schema，消耗引擎自动适配。
 */
export function registerResource(schema: ResourceSchema): void {
  if (!schema.id) throw new Error('ResourceSchema 必须包含 id');
  registry.set(schema.id, { ...schema });
}

/** 获取已注册资源的 schema */
export function getResource(id: string): ResourceSchema | undefined {
  return registry.get(id);
}

/** 列出所有已注册资源 */
export function listResources(): ResourceSchema[] {
  return Array.from(registry.values());
}

/** 判断资源是否已注册 */
export function isRegistered(id: string): boolean {
  return registry.has(id);
}

/** 清空注册表（测试用） */
export function clearRegistry(): void {
  registry.clear();
  initialized = false;
}

/** 注册表是否已初始化 */
export function isInitialized(): boolean {
  return initialized;
}

/**
 * 从一组 schema 批量初始化注册表。
 * 生产代码在模块加载时自动调用；测试可手动 reset + init。
 */
export function initResourceRegistry(schemas: ResourceSchema[]): void {
  for (const schema of schemas) {
    registerResource(schema);
  }
  initialized = true;
}

/**
 * 校验注册表完整性：
 * 1. 可消耗资源必须有 stateKey
 * 2. 可出售资源必须有 stateKey
 * 3. 资源 ID 无重复（Map 天然去重，此处补充检测）
 */
export function validateRegistry(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const schema of registry.values()) {
    if (seen.has(schema.id)) {
      errors.push(`资源 ID 重复: ${schema.id}`);
    }
    seen.add(schema.id);
    if (schema.consumable && !schema.stateKey) {
      errors.push(`可消耗资源 ${schema.id} 缺少 stateKey 映射`);
    }
    if (schema.sellable && !schema.stateKey) {
      errors.push(`可出售资源 ${schema.id} 缺少 stateKey 映射`);
    }
  }
  return { valid: errors.length === 0, errors };
}

// ===== 通用消耗引擎 =====

/**
 * 通用资源读取：根据 schema 的 stateKey 从 GameState 中读取资源数量。
 * 针对任意已注册资源类型工作，不硬编码具体资源。
 */
export function getResourceAmount(state: GameState, id: string): number {
  const schema = getResource(id);
  if (!schema?.stateKey) return 0;
  const value = state[schema.stateKey];
  return typeof value === 'number' ? value : 0;
}

/**
 * 通用消耗检查：判断是否可以消耗指定数量的任意资源类型。
 * 不硬编码「消耗同位素」等具体资源——对任何已注册可消耗资源通用。
 */
export function canConsumeResource(state: GameState, id: string, amount: number): ConsumptionResult {
  const schema = getResource(id);
  if (!schema) return { ok: false, reason: `未知资源类型: ${id}` };
  if (!schema.consumable) return { ok: false, reason: `资源 ${schema.name} 不可消耗` };
  if (amount < 0) return { ok: false, reason: '消耗数量不能为负' };
  if (amount === 0) return { ok: true, consumed: 0 };
  const held = getResourceAmount(state, id);
  if (held < amount) {
    return { ok: false, reason: `${schema.name}不足（需 ${amount}，持有 ${held}）` };
  }
  return { ok: true, consumed: amount };
}

/**
 * 通用消耗引擎：从 GameState 中扣除指定数量的任意已注册资源。
 * 这是消耗口的核心——针对「任意资源类型」通用，不硬编码具体资源 ID。
 * 返回 ConsumptionResult，调用方据 ok 字段判断是否成功。
 */
export function consumeResource(state: GameState, id: string, amount: number): ConsumptionResult {
  const check = canConsumeResource(state, id, amount);
  if (!check.ok) return check;
  if (amount === 0) return { ok: true, consumed: 0 };
  const schema = getResource(id);
  if (!schema?.stateKey) return { ok: false, reason: `资源 ${id} 缺少 stateKey 映射` };
  const current = state[schema.stateKey];
  if (typeof current === 'number') {
    (state[schema.stateKey] as unknown) = Math.max(0, current - amount);
  }
  return { ok: true, consumed: amount };
}

/**
 * 通用资源增加：向 GameState 中增加指定数量的任意已注册资源。
 * 消耗引擎的逆操作，供生产侧使用。
 */
export function addResourceAmount(state: GameState, id: string, amount: number): void {
  if (amount <= 0) return;
  const schema = getResource(id);
  if (!schema?.stateKey) return;
  const current = state[schema.stateKey];
  if (typeof current === 'number') {
    (state[schema.stateKey] as unknown) = current + amount;
  }
}

// ===== 自动初始化：模块加载时注册现有三资源 =====

initResourceRegistry(RESOURCE_SCHEMAS);
