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
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";

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

export function EditFoodDialog({ food }: Props) {
  // Initialize state for form fields
  const [newFoodName, setNewFoodName] = useState<string>(food.foodName);
  const [newFoodIngredients, setNewFoodIngredients] = useState<string>(
    food.ingredients
  );
  const [newCategory, setNewCategory] = useState<string>(food.category);
  const [newPrice, setNewPrice] = useState<string>(food.price);

  useEffect(() => {
    // Reset fields when food prop changes (if needed)
    setNewFoodName(food.foodName);
    setNewFoodIngredients(food.ingredients);
    setNewCategory(food.category);
    setNewPrice(food.price);
  }, [food]);

  // Handle deleting the food item
  async function deleteFoods() {
    const response = await fetch(`http://localhost:8000/food/${food._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      // Handle success, maybe show a success message or close the dialog
    } else {
      // Handle error
    }
  }

  // Handle editing the food item
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
      // You can do something with the response (e.g., close the dialog)
    } else {
      // Handle error
      console.error("Failed to update the food item");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="absolute top-[80px] left-[200px] rounded-full bg-white text-[#EF4444] p-2"
          onClick={() => {
            // No need to set the id in state
          }}
        >
          <Pencil />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Food</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <input
            value={newFoodName}
            onChange={(e) => setNewFoodName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Food Name"
          />
          <input
            value={newFoodIngredients}
            onChange={(e) => setNewFoodIngredients(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingredients"
          />
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Category"
          />
          <input
            value={newPrice}
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
              // You can close the dialog after successfully updating the food item
            }}
          >
            Save
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
