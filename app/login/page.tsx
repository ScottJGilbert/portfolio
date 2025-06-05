import { redirect } from "next/navigation";
import { signIn, providerMap } from "@/auth";
import { AuthError } from "next-auth";
import { FaGithub } from "react-icons/fa";
import clsx from "clsx";

const SIGNIN_ERROR_URL = "/error";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; extraMessage?: string }>;
}) {
  const { callbackUrl, extraMessage } = await searchParams;
  const cb = callbackUrl ?? "";
  const msg = extraMessage ?? "";
  const LinkIcon = FaGithub;

  return (
    <div className="flex flex-col gap-2 h-full justify-center">
      <div className="m-auto flex flex-col gap-2 p-6 rounded-3xl bg-slate-800 border-solid border-1 border-gray-50">
        <h1>Login</h1>
        <hr></hr>
        <div className="m-4">
          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              className="rounded-2xl p-3 hover:bg-blue-950 hover:cursor-pointer border-solid border-1 border-gray-50"
              action={async (formData) => {
                "use server";
                try {
                  const url = formData.get("callbackUrl") as string;
                  await signIn(provider.id, { redirectTo: url });
                } catch (error) {
                  if (error instanceof AuthError) {
                    return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                  }
                  throw error;
                }
              }}
            >
              <input type="hidden" name="callbackUrl" value={cb} />
              <button type="submit" className="hover:cursor-pointer">
                <LinkIcon className="w-5 h-5 inline mr-3 -translate-y-[2px]"></LinkIcon>
                <span>Sign in with {provider.name}</span>
              </button>
            </form>
          ))}
        </div>
        <div
          className={clsx("mt-2", {
            block: msg === "true",
            hidden: msg !== "true",
          })}
        >
          <p className="text-red-400 text-center">Please log in first.</p>
        </div>
      </div>
    </div>
  );
}
