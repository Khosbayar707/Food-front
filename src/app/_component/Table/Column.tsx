import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

type foodOrders = {
  food: string;
  quantity: number;
};

export type Order = {
  _id: string;
  user: { email: string; address: string };
  totalPrice: number;
  foodOrderItems: foodOrders[];
  status: "PENDING" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
};

export const columns = (
  handleStatusChange: (id: string, status: "DELIVERED" | "CANCELLED") => void
): ColumnDef<Order>[] => [
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) => row.original.user.email,
  },
  {
    accessorKey: "foodOrderItems",
    header: "Food Items",
    cell: ({ row }) => row.original.foodOrderItems.length,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => `$${row.original.totalPrice.toFixed(2)}`,
  },
  {
    accessorKey: "user",
    header: "Delivery Address",
    cell: ({ row }) => row.original.user.address,
  },
  {
    accessorKey: "status",
    header: "Delivery Status",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <span
          className={`px-2 py-1 rounded ${
            row.original.status === "DELIVERED"
              ? "bg-green-200 text-green-800"
              : row.original.status === "CANCELLED"
              ? "bg-red-200 text-red-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {row.original.status}
        </span>
        {row.original.status === "PENDING" && (
          <div className="flex space-x-1">
            <Button
              size="sm"
              onClick={() => handleStatusChange(row.original._id, "DELIVERED")}
            >
              ✅ DELIVERED
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleStatusChange(row.original._id, "CANCELLED")}
            >
              ❌ CANCELLED
            </Button>
          </div>
        )}
      </div>
    ),
  },
];
