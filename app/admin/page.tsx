import ResumeUpload from "./components/resume";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session?.user?.admin) {
    return <div>Unauthorized.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mt-4">Admin Page</h1>
      <ResumeUpload />
    </div>
  );
}
