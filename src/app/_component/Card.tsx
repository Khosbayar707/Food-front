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
    <div className="flex gap-4">
      {foods &&
        foods.map((food: Foods) => (
          <div
            className="w-[270px] h-[240px] rounded-md border-2 border-[#E4E4E7]"
            key={food?._id}
          >
            <div className="rounded-md overflow-hidden w-[239px] h-[129px] ">
              <img src={food?.image} alt="image" />
            </div>
            <div>{food?.foodName}</div>
            <div>{food?.price}</div>
            <div>{food?.ingredients}</div>
          </div>
        ))}
    </div>
  );
}
