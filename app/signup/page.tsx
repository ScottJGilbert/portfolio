"use client";

import SignUpComponent from "./components/signup";
import { redirect } from "next/navigation";
import Head from "next/head";
import { authClient } from "@/lib/auth-client";
import { Suspense } from "react";

export default function SignUpPage() {
  const { data: session } = authClient.useSession();
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Head>
        <meta name="robots" content="noindex,nofollow" key="noRobots" />
      </Head>
      <Suspense>
        <SignUpComponent />
      </Suspense>
    </div>
  );
}
