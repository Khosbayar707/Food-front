"use client";
import Link from "next/link";
import { OrderSheet } from "./OrderSheet";
import { ClerkProvider } from "@clerk/nextjs";
import { Pfp } from "./pfp";

export const MainHeader = () => {
  return (
    <div className="border-b bg-primary text-white">
      <div className="container flex items-center justify-between py-2 mx-auto w-[80%]">
        <Link href="/">
          <div className="items-center">
            <img src="/assets/MainLogo.svg" alt="logo" />
          </div>
        </Link>
        <div className="flex gap-2">
          <input className="rounded-lg" />
          <OrderSheet />
          <Pfp />
        </div>
      </div>
    </div>
  );
};
