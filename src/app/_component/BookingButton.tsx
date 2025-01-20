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
import { Category } from "../types";

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

export function BookingButton({ food }: Props) {
  const [newFood, setFood] = useState(food);
  const [newFoodName, setNewFoodName] = useState<string>(food.foodName);
  const [newFoodIngredients, setNewFoodIngredients] = useState<string>(
    food.ingredients
  );
  const [newCategory, setNewCategory] = useState<string>(food.category);
  const [newPrice, setNewPrice] = useState<string>(food.price);
  const [newImage, setNewImage] = useState<string>(food.image);

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
        image: newImage,
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

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "food-delivery");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dpyjpkzqg/upload`,
          { method: "POST", body: data }
        );

        const dataJson = await response.json();
        console.log("Cloudinary Response:", dataJson);

        if (dataJson.secure_url) {
          setNewImage(dataJson.secure_url);
        } else {
          console.error("Image upload failed:", dataJson);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="absolute top-[80px] left-[200px] rounded-full text-[#EF4444] p-2 w-[44px] h-[44px]"
          onClick={() => {
            setNewFoodName(food.foodName);
            setNewFoodIngredients(food.ingredients);
            setNewCategory(food.category);
            setNewPrice(food.price);
            setNewImage(food.image);
          }}
        >
          <img
            src="/assets/BookingButton.svg"
            alt="logo"
            className="object-cover w-full h-full"
          />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose meal</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex gap-8">
          <div>
            <img
              src={food?.image}
              alt="food photo"
              className="object-cover w-[364px] h-[200px] rounded-lg"
            />
          </div>
          <div>
            <p className="text-[#EF4444] text-[22px] font-bold">
              {food.foodName}
            </p>
            <p className="text-[13px]">{food.ingredients}</p>
            <div className="mt-11">
              <p>Total price:</p>
              <p className="font-bold text-[20px]">{food.price}</p>
              <DialogFooter>
                <DialogClose
                  className="bg-black text-white rounded-2xl ml-2 p-2 w-full mx-auto"
                  onClick={async () => {
                    await editFoods();
                  }}
                >
                  Add card
                </DialogClose>
              </DialogFooter>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
