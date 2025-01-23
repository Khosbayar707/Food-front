"use client";

import { createContext, SetStateAction, useContext, useState } from "react";
import { Order } from "./types";

type cartContext = {
  order: Order[];
  setOrder: React.Dispatch<SetStateAction<Order[]>>;
};

export const orderDetail = createContext<cartContext | null>(null);

export const OrderContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [order, setOrder] = useState<Order[]>([]);
  return (
    <orderDetail.Provider value={{ order, setOrder }}>
      {children}
    </orderDetail.Provider>
  );
};

export function useSaveOrder() {
  const context = useContext(orderDetail);
  if (!context) {
    throw new Error(`aldaa`);
  }
  return context;
}
