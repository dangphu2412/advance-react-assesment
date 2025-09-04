import { createPortal } from "react-dom";
import { useState } from "react";

type Item = {
  id: number;
  name: string;
  description: string;
  tags: string[];
};

type ItemModal = {
  onClose: () => void;
  onSubmit: (item: Item) => void;
};

export function Test2Solution({ onClose, onSubmit }: ItemModal) {
  const [form, setForm] = useState<Item>({
    id: Date.now(),
    name: "",
    description: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  const addTag = () => {
    if (tagInput.trim() !== "") {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg min-w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Fill Item Data</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <textarea
            className="border p-2 rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="flex gap-2">
            <input
              className="border p-2 rounded flex-1"
              placeholder="Add tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              type="button"
              onClick={addTag}
              className="px-3 bg-green-500 text-white rounded"
            >
              Add
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {form.tags.map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-gray-200 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
}
