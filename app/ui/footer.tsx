"use client";

import Link from "next/link";
import { SignIn, SignOut } from "./sign-in-out";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
// import { usePathname, useRouter } from "next/navigation";

const links = [
  { name: "Attributions", href: "/attributions" },
  { name: "Resume", href: "/resume" },
];

export default function Footer() {
  return (
    <div className="flex">
      <div className="mx-auto flex flex-col space-between">
        <p className="text-center">
          © {new Date().getFullYear()} Scott Gilbert
        </p>
        <div className="m-4 flex flex-wrap justify-center">
          {links.map((link) => {
            return (
              <Link
                key={link.name + "link"}
                className="m-2 p-4 bg-blue-900 rounded-2xl hover:bg-blue-950 hover:text-g"
                href={link.href}
              >
                {link.name}
              </Link>
            );
          })}
          <SessionProvider>
            <Suspense>
              <SignIn />
            </Suspense>
            <SignOut />
          </SessionProvider>
        </div>
      </div>
    </div>
  );
}
