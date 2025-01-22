"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Category } from "../types";
import { useAuth } from "@clerk/nextjs";

export function FooterCategory() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

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
              href={`/${category?.categoryName}?category=${category?._id}`}
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
