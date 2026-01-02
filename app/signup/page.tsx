import { redirect } from "next/navigation";
import Head from "next/head";
import SignUpComponent from "./components/signup";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
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
