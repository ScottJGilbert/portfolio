import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import Button from "./button";
import BufferedLink from "./buffered-link";
import { usePageLoading } from "../providers/loading-provider";

export function SignUp({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const { setIsLoading } = usePageLoading();

  const { data: session } = authClient.useSession();
  if (session?.user) return null;

  return (
    <BufferedLink
      className="hover:cursor-pointer"
      href={
        pathname === "/signup" || pathname === "/signin"
          ? "/signup"
          : "/signup?callbackUrl=" + encodeURIComponent(pathname)
      }
      doOnClick={() => {
        setIsLoading(true);
      }}
    >
      {children ? children : <p className="inline">Sign Up</p>}
    </BufferedLink>
  );
}

export function SignIn({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const { setIsLoading } = usePageLoading();

  const { data: session } = authClient.useSession();

  if (session?.user) return null;

  return (
    <BufferedLink
      className="hover:cursor-pointer"
      href={
        pathname === "/signin" || pathname === "/signup"
          ? "/signin"
          : "/signin?callbackUrl=" + encodeURIComponent(pathname)
      }
      doOnClick={() => {
        setIsLoading(true);
      }}
    >
      {children ? children : <p className="inline">Sign In</p>}
    </BufferedLink>
  );
}

export function SignOut({ children }: { children?: React.ReactNode }) {
  const { data: session } = authClient.useSession();
  if (!session?.user) return null;
  return (
    <Button
      className="hover:cursor-pointer"
      onClick={async () => {
        await authClient.signOut();
        window.location.reload();
      }}
    >
      {children ? children : <p className="inline">Sign Out</p>}
    </Button>
  );
}
