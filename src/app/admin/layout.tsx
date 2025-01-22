import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <SignedOut>
        <SignInButton>
          <div className="flex justify-items-center">
            <button>Log in as an admin</button>
          </div>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div>{children}</div>
      </SignedIn>
    </ClerkProvider>
  );
}
