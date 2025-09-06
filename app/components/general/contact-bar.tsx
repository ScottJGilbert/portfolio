import {
  EnvelopeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { Bounce } from "../motion/transitions";

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
  { name: "Email", href: "mailto:scott7gilbert@gmail.com", icon: EnvelopeIcon },
  { name: "Resume", href: "/resume.pdf", icon: DocumentDuplicateIcon },
];

export default function Contactbar() {
  return (
    <div>
      <p className="text-lg">External Links</p>
      <hr className="mb-4 mt-2"></hr>
      <div className="grid grid-cols-2 md:flex flex-col gap-4">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Bounce key={link.name}>
              <Link
                href={link.href}
                className={
                  "flex h-[48px] grow items-center justify-center gap-2 rounded-md py-3 text-lg font-medium rounded-l-full rounded-r-full border-solid border-1 border-gray-50 hover:bg-blue-950 hover:text-gray-50 md:flex-none md:justify-between md:p-2"
                }
                target="_blank"
              >
                <LinkIcon className="w-6" />
                <p className="block">{link.name}</p>
              </Link>
            </Bounce>
          );
        })}
      </div>
    </div>
  );
}
