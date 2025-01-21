export type Foods = {
  _id: string;
  foodName: string;
  price: string;
  image: string;
  ingredients: string;
  category: string;
};

export type Category = {
  _id: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
