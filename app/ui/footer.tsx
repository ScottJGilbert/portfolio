"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { name: "Attributions", href: "/attributions" },
  { name: "Resume", href: "/resume" },
  { name: "Login", href: "/login" }, //Include webpage to path back to in the URL
];

export default function Footer() {
  return (
    <div className="flex">
      <div className="mx-auto flex flex-col space-between">
        <p className="text-center">
          © {new Date().getFullYear()} Scott Gilbert
        </p>
        <div className="m-8">
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
        </div>
      </div>
    </div>
  );
}
