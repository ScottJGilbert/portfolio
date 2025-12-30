import { Suspense } from "react";
import ImageDisplay from "../components/image-display";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Images",
  robots: "noindex,nofollow",
};

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session?.user?.admin) {
    return <div>Unauthorized.</div>;
  }

  return (
    <div className="mt-4">
      <Suspense>
        <ImageDisplay />
      </Suspense>
    </div>
  );
}
