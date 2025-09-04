import { useState } from "react";

export default function Test3Solution() {
  const [items, setItems] = useState([
    { id: 1, value: "A" },
    { id: 2, value: "B" },
    { id: 3, value: "C" },
  ]);

  const addItem = () => {
    setItems((prev) => [{ id: Date.now(), value: "New" }, ...prev]);
  };

function removeByIndex(idx: number) {
  setItems((prevItems) => {
    const newItems = prevItems.filter((item, index) => index !== idx);
    return newItems;
  });
}
  function removeById(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div>
      <h2>Use index as key</h2>
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map((item, idx) => (
          <ListItem
            key={idx}
            value={item.value}
            onRemove={() => removeByIndex(idx)}
          />
        ))}
      </ul>

      <h2>Use id as key</h2>
      <ul>
        {items.map((item) => (
          <ListItem
            key={item.id}
            value={item.value}
            onRemove={() => removeById(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}

function ListItem({
  value,
  onRemove,
}: {
  value: string;
  onRemove: () => void;
}) {
  const [count, setCount] = useState(0);

  return (
    <li>
      {value} -{" "}
      <button onClick={() => setCount((c) => c + 1)}>Click: {count}</button>{" "}
      <button onClick={onRemove}>Remove</button>
    </li>
  );
}
