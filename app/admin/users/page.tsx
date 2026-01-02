import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserDisplay from "../components/user-display";
import { redirect } from "next/navigation";

export default async function UserPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session?.user?.admin) {
    redirect("/no-access");
  }

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold">User Admin Page</h1>
      <UserDisplay />
    </div>
  );
}
