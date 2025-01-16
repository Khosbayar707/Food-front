"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";
import { EditFoodDialog } from "./EditFoodDialog";

type Foods = {
  _id: string;
  foodName: string;
  price: string;
  image: string;
  ingredients: string;
  category: string;
};

type Category = {
  _id: string;
  categoryName: string;
};

type Props = {
  category: Category;
};

export function Card({ category }: Props) {
  const [foods, setFoods] = useState<Foods[]>([]);
  const [newFoodName, setNewFoodName] = useState("");
  const [newPrice, setPrice] = useState("");
  const [newIngredients, setNewIngredients] = useState("");

  async function getFood() {
    const response = await fetch(`http://localhost:8000/food/${category?._id}`);
    const data = await response.json();
    setFoods(data);
  }
  async function addFoods() {
    const response = await fetch(`http://localhost:8000/food/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodName: newFoodName,
        price: newPrice,
        ingredients: newIngredients,
        category: category._id,
      }),
    });
    const data = await response.json();
    setFoods([...foods, data]);
  }

  // async function deleteFoods(id: string) {
  //   await fetch(`http://localhost:8000/food/${category?._id}`, {
  //     method: "DELETE",
  //   });
  // }

  useEffect(() => {
    getFood();
  }, []);

  return (
    <div className="flex gap-6 flex-wrap">
      <Dialog>
        <DialogTrigger className="w-[270px] h-[250px] rounded-lg border-2 border-[#EF4444] border-dashed border-spacing-[20px]">
          <div>
            <button className="rounded-full bg-[#EF4444] text-[12px] text-white">
              <Plus />
            </button>
            <p>Add new Dish to {category?.categoryName}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Add new Dish to {category?.categoryName}</DialogHeader>
          <div className="flex gap-6">
            <input
              type="text"
              placeholder="Type dish name"
              onChange={(e) => setNewFoodName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Enter price"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="List ingredients..."
              onChange={(e) => setNewIngredients(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <input
              type="file"
              placeholder="Choose a file or drag & drop it here"
              onChange={(e) => setNewIngredients(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <DialogFooter>
            <DialogClose
              className="bg-black text-white px-4 py-2 rounded ml-2"
              onClick={() => {
                addFoods();
              }}
            >
              Add Dish
            </DialogClose>
            <DialogClose className="bg-gray-300 text-black px-4 py-2 rounded ml-2">
              Cancel
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {foods &&
        foods.map((food: Foods) => (
          <div
            className="w-[270px] h-[250px] rounded-lg border-2 border-[#E4E4E7] overflow-hidden shadow-md hover:shadow-lg transition-all relative"
            key={food?._id}
          >
            <div className="w-[90%] h-[120px] rounded-lg overflow-hidden mt-[10px] ml-[13px]">
              <img
                src={food?.image}
                alt="food photo"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4 h-[90px]">
              <div className="flex justify-between">
                <p className="text-md font-semibold text-[#EF4444] truncate">
                  {food?.foodName}
                </p>
                <p className="text-sm text-gray-500">${food?.price}</p>
              </div>

              <p className="text-[12px] text-gray-600 line-clamp-2">
                {food?.ingredients}
              </p>
            </div>
            <EditFoodDialog food={food} />
          </div>
        ))}
    </div>
  );
}
