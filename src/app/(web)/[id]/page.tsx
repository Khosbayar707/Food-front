"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Foods } from "@/app/types";
import { MainCategory } from "@/app/_component/MainCategory";
import { BookingButton } from "@/app/_component/BookingButton";
import { useAuth } from "@clerk/nextjs";
//
export default function CategoryPage() {
  const { getToken } = useAuth();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const query: string | null = searchParams.get("category");
  const [foods, setFoods] = useState<Foods[]>([]);

  useEffect(() => {
    async function fetchFoods() {
      const token = await getToken();
      if (!token) return;
      const response = await fetch(`http://localhost:8000/food/${query}`, {
        headers: {
          "Content-Type": "application/json",
          authentication: token,
        },
      });
      const data = await response.json();
      setFoods(data);
    }
    if (query) fetchFoods();
  }, [query]);

  return (
    <div className="bg-[#404040]">
      <div className="w-screen h-auto overflow-hidden">
        <img
          src="/assets/BG.jpg"
          alt="logo"
          className="object-cover w-full h-full"
        />
      </div>
      <MainCategory />
      <div className="p-6 rounded-lg">
        <h2 className="text-xl font-bold text-white">Category dishes</h2>
        <div className="flex flex-wrap justify-center gap-4 my-4 mx-auto">
          {foods &&
            foods.map((food: Foods) => (
              <div
                className="w-[270px] h-[250px] rounded-lg bg-white border-2 border-[#E4E4E7] overflow-hidden shadow-md hover:shadow-lg transition-all relative"
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
                <BookingButton food={food} />
              </div>
            ))}
        </div>
        <Link href="/">
          <button className="text-white px-4 py-2 rounded mt-2 bg-primary hover:bg-white hover:text-black">
            Back to Main Page
          </button>
        </Link>
      </div>
    </div>
  );
}
