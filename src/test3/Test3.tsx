import { useEffect, useState } from "react";
import { DrawerContainer } from "./guideline/guide-line.tsx";
import { CardFilter } from "./filter/card-filter.ui.tsx";
import { FilterProvider } from "./filter/card-filter.store.tsx";
import { ProductList } from "./product/product-list.tsx";

export type Product = {
  id: number;
  name: string;
  category: "Shoes" | "Bags" | "Accessories" | "Clothes"; // restrict to known categories
  price: number;
  age: number; // recommended age
};
// Simulate the API response
const productsMock: Product[] = [
  { id: 1, name: "Nike Air Zoom", category: "Shoes", price: 120, age: 18 },
  { id: 2, name: "Adidas Classic Bag", category: "Bags", price: 80, age: 20 },
  { id: 3, name: "Gucci Handbag", category: "Bags", price: 400, age: 25 },
  { id: 4, name: "Jordan 1 Retro", category: "Shoes", price: 200, age: 22 },
  {
    id: 5,
    name: "Ray-Ban Sunglasses",
    category: "Accessories",
    price: 150,
    age: 21,
  },
  { id: 6, name: "Uniqlo T-Shirt", category: "Clothes", price: 30, age: 16 },
];

function getProducts() {
  return Promise.resolve(productsMock);
}

export default function Test3() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <FilterProvider>
      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <CardFilter />
        <ProductList products={products} />
      </div>

      <DrawerContainer />
    </FilterProvider>
  );
}
