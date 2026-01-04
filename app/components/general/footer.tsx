"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/app/ui/button";
import Switch from "@/app/ui/switch";
import { usePageLoading } from "@/app/providers/loading-provider";
import BufferedLink from "@/app/ui/buffered-link";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const linkSections = [
  {
    title: "Navigation",
    links: [
      { name: "About", href: "/about", external: false },
      { name: "Skills", href: "/skills", external: false },
      { name: "Projects", href: "/projects", external: false },
      { name: "Blog", href: "/blog", external: false },
    ],
    adminOnly: false,
  },
  {
    title: "External Links",
    links: [
      {
        name: "GitHub",
        href: "https://github.com/ScottJGilbert",
        external: true,
      },
      {
        name: "Linkedin",
        href: "https://www.linkedin.com/in/scott-j-gilbert/",
        external: true,
      },
      { name: "Email", href: "mailto:scott7gilbert@gmail.com", external: true },
      { name: "Resume", href: "/resume.pdf", external: true },
    ],
    adminOnly: false,
  },
  {
    title: "More",
    links: [
      { name: "Attributions", href: "/attributions", external: false },
      { name: "Legal", href: "/legal", external: false },
      { name: "Sitemap", href: "/sitemap.xml", external: true },
      { name: "RSS", href: "/rss.xml", external: true },
    ],
    adminOnly: false,
  },
  {
    title: "Admin",
    links: [
      { name: "Home", href: "/admin/", external: false },
      { name: "Images", href: "/admin/images", external: false },
      { name: "Users", href: "/admin/users", external: false },
    ],
    adminOnly: true,
  },
];

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { setIsLoading } = usePageLoading();

  const { data: session } = authClient.useSession();

  const admin = session?.user?.admin;

  // Sync theme on mount
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const stored = localStorage.theme;
    const activeDark = stored === "dark" || (!stored && prefersDark);

    setIsDarkMode(activeDark);
    document.documentElement.classList.toggle("dark", activeDark);
  }, []);

  const handleToggle = (on: boolean) => {
    setIsDarkMode(on);
    if (on) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  return (
    <div className="flex md:min-h-screen min-h-[calc(100vh-6.5rem)]">
      <div className="flex-1 py-4 min-h-full">
        <div className="h-full p-3 rounded-4xl">
          <div className="h-full flex flex-col justify-between md:mx-8 mx-4 mb-4">
            {/* CTA Section */}
            <div className="min-h-64 flex-1 flex flex-col justify-center items-center">
              <div className="flex flex-col gap-8">
                <h2 className="text-center hidden md:block">
                  Ready to make something awesome?
                </h2>
                <h1 className="text-center mt-8">
                  <b>Let&apos;s get in touch!</b>
                </h1>
                <Link
                  className="block mx-auto my-4"
                  href="mailto:scott7gilbert@gmail.com"
                  target="_blank"
                >
                  <Button className="block mx-auto">Contact Me →</Button>
                </Link>
              </div>
            </div>

            <hr className="mb-4" />

            {/* Links + Switch */}
            <div className="flex flex-col md:flex-row items-start justify-center xl:justify-between my-4">
              <div className="flex flex-col justify-between items-start">
                <Image
                  src="/profileIcon.svg"
                  alt="Profile Icon"
                  width={730}
                  height={530}
                  className="mb-4 md:mb-0 h-32 w-44 max-w-full hidden md:block xl:inline"
                />
                <span className="inline-flex items-center gap-8 my-4">
                  <p
                    suppressHydrationWarning
                    className="hidden md:block text-center"
                  >
                    © {new Date().getFullYear()} Scott Gilbert
                  </p>
                  <Switch
                    checked={isDarkMode}
                    onChange={(on) => handleToggle(on)}
                    className="hidden md:inline mx-auto xl:inline"
                  />
                </span>
              </div>

              {/* Link Sections */}
              <div className="flex flex-wrap flex-col md:flex-row justify-center xl:gap-16 lg:gap-16 md:gap-8 gap-6 text-lg">
                {linkSections.map((section) => (
                  <React.Fragment key={section.title}>
                    {(!section.adminOnly || admin) && (
                      <div>
                        <p className="mb-2 md:hidden block text-center">
                          <b>{section.title}</b>
                        </p>
                        <p className="mb-2 hidden md:block">
                          <b>{section.title}</b>
                        </p>
                        <div className="flex flex-row justify-center md:flex-col flex-wrap gap-4 md:gap-2">
                          {section.links.map((link) => (
                            <div key={link.name + "link"}>
                              <BufferedLink
                                href={link.href}
                                doOnClick={() => {
                                  if (section.title !== "External Links") {
                                    setIsLoading(true);
                                  }
                                }}
                                className="flex gap-2 hover:text-gray-400"
                                target={
                                  section.title === "External Links" ||
                                  link.external
                                    ? "_blank"
                                    : ""
                                }
                              >
                                <span className="inline-flex flex-col justify-center">
                                  {link.name}
                                </span>
                              </BufferedLink>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}

                {/* Mobile Switch + Copyright */}
                <p
                  suppressHydrationWarning
                  className="block md:hidden my-4 text-center"
                >
                  © {new Date().getFullYear()} Scott Gilbert
                </p>
                <Switch
                  checked={isDarkMode}
                  onChange={(on) => handleToggle(on)}
                  className="md:hidden inline mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
