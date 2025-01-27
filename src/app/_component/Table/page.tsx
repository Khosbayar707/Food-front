import { useState, useEffect } from "react";
import { columns, Order } from "./Column";
import { DataTable } from "./DataTable";
import { Foods, Payment } from "@/app/types";

async function getData(): Promise<Order[]> {
  const response = await fetch(`http://localhost:8000/food-order/`, {
    method: "GET",
  });
  const food = await response.json();
  return food;
}

export default async function OrderTable() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
