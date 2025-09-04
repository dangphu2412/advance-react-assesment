import { useEffect, useState } from "react";
import { Header } from "../shared/header.tsx";
import { createPortal } from "react-dom";

type Card = {
    id: number;
    name: string;
    description: string;
    tags: string[];
}
const data: Card[] = [
    {
        id: 1,
        name: 'Top 1',
        description: 'This is short',
        tags: ['red', 'blue', 'green', 'yellow'],
    },
    {
        id: 2,
        name: 'Delimiter',
        description: 'Represent for minus characters',
        tags: ['red', 'yellow'],
    },
    {
        id: 3,
        name: 'Facilitator',
        description: 'Is the person who contribute to the most of discussion',
        tags: ['blue', 'red'],
    }
]

export default function Test2() {
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [cards, setCards] = useState<Card[]>([]);
    const tagToColor = {
        'red': 'border-red-500',
        'blue': 'border-blue-500',
        'green': 'border-green-500',
        'yellow': 'border-yellow-500',
    }

    useEffect(() => {
        const DB = window.indexedDB.open('CardsDB', 1);
        DB.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains('cards')) {
                const syncStore = db.createObjectStore('sync', { keyPath: 'id' });
                syncStore.createIndex('id', 'id', { unique: true });

                const objectStore = db.createObjectStore('cards', { keyPath: 'id' });
                objectStore.createIndex('id', 'id', { unique: true });
                syncStore.transaction.oncomplete = () => {
                    const syncObjectStore = db.transaction('sync', 'readwrite').objectStore('sync');
                    syncObjectStore.add({ id: 1, hasChanged: 0 });
                }
            }
        };

        DB.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const syncStore = db.transaction('sync', 'readonly').objectStore('sync');
            const syncRequest = syncStore.get(1);
            syncRequest.onsuccess = (e) => {
                const result = (e.target as IDBRequest).result;
                if (!result?.hasChanged) return;

                const objectStore = db.transaction('cards', 'readonly').objectStore('cards');
                const request = objectStore.getAll();

                request.onsuccess = (event) => {
                    const result = (event.target as IDBRequest).result;
                    setCards(result);

                    result.forEach((card: Card) => {
                        objectStore.delete(card.id);
                    });
                };
            }
        }

        if (navigator.onLine) setCards(data);

        window.addEventListener('online', () => {
            const syncStore = DB.result.transaction('sync', 'readwrite').objectStore('sync');
            const syncRequest = syncStore.get(1);
            syncRequest.onsuccess = (e) => {
                const result = (e.target as IDBRequest).result;
                if (result?.hasChanged) {
                    alert('Data changed while offline, syncing now...');
                }
                const objectStore = DB.result.transaction('cards', 'readonly').objectStore('cards');
                const request = objectStore.getAll();

                request.onsuccess = (event) => {
                    const result = (event.target as IDBRequest).result;
                    alert('Syncing data:\n' + JSON.stringify(result, null, 2));

                    result.forEach((card: Card) => {
                        objectStore.delete(card.id);
                    });
                    syncStore.put({ id: 1, hasChanged: 0 });
                };
            }
        });

        window.addEventListener('offline', () => {
            const objectStore = DB.result.transaction('cards', 'readwrite').objectStore('cards');
            cards.forEach((card) => {
                objectStore.add(card);
            });
        });
    }, [])

    function handleCreate(data: { id: number; name: string; description: string; tags: string[] }) {
        setCards([...cards, { ...data }]);
        if (navigator.onLine) return;
        const DB = window.indexedDB.open('CardsDB', 1);
        DB.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const objectStore = db.transaction('cards', 'readwrite').objectStore('cards');
            objectStore.add(data);
            const syncStore = db.transaction('sync', 'readwrite').objectStore('sync');
            const syncRequest = syncStore.get(1);
            syncRequest.onsuccess = (e) => {
                const result = (e.target as IDBRequest).result;
                if (result) {
                    syncStore.put({ id: 1, hasChanged: 1 });
                } else {
                    syncStore.add({ id: 1, hasChanged: 1 });
                }
            }
        }
    }

    function handleDelete(id: number) {
        setCards(cards.filter((card) => card.id !== id));
        if (navigator.onLine) return;
        const DB = window.indexedDB.open('CardsDB', 1);
        DB.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const transaction = db.transaction('cards', 'readwrite');
            const objectStore = transaction.objectStore('cards');
            objectStore.delete(id);

            const syncStore = db.transaction('sync', 'readwrite').objectStore('sync');
            const syncRequest = syncStore.get(1);
            syncRequest.onsuccess = (e) => {
                const result = (e.target as IDBRequest).result;
                if (result) {
                    syncStore.put({ id: 1, hasChanged: 1 });
                } else {
                    syncStore.add({ id: 1, hasChanged: 1 });
                }
            }
        }
    }

    return <div className={'w-[600px] grid grid-cols-2 gap-4 border border-gray-300 p-4 mx-auto mt-4'}>
        <Header>
            This is test2
        </Header>

        {isShowPopup && createPortal(
            <Popup onClose={() => { setIsShowPopup(false); }} onCreate={handleCreate} />,
            document.body
        )}

        <div className={'col-span-2 grid grid-cols-2 gap-2'}>
            {cards.map((card) => {
                return <div className={'border border-black rounded p-4 flex flex-col gap-2'} key={card.id}>
                    <div className={'flex justify-between'}>
                        {card.name}
                        <span className={'border rounded w-8 text-center cursor-pointer'} onClick={() => handleDelete(card.id)}>
                            -
                        </span>
                    </div>

                    <div>
                        {card.description}
                    </div>

                    <div className={'flex gap-2'}>
                        {card.tags.map((tag) => {
                            return <span className={`border px-2 py-1 rounded ${tagToColor[tag as (keyof typeof tagToColor)] ?? 'border-black'}`} key={tag}>{tag}</span>;
                        })}
                    </div>
                </div>
            })}

            <AddCard onClick={() => { setIsShowPopup(true); }} />
        </div>
    </div>
}

function AddCard({ onClick }: { onClick: () => void }) {
    return <div className={'border border-black rounded p-4 flex flex-col gap-2 hover:bg-gray-500'} onClick={onClick}>
        <span className={'text-2xl cursor-pointer w-full h-full flex justify-center items-center'}>+</span>
    </div>
}

function Popup({
    onClose,
    onCreate,
}: {
    onClose: () => void;
    onCreate: (data: { id: number; name: string; description: string; tags: string[] }) => void;
}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const handleCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onCreate({
            id: (new Date()).getTime(),
            name,
            description,
            tags
        });
        setName('');
        setDescription('');
        setTags([]);
        onClose();
    };

    return <>
        <form className={'fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center'} onClick={onClose}>
            <div className={'bg-white p-4 rounded w-[400px] grid grid-cols-2 gap-4'} onClick={(e) => e.stopPropagation()}>
                <label htmlFor={'name'}>Name</label>
                <input className={'border border-solid'} id={'name'} name={'name'} placeholder={'Type name'} value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor={'description'}>Description</label>
                <input className={'border border-solid'} id={'description'} name={'description'} placeholder={'Type description'} value={description} onChange={(e) => setDescription(e.target.value)} />

                <label htmlFor={'tags'}>Tags</label>
                <input className={'border border-solid'} id={'tags'} name={'tags'} placeholder={'Type tags (comma separated)'} value={tags.join(', ')} onChange={(e) => setTags(e.target.value.split(', ').map(tag => tag.trim()))} />

                <button className={'border rounded col-span-2 cursor-pointer p-2'} type="submit" onClick={handleCreate}>
                    Create
                </button>
            </div>
        </form>
    </>;
}