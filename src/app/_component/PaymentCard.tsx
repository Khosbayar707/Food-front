"use client";

type Props = {
  totalPrice: number;
};

export function PaymentCard({ totalPrice }: Props) {
  return (
    <div className="h-[30%]">
      <div className="p-2">
        <div>
          <div>
            <div className="flex py-4 justify-between">
              <p>Items</p>
              <p>{totalPrice} $</p>
            </div>
            <div className="flex py-2 justify-between border-b-2 border-b-black border-dashed">
              <p>Shipping </p>
              <p>0.99 $</p>
            </div>
            <div className="flex py-4 justify-between">
              <p>Total</p>
              <p>{(totalPrice += 0.99)} $</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
