const DB_NAME = "taskDB";
export const TASK_STORE = "tasks";
const QUEUE_STORE = "queue";

export function openDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains(TASK_STORE)) db.createObjectStore(TASK_STORE, { keyPath: "id" });
            if (!db.objectStoreNames.contains(QUEUE_STORE)) db.createObjectStore(QUEUE_STORE, { keyPath: "id", autoIncrement: true });
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export async function put(store: string, value: any) {
    const db = await openDB();
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).put(value);
    return tx.commit();
}

export async function getAll(store: string) {
    const db = await openDB();
    return new Promise<any[]>((resolve, reject) => {
        const tx = db.transaction(store, "readonly");
        const req = tx.objectStore(store).getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}
