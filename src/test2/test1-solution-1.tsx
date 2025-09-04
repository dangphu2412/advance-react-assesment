import { useState } from "react";

type Card = {
  id: number;
  name: string;
  description: string;
  tags: string[];
};

export default function AddCardForm({
  onAddCard,
}: {
  onAddCard: (card: Card) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: Card = {
      id: Date.now(),
      name,
      description,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    onAddCard(newCard);
    setOpen(false);
    setName("");
    setDescription("");
    setTags("");
  };

  if (!open) {
    return (
      <div
        className="border border-black rounded p-4 flex flex-col gap-2"
        onClick={() => setOpen(true)}
      >
        <span className="text-2xl flex justify-center items-center">+</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-black rounded p-4 flex flex-col gap-3 col-span-2"
    >
      <input
        className="border p-2 rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className="border p-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <button type="button" onClick={() => setOpen(false)}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
