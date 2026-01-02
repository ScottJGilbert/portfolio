import Upload from "@/app/admin/components/upload";
import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Upload",
  robots: "noindex,nofollow",
};

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session?.user?.admin) {
    redirect("/no-access");
  }

  return (
    <main className="flex flex-col justify-between h-full">
      <div className="flex items-left">
        <Link
          href="/admin/images"
          className="p-2 m-2 rounded-xl bg-[var(--background-secondary)] hover:bg-slate-900 hover:cursor-pointer border-[var(--border)] border-1"
        >
          ← Go Back
        </Link>
      </div>
      <Upload />
    </main>
  );
}
