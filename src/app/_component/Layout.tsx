// components/Layout.tsx
import { ReactNode } from "react";
import { LayoutDashboard, Truck, Settings } from "lucide-react";
import Image from "next/image";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex gap-8">
      <div className="max-w-[220px] w-[20%] h-[100vh] fixed bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center gap-4 mb-8">
          <img src="/assets/Logo.svg" alt="Logo" className="h-12" />
          <div>
            <b className="text-lg text-black">NomNom</b>
            <h2 className="text-sm text-gray-500">Swift delivery</h2>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all">
            <LayoutDashboard />
            <h2 className="text-sm">Food menu</h2>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all">
            <Truck />
            <h2 className="text-sm">Orders</h2>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all">
            <Settings />
            <h2 className="text-sm">Settings</h2>
          </div>
        </div>
      </div>
      <div className="w-[80%] ml-[240px] p-6 space-y-8">{children}</div>
    </div>
  );
};

export default Layout;
