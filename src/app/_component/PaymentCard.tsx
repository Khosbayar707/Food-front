"use client";

import { Minus, Plus } from "lucide-react";
import { useSaveOrder } from "../OrderDetailContext";
import { useSaveFoods } from "../OrderFoodContext";
import { Foods } from "../types";
import { useState } from "react";

type Props = {
  totalPrice: number;
};

export function PaymentCard({ totalPrice }: Props) {
  const { orderedFoods, setOrderedFoods } = useSaveFoods();
  const { order, setOrder } = useSaveOrder();
  const [count, setCount] = useState(0);

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

  return (
    <div className="h-[200px]">
      <div className="p-2">
        <div>
          <div>
            <div className="flex py-4 justify-between">
              <p>Items</p>
              <p>{totalPrice} $</p>
            </div>
            <div className="flex py-2 justify-between border-b-2 border-b-black border-dashed">
              <p>Shipping </p>
              <p>0.99 $</p>
            </div>
            <div className="flex py-4 justify-between">
              <p>Total</p>
              <p>{(totalPrice += 0.99)} $</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
