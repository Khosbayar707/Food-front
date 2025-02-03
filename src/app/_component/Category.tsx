"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { AddCategoryDialog } from "./AddCategoryDialog";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

type Category = {
  _id: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

export function Category() {
  const [categories, setCategories] = useState<Category[]>([]);
  // const searchParams = useSearchParams();
  // const category = searchParams.get("category");
  const { getToken } = useAuth();

  async function getFetchData() {
    const token = await getToken();
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food-category/`, {
      headers: {
        authentication: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }
  useEffect(() => {
    getFetchData();
  }, []);

  async function addCategory(categoryName: string) {
    const token = await getToken();
    if (!token) return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food-category/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authentication: token,
        },
        body: JSON.stringify({ categoryName }),
      }
    );
    const data = await response.json();
    setCategories([...categories, data]);
  }

  return (
    <div className="p-6 rounded-lg bg-white mt-[84px]">
      <b>Dishes category</b>
      <div className="flex flex-wrap items-center gap-2">
        <Link href={`admin`}>
          <Badge variant={"outline"}>All categories</Badge>
        </Link>
        {categories &&
          categories.map((category: Category) => (
            <Link
              href={`/admin/${category?.categoryName}?category=${category?._id}`}
              key={category?._id}
            >
              <Badge variant={"outline"} className="mx-1 cursor-pointer">
                {category?.categoryName}
              </Badge>
            </Link>
          ))}
        <div>
          <AddCategoryDialog onAddCategory={addCategory} />
        </div>
      </div>
    </div>
  );
}
