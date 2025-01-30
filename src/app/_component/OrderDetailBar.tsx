"use client";

import { useEffect, useState } from "react";

export function OrderBar() {
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState(false);

  async function getOrderData() {
    try {
      const response = await fetch(
        `http://localhost:8000/food-order/6797346316427d98ec5a3f07`
      );
      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();
      setOrderData(data);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }

  useEffect(() => {
    getOrderData();
  }, []);

  if (error) return <div className="text-red-500">Failed to load orders.</div>;

  return (
    <div className="text-black">
      {orderData.length > 0 ? (
        orderData.map((order: any) => (
          <div key={order._id} className="border p-2 my-2 text-sm text-gray">
            <p>
              Total Price: ${order.totalPrice}
              <p>(ID: {order._id})</p>
            </p>
            <p>Status: {order.status}</p>
            <div className="ml-4">
              <p className="font-bold">Dishes:</p>
              {order.foodOrderItems.map((item: any) => (
                <div key={item._id} className="pl-2 flex justify-between">
                  <p className="flex gap-2">
                    <img src="/assets/foodicon.svg" />
                    {item.food}
                  </p>
                  <p>x {item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Loading orders...</p>
      )}
    </div>
  );
}
