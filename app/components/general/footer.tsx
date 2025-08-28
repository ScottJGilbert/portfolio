"use client";

import Link from "next/link";
import { SignIn, SignOut } from "../../ui/sign-in-out";
import { Suspense } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import Button from "@/app/ui/button";

const links = [
  { name: "Attributions", href: "/attributions" },
  { name: "Images", href: "/images" },
  { name: "Sitemap", href: "/sitemap.xml" },
];

const navigationLinks = [
  { name: "About", href: "/about", icon: UserIcon },
  { name: "Projects", href: "/projects", icon: BriefcaseIcon },
  { name: "Blog", href: "/blog", icon: ChatBubbleLeftRightIcon },
  { name: "Resume", href: "/resume", icon: DocumentDuplicateIcon },
  { name: "Contact", href: "/contact", icon: PhoneIcon },
];

const contactLinks = [
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
];

export default function Footer() {
  return (
    <div className="md:min-h-screen min-h-[calc(100vh-6.5rem)]">
      <div className="py-4 h-full">
        <div className="h-full p-3 bg-green-950 rounded-4xl border-solid border-1 border-gray-50">
          <div className="h-full flex flex-col justify-between md:mx-16 mx-8 mb-4">
            <div className="min-h-64 flex-1 flex flex-col justify-center items-center">
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-center">
                    Ready to make something awesome?
                  </h2>
                  <h1 className="text-center">
                    <b>Let&apos;s get in touch!</b>
                  </h1>
                </div>
                <Link className="block mx-auto my-4" href="/contact">
                  <Button className="block mx-auto">Contact Me →</Button>
                </Link>
              </div>
            </div>
            <hr className="mb-4"></hr>
            <div className="flex items-stretch justify-between my-4">
              <div className="flex flex-col justify-between">
                <Image
                  src="/profileIcon.svg"
                  alt="Profile Icon"
                  width={730}
                  height={530}
                  className="h-32 w-44 m-0 inline"
                />
                <p suppressHydrationWarning className="my-4 text-center">
                  © {new Date().getFullYear()} Scott Gilbert
                </p>
              </div>
              <div className="flex xl:gap-16 lg:gap-16 md:gap-8 gap-4 text-lg">
                <div className="flex flex-col gap-2">
                  <p>
                    <b>Navigation</b>
                  </p>
                  {navigationLinks.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                      <div key={link.name + "link"}>
                        <Link
                          href={link.href}
                          className="flex gap-2 hover:text-gray-400"
                        >
                          <LinkIcon className="w-6 inline" />
                          <span className="inline-flex flex-col justify-center">
                            {link.name}
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col gap-2">
                  <p>
                    <b>External Links</b>
                  </p>
                  {contactLinks.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                      <div key={link.name + "link"}>
                        <Link
                          href={link.href}
                          className="flex gap-2 hover:text-gray-400"
                          target="_blank"
                        >
                          <LinkIcon className="w-6 inline" />
                          <span className="inline-flex flex-col justify-center">
                            {link.name}
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col gap-2">
                  <p>
                    <b>More</b>
                  </p>
                  {links.map((link) => {
                    return (
                      <Link
                        key={link.name + "link"}
                        className="flex gap-2 hover:text-gray-400"
                        href={link.href}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                  <Suspense>
                    <span className="flex gap-2 hover:text-gray-400 hover:cursor-pointer">
                      <SignIn />
                      <SignOut />
                    </span>
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
