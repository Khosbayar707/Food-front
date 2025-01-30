"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Category } from "../types";
import { useAuth } from "@clerk/nextjs";
import { useAuthFetch } from "../useFetchData";

export function FooterCategory() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const { getToken } = useAuth();
  const { isLoading, data: categories } = useAuthFetch("food-category");
  if (isLoading) return <div>Loading...</div>;

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
              <div className="mx-1 cursor-pointer hover:text-gray-500">
                {category?.categoryName}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
