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
    <div className="fixed top-5 right-10">
      <SignedOut>
        <SignInButton>
          <button className="w-6">
            <Image
              src={`assets/LogInButton.svg`}
              alt="asdfjasdf"
              width={1000}
              height={1000}
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
