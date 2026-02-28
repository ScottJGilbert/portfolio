"use client";

import { authClient } from "@/lib/auth-client";
import Button from "@/app/ui/button";
import { SignIn, SignOut, SignUp } from "@/app/ui/sign-in-out";
import { AnimatedLink } from "@/app/ui/buffered-link";

export default function AccountComponent() {
  const { data: session } = authClient.useSession();
  const name = session?.user?.name;

  const nameSplit = name?.split(" ");

  return (
    <div className="flex items-center justify-between gap-2">
      {!session && (
        <>
          <SignIn>
            <Button className="mx-0">Sign In</Button>
          </SignIn>
          <SignUp>
            <Button className="mx-0">Sign Up</Button>
          </SignUp>
        </>
      )}
      {session && (
        <>
          <AnimatedLink href="/account">
            {nameSplit?.map((part, index) => (
              <p key={index} className="mx-0 text-center">
                {part}
              </p>
            ))}
          </AnimatedLink>
          <SignOut />
        </>
      )}
    </div>
  );
}
