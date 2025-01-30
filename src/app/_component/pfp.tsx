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
          <button className="w-6">
            <Image src={`assets/LogInButton.svg`} alt="login" />
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};
