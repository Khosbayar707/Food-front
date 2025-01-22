"use client";

import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Category } from "../types";
import { useAuth } from "@clerk/nextjs";

export function Section() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { getToken } = useAuth();

  async function getCategory() {
    const token = await getToken();
    const response = await fetch(`http://localhost:8000/food-category/`, {
      headers: { authentication: token },
    });
    const data = await response.json();
    setCategories(data);
  }

  useEffect(() => {
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
          <div className="p-6 rounded-lg bg-white mt-[24px]">
            <div key={category?._id} className="mx-1">
              {category?.categoryName}
              <Card category={category} />
            </div>
          </div>
        ))}
    </div>
  );
}
