"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Category } from "../types";
import { useAuth } from "@clerk/nextjs";
import { useAuthFetch } from "../useFetchData";

export function MainCategory() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const { getToken } = useAuth();
  const { isLoading, data: categories } = useAuthFetch("food-category");
  if (isLoading) return <div>Loading...</div>;

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
