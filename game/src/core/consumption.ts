/**
 * T1-1 通用消耗引擎 — 在 T0-1 事务层 + T0-3 资源注册表之上的消耗交易接口。
 *
 * 设计要点：
 * - 每次消耗走一次事务：校验 → 扣减 → 产出 → 记录事件，全原子完成
 * - 余额不足时校验拦截，不扣减任何资源
 * - 幂等：相同 idempotencyKey 的消耗只执行一次（离线结算不重复扣）
 * - 消耗事件可回滚：逆向操作（归还消耗、扣除产出）走事务接口
 *
 * 支持三类消耗：
 * - buff：激活限时增益（消耗同位素等资源）
 * - exploration：深空探索派遣（消耗资源，产出 T3/T4 稀有材料）
 * - exchange：碎片兑换（资源转换器，消耗 A 产出 B）
 *
 * 约束：
 * - 引擎不实现 buff 计时 / 探索结果 / 兑换比率等业务逻辑——这些由调用方（T1-2 ReactorPanel）决定
 * - 引擎只管事务安全：原子性、幂等性、可回滚
 */

import type { TransactionalRepository, Transaction } from '../save/transactional';
import { canConsumeResource, consumeResource, addResourceAmount, getResource } from './resourceRegistry';
import type { GameState } from './types';

// ===== 类型定义 =====

/** 消耗种类 */
export type ConsumptionKind = 'buff' | 'exploration' | 'exchange';

/** 产出条目 */
export interface ProductionEntry {
  resourceId: string;
  amount: number;
}

/** 消耗请求 */
export interface ConsumptionRequest {
  kind: ConsumptionKind;
  /** 被消耗的资源 ID（必须已在资源注册表注册） */
  resourceId: string;
  /** 消耗数量 */
  amount: number;
  /** 消耗后产出的资源列表（exchange 类消耗会产生） */
  produces?: ProductionEntry[];
  /** 幂等键——相同 key 的消耗只执行一次，用于离线结算防重复 */
  idempotencyKey?: string;
}

/** 消耗事件记录 */
export interface ConsumptionEvent {
  id: string;
  kind: ConsumptionKind;
  resourceId: string;
  amount: number;
  produced: ProductionEntry[];
  timestamp: number;
  idempotencyKey?: string;
  rolledBack: boolean;
}

/** 消耗结果 */
export interface ConsumptionResult {
  ok: boolean;
  reason?: string;
  event?: ConsumptionEvent;
}

// ===== 消耗引擎 =====

let eventCounter = 0;

function nextEventId(): string {
  return `ce-${++eventCounter}`;
}

export class ConsumptionEngine {
  /** 已执行的消耗事件（按 ID 索引） */
  private events: Map<string, ConsumptionEvent> = new Map();
  /** 已处理的幂等键集合——相同 key 的消耗请求不重复执行 */
  private processedKeys: Set<string> = new Set();
  /**
   * 串行化队列——将并发 consume/rollback/runSerialized 调用排队为顺序执行。
   *
   * TransactionalRepository 是单实例共享可变状态机（snapshot/workingState/done 均为实例字段），
   * 两个事务在 await commit 处交错会导致第二个 begin() 的自动清理覆盖第一个事务的快照元数据，
   * 引发扣减泄漏（Bug A）和幂等 check-then-act 竞态（Bug B）。
   * 此队列在 engine 层将所有消耗调用串行化，从源头消除交错。
   *
   * 每次执行后用 `.catch(() => undefined)` 兜底——失败不断链，否则一次失败会永久卡死后续所有消耗。
   */
  private queue: Promise<unknown> = Promise.resolve();

  constructor(private readonly repo: TransactionalRepository<GameState>) {}

  /**
   * 串行化执行入口——把任意基于 txRepo 的事务函数挂进同一条队列。
   *
   * txRepo 除 consume/rollback 外还有直接使用方
   * （starcoreShop.purchaseItem、prestige.executePrestigeReset 等）。
   * 这些调用方经此入口包裹后，与 consume/rollback 互斥排队，消除跨入口事务交错。
   *
   * fn 的异常会正常传播给调用方；队列本身 catch 兜底不断链，
   * 确保一次失败不会卡死后续所有排队调用。
   */
  async runSerialized<T>(fn: () => Promise<T>): Promise<T> {
    const run = this.queue.then(fn);
    this.queue = run.catch(() => undefined);
    return run;
  }

  /**
   * 执行一次消耗交易：校验 → 扣减 → 产出 → 记录事件。
   * 全程走 T0-1 事务接口（begin/commit/rollback），保证原子性。
   *
   * @param state 当前游戏状态（事务期间会被原地修改）
   * @param request 消耗请求
   * @returns 消耗结果——ok=true 时 event 字段包含事件记录（可用于后续回滚）
   */
  async consume(state: GameState, request: ConsumptionRequest): Promise<ConsumptionResult> {
    // 串行化：将并发调用排队为顺序执行，避免事务层交错。
    return this.runSerialized(() => this.doConsume(state, request));
  }

  /**
   * consume 的实际实现——已由外层 consume() 串行化保护，无需考虑并发。
   */
  private async doConsume(state: GameState, request: ConsumptionRequest): Promise<ConsumptionResult> {
    // 幂等检查：相同 idempotencyKey 的消耗只执行一次
    if (request.idempotencyKey && this.processedKeys.has(request.idempotencyKey)) {
      const existing = this.findEventByIdempotencyKey(request.idempotencyKey);
      return { ok: true, event: existing };
    }

    // 开启事务（快照在此刻拍下）——begin 放在 try 块内部，确保 begin 抛错也能被 catch 捕获
    let tx: Transaction<GameState> | undefined;
    try {
      tx = this.repo.begin(state);

      const txState = tx.getState();

      // 1. 校验：检查资源余额是否充足
      const check = canConsumeResource(txState, request.resourceId, request.amount);
      if (!check.ok) {
        tx.rollback();
        return { ok: false, reason: check.reason };
      }

      // 2. 扣减
      const consumed = consumeResource(txState, request.resourceId, request.amount);
      if (!consumed.ok) {
        tx.rollback();
        return { ok: false, reason: consumed.reason };
      }

      // 3. 产出
      const produced: ProductionEntry[] = [];
      if (request.produces) {
        for (const p of request.produces) {
          addResourceAmount(txState, p.resourceId, p.amount);
          produced.push({ resourceId: p.resourceId, amount: p.amount });
        }
      }

      // 4. 记录事件
      const event: ConsumptionEvent = {
        id: nextEventId(),
        kind: request.kind,
        resourceId: request.resourceId,
        amount: request.amount,
        produced,
        timestamp: Date.now(),
        idempotencyKey: request.idempotencyKey,
        rolledBack: false,
      };

      // 5. 提交事务（原子写入持久化后端）
      await tx.commit();

      // 6. 注册事件到内存日志
      this.events.set(event.id, event);
      if (request.idempotencyKey) {
        this.processedKeys.add(request.idempotencyKey);
      }

      return { ok: true, event };
    } catch (err) {
      // 异常时回滚事务（如果尚未结束）——tx 可能在 begin 前就抛错，需判空
      if (tx && !tx.isDone()) {
        tx.rollback();
      }
      return { ok: false, reason: `消耗事务异常: ${err instanceof Error ? err.message : String(err)}` };
    }
  }

  /**
   * 回滚一次消耗事件：归还消耗的资源，扣除产出的资源。
   * 同样走 T0-1 事务接口，保证回滚的原子性。
   *
   * 注意：如果产出的资源已被玩家花掉（余额不足），产出回滚为尽力而为——
   * 消耗的资源一定会归还，产出的资源尽量扣除但不阻断回滚。
   *
   * @param state 当前游戏状态
   * @param eventId 要回滚的事件 ID（从 consume 返回结果的 event.id 获取）
   */
  async rollback(state: GameState, eventId: string): Promise<ConsumptionResult> {
    // 串行化：与 consume 共享同一队列，避免 rollback 与 consume 交错。
    return this.runSerialized(() => this.doRollback(state, eventId));
  }

  /**
   * rollback 的实际实现——已由外层 rollback() 串行化保护。
   */
  private async doRollback(state: GameState, eventId: string): Promise<ConsumptionResult> {
    const event = this.events.get(eventId);
    if (!event) {
      return { ok: false, reason: `消耗事件 ${eventId} 不存在` };
    }
    if (event.rolledBack) {
      return { ok: false, reason: `消耗事件 ${eventId} 已回滚` };
    }

    let tx: Transaction<GameState> | undefined;
    try {
      tx = this.repo.begin(state);

      const txState = tx.getState();

      // 逆向操作：归还消耗的资源
      addResourceAmount(txState, event.resourceId, event.amount);

      // 逆向操作：扣除产出的资源（尽力而为——余额不足时扣至 0）
      for (const p of event.produced) {
        const schema = getResource(p.resourceId);
        if (schema?.stateKey) {
          const current = txState[schema.stateKey];
          if (typeof current === 'number') {
            (txState[schema.stateKey] as unknown) = Math.max(0, current - p.amount);
          }
        }
      }

      event.rolledBack = true;

      await tx.commit();

      return { ok: true, event };
    } catch (err) {
      if (tx && !tx.isDone()) {
        tx.rollback();
      }
      return { ok: false, reason: `回滚异常: ${err instanceof Error ? err.message : String(err)}` };
    }
  }

  /** 检查某个幂等键是否已处理 */
  isProcessed(key: string): boolean {
    return this.processedKeys.has(key);
  }

  /** 获取指定事件 */
  getEvent(eventId: string): ConsumptionEvent | undefined {
    return this.events.get(eventId);
  }

  /** 获取所有事件（含已回滚的） */
  getEvents(): ConsumptionEvent[] {
    return Array.from(this.events.values());
  }

  /** 获取活跃事件（未回滚的） */
  getActiveEvents(): ConsumptionEvent[] {
    return Array.from(this.events.values()).filter((e) => !e.rolledBack);
  }

  /** 重置引擎状态（测试用） */
  reset(): void {
    this.events.clear();
    this.processedKeys.clear();
    eventCounter = 0;
    // 重置串行化队列，避免跨测试用例的前驱 promise 残留
    this.queue = Promise.resolve();
  }

  private findEventByIdempotencyKey(key: string): ConsumptionEvent | undefined {
    for (const event of this.events.values()) {
      if (event.idempotencyKey === key) {
        return event;
      }
    }
    return undefined;
  }
}
