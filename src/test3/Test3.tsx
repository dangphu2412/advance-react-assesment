import { useState } from "react";
import { DrawerContainer } from "./guideline/guide-line.tsx";

type Product = {
	id: number;
	name: string;
	category: "Shoes" | "Bags" | "Accessories" | "Clothes"; // restrict to known categories
	price: number;
	age: number; // recommended age
};
// Simulate the API response
const products: Product[] = [
	{ id: 1, name: "Nike Air Zoom", category: "Shoes", price: 120, age: 18 },
	{ id: 2, name: "Adidas Classic Bag", category: "Bags", price: 80, age: 20 },
	{ id: 3, name: "Gucci Handbag", category: "Bags", price: 400, age: 25 },
	{ id: 4, name: "Jordan 1 Retro", category: "Shoes", price: 200, age: 22 },
	{ id: 5, name: "Ray-Ban Sunglasses", category: "Accessories", price: 150, age: 21 },
	{ id: 6, name: "Uniqlo T-Shirt", category: "Clothes", price: 30, age: 16 },
];

function getProducts() {
	return Promise.resolve(products);
}

export default function Test3() {
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("");
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
	const [ageRange, setAgeRange] = useState<[number, number]>([0, 100]);

	// Filter logic
	const filtered = products.filter((item) => {
		const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
		const matchesCategory = category ? item.category === category : true;
		const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
		const matchesAge = item.age >= ageRange[0] && item.age <= ageRange[1];
		return matchesSearch && matchesCategory && matchesPrice && matchesAge;
	});

	return (
		<>
			<div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
				<ProductFilters
					search={search}
					setSearch={setSearch}
					category={category}
					setCategory={setCategory}
					priceRange={priceRange}
					setPriceRange={setPriceRange}
					ageRange={ageRange}
					setAgeRange={setAgeRange}
				/>

				<ProductGrid products={filtered} />
			</div>

			<DrawerContainer />
		</>
	);
}

const ProductGrid = ({ products }: { products: Product[] }) => {
	return (
		<div className="col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{products.length === 0 ? (
				<p className="col-span-full text-gray-500">No products found 👀</p>
			) : (
				products.map((item) => <ProductCard key={item.id} item={item} />)
			)}
		</div>
	);
};

const ProductCard = ({ item }: { item: Product }) => {
	return (
		<div key={item.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
			<div className="h-32 bg-gray-100 flex items-center justify-center rounded mb-3">
				<span className="text-gray-400">Image</span>
			</div>
			<h3 className="font-semibold text-lg">{item.name}</h3>
			<p className="text-sm text-gray-600">{item.category}</p>
			<p className="text-blue-600 font-bold mt-2">${item.price}</p>
			<p className="text-xs text-gray-400">For ages {item.age}+</p>
		</div>
	);
};

type Props = {
	search: string;
	setSearch: (v: string) => void;
	category: string;
	setCategory: (v: string) => void;
	priceRange: [number, number];
	setPriceRange: (v: [number, number]) => void;
	ageRange: [number, number];
	setAgeRange: (v: [number, number]) => void;
};

export function ProductFilters({
	search,
	setSearch,
	category,
	setCategory,
	priceRange,
	setPriceRange,
	ageRange,
	setAgeRange,
}: Props) {
	return (
		<div className="col-span-1 space-y-6 bg-white p-4 rounded-lg shadow">
			{/* Search */}
			<div>
				<label className="block text-sm font-medium mb-1">Search by name</label>
				<input
					type="text"
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>

			{/* Category */}
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

			{/* Price */}
			<div>
				<label className="block text-sm font-medium mb-2">
					Price Range (${priceRange[0]} - ${priceRange[1]})
				</label>
				<div className="flex gap-4 items-center">
					<input
						type="number"
						min={0}
						value={priceRange[0]}
						onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
						className="w-20 border rounded px-2 py-1"
					/>
					<span>-</span>
					<input
						type="number"
						min={0}
						value={priceRange[1]}
						onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
						className="w-20 border rounded px-2 py-1"
					/>
				</div>
			</div>

			{/* Age */}
			<div>
				<label className="block text-sm font-medium mb-2">
					Age Range ({ageRange[0]} - {ageRange[1]})
				</label>
				<div className="flex gap-4 items-center">
					<input
						type="number"
						min={0}
						value={ageRange[0]}
						onChange={(e) => setAgeRange([+e.target.value, ageRange[1]])}
						className="w-20 border rounded px-2 py-1"
					/>
					<span>-</span>
					<input
						type="number"
						min={0}
						value={ageRange[1]}
						onChange={(e) => setAgeRange([ageRange[0], +e.target.value])}
						className="w-20 border rounded px-2 py-1"
					/>
				</div>
			</div>
		</div>
	);
}
