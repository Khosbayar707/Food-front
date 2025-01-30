"use client";

import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Category } from "../types";
import { useAuth } from "@clerk/nextjs";
import { useAuthFetch } from "../useFetchData";

export function Section() {
  const { getToken } = useAuth();
  const { isLoading, data: categories } = useAuthFetch("food-category");
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {categories &&
        categories.map((category: Category) => (
          <div
            key={category?._id}
            className="p-6 rounded-lg bg-white mt-[24px]"
          >
            <div className="mx-1">
              {category?.categoryName}
              <Card category={category} />
            </div>
          </div>
        ))}
    </div>
  );
}
