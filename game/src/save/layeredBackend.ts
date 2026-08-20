/**
 * T2-1: 分层存档后端——把 GameState 拆成基线层 + 转生层，分别持久化到 IDB。
 *
 * 实现两层隔离的方式：
 * - 'main' 键只存基线层 JSON（GameState 剔除 prestige 字段）
 * - 'prestige' 键单独存转生层 JSON
 * - save() 用 IndexedDbSaveRepository.saveBoth 在单个 IDB 事务内原子写两个键 → 无半写态
 * - load() 分别读两键后合并为完整 GameState 再走 validateState
 *
 * 作为 PersistenceBackend<GameState> 供 TransactionalRepository 使用：
 * 转生重置事务 commit 时调用本后端 save()，原子落盘基线层重置 + 转生层结算。
 *
 * 注意：基线层 JSON 不含 prestige 字段（version=8 但缺该字段），
 * 因此独立 parseSaveJson 一份基线 JSON 会因 validateState 报"缺少转生层"而失败——
 * 这是设计预期：基线层只在合并后校验，单独的基线 JSON 不是合法完整存档。
 * 完整存档（含 prestige）的序列化走 serializeState（用于 JSON 导出，见 jsonTransfer）。
 */
import { parseSaveJson, serializeState } from '../core/save';
import { createEmptyPrestigeLayer } from '../core/prestigeLayer';
import type { GameState, PrestigeLayer } from '../core/types';
import type { PersistenceBackend } from './transactional';

/**
 * 分层键值存储接口——IndexedDbSaveRepository 结构化实现此接口。
 * 抽象成接口便于测试用内存 mock 替换（无需真实 IDB）。
 */
export interface LayeredKeyValueStore {
  load(): Promise<string | null>;
  save(json: string): Promise<void>;
  loadPrestige(): Promise<string | null>;
  savePrestige(json: string): Promise<void>;
  saveBoth(baselineJson: string, prestigeJson: string): Promise<void>;
}

/** 把完整 GameState 拆成基线层与转生层（基线层 JSON 不含 prestige 字段） */
export function splitState(state: GameState): { baseline: GameState; prestige: PrestigeLayer } {
  const { prestige, ...baseline } = state;
  return { baseline: baseline as GameState, prestige };
}

/**
 * 分层存档后端——实现 PersistenceBackend<GameState>。
 *
 * load：读 'main'（基线）+ 'prestige'（转生）两键，合并后校验。
 *   - 'main' 缺失 → 返回 null（无存档）
 *   - 'prestige' 缺失 → 回填空转生层（旧 v7 单键存档首次加载 / 新存档首次分层）
 *   - 'prestige' JSON 损坏 → 抛错（不静默清空转生层，避免丢档）
 * save：split → 序列化两份 → saveBoth 原子写两键。
 */
export class LayeredStateBackend implements PersistenceBackend<GameState> {
  constructor(private readonly store: LayeredKeyValueStore) {}

  async load(): Promise<GameState | null> {
    const baselineJson = await this.store.load();
    if (baselineJson === null) return null;

    const prestigeJson = await this.store.loadPrestige();
    let prestigeRaw: unknown;
    if (prestigeJson === null) {
      // 旧 v7 单键存档首次分层加载：回填空转生层（迁移链也会兜底）
      prestigeRaw = createEmptyPrestigeLayer();
    } else {
      try {
        prestigeRaw = JSON.parse(prestigeJson);
      } catch {
        // 转生层 JSON 损坏——不静默清空，抛错让上层处理（避免玩家永久进度丢失）
        throw new Error('转生层数据损坏，无法加载');
      }
    }

    // 合并基线层 + 转生层为完整存档再走统一校验/迁移链
    const baselineRaw = JSON.parse(baselineJson) as Record<string, unknown>;
    const merged = { ...baselineRaw, prestige: prestigeRaw };
    const parsed = parseSaveJson(JSON.stringify(merged));
    if (!parsed.ok) {
      throw new Error(parsed.error);
    }
    return parsed.state;
  }

  async save(state: GameState): Promise<void> {
    const { baseline, prestige } = splitState(state);
    const baselineJson = serializeState(baseline);
    const prestigeJson = JSON.stringify(prestige, null, 2);
    await this.store.saveBoth(baselineJson, prestigeJson);
  }
}
