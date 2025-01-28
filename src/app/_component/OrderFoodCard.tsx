"use client";

import { Minus, Plus } from "lucide-react";
import { useSaveOrder } from "../OrderDetailContext";
import { useSaveFoods } from "../OrderFoodContext";
import { Foods } from "../types";

type Props = {
  count: number;
  setCount: Function;
};

export function OrderCard({ count, setCount }: Props) {
  const { orderedFoods, setOrderedFoods } = useSaveFoods();
  const { order, setOrder } = useSaveOrder();

  function deleteFoods(index: number) {
    const updatedFoods = orderedFoods.filter((food, i) => i !== index);
    const updatedOrder = order.filter((order, i) => i !== index);

    setOrderedFoods(updatedFoods);
    setOrder(updatedOrder);

    setCount(count - order[index].quantity);
  }

  return (
    <div className="overflow-y-scroll h-[250px]">
      {orderedFoods &&
        orderedFoods.map((food: Foods, index) => (
          <div
            className="border-b-2 border-b-black border-dashed p-2 flex gap-2 relative"
            key={food._id}
          >
            <div className="w-[80px] h-[80px] rounded-lg overflow-hidden">
              <img
                src={food?.image}
                alt="food image"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <p className="text-[#EF4444] font-bold text-sm">
                  {food.foodName}
                </p>
                <p className="text-gray-500 text-xs">
                  {food.ingredients.split(" ").slice(0, 6).join(" ")}
                  {food.ingredients.split(" ").length > 10 ? "..." : ""}
                </p>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <button
                    className="border-2 rounded-full"
                    disabled={order[index].quantity <= 0}
                    onClick={() => {
                      const newOrder = [...order];
                      newOrder[index].quantity -= 1;
                      setOrder(newOrder);
                      setCount(count - 1);
                    }}
                  >
                    <Minus />
                  </button>
                  {order[index].quantity}
                  <button
                    className="border-2 rounded-full"
                    onClick={() => {
                      const newOrder = [...order];
                      newOrder[index].quantity += 1;
                      setOrder(newOrder);
                      setCount(count + 1);
                    }}
                  >
                    <Plus />
                  </button>
                </div>
                <p className="font-bold">{food.price} $</p>
              </div>
              {/* Delete button */}
              <button
                className="absolute top-2 right-[-5px] w-6 h-6 border-2 rounded-full border-red-500 text-red-500 flex items-center justify-center"
                onClick={() => deleteFoods(index)}
              >
                x
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
