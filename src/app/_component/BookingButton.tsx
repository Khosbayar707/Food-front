"use client";

import { useState, useEffect, useContext } from "react";
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
import { Category, Foods } from "../types";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { useSaveOrder } from "../OrderDetailContext";
import { useSaveFoods } from "../OrderFoodContext";

type Props = {
  food: {
    _id: string;
    foodName: string;
    price: number;
    image: string;
    ingredients: string;
    category: string;
  };
};

export function BookingButton({ food }: Props) {
  const { order, setOrder } = useSaveOrder();
  const { orderedFoods, setOrderedFoods } = useSaveFoods();
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    async function getCategory() {
      const response = await fetch(`http://localhost:8000/food-category/`);
      const data = await response.json();
      setCategories(data);
    }
    getCategory();
  }, []);

  const [quantity, setQuantity] = useState<number>(1);

  async function addOrderItem() {
    const response = await fetch(`http://localhost:8000/food-orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: food._id,
        foodName: food.foodName,
        price: food.price,
        image: food.image,
        ingredients: food.ingredients,
        category: food.category,
      }),
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          // onClick={() => {
          //   console.log(order, "order");
          //   console.log(orderedFoods, "orderedFoods");
          // }}
          className="absolute top-[80px] left-[200px] rounded-full text-[#EF4444] p-2 w-[44px] h-[44px]"
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
            <div className="mt-11 flex justify-between">
              <div>
                <p>Total price:</p>
                <p className="font-bold text-[20px]">{food.price}</p>
              </div>
              <div>
                <div className="flex gap-2">
                  <button
                    className="border-2 rounded-full"
                    disabled={quantity <= 0}
                    onClick={() => {
                      setQuantity(quantity - 1);
                    }}
                  >
                    <Minus />
                  </button>
                  {quantity}
                  <button className="border-2 rounded-full">
                    <Plus
                      onClick={() => {
                        setQuantity(quantity + 1);
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose className="bg-black text-white rounded-2xl ml-2 p-2 w-full mx-auto">
                <button
                  onClick={() => {
                    setOrder([
                      ...order,
                      { food: food._id, quantity: quantity },
                    ]);
                    setOrderedFoods([
                      ...orderedFoods,
                      {
                        _id: food._id,
                        foodName: food.foodName,
                        price: food.price,
                        image: food.image,
                        ingredients: food.ingredients,
                        category: food.category,
                      },
                    ]);
                    // console.log("ordered foods", orderedFoods);
                    // console.log("order", order);
                  }}
                >
                  Add card
                </button>
              </DialogClose>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
