import { redirect } from "next/navigation";
import Head from "next/head";
import SignInComponent from "./components/signin";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
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
