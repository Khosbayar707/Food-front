"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

type Category = {
  _id: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

export function Category() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function getCategory() {
      const response = await fetch(`http://localhost:8000/food-category/`);
      const data = await response.json();
      setCategories(data);
      //   console.log(category);
    }
    getCategory();
  }, []);

  async function addCategry() {
    const categoryName = prompt("Enter category name");
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
        {categories &&
          categories.map((category: Category) => (
            <Badge variant={"outlined"} key={category?._id} className="mx-1">
              {category?.categoryName}
            </Badge>
          ))}
        <button
          className="rounded-full bg-red-500 text-[12px] text-white "
          onClick={addCategry}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}
