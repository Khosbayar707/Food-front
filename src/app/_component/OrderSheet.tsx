import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart } from "lucide-react";
import { useSaveFoods } from "../OrderFoodContext";
import { OrderCard } from "./OrderFoodCard";
import { useSaveOrder } from "../OrderDetailContext";
import { useAuth } from "@clerk/nextjs";
import { PaymentCard } from "./PaymentCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function OrderSheet() {
  const { orderedFoods } = useSaveFoods();
  const { order } = useSaveOrder();
  const [count, setCount] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { getToken } = useAuth();

  let totalPrice = orderedFoods.reduce(
    (acc, food, index) => acc + food.price * order[index].quantity,
    0
  );

  async function addOrderItem() {
    const token = await getToken();
    if (token) {
      const response = await fetch(`http://localhost:8000/food-order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
        body: JSON.stringify({
          user: "6797346316427d98ec5a3f07",
          totalPrice,
          foodOrderItems: order,
        }),
      });

      if (response.ok) {
        setIsSheetOpen(false);
        setTimeout(() => setIsSuccessModalOpen(true), 300);
      }
    }
  }

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger onClick={() => setIsSheetOpen(true)}>
          <img src="/assets/MallButton.svg" alt="logo" />
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>
              <div className="flex gap-4">
                <ShoppingCart /> Order datail
              </div>
            </SheetTitle>
            <Tabs defaultValue="account" className="w-[330px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Card</TabsTrigger>
                <TabsTrigger value="password">Order</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My card</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <OrderCard count={count} setCount={setCount} />
                    {/*order card here*/}
                  </CardContent>
                  <CardFooter>
                    <button className=" w-[90%] border-2 border-[#EF4444] rounded-xl p-2 text-[#EF4444] hover:bg-[#EF4444] hover:text-white">
                      Add food
                    </button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Payment info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <PaymentCard totalPrice={totalPrice} />
                    {/*payment card here*/}
                  </CardContent>
                  <CardFooter>
                    <button
                      className=" w-[90%] border-2 border-[#EF4444] rounded-xl p-2 text-white bg-[#EF4444] hover:bg-red-400"
                      onClick={() => {
                        addOrderItem();
                      }}
                    >
                      Check out
                    </button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">hi order</CardContent>
                  <CardFooter>
                    <Button>Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle className="text-green-600">
              Successfully Checked Out!
            </DialogTitle>
          </DialogHeader>
          <p>Your order has been placed.</p>
          <button
            className="mt-4 px-4 py-2 bg-[#EF4444] text-white rounded-md"
            onClick={() => setIsSuccessModalOpen(false)}
          >
            OK
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
