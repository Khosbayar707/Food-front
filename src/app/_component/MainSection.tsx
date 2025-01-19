"use client";

import { useEffect, useState } from "react";

import { MainCard } from "./MainCard";

type Category = {
  _id: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

export function MainSection() {
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
    const foodName = prompt("Enter meal name");
    const response = await fetch(`http://localhost:8000/food/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodName }),
    });
    const data = await response.json();
    setCategories([...categories, data]);
  }
  return (
    <div>
      {categories &&
        categories.map((category: Category) => (
          <div className="py-2 px-6 rounded-lg font-bold">
            <div key={category?._id} className="mx-1">
              <h1 className="text-white my-4">{category?.categoryName}</h1>
              <MainCard category={category} />
            </div>
          </div>
        ))}
    </div>
  );
}
