"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import clsx from "clsx";

export default function NewButton() {
  const { data: session } = useSession();
  let href = "";
  let disabled = true;
  if (session?.user?.email === "scott7gilbert@gmail.com") {
    href = "new";
    disabled = false;
  }
  return (
    <div className="m-auto z-0">
      <Link
        href={href}
        className={clsx("z-0 p-3 rounded-2xl bg-green-950 my-auto", {
          "brightness-50 hover:cursor-not-allowed": disabled === true,
        })}
      >
        <span> + New</span>
      </Link>
    </div>
  );
}
