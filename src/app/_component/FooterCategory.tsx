"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Category } from "../types";

export function FooterCategory() {
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
    <div>
      <div className="text-white"></div>
      <div className="grid grid-cols-2 gap-4">
        {categories &&
          categories.map((category: Category) => (
            <Link
              href={`/admin/${category?.categoryName}?category=${category?._id}`}
              key={category?._id}
            >
              <div className="mx-1 cursor-pointer">
                {category?.categoryName}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
