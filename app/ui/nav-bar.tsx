"use client";

import {
  UserIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "About", href: "/about", icon: UserIcon },
  { name: "Projects", href: "/projects", icon: BriefcaseIcon },
  { name: "Experience", href: "/experience", icon: BuildingOffice2Icon },
  { name: "Blog", href: "/blog", icon: ChatBubbleLeftRightIcon },
  { name: "Resume", href: "/resume", icon: DocumentDuplicateIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div>
      <p className="text-lg">Navigation</p>
      <hr className="mb-4 mt-2"></hr>
      <div className="grid grid-cols-2 md:flex flex-col gap-3">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex h-[48px] grow items-center justify-center gap-3 rounded-md py-3 text-lg font-medium rounded-l-full rounded-r-full border-solid border-1 border-gray-50 hover:bg-blue-950 hover:text-gray-50 md:flex-none md:justify-between md:p-2",
                {
                  "bg-sky-100 text-blue-800": pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-5" />
              <p className="block">{link.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
