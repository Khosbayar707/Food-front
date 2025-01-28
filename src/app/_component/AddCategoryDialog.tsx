"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

type AddCategoryDialogProps = {
  onAddCategory: (categoryName: string) => void;
};

export function AddCategoryDialog({ onAddCategory }: AddCategoryDialogProps) {
  const [categoryName, setCategoryName] = useState<string>("");

  async function handleAddCategory() {
    if (!categoryName) return;
    onAddCategory(categoryName);
    setCategoryName("");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full bg-red-500 text-[12px] text-white w-6 h-6">
          <Plus />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Add New Category</DialogHeader>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <DialogFooter asChild>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddCategory}
          >
            Add Category
          </button>
          <DialogClose className="bg-gray-300 text-black px-4 py-2 rounded ml-2">
            Cancel
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
