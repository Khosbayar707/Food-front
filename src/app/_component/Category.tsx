"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { AddCategoryDialog } from "./AddCategoryDialog";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Section } from "./Section";

type Category = {
  _id: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

export function Category() {
  const [categories, setCategories] = useState<Category[]>([]);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  useEffect(() => {
    async function getCategory() {
      const response = await fetch(`http://localhost:8000/food-category/`);
      const data = await response.json();
      setCategories(data);
    }
    getCategory();
  }, []);

  async function addCategory(categoryName: string) {
    const response = await fetch(`http://localhost:8000/food-category/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName }),
    });
    const data = await response.json();
    setCategories([...categories, data]);
  }

  return (
    <div className="p-6 rounded-lg bg-white mt-[84px]">
      <b>Dishes category</b>
      <div className="flex-wrap">
        <Link href={`admin`}>
          <Badge variant={"outline"}>All categories</Badge>
        </Link>
        {categories &&
          categories.map((category: Category) => (
            <Link
              href={`/admin/${category?.categoryName}?category=${category?._id}`}
            >
              <Badge
                variant={"outline"}
                key={category?._id}
                className="mx-1 cursor-pointer"
              >
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
