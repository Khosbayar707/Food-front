"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Category } from "../types";
import { useAuth } from "@clerk/nextjs";

export function MainCategory() {
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

  return (
    <div>
      <div className="flex flex-wrap justify-center p-6">
        <div className="text-white">
          <ChevronLeft />
        </div>
        {categories &&
          categories.map((category: Category) => (
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
