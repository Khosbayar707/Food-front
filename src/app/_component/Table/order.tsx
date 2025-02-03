"use client";

import { useState, useEffect } from "react";
import { columns, Order } from "./Column";
import { DataTable } from "./DataTable";
import { useAuth } from "@clerk/nextjs";

export default function OrderTable() {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [error, setError] = useState(false);
  const { getToken } = useAuth();

  async function getOrderData() {
    try {
      const token = await getToken();
      if (!token) throw new Error("No token found");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/food-order/`,
        {
          headers: {
            "Content-Type": "application/json",
            authentication: token,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();
      setOrderData(data);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }

  async function handleStatusChange(
    orderId: string,
    newStatus: "DELIVERED" | "CANCELLED"
  ) {
    try {
      const token = await getToken();
      if (!token) throw new Error("No token found");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/food-order/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authentication: token,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");

      setOrderData((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update order status. Please try again.");
    }
  }

  useEffect(() => {
    getOrderData();
  }, [getToken]);

  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        <p>Failed to load orders.</p>
        <button
          onClick={getOrderData}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }
  const orderColumns = columns(handleStatusChange);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={orderColumns} data={orderData} />
    </div>
  );
}
