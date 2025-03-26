"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Category } from "../types";
import { useAuthFetch } from "../useFetchData";
import { useAuth } from "@clerk/nextjs";

export function MainCategory() {
  // const searchParams = useSearchParams();
  // const category = searchParams.get("category");

  // const { isLoading, data: categories } = useAuthFetch("food-category");
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
      <div className="flex flex-wrap justify-center p-6">
        <div className="text-white">
          <ChevronLeft />
        </div>
        {data &&
          data.map((category: Category) => (
            <Link
              href={`/${category?.categoryName}?category=${category?._id}`}
              key={category?._id}
            >
              <Badge variant={"secondary"} className="mx-1 cursor-pointer">
                {category?.categoryName}
              </Badge>
            </Link>
          ))}
        <div className="text-white">
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}
