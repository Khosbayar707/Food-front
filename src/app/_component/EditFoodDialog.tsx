"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Category } from "./Category";

type Props = {
  food: {
    _id: string;
    foodName: string;
    price: string;
    image: string;
    ingredients: string;
    category: string;
  };
};

type Category = {
  _id: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

export function EditFoodDialog({ food }: Props) {
  const [newFoodName, setNewFoodName] = useState<string>(food.foodName);
  const [newFoodIngredients, setNewFoodIngredients] = useState<string>(
    food.ingredients
  );
  const [newCategory, setNewCategory] = useState<string>(food.category);
  const [newPrice, setNewPrice] = useState<string>(food.price);

  // useEffect(() => {
  //   setNewFoodName(food.foodName);
  //   setNewFoodIngredients(food.ingredients);
  //   setNewCategory(food.category);
  //   setNewPrice(food.price);
  // }, [food]);

  async function deleteFoods() {
    const response = await fetch(`http://localhost:8000/food/${food._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
    } else {
    }
  }

  async function editFoods() {
    const response = await fetch(`http://localhost:8000/food/${food._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodName: newFoodName,
        price: newPrice,
        ingredients: newFoodIngredients,
        category: newCategory,
      }),
    });

    if (response.ok) {
      const data = await response.json();
    } else {
      console.error("Failed to update the food item");
    }
  }
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    async function getCategory() {
      const response = await fetch(`http://localhost:8000/food-category/`);
      const data = await response.json();
      setCategories(data);
    }
    getCategory();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="absolute top-[80px] left-[200px] rounded-full bg-white text-[#EF4444] p-2"
          onClick={() => {
            setNewFoodName(food.foodName);
            setNewFoodIngredients(food.ingredients);
            setNewCategory(food.category);
            setNewPrice(food.price);
          }}
        >
          <Pencil />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Food</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <input
            defaultValue={newFoodName}
            onChange={(e) => setNewFoodName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Food Name"
          />
          <input
            defaultValue={newFoodIngredients}
            onChange={(e) => setNewFoodIngredients(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingredients"
          />
          <Select value={newCategory} onValueChange={setNewCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              {categories &&
                categories.map((category: Category) => (
                  <SelectItem value={category._id} key={category?._id}>
                    {category?.categoryName}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <input
            defaultValue={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Price"
          />
        </div>
        <DialogFooter>
          <DialogClose>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => {
                deleteFoods();
              }}
            >
              <Trash2 />
            </button>
          </DialogClose>
          <DialogClose
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            onClick={async () => {
              await editFoods();
            }}
          >
            Save
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
