"use client";

import { useState, useEffect } from "react";
import { columns, Order } from "./Column";
import { DataTable } from "./DataTable";
import { useAuth } from "@clerk/nextjs";

export default function OrderTable() {
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState(false);
  const { getToken } = useAuth();

  async function getOrderData() {
    const token = await getToken();
    try {
      if (!token) return;
      const response = await fetch(`http://localhost:8000/food-order/`, {
        headers: {
          "Content-Type": "application/json",
          authentication: token,
        },
      });
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
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={orderData} />
    </div>
  );
}
