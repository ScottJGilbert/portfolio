import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

export function SignIn() {
  const pathname = usePathname();
  const params = new URLSearchParams(useSearchParams().toString());
  const callbackUrl = params.get("callbackUrl");

  const { data: session } = useSession();
  if (session?.user) return null;

  return (
    <button
      className={clsx(
        "mx-2 p-3 bg-blue-900 rounded-2xl hover:bg-blue-950 hover:text-g hover:cursor-pointer"
      )}
      onClick={() => {
        if (pathname === "/login") {
          signIn("", { callbackUrl: callbackUrl?.toString() });
        } else {
          signIn("", { callbackUrl: pathname });
        }
      }}
    >
      <p className="block inline">Sign In</p>
    </button>
  );
}

export function SignOut() {
  const { data: session } = useSession();
  if (!session?.user) return null;
  return (
    <button
      className={clsx(
        "mx-2 p-3 bg-blue-900 rounded-2xl hover:bg-blue-950 hover:text-g hover:cursor-pointer"
      )}
      onClick={() => signOut()}
    >
      <p className="block inline">Sign Out</p>
    </button>
  );
}
