import { useEffect, useState } from "react";

type Foods = {
  _id: string;
  foodName: String;
  price: number;
  image: string;
  ingredients: String;
  category: string;
};

type Props = {
  _id: string;
  id: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

export function Card(props: Props) {
  const [foods, setFoods] = useState<Foods[]>([]);

  useEffect(() => {
    async function getFood() {
      const response = await fetch(`http://localhost:8000/food/${props?.id}`);
      const data = await response.json();
      setFoods(data);
    }
    getFood();
  }, []);
  return (
    <div className="flex gap-6 flex-wrap">
      {foods &&
        foods.map((food: Foods) => (
          <div
            className="w-[270px] h-[250px] rounded-lg border-2 border-[#E4E4E7] overflow-hidden shadow-md hover:shadow-lg transition-all"
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
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {food?.foodName}
              </h3>
              <p className="text-sm text-gray-500">Price: ${food?.price}</p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {food?.ingredients}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
