import ResumeUpload from "./components/resume";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session?.user?.admin) {
    redirect("/no-access");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mt-4">Admin Page</h1>
      <ResumeUpload />
    </div>
  );
}
