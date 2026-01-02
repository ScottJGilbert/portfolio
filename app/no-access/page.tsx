import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import Head from "next/head";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "No Access",
  description: "You do not have access to this page.",
  robots: "noindex,nofollow",
};

export default function Page() {
  return (
    <main className="my-auto flex h-screen flex-col items-center justify-center gap-4">
      <Head>
        <meta name="robots" content="noindex,nofollow" key="noRobots" />
      </Head>
      <Suspense>
        <div className="flex gap-2">
          <FaceFrownIcon className="w-10 text-gray-400" />
          <h2 className="my-auto text-xl font-semibold">403</h2>
        </div>
        <p>You do not have access to this page.</p>
        <Link
          href="/"
          className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
        >
          ← Go Back
        </Link>
      </Suspense>
    </main>
  );
}
