"use client";

import { FooterCategory } from "./FooterCategory";

export function MainFooter() {
  return (
    <footer>
      <div className="w-full h-[700px] bg-[#18181B] box-border pt-4 text-white text-[14px]">
        <div className="bg-[#EF4444]">
          <div className="w-full h-[92px] bg-[#EF4444] overflow-hidden relative mt-[60px]">
            <div className="absolute whitespace-nowrap animate-scroll text-white text-xl pt-8">
              <span className="mx-24">Fresh fast delivered </span>
              <span className="mx-24">Fresh fast delivered </span>
              <span className="mx-24">Fresh fast delivered </span>
              <span className="mx-24">Fresh fast delivered </span>
              <span className="mx-24">Fresh fast delivered </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mx-auto h-[228px] mt-[75px]">
          <div className="w-[80%] h-[228px] flex justify-between">
            <img
              src="/assets/MainLogo.svg"
              alt="logo"
              className="w-[120px] h-[120px]"
            />
            <div className="text-[#71717A]">
              NOMNOM
              <div className="text-white mt-[20px]">
                <p className="mb-[18px]">Home</p>
                <p className="mb-[18px]">Contact us</p>
                <p className="mb-[18px]">Delivery zone</p>
              </div>
            </div>
            <div className="text-[#71717A]">
              MENU
              <div className="text-white mt-[20px]">
                <FooterCategory />
              </div>
            </div>
            <div className="text-[#71717A]">
              FOLLOW US
              <div className="flex justify-around mt-[20px]">
                <img
                  src="/assets/Facebook.svg"
                  alt="Logo"
                  className="w-[28px] h-[28px]"
                />
                <img
                  src="/assets/Instagram.svg"
                  alt="Logo"
                  className="w-[28px] h-[28px]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-around items-center mx-auto w-[85%] h-[100px] mt-[60px] border-t-2 border-t-inherit text-[#71717A]">
          <p>Copy right 2024 @ NomNom LLC</p>
          <p>Privacy policy</p>
          <p>Terms and conditoin</p>
          <p>Cookie policy</p>
        </div>
      </div>
    </footer>
  );
}
