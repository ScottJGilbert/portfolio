"use client";

import { redirect } from "next/navigation";
import Head from "next/head";
import SignInComponent from "./components/signin";
import { authClient } from "@/lib/auth-client";
import { Suspense } from "react";

export default function SignInPage() {
  const { data: session } = authClient.useSession();
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-2 h-full justify-center">
        <Head>
          <meta name="robots" content="noindex,nofollow" key="noRobots" />
        </Head>
        <Suspense>
          <SignInComponent />
        </Suspense>
      </div>
    </div>
  );
}
