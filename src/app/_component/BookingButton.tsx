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
  DialogDescription,
} from "@/components/ui/dialog";
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
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="absolute top-[80px] left-[200px] rounded-full text-[#EF4444] p-2 w-[44px] h-[44px] hover:w-[60px] hover:h-[60px] hover:top-[70px] hover:left-[190px] transition-all duration-300 ease-in-out">
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
              <DialogClose asChild className="w-full">
                <button
                  className="bg-black text-white rounded-xl ml-2 p-2 w-[100%] mx-auto hover:bg-zinc-700"
                  onClick={() => {
                    const existingOrderIndex = order.findIndex(
                      (item) => item.food === food.foodName
                    );
                    const existingFoodIndex = orderedFoods.findIndex(
                      (item) => item._id === food._id
                    );

                    if (existingOrderIndex !== -1) {
                      const updatedOrder = [...order];
                      updatedOrder[existingOrderIndex].quantity += quantity;
                      setOrder(updatedOrder);
                    } else {
                      setOrder([
                        ...order,
                        { food: food.foodName, quantity: quantity },
                      ]);
                    }

                    if (existingFoodIndex !== -1) {
                    } else {
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
                    }
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
