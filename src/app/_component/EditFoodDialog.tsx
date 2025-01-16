"use client";

import { useState } from "react";
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
  _id: string;
  foodName: string;
  price: string;
  image: string;
  ingredients: string;
  category: string;
};

export function EditFoodDialog({ food }: Props) {
  const [id, setId] = useState<string>("");
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodIngredients, setNewFoodIngredients] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPrice, setPrice] = useState("");

  async function deleteFoods() {
    await fetch(`http://localhost:8000/food/${id}`, {
      method: "DELETE",
    });
  }

  async function editFoods() {
    const response = await fetch(`http://localhost:8000/food/${id}`, {
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
    const data = await response.json();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="absolute top-[80px] left-[200px] rounded-full bg-white text-[#EF4444] p-2"
          onClick={() => {
            setId(food?._id);
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
            type="text"
            placeholder="Dish Name"
            value={food?.foodName}
            onChange={(e) => setNewFoodName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <DialogFooter>
          <DialogClose>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                deleteFoods();
              }}
            >
              <Trash2 />
            </button>
          </DialogClose>
          <DialogClose
            className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
            onClick={() => {
              editFoods();
            }}
          >
            Save
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
