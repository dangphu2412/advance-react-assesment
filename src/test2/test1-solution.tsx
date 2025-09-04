import { useState } from "react";
import { createPortal } from "react-dom";
import type { Card } from "./Test2";

export function AddCardModal({ setCards,cards, setIsAddCardModalOpen }: { setCards: (cards: Card[]) => void, cards: Card[], setIsAddCardModalOpen: (isAddCardModalOpen: boolean) => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleAddCard = () => {
    setCards([...cards, { id: cards[cards.length - 1].id + 1, name, description, tags: tags.split(',') }]);
    setName('');
    setDescription('');
    setTags('');
    setIsAddCardModalOpen(false);
  }

  return createPortal(
      <>
        <div onClick={() => setIsAddCardModalOpen(false)} className="fixed top-0 left-0 w-full h-full bg-[#000000a3] bg-opacity-50 flex justify-center items-center">
          <div onClick={(e) => e.stopPropagation()} className="bg-white p-4 rounded-lg flex flex-col gap-2">
            <h1>Add Card</h1>
            <input className="border border-gray-300 rounded p-2" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="border border-gray-300 rounded p-2" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input className="border border-gray-300 rounded p-2" type="text" placeholder="Tags" value={tags} onChange={(e) => setTags(e.target.value)} />
            <button className="border border-gray-300 rounded p-2" onClick={handleAddCard}>Add</button>
            <button className="border border-gray-300 rounded p-2" onClick={() => setIsAddCardModalOpen(false)}>Cancel</button>
          </div>
        </div>
      </>,
      document.body
    )
}