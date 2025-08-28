import Upload from "@/app/components/images/upload";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Upload",
  robots: "noindex,nofollow",
};

export default function Page() {
  return (
    <main className="flex flex-col justify-between h-full">
      <div className="flex items-left">
        <Link
          href="/images"
          className="p-2 m-2 rounded-xl bg-green-950 hover:bg-slate-900 hover:cursor-pointer border-gray-50 border-1"
        >
          ← Go Back
        </Link>
      </div>
      <Upload />
    </main>
  );
}
