const DB_NAME = 'star-miner-save';
const STORE = 'saves';
const KEY = 'main';
/** T2-1: 转生层独立持久化键——基线层存 'main'，转生层存 'prestige'，两层数据隔离 */
const KEY_PRESTIGE = 'prestige';

/** L2：缓存 IDBDatabase 实例，load/save 复用同一连接，避免每次操作重新 openDb */
let dbInstance: IDBDatabase | null = null;

function openDb(): Promise<IDBDatabase> {
  if (dbInstance) return Promise.resolve(dbInstance);
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('当前环境不支持 IndexedDB'));
      return;
    }
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => {
      dbInstance = req.result;
      // L2：连接意外关闭时清空缓存，下次 openDb 重新建立
      dbInstance.onclose = () => { dbInstance = null; };
      dbInstance.onversionchange = () => {
        dbInstance?.close();
        dbInstance = null;
      };
      resolve(dbInstance);
    };
    req.onerror = () => reject(req.error ?? new Error('打开存档数据库失败'));
  });
}

export class IndexedDbSaveRepository {
  async load(): Promise<string | null> {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const getReq = tx.objectStore(STORE).get(KEY);
      getReq.onsuccess = () => resolve(typeof getReq.result === 'string' ? getReq.result : null);
      getReq.onerror = () => reject(getReq.error ?? new Error('读取存档失败'));
    });
  }

  async save(json: string): Promise<void> {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(json, KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error('写入存档失败'));
    });
  }

  // ── T2-1: 转生层独立持久化 ──────────────────────────────

  /** 读取转生层 JSON（独立于基线层，单独存取） */
  async loadPrestige(): Promise<string | null> {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const getReq = tx.objectStore(STORE).get(KEY_PRESTIGE);
      getReq.onsuccess = () => resolve(typeof getReq.result === 'string' ? getReq.result : null);
      getReq.onerror = () => reject(getReq.error ?? new Error('读取转生层失败'));
    });
  }

  /** 仅写入转生层（转生结算之外的 prestige-only 写入用，例如商店购买解锁） */
  async savePrestige(json: string): Promise<void> {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(json, KEY_PRESTIGE);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error('写入转生层失败'));
    });
  }

  /**
   * 原子写入基线层 + 转生层——单个 IDB 事务内 put 两个键，
   * 事务全部成功才 resolve；中途崩溃（页面刷新）任一键都不会落盘（无半写态）。
   *
   * 这是 LayeredStateBackend.save 的落地点：转生重置事务 commit 时走这里，
   * 保证"基线层重置"与"转生层结算"要么一起成功、要么一起不变。
   */
  async saveBoth(baselineJson: string, prestigeJson: string): Promise<void> {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(baselineJson, KEY);
      tx.objectStore(STORE).put(prestigeJson, KEY_PRESTIGE);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error('原子写入存档失败'));
    });
  }
}
