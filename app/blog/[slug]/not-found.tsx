import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not Found",
  robots: "noindex,nofollow",
};

export default function NotFound() {
  return (
    <main className="my-auto flex h-screen flex-col items-center justify-center gap-4">
      <Suspense>
        <div className="flex gap-2">
          <FaceFrownIcon className="w-10 text-gray-400" />
          <h2 className="my-auto text-xl font-semibold">404</h2>
        </div>
        <p>
          The requested post could not be found on this server. Maybe there was
          a misspelling?
        </p>
        <Link
          href="/posts"
          className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
        >
          ← Go Back
        </Link>
      </Suspense>
    </main>
  );
}
