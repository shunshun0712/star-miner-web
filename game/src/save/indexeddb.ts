const DB_NAME = 'star-miner-save';
const STORE = 'saves';
const KEY = 'main';

function openDb(): Promise<IDBDatabase> {
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
    req.onsuccess = () => resolve(req.result);
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
