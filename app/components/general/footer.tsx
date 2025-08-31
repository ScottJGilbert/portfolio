"use client";

import Link from "next/link";
import { SignIn, SignOut } from "../../ui/sign-in-out";
import { Suspense } from "react";
import Image from "next/image";
import Button from "@/app/ui/button";

const linkSections = [
  {
    title: "Navigation",
    links: [
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Blog", href: "/blog" },
      { name: "Resume", href: "/resume" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "External Links",
    links: [
      {
        name: "GitHub",
        href: "https://github.com/ScottJGilbert",
      },
      {
        name: "Linkedin",
        href: "https://www.linkedin.com/in/scott-j-gilbert/",
      },
      {
        name: "Email",
        href: "mailto:scott7gilbert@gmail.com",
      },
    ],
  },
  {
    title: "More",
    links: [
      { name: "Attributions", href: "/attributions" },
      { name: "Images", href: "/images" },
      { name: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

export default function Footer() {
  return (
    <div className="flex md:min-h-screen min-h-[calc(100vh-6.5rem)]">
      <div className="flex-1 py-4 min-h-full">
        <div className="h-full p-3 bg-green-950 rounded-4xl border-solid border-1 border-gray-50">
          <div className="h-full flex flex-col justify-between md:mx-16 mx-8 mb-4">
            <div className="min-h-64 flex-1 flex flex-col justify-center items-center">
              <div className="flex flex-col gap-8">
                <h2 className="text-center hidden md:block">
                  Ready to make something awesome?
                </h2>
                <h1 className="text-center mt-8">
                  <b>Let&apos;s get in touch!</b>
                </h1>
                <Link className="block mx-auto my-4" href="/contact">
                  <Button className="block mx-auto">Contact Me →</Button>
                </Link>
              </div>
            </div>
            <hr className="mb-4"></hr>
            <div className="flex flex-col md:flex-row items-stretch justify-center xl:justify-between my-4">
              <div className="flex flex-col justify-between">
                <Image
                  src="/profileIcon.svg"
                  alt="Profile Icon"
                  width={730}
                  height={530}
                  className="mb-4 md:mb-0 h-32 w-44 max-w-full m-0 hidden md:block mx-auto xl:inline"
                />
                <p
                  suppressHydrationWarning
                  className="hidden md:block my-4 text-center"
                >
                  © {new Date().getFullYear()} Scott Gilbert
                </p>
              </div>
              <div className="flex flex-wrap flex-col md:flex-row justify-center xl:gap-16 lg:gap-16 md:gap-8 gap-4 text-lg">
                {linkSections.map((section) => (
                  <div key={section.title}>
                    <p className="mb-2 md:hidden block text-center">
                      <b>{section.title}</b>
                    </p>
                    <p className="mb-2 hidden md:block">
                      <b>{section.title}</b>
                    </p>
                    <div className="flex flex-row justify-center md:flex-col flex-wrap gap-4 md:gap-2">
                      {section.links.map((link) => {
                        return (
                          <div key={link.name + "link"}>
                            <Link
                              href={link.href}
                              className="flex gap-2 hover:text-gray-400"
                              {...(section.title === "External Links"
                                ? { target: "_blank" }
                                : {})}
                            >
                              <span className="inline-flex flex-col justify-center">
                                {link.name}
                              </span>
                            </Link>
                          </div>
                        );
                      })}
                      {section.title === "More" && (
                        <Suspense>
                          <span className="flex gap-2 hover:text-gray-400 hover:cursor-pointer">
                            <SignIn />
                            <SignOut />
                          </span>
                        </Suspense>
                      )}
                    </div>
                  </div>
                ))}
                <p
                  suppressHydrationWarning
                  className="block md:hidden my-4 text-center"
                >
                  © {new Date().getFullYear()} Scott Gilbert
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
