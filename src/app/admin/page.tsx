import Image from "next/image";
import { Category } from "../_component/Category";
import { Truck } from "lucide-react";
import { Settings } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { Section } from "../_component/Section";

export default function Page() {
  return (
    <div className="flex gap-10">
      <div className="max-w-[210px] w-[20%] h-[100vh] fixed bg-white">
        <div>
          <div className="flex gap-4 p-4">
            <img src="/assets/Logo.svg" alt="Logo" />
            <div>
              <b>NomNom</b>
              <h2>Swift delivery</h2>
            </div>
          </div>
          <div className="flex gap-2 w-[165px] h-[40px] rounded-full px-6 my-[40px] t-[14px]">
            <LayoutDashboard />
            <h2>Food menu</h2>
          </div>
          <div className="flex gap-2 w-[165px] h-[40px] rounded-full px-6 my-[40px] t-[14px]">
            <Truck />
            <h2>Orders</h2>
          </div>
          <div className="flex gap-2 w-[165px] h-[40px] rounded-full px-6 my-[40px] t-[14px]">
            <Settings />
            <h2>Settings</h2>
          </div>
        </div>
      </div>
      <div className="w-[80%] ml-[230px]">
        <Category />
        <Section />
      </div>
    </div>
  );
}
