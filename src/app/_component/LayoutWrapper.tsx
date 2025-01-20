"use client";

import { usePathname } from "next/navigation";
import { MainHeader } from "./MainHeader";
import { MainFooter } from "./MainFooter";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isOrderPage = pathname.startsWith("/order");
  return (
    <>
      {!isAdminPage && !isOrderPage && <MainHeader />}
      <main>{children}</main>
      {!isAdminPage && !isOrderPage && <MainFooter />}
    </>
  );
}
