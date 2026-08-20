/**
 * GameState 持久化后端适配器。
 *
 * T0-1 事务抽象层 + T1-1 消耗引擎都基于 PersistenceBackend<GameState>，
 * 而 IndexedDbSaveRepository 存取的是序列化后的 JSON 字符串。
 * 本适配器在两者间做 (de)serialize 转换，使 ConsumptionEngine 可直接以 GameState 事务提交。
 *
 * 与 save.ts / indexeddb.ts 解耦：不修改既有存档模块，仅作薄适配层。
 */
import { parseSaveJson, serializeState } from '../core/save';
import { IndexedDbSaveRepository } from './indexeddb';
import type { PersistenceBackend } from './transactional';
import type { GameState } from '../core/types';

export class JsonStateBackend implements PersistenceBackend<GameState> {
  constructor(private readonly inner: IndexedDbSaveRepository) {}

  async load(): Promise<GameState | null> {
    const json = await this.inner.load();
    if (!json) return null;
    const parsed = parseSaveJson(json);
    return parsed.ok ? parsed.state : null;
  }

  async save(state: GameState): Promise<void> {
    await this.inner.save(serializeState(state));
  }
}
