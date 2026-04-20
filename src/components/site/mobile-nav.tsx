"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AtSign,
  BriefcaseBusiness,
  Globe,
  House,
  Link2,
  Mail,
  Menu,
  NotebookPen,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { NavItem } from "@/components/ui/nav-item";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { ExternalLink, ExternalLinkIcon, SiteNavIcon, SiteNavItem } from "@/lib/site-content";

interface MobileNavProps {
  navItems: readonly SiteNavItem[];
  externalLinks: readonly ExternalLink[];
  siteTitle?: string;
}

const navIconMap: Record<SiteNavIcon, LucideIcon> = {
  home: House,
  work: BriefcaseBusiness,
  journal: NotebookPen,
  about: UserRound,
  contact: Mail,
};

const externalIconMap: Record<ExternalLinkIcon, LucideIcon> = {
  github: Link2,
  linkedin: Globe,
  email: AtSign,
};

const isItemActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function MobileNav({ navItems, externalLinks, siteTitle = "Portfolio" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-40 border-b border-border bg-background/90 px-4 py-3 backdrop-blur lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-between gap-[var(--space-sm)]">
        <Link href="/" className="text-base font-semibold tracking-tight">
          {siteTitle}
        </Link>
        <div className="flex items-center gap-[var(--space-xs)]">
          <ThemeToggle />
          <IconButton
            icon={isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-controls="mobile-site-menu"
            variant="secondary"
            size="sm"
          />
        </div>
      </div>

      {isOpen ? (
        <div
          id="mobile-site-menu"
          className="mt-[var(--space-sm)] space-y-[var(--space-md)] rounded-xl border border-border bg-surface p-[var(--space-sm)] shadow-sm"
        >
          <div className="flex flex-col gap-[var(--space-xs)]">
            {navItems.map((item) => {
              const Icon = navIconMap[item.icon];

              return (
                <NavItem
                  key={item.href}
                  href={item.href}
                  active={isItemActive(pathname, item.href)}
                  className="w-full justify-start"
                  icon={<Icon className="size-4" />}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavItem>
              );
            })}
          </div>

          <ul className="flex flex-wrap gap-[var(--space-xs)] border-t border-border pt-[var(--space-sm)]">
            {externalLinks.map((link) => {
              const Icon = externalIconMap[link.icon];

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-[var(--space-2xs)] rounded-md border border-border px-[var(--space-xs)] py-[var(--space-2xs)] text-sm text-foreground transition-colors hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <Icon className="size-4" aria-hidden />
                    <span>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
