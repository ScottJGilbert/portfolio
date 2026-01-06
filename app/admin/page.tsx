import ResumeUpload from "./components/resume";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { fetchResumeURL } from "@/lib/db";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session?.user?.admin) {
    redirect("/no-access");
  }

  const resumeURL = await fetchResumeURL();
  const keyIndex = resumeURL.indexOf("/f/");
  const resumeKey =
    keyIndex !== -1 ? resumeURL.substring(keyIndex + 3) : undefined;

  return (
    <div>
      <h1 className="text-2xl font-bold mt-4">Admin Page</h1>
      <ResumeUpload oldKey={resumeKey} />
    </div>
  );
}
