"use client";

import { useAuth } from "@clerk/nextjs";
import { orderColumns } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export function OrderBar() {
  const [orderData, setOrderData] = useState([]);
  const [mappedData, setMappedData] = useState([]);
  const [error, setError] = useState(true);

  async function getOrderData() {
    const response = await fetch(
      `http://localhost:8000/food-order/6797346316427d98ec5a3f07`
    );
    const data = await response.json();
    setOrderData(data);
  }

  useEffect(() => {
    getOrderData();
  }, []);

  console.log(orderData);

  return (
    <div className="text-black">
      {orderData.foodOrderItems &&
        orderData.foodOrderItems?.map((items: any, index) => (
          <div>
            {items?.foodOrderItems.map((item: any) => (
              <div>{item?.foodName}</div>
            ))}
          </div>
        ))}
    </div>
    // <div>hi</div>
  );
}
