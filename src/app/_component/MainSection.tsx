"use client";

import { MainCard } from "./MainCard";
import { Category } from "../types";
import { useAuth } from "@clerk/nextjs";
import { useAuthFetch } from "../useFetchData";

export function MainSection() {
  const { isLoading, data: categories } = useAuthFetch("food-category");
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {categories &&
        categories.map((category: Category) => (
          <div key={category?._id} className="py-2 px-6 rounded-lg font-bold">
            <div className="mx-1 my-2">
              <div className="text-white my-4 w-[90%] mx-auto text-xl hover:text-grey">
                {category?.categoryName}
              </div>
              <MainCard category={category} />
            </div>
          </div>
        ))}
    </div>
  );
}
