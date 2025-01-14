import Image from "next/image";
import { Category } from "../_component/Category";
import { LayoutDashboard } from "lucide-react";

export default function Page() {
  return (
    <div className="flex">
      <div>
        <div className="w-[205px] h-100vh">
          <img src="/assets/Logo.svg" alt="Logo" />
          <>
            <b>NomNom</b>
            <h2>Swift delivery</h2>
          </>
          <>
            <LayoutDashboard />
            <h2>Food menu</h2>
          </>
          <>
            <img src="/assets/Truck.svg" alt="Logo" />
            <h2>Orders</h2>
          </>
          <>
            <img src="/assets/Settings-Icon.svg" alt="Logo" />
            <h2>Settings</h2>
          </>
        </div>
      </div>
      <div className="">
        <Category />
      </div>
    </div>
  );
}
