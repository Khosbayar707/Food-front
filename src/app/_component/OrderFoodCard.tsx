"use client";

import { Minus, Plus } from "lucide-react";
import { useSaveOrder } from "../OrderDetailContext";
import { useSaveFoods } from "../OrderFoodContext";
import { Foods } from "../types";
import { useState } from "react";

export function OrderCard() {
  const { orderedFoods, setOrderedFoods } = useSaveFoods();
  const { order, setOrder } = useSaveOrder();
  const [count, setCount] = useState(0);
  // let totalPrice = 0;

  // function handeTotalPrice() {
  //   orderedFoods.map(
  //     (food: Foods, index) =>
  //       (totalPrice += orderedFoods[index].price * order[index].quantity)
  //   );
  // }
  // handeTotalPrice();

  // async function addOrderItem() {
  //   const response = await fetch(`http://localhost:8000/food-order/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       totalPrice: totalPrice,
  //       foodOrderItems: order,
  //     }),
  //   });
  // }
  console.log("order----", order);
  return (
    <div className="overflow-y-scroll h-[300px]">
      {orderedFoods &&
        orderedFoods.map((food: Foods, index) => (
          <div
            className="border-b-2 border-b-black border-dashed p-2 flex"
            key={food._id}
          >
            <div className="w-[80px] h-[80px] rounded-lg overflow-hidden mr-2">
              <img
                src={food?.image}
                alt="food image"
                className="object-fit w-fit h-fit"
              />
            </div>
            <div>
              <div>
                <p className="text-[#EF4444] font-bold">{food.foodName}</p>
                <p className="text-sm">{food.ingredients}</p>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <button
                    className="border-2 rounded-full"
                    disabled={order[index].quantity <= 0}
                    onClick={() => {
                      order[index].quantity = order[index].quantity - 1;
                      setCount(count + 1);
                    }}
                  >
                    <Minus />
                  </button>
                  {order[index].quantity}
                  <button className="border-2 rounded-full">
                    <Plus
                      onClick={() => {
                        order[index].quantity = order[index].quantity + 1;
                        setCount(count + 1);
                      }}
                    />
                  </button>
                </div>
                <p className="font-bold">{food.price} $</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
