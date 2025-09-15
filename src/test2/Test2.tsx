import {useEffect, useState} from "react";
import {Header} from "../shared/header.tsx";
import {openDB} from "./db.ts";
import {getTasks, type Task} from "./api.ts";
import {createPortal} from "react-dom";

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
    const [cards, setTasks] = useState<Card[]>(data);
    const tagToColor = {
        'red': 'border-red-500',
        'blue': 'border-blue-500',
        'green': 'border-green-500',
        'yellow': 'border-yellow-500',
    }

    useEffect(() => {
        (async () => {
            openDB()
            const stored = await getTasks();
            setTasks(stored);
        })();
    }, []);

    return <div className={'w-[600px] grid grid-cols-2 gap-4 border border-gray-300 p-4 mx-auto mt-4'}>
        <Header>
            This is test2
        </Header>

        <div className={'col-span-2 grid grid-cols-2 gap-2'}>
            {cards.map((card, index) => {
                return <div className={'border border-black rounded p-4 flex flex-col gap-2'} key={index}>
                    <div className={'flex justify-between'}>
                        {card.name}
                        <span className={'border rounded w-8 text-center cursor-pointer'}>
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

            <AddCard />
        </div>
    </div>
}

function AddCard() {
    const [isOpen, setIsOpen] = useState(false);

    return <>
        <div className={'border border-black rounded p-4 flex flex-col gap-2 hover:bg-gray-500'} onClick={() => setIsOpen(!isOpen)}>
            <span className={'text-2xl cursor-pointer w-full h-full flex justify-center items-center'}>+</span>
        </div>

        {isOpen && (
            <TaskPortal onClose={() => setIsOpen(false)} onSave={() => {}}/>
        )}
    </>
}

type TaskPortalProps = { onClose: () => void, onSave: (task: Task) => void };
function TaskPortal({ onClose, onSave }: TaskPortalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");

    const handleSave = () => {
        const task: Task = {
            id: Date.now(),
            name,
            description,
            tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        };
        onSave(task);
        onClose();
        setName("");
        setDescription("");
        setTags("");
    };

    return createPortal(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[400px]">
                <h2 className="text-lg font-semibold mb-4">Add Task</h2>

                <label className="block mb-2">
                    <span className="text-sm">Name</span>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-2 py-1 rounded mt-1"
                        placeholder="Task name"
                    />
                </label>

                <label className="block mb-2">
                    <span className="text-sm">Description</span>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border px-2 py-1 rounded mt-1"
                        placeholder="Task description"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-sm">Tags (comma separated)</span>
                    <input
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full border px-2 py-1 rounded mt-1"
                        placeholder="work, urgent, personal"
                    />
                </label>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
