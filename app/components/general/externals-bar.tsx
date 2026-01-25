import {
  EnvelopeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Bounce } from "../motion/transitions";
import BufferedLink from "@/app/ui/buffered-link";
import { Fragment } from "react";

const links = [
  {
    name: "GitHub",
    href: "https://github.com/ScottJGilbert",
    icon: FaGithub,
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/scott-j-gilbert/",
    icon: FaLinkedin,
  },
  { name: "Email", href: "mailto:hello@scottgilbert.dev", icon: EnvelopeIcon },
  { name: "Resume", href: "/resume.pdf", icon: DocumentDuplicateIcon },
];

export default function Externalsbar() {
  return (
    <div>
      <p className="text-lg">External Links</p>
      <hr className="mb-3 mt-2"></hr>
      <div className="gap-2 md:gap-0 grid grid-cols-2 md:flex flex-col">
        {links.map((link, index) => {
          const LinkIcon = link.icon;
          return (
            <Fragment key={link.name}>
              <Bounce>
                <BufferedLink
                  href={link.href}
                  className={
                    "flex h-[48px] grow items-center justify-center gap-2 rounded-md py-3 text-lg font-medium rounded-l-full rounded-r-full border-solid border-1 border-[var(--border)] hover:bg-blue-200 dark:hover:bg-blue-950 dark:hover:text-gray-50 md:flex-none md:justify-between md:p-2"
                  }
                  target="_blank"
                >
                  <LinkIcon className="w-6" />
                  <p className="block">{link.name}</p>
                </BufferedLink>
              </Bounce>
              {index < links.length - 1 && (
                <div className="h-3 max-h-3 hidden md:block" />
              )}
              {!(index < links.length - 1) && (
                <div className="h-2 max-h-2 hidden md:block" />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
