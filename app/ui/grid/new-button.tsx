"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import clsx from "clsx";

export default function NewButton() {
  const { data: session } = useSession();
  let href = "";
  let disabled = true;
  if (session?.user) {
    href = "/new";
    disabled = false;
  }
  return (
    <div className="m-auto">
      <Link
        href={href}
        className={clsx("p-3 rounded-2xl bg-slate-800 mr-2 my-auto", {
          "brightness-50 hover:cursor-not-allowed": disabled === true,
        })}
      >
        <span> + New</span>
      </Link>
    </div>
  );
}
