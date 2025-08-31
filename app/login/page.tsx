import { redirect } from "next/navigation";
import { signIn, auth } from "@/auth";
import { providerMap } from "@/auth";
import { AuthError } from "next-auth";
import { FaGithub } from "react-icons/fa";
import clsx from "clsx";
import Head from "next/head";
import { Metadata } from "next";
import Button from "../ui/button";

const SIGNIN_ERROR_URL = "/error";

export const metadata: Metadata = {
  title: "Login",
  robots: "noindex,nofollow",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; reason?: string }>;
}) {
  const { callbackUrl, reason } = await searchParams;
  const cb = callbackUrl ?? "";
  const msg = reason ?? "";
  const LinkIcon = FaGithub;

  const session = await auth();
  if (session?.user) {
    redirect(cb || "/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-2 h-full justify-center">
        <Head>
          <meta name="robots" content="noindex,nofollow" key="noRobots" />
        </Head>
        <div className="flex-1 m-auto flex flex-col gap-2 p-6 rounded-3xl bg-green-950 border-solid border-1 border-gray-50">
          <h2>Login</h2>
          <hr></hr>
          <div className="m-4">
            {Object.values(providerMap).map((provider) => (
              <form
                key={provider.id}
                action={async (formData) => {
                  "use server";
                  try {
                    const url = formData.get("callbackUrl") as string;
                    await signIn(provider.id, { redirectTo: url });
                  } catch (error) {
                    if (error instanceof AuthError) {
                      return redirect(
                        `${SIGNIN_ERROR_URL}?error=${error.type}`
                      );
                    }
                    throw error;
                  }
                }}
              >
                <input type="hidden" name="callbackUrl" value={cb} />
                <Button className="p-3 hover:bg-blue-950 hover:cursor-pointer">
                  <LinkIcon className="w-5 h-5 inline mr-3 -translate-y-[2px]"></LinkIcon>
                  <span>Sign in with {provider.name}</span>
                </Button>
              </form>
            ))}
          </div>
          <div
            className={clsx("mt-2", {
              block: msg === "unauthorized",
              hidden: msg !== "unauthorized",
            })}
          >
            <p className="text-red-400 text-center">Please log in first.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
