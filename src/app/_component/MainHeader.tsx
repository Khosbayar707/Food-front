import Link from "next/link";

export const MainHeader = () => {
  return (
    <div className="border-b bg-primary">
      <div className="container flex items-center justify-between py-2 mx-auto w-[80%]">
        <Link href="/">
          <div className="items-center ">
            <img src="/assets/MainLogo.svg" alt="logo" />
          </div>
        </Link>
        <div className="flex gap-2">
          <input />
          <img src="/assets/MallButton.svg" alt="logo" />
          <img src="/assets/LogInButton.svg" alt="logo" />
        </div>
      </div>
    </div>
  );
};
