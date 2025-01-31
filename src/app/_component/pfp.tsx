import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";

export const Pfp = () => {
  return (
    <div className="relative top-1 left-4">
      <SignedOut>
        <SignInButton>
          <button className="w-[36px] h-[36px]">
            <img
              src="/assets/LogInButton.svg"
              alt="login"
              className="w-full h-full"
            />
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};
