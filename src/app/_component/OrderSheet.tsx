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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart } from "lucide-react";
import { useSaveFoods } from "../OrderFoodContext";

export function OrderSheet() {
  const { orderedFoods, setOrderedFoods } = useSaveFoods();

  return (
    <Sheet>
      <SheetTrigger>
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
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>My card</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2"></CardContent>
                <CardFooter>
                  <Button>Add food</Button>
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
  );
}
