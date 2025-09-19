"use client";

import {
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Bounce } from "../motion/transitions";
import { usePageLoading } from "@/providers/loading-provider";
import BufferedLink from "@/app/ui/buffered-link";
import { Fragment } from "react";

const links = [
  { name: "About", href: "/about", icon: UserIcon },
  { name: "Skills", href: "/skills", icon: AcademicCapIcon },
  { name: "Projects", href: "/projects", icon: BriefcaseIcon },
  { name: "Blog", href: "/blog", icon: ChatBubbleLeftRightIcon },
];

export default function Navbar() {
  const { setIsLoading } = usePageLoading();
  const pathname = usePathname();
  return (
    <div>
      <p className="text-lg">Navigation</p>
      <hr className="mb-4 mt-2"></hr>
      <div className="gap-2 md:gap-0 grid grid-cols-2 md:flex flex-col">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Fragment key={link.name}>
              <Bounce>
                <BufferedLink
                  href={link.href}
                  doOnClick={() => {
                    setIsLoading(true);
                  }}
                  className={clsx(
                    "flex h-[48px] grow items-center justify-center gap-8 rounded-md py-3 text-lg font-medium rounded-l-full rounded-r-full border-solid border-1 border-[var(--border)] md:flex-none md:justify-between md:p-2",
                    {
                      "bg-sky-100 text-blue-800 hover:bg-sky-200 hover:text-blue-900":
                        pathname === link.href,
                      "hover:bg-blue-200 dark:hover:bg-blue-950 dark:hover:text-gray-50":
                        pathname !== link.href,
                    }
                  )}
                >
                  <LinkIcon className="w-5" />
                  <p className="block">{link.name}</p>
                </BufferedLink>
              </Bounce>
              <div className="h-4 max-h-4 hidden md:block" />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
