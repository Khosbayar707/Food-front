"use client";

import { ColumnDef } from "@tanstack/react-table";
type foodOrders = {
  food: string;
  quantity: number;
};
export type Order = {
  _id: string;
  user: string;
  totalPrice: number;
  foodOrderItems: foodOrders[];
  status: "PENDING" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
};
export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "user.email",
    header: "Customer",
  },
  {
    accessorKey: "foodOrderItems.length",
    header: "Food",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
  },
  {
    accessorKey: "user.address",
    header: "Delivery address",
  },
  {
    accessorKey: "status",
    header: "Delivery state",
  },
];
