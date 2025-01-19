"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { EditFoodDialog } from "@/app/_component/EditFoodDialog";
import { Foods } from "@/app/types";

export default function CategoryPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const query = searchParams.get("category") || id;
  const [foods, setFoods] = useState<Foods[]>([]);

  useEffect(() => {
    async function fetchFoods() {
      const response = await fetch(
        `http://localhost:8000/food?category=${query}`
      );
      const data = await response.json();
      setFoods(data);
    }
    if (query) fetchFoods();
  }, [query]);

  return (
    <div className="p-6 rounded-lg bg-white mt-[84px]">
      <h2 className="text-xl font-bold">Category dishes</h2>
      <Link href="/admin">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Back to Categories
        </button>
      </Link>
      <div className="flex flex-wrap justify-center gap-4 mt-4 mx-auto">
        {foods &&
          foods.map((food: Foods) => (
            <div
              className="w-[270px] h-[250px] rounded-lg border-2 border-[#E4E4E7] overflow-hidden shadow-md hover:shadow-lg transition-all relative"
              key={food?._id}
            >
              <div className="w-[90%] h-[120px] rounded-lg overflow-hidden mt-[10px] ml-[13px]">
                <img
                  src={food?.image}
                  alt="food photo"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4 h-[90px]">
                <div className="flex justify-between">
                  <p className="text-md font-semibold text-[#EF4444] truncate">
                    {food?.foodName}
                  </p>
                  <p className="text-sm text-gray-500">${food?.price}</p>
                </div>

                <p className="text-[12px] text-gray-600 line-clamp-2">
                  {food?.ingredients}
                </p>
              </div>
              <EditFoodDialog food={food} />
            </div>
          ))}
      </div>
    </div>
  );
}
