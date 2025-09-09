"use client";

import {
  UserIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Bounce } from "../motion/transitions";
import { usePageLoading } from "@/providers/loading-provider";
import BufferedLink from "@/app/ui/buffered-link";

const links = [
  { name: "About", href: "/about", icon: UserIcon },
  { name: "Projects", href: "/projects", icon: BriefcaseIcon },
  { name: "Blog", href: "/blog", icon: ChatBubbleLeftRightIcon },
  { name: "Contact", href: "/contact", icon: PhoneIcon },
];

export default function Navbar() {
  const { setIsLoading } = usePageLoading();
  const pathname = usePathname();
  return (
    <div>
      <p className="text-lg">Navigation</p>
      <hr className="mb-4 mt-2"></hr>
      <div className="grid grid-cols-2 md:flex flex-col gap-4">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Bounce key={link.name}>
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
          );
        })}
      </div>
    </div>
  );
}
