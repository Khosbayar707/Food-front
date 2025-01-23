import { useSaveFoods } from "../OrderFoodContext";
import { Foods } from "../types";

export function OrderCard() {
  const { orderedFoods, setOrderedFoods } = useSaveFoods();

  return (
    <div>
      {orderedFoods &&
        orderedFoods.map((food: Foods) => (
          <div key={food._id}>{food.foodName}</div>
        ))}
    </div>
  );
}
