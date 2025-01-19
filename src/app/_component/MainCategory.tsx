"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Category } from "../types";

export function MainCategory() {
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
      <div className="flex flex-wrap justify-center p-6">
        <div className="text-white">
          <ChevronLeft />
        </div>
        {categories &&
          categories.map((category: Category) => (
            <Link
              href={`/admin/${category?.categoryName}?category=${category?._id}`}
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
