import { useCallback, useMemo } from "react";
import { useFilter } from "../filter/card-filter.store";
import type { Product } from "../Test3"

export function ProductList({products}: {products: Product[]}) {
    const {search, category, minPrice, maxPrice, minAge, maxAge} = useFilter();

    const priceFilter = useCallback((item: Product) => {
      if (minPrice === 0 && maxPrice === 0)
        return true;

      if (maxPrice === 0)
        return item.price >= minPrice;

        return item.price >= minPrice && item.price <= maxPrice;
    }, [minPrice, maxPrice]);

    const ageFilter = useCallback((item: Product) => {
        if (minAge === 0 && maxAge === 0)
            return true;

        if (maxAge === 0)
            return item.age >= minAge;

        return item.age >= minAge && item.age <= maxAge;
    }, [minAge, maxAge]);

    const filteredCallback = useCallback((item: Product) => {
        return item.name.toLowerCase().includes(search.toLowerCase()) &&
            item.category.toLowerCase().includes(category.toLowerCase()) &&
            priceFilter(item) &&
            ageFilter(item);
    }, [search, category, priceFilter, ageFilter]);
  
    const filtered = useMemo(() => products.filter(filteredCallback), [products, filteredCallback]);
    
    return (
      <div className="col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.length === 0 ? (
        <p className="col-span-full text-gray-500">No products found 👀</p>
      ) : (
        filtered.map((item: Product) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <div className="h-32 bg-gray-100 flex items-center justify-center rounded mb-3">
              <span className="text-gray-400">Image</span>
            </div>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.category}</p>
            <p className="text-blue-600 font-bold mt-2">${item.price}</p>
            <p className="text-xs text-gray-400">For ages {item.age}+</p>
          </div>
        ))
      )}
    </div>
    )
}