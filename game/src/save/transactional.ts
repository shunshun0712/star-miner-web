/**
 * T0-1 事务抽象层 — 在 IndexedDB 之上封装 begin/commit/rollback 三段式事务。
 *
 * 设计要点：
 * - begin() 对当前状态做深拷贝快照，事务期间修改只在内存
 * - commit() 一次性写入持久化后端，保证原子性
 * - rollback() 从快照恢复，内存即回退
 * - 中途刷新页面：未 commit 的修改只在内存中，IDB 无半写态
 *
 * 约束：
 * - 事务层只保证原子性，校验逻辑留在后续消耗引擎
 * - 事务接口不耦合具体资源类型（泛型 T，后续消耗引擎和转生重置都走这个接口）
 */

/** 深拷贝函数类型 — 由调用方提供（如 structuredClone 或 JSON 往返） */
export type CloneFn<T> = (state: T) => T;

/** 持久化后端接口 — 解耦具体存储实现（IndexedDB / mock / 未来分层存储） */
export interface PersistenceBackend<T> {
  load(): Promise<T | null>;
  save(state: T): Promise<void>;
}

/** 事务句柄 — 调用方通过此接口操作事务 */
export interface Transaction<T> {
  /** 获取事务内的可变工作状态引用（直接 mutate 即可） */
  getState(): T;
  /** 提交：将工作状态原子写入持久化后端 */
  commit(): Promise<void>;
  /** 回滚：将工作状态恢复到 begin 前的快照 */
  rollback(): void;
  /** 事务是否已结束（commit 或 rollback 后为 true） */
  isDone(): boolean;
}

/**
 * 事务型存储仓库
 *
 * 用法：
 * ```ts
 * const repo = new TransactionalRepository(backend, structuredClone);
 * const tx = repo.begin(currentState);
 * tx.getState().credits -= 100;  // 业务操作
 * await tx.commit();              // 持久化
 * // 或 tx.rollback();           // 放弃
 * ```
 *
 * 同一时间只允许一个活跃事务（防止并发写入冲突）。
 */
export class TransactionalRepository<T> {
  private snapshot: T | null = null;
  private workingState: T | null = null;
  private done = false;

  constructor(
    private readonly backend: PersistenceBackend<T>,
    private readonly clone: CloneFn<T>,
  ) {}

  /**
   * 开始事务：对当前状态做深拷贝快照。
   * 事务期间对返回状态的修改只在内存中，不触及 IDB。
   */
  begin(currentState: T): Transaction<T> {
    if (!this.done && this.snapshot !== null) {
      throw new Error('已有事务进行中，请先 commit 或 rollback');
    }
    this.snapshot = this.clone(currentState);
    this.workingState = currentState;
    this.done = false;
    return {
      getState: (): T => {
        if (this.done) throw new Error('事务已结束，无法获取状态');
        return this.workingState!;
      },
      commit: async (): Promise<void> => {
        if (this.done) throw new Error('事务已结束，无法提交');
        // 原子写入：一次性保存到后端
        await this.backend.save(this.workingState!);
        this.cleanup();
      },
      rollback: (): void => {
        if (this.done) throw new Error('事务已结束，无法回滚');
        // 从快照恢复：深拷贝回工作状态引用
        this.restoreSnapshot();
        this.cleanup();
      },
      isDone: (): boolean => this.done,
    };
  }

  /** 检查当前是否有活跃事务 */
  isActive(): boolean {
    return !this.done && this.snapshot !== null;
  }

  /** 从快照恢复工作状态（深拷贝，确保嵌套对象也被恢复） */
  private restoreSnapshot(): void {
    if (!this.snapshot || !this.workingState) return;
    const restored = this.clone(this.snapshot);
    const target = this.workingState as unknown as Record<string, unknown>;
    // 清空工作状态的所有自有属性
    for (const key of Object.keys(target)) {
      delete target[key];
    }
    // 将快照内容写回（深拷贝保证独立性）
    Object.assign(target, restored);
  }

  /** 清理事务状态 */
  private cleanup(): void {
    this.done = true;
    this.snapshot = null;
    this.workingState = null;
  }
}

/**
 * 内存 mock 后端 — 用于测试和无 IDB 环境。
 * 实现 PersistenceBackend 接口，数据存储在内存中。
 */
export class InMemoryBackend<T> implements PersistenceBackend<T> {
  private data: T | null = null;

  constructor(initial: T | null = null) {
    this.data = initial;
  }

  async load(): Promise<T | null> {
    return this.data;
  }

  async save(state: T): Promise<void> {
    this.data = state;
  }

  /** 测试辅助：直接读取内存数据 */
  peek(): T | null {
    return this.data;
  }

  /** 测试辅助：直接写入内存数据 */
  poke(state: T | null): void {
    this.data = state;
  }
}
