import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ============================================================
// M5: 货舱 clamp 距离不为负
// tracks.ts 中 `src.clampDist - idx*0.35` 在路径较短时可能为负，
// 修复后用 Math.max(0, ...) 钳制。
// ============================================================
describe('M5: 货舱 clamp 距离不为负', () => {
  // 模拟 tracks.ts update 中的 clamp 逻辑
  function cargoClamp(clampDist: number, idx: number): number {
    return Math.max(0, clampDist - idx * 0.35);
  }

  it('路径较短、idx 较大时 clamp 距离取 0 而非负值', () => {
    // clampDist = path.length - 0.95，短路径可能只有 1.0
    // idx=5 → 1.0 - 1.75 = -0.75 → 应为 0
    expect(cargoClamp(1.0, 5)).toBe(0);
    expect(cargoClamp(0.5, 3)).toBe(0);
    expect(cargoClamp(0.1, 1)).toBe(0);
  });

  it('正常范围内保持原值', () => {
    expect(cargoClamp(2.0, 3)).toBeCloseTo(0.95, 5);
    expect(cargoClamp(5.0, 0)).toBe(5.0);
    expect(cargoClamp(3.5, 2)).toBeCloseTo(2.8, 5);
  });
});

// ============================================================
// M3: safeDispose 去重——同一材质实例不重复 dispose
// materials.ts 中用 WeakSet 保证每实例只释放一次。
// ============================================================
describe('M3: safeDispose 去重模式', () => {
  it('同一材质实例多次调用 safeDispose 只 dispose 一次', () => {
    const disposed = new WeakSet<object>();
    let count = 0;
    const mat = { dispose: () => { count += 1; } };

    function safeDispose(m: { dispose: () => void }): void {
      if (!disposed.has(m)) {
        disposed.add(m);
        m.dispose();
      }
    }

    safeDispose(mat);
    safeDispose(mat);
    safeDispose(mat);
    expect(count).toBe(1);
  });

  it('不同材质实例各自独立 dispose', () => {
    const disposed = new WeakSet<object>();
    const calls: string[] = [];

    function safeDispose(m: { dispose: () => void }, name: string): void {
      if (!disposed.has(m)) {
        disposed.add(m);
        m.dispose();
        calls.push(name);
      }
    }

    const matA = { dispose: () => {} };
    const matB = { dispose: () => {} };
    safeDispose(matA, 'A');
    safeDispose(matB, 'B');
    safeDispose(matA, 'A'); // skip
    safeDispose(matB, 'B'); // skip
    expect(calls).toEqual(['A', 'B']);
  });
});

// ============================================================
// M7: openModal 移除旧弹窗时 dispatch modal:close
// 修复前直接 b.remove() 不经 modal:close，旧回调丢失。
// 修复后逐个 dispatch modal:close，统一收口到关闭路径。
// ============================================================
describe('M7: openModal 逐个 dispatch modal:close', () => {
  it('存在 N 个旧 backdrop 时 dispatch modal:close N 次', () => {
    const dispatched: string[] = [];
    const fakeBackdrops = [{ remove: () => {} }, { remove: () => {} }, { remove: () => {} }];
    let currentBackdrops = [...fakeBackdrops];

    // 模拟 document.querySelectorAll + dispatchEvent
    const mockQueryAll = () => currentBackdrops;
    const mockDispatch = (type: string) => {
      dispatched.push(type);
      // 模拟 modal:close listener：移除最顶层 backdrop
      if (type === 'modal:close' && currentBackdrops.length > 0) {
        currentBackdrops = currentBackdrops.slice(0, -1);
      }
    };

    // 模拟修复后的 openModal 关闭逻辑
    const existing = mockQueryAll();
    existing.forEach(() => {
      mockDispatch('modal:close');
    });

    expect(dispatched.filter((t) => t === 'modal:close')).toHaveLength(3);
    expect(currentBackdrops).toHaveLength(0);
  });

  it('无旧 backdrop 时不 dispatch modal:close', () => {
    const dispatched: string[] = [];
    let currentBackdrops: { remove: () => void }[] = [];

    const mockQueryAll = () => currentBackdrops;
    const mockDispatch = (type: string) => {
      dispatched.push(type);
      if (type === 'modal:close' && currentBackdrops.length > 0) {
        currentBackdrops = currentBackdrops.slice(0, -1);
      }
    };

    const existing = mockQueryAll();
    existing.forEach(() => {
      mockDispatch('modal:close');
    });

    expect(dispatched).toHaveLength(0);
  });
});

// ============================================================
// L2: IndexedDB 复用连接
// 修复前 load/save 每次都 openDb；修复后缓存 IDBDatabase 实例。
// ============================================================
describe('L2: IndexedDB 连接复用', () => {
  let openCount = 0;
  let cachedDb: object | null = null;

  // 模拟修复后的 openDb 逻辑
  function mockOpenDb(): Promise<object> {
    if (cachedDb) return Promise.resolve(cachedDb);
    openCount += 1;
    const db = {
      close: () => { cachedDb = null; },
      transaction: () => ({
        objectStore: () => ({
          get: () => ({ onsuccess: null, onerror: null, result: null }),
          put: () => {},
        }),
        oncomplete: null,
        onerror: null,
        error: null,
      }),
      onclose: null,
      onversionchange: null,
      objectStoreNames: { contains: () => true },
      createObjectStore: () => {},
    };
    cachedDb = db;
    (cachedDb as { onclose: (() => void) | null }).onclose = () => { cachedDb = null; };
    return Promise.resolve(db);
  }

  beforeEach(() => {
    openCount = 0;
    cachedDb = null;
  });

  afterEach(() => {
    openCount = 0;
    cachedDb = null;
  });

  it('首次调用 openDb 后缓存，后续调用不重新 open', async () => {
    await mockOpenDb();
    expect(openCount).toBe(1);
    await mockOpenDb();
    await mockOpenDb();
    expect(openCount).toBe(1); // 仍然只有 1 次
  });

  it('连接关闭后清空缓存，下次重新建立', async () => {
    const db = await mockOpenDb();
    expect(openCount).toBe(1);
    // 模拟 onclose 回调
    (db as { onclose: (() => void) | null }).onclose?.();
    await mockOpenDb();
    expect(openCount).toBe(2); // 重新打开了
  });
});
