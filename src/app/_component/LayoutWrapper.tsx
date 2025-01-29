"use client";

import { usePathname } from "next/navigation";
import { MainHeader } from "./MainHeader";
import { MainFooter } from "./MainFooter";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isOrderPage = pathname.startsWith("/orders");
  const isLoginPage = pathname.startsWith("/login");
  const isSigninPage = pathname.startsWith("/signin");
  return (
    <>
      {!isAdminPage && !isOrderPage && !isLoginPage && !isSigninPage && (
        <MainHeader />
      )}
      <main>{children}</main>
      {!isAdminPage && !isOrderPage && !isLoginPage && !isSigninPage && (
        <MainFooter />
      )}
    </>
  );
}
