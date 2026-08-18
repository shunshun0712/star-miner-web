const DB_NAME = 'star-miner-save';
const STORE = 'saves';
const KEY = 'main';

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
}
