"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="var(--radiusrounded-xl) var(--spacing6) p-6">
      <h1>Dishes category</h1>
      <div>
        {categories &&
          categories.map((category: Category) => (
            <Badge variant="outline" key={category._id}>
              {category.categoryName}
            </Badge>
          ))}
      </div>
    </div>
  );
}
