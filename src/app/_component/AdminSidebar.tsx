import { ReactNode } from "react";
import { LayoutDashboard, Truck, Settings } from "lucide-react";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

const Sidebar = ({ children }: LayoutProps) => {
  return (
    <div className="flex gap-8">
      <div className="max-w-[220px] w-[20%] h-[100vh] fixed bg-white shadow-md rounded-lg p-6">
        <Link href="/">
          <div className="flex items-center gap-4 mb-8">
            <img src="/assets/Logo.svg" alt="Logo" className="h-12" />
            <div>
              <b className="text-lg text-black text-12">NomNom</b>
              <h2 className="text-sm text-gray-500 text-12">Swift delivery</h2>
            </div>
          </div>
        </Link>
        <div>
          <Link href="/admin">
            <div className="flex items-center gap-2 p-3 mt-6 rounded-full bg-gray-100 text-black hover:bg-black hover:text-white transition-all ">
              <LayoutDashboard />
              <h2 className="text-sm">Food menu</h2>
            </div>
          </Link>

          <Link href="/orders">
            <div className="flex items-center gap-2 p-3 mt-6 rounded-full bg-gray-100 text-black hover:bg-black hover:text-white transition-all">
              <Truck />
              <h2 className="text-sm">Orders</h2>
            </div>
          </Link>

          <div className="flex items-center gap-2 p-3 mt-6 rounded-full bg-gray-100 text-black hover:bg-black hover:text-white transition-all">
            <Settings />
            <h2 className="text-sm">Settings</h2>
          </div>
        </div>
      </div>
      <div className="w-[80%] ml-[240px] p-6 space-y-8">{children}</div>
    </div>
  );
};

export default Sidebar;
