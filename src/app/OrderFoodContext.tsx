"use client";

import { createContext, SetStateAction, useContext, useState } from "react";
import { Foods } from "./types";

type foodContext = {
  orderedFoods: Foods[];
  setOrderedFoods: React.Dispatch<SetStateAction<Foods[]>>;
};

export const foodDetail = createContext<foodContext | null>(null);

export const FoodDetailProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [orderedFoods, setOrderedFoods] = useState<Foods[]>([]);
  return (
    <foodDetail.Provider value={{ orderedFoods, setOrderedFoods }}>
      {children}
    </foodDetail.Provider>
  );
};

export function useSaveFoods() {
  const context = useContext(foodDetail);
  if (!context) {
    throw new Error(`aldaa`);
  }
  return context;
}
