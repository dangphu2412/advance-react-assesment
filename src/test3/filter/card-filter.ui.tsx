import { useRef } from "react";
import { useFilter } from "./card-filter.store";

export function CardFilter() {
  const { minPrice, maxPrice, minAge, maxAge, setMinPrice, setMaxPrice, setMinAge, setMaxAge } = useFilter();
  return (
    <div className="col-span-1 space-y-6 bg-white p-4 rounded-lg shadow">
      <Search />
      <Category />
      <Range label="Price Range" minPlaceholder="0" maxPlaceholder="500" minValue={minPrice} maxValue={maxPrice} setMinValue={setMinPrice} setMaxValue={setMaxPrice} />
      <Range label="Age Range" minPlaceholder="0" maxPlaceholder="100" minValue={minAge} maxValue={maxAge} setMinValue={setMinAge} setMaxValue={setMaxAge} />
    </div>
  );
}


function Search() {
  const { setSearch } = useFilter();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
  };
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Search by name</label>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
}

function Range({ label, minPlaceholder, maxPlaceholder, minValue, maxValue, setMinValue, setMaxValue }: { label: string, minPlaceholder: string, maxPlaceholder: string, minValue: number, maxValue: number, setMinValue: (price: number) => void, setMaxValue: (price: number) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} (${minPlaceholder} - ${maxPlaceholder})
      </label>
      <div className="flex gap-4 items-center">
        <input type="number" min={0} placeholder={minPlaceholder} className="w-20 border rounded px-2 py-1" value={minValue} onChange={(e) => setMinValue(Number(e.target.value))} />
        <span>-</span>
        <input type="number" min={0} placeholder={maxPlaceholder} className="w-20 border rounded px-2 py-1" value={maxValue} onChange={(e) => setMaxValue(Number(e.target.value))} />
      </div>
    </div>
  )
}

function Category() {
  const { category, setCategory } = useFilter();
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Category</label>
      <div className="flex gap-3 flex-wrap">
        {["Shoes", "Bags", "Accessories", "Clothes"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(category === cat ? "" : cat)}
            className={`px-4 py-2 rounded-md border ${
              category === cat
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
