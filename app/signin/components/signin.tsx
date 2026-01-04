"use client";

import { authClient } from "@/lib/auth-client"; //import the auth client
import { useState } from "react";
import { ToastError } from "@/app/ui/toast";
import { FaGithub } from "react-icons/fa";
import Button from "@/app/ui/button";
import { useSearchParams } from "next/navigation";

export default function SignInComponent() {
  const searchParams = useSearchParams();

  const tempCallback = searchParams.get("callbackUrl") || undefined;
  const error = searchParams.get("error") || undefined;

  const useCallback = !(
    tempCallback === "%2Fsignin" ||
    tempCallback === "/signin" ||
    tempCallback === "%2fsignup" ||
    tempCallback === "/signup"
  );

  const callbackUrl = useCallback ? tempCallback : "/";

  switch (error) {
    case "social_signin_failed":
      ToastError("Social sign in failed. Please try again.");
      break;
    case "invalid_credentials":
      ToastError("Invalid credentials. Please try again.");
      break;
    default:
      break;
  }

  const signInEmail = async (formData: { email: string; password: string }) => {
    await authClient.signIn.email(
      {
        email: formData.email, // user email address
        password: formData.password, // user password -> min 8 characters by default
        callbackURL: callbackUrl ?? "/", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: () => {
          //show loading
        },
        onSuccess: () => {
          //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
          // display the error message
          ToastError(ctx.error.message);
        },
      }
    );
  };

  const signInGithub = async () => {
    await authClient.signIn.social({
      /**
       * The social provider ID
       * @example "github", "google", "apple"
       */
      provider: "github",
      /**
       * A URL to redirect after the user authenticates with the provider
       * @default "/"
       */
      callbackURL: callbackUrl ?? "/",
      /**
       * A URL to redirect if an error occurs during the sign in process
       */
      errorCallbackURL: "/signin?error=social_signin_failed",
    });
  };

  const [emailFormData, setEmailFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen md:px-4">
      <div className="w-full md:max-w-md bg-[var(--background-tertiary)] rounded-3xl shadow-xl p-8 flex flex-col gap-6 border border-[var(--border-secondary)]">
        <h2 className="text-3xl font-bold text-center mb-2 text-zinc-900 dark:text-zinc-100">
          Sign In
        </h2>
        <Button
          onClick={signInGithub}
          className="flex items-center justify-center gap-2 py-3 px-4 w-full font-medium rounded-xl bg-black text-white hover:bg-zinc-800 transition-colors"
        >
          <FaGithub className="w-5 h-5" />
          <span>Sign in with GitHub</span>
        </Button>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-zinc-200 dark:border-zinc-700"></div>
          <span className="mx-3 text-zinc-400 text-sm">or</span>
          <div className="flex-grow border-t border-zinc-200 dark:border-zinc-700"></div>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            signInEmail(emailFormData);
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={emailFormData.email}
            onChange={(e) =>
              setEmailFormData({ ...emailFormData, email: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={emailFormData.password}
            onChange={(e) =>
              setEmailFormData({ ...emailFormData, password: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            autoComplete="current-password"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors hover:cursor-pointer"
          >
            Sign In with Email
          </button>
        </form>
      </div>
    </div>
  );
}
