import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "./_component/LayoutWrapper";
import { Raleway } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { OrderContextProvider } from "./OrderDetailContext";
import { FoodDetailProvider } from "./OrderFoodContext";
import { Suspense } from "react";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Food delivery",
  description: "Food delivery app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased bg-gray-100`}>
        <ClerkProvider>
          <FoodDetailProvider>
            <OrderContextProvider>
              <LayoutWrapper>
                <Suspense>{children}</Suspense>
              </LayoutWrapper>
            </OrderContextProvider>
          </FoodDetailProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
