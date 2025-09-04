/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

export type FilterContextType = {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minAge: number;
  maxAge: number;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setMinAge: (age: number) => void;
  setMaxAge: (age: number) => void;
};

export const FilterContext = createContext<FilterContextType>({
  search: "",
  category: "",
  minPrice: 0,
  maxPrice: 0,
  minAge: 0,
  maxAge: 0,
  setSearch: () => {},
  setCategory: () => {},
  setMinPrice: () => {},
  setMaxPrice: () => {},
  setMinAge: () => {},
  setMaxAge: () => {},
});

export function useFilter() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }: PropsWithChildren) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);
  return (
    <>
      <FilterContext.Provider
        value={{
          search,
          category,
          minPrice,
          maxPrice,
          minAge,
          maxAge,
          setSearch,
          setCategory,
          setMinPrice,
          setMaxPrice,
          setMinAge,
          setMaxAge,
        }}
      >
        {children}
      </FilterContext.Provider>
    </>
  );
}
