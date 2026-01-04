import { UpdateAccount, RedZone } from "./components/update-account";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Button from "@/app/ui/button";
import Link from "next/link";

export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="h-screen flex flex-col justify-center">
        <div className="px-4 py-1 border border-[var(--border-color)] rounded-md bg-[var(--background-tertiary)] text-center">
          <p>
            Please{" "}
            <Link href="/signup">
              <Button className="bg-blue-500 hover:bg-blue-400">Sign Up</Button>
            </Link>
            or{" "}
            <Link href="/signin">
              <Button className="bg-blue-500 hover:bg-blue-400">Sign In</Button>
            </Link>{" "}
            to post comments.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mt-4">Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[var(--background-secondary)] rounded-3xl shadow-xl p-8 flex flex-col gap-6 border border-[var(--border-secondary)]">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Manage Subscriptions
          </h2>
          <p className="text-zinc-800 dark:text-zinc-200 mb-4">
            Coming soon...?
          </p>
        </div>
        <UpdateAccount />
        <RedZone />
      </div>
    </div>
  );
}
