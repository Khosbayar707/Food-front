"use client";

import { MainCard } from "./MainCard";
import { Category } from "../types";
import { useAuth } from "@clerk/nextjs";
import { useAuthFetch } from "../useFetchData";
import { useEffect, useState } from "react";

export function MainSection() {
  const { getToken } = useAuth();
  const [data, setData] = useState([]);
  async function getFetchData() {
    const token = await getToken();
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/$food-category`, {
        method: "GET",
        headers: {
          authentication: token,
        },
      })
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }
  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <div>
      {data &&
        data.map((category: Category) => (
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
