"use client";
import { useEffect, useState } from "react";

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

export function MainCard({ category }: Props) {
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
  }, [foods]);

  return (
    <div className="flex flex-wrap gap-6 justify-center items-center mx-auto">
      {foods &&
        foods.map((food: Foods) => (
          <div
            className="w-[270px] h-[250px] rounded-lg border-2 border-[#E4E4E7] overflow-hidden shadow-md hover:shadow-lg transition-all relative bg-white"
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
            {/* <EditFoodDialog food={food} /> */}
          </div>
        ))}
    </div>
  );
}