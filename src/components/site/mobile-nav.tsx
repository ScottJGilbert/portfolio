"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconButton } from "@/components/ui/icon-button";
import { NavItem } from "@/components/ui/nav-item";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { ExternalLink, SiteNavItem } from "@/lib/site-content";
import { FaBars as MenuIcon } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import clsx from "clsx";

interface MobileNavProps {
  navItems: readonly SiteNavItem[];
  externalLinks: readonly ExternalLink[];
  promiseLink: ExternalLink;
  siteTitle?: string;
  siteTagline?: string;
}

const isItemActive = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

export function MobileNav({
  navItems,
  externalLinks,
  promiseLink,
  siteTitle = "Portfolio",
  siteTagline = "Personal content system",
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 border-b border-outline-ghost bg-surface/85 shadow-ambient supports-backdrop-filter:bg-surface/75 lg:hidden"
      aria-label="Mobile navigation"
    >
      <div
        className={clsx(
          "relative flex z-60 h-16 items-center justify-between gap-(--space-sm) px-6 backdrop-blur-xl border-b-gray-200",
          { "border-b": isOpen, "border-b-0": !isOpen },
        )}
      >
        <div className="flex flex-col">
          <Link href="/" className="text-sm font-bold tracking-tight">
            {siteTitle}
          </Link>
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted">
            {siteTagline}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <IconButton
            icon={
              isOpen ? (
                <BsX className="size-4" />
              ) : (
                <MenuIcon className="size-4" />
              )
            }
            label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-controls="mobile-site-menu"
            variant="secondary"
            size="sm"
          />
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-site-menu"
            className="fixed inset-x-0 top-16 z-40 space-y-8 border-b border-outline-ghost bg-surface/90 px-6 py-8 backdrop-blur-xl supports-backdrop-filter:bg-surface/80 lg:hidden"
            initial={{ y: "-140%" }}
            animate={{ y: 0 }}
            exit={{ y: "-140%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
          >
            <div className="space-y-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted">
                Navigation
              </p>
              <ul className="space-y-1">
                {navItems.map((item) => {
                  return (
                    <li key={item.href}>
                      <NavItem
                        href={item.href}
                        active={isItemActive(pathname, item.href)}
                        className="w-full justify-start py-3"
                        icon={item.icon}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </NavItem>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted">
                Connect
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {externalLinks.map((link) => {
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-3 text-sm text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <span
                          className="inline-flex size-4 items-center justify-center"
                          aria-hidden
                          suppressHydrationWarning
                        >
                          {link.icon}
                        </span>
                        <span>{link.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="bg-foreground/10 -my-2 py-2 border border-outline-ghost rounded-lg text-center space-y-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted">
                Need someone to talk to?
              </p>
              <ul className="flex justify-center">
                <li key={promiseLink.href}>
                  <a
                    href={promiseLink.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-3 text-sm text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span
                      className="inline-flex size-4 items-center justify-center"
                      aria-hidden
                      suppressHydrationWarning
                    >
                      {promiseLink.icon}
                    </span>
                    <span>{promiseLink.label}</span>
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
