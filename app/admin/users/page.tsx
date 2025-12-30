import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserDisplay from "../components/user-display";

export default async function UserPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session?.user?.admin) {
    return <div>Unauthorized.</div>;
  }

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold">User Admin Page</h1>
      <UserDisplay />
    </div>
  );
}
