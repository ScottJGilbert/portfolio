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
  siteTagline?: string;
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

export function MobileNav({
  navItems,
  externalLinks,
  siteTitle = "Portfolio",
  siteTagline = "Personal content system",
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-40 border-b border-border/60 bg-surface/90 backdrop-blur lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex h-16 items-center justify-between gap-[var(--space-sm)] px-6">
        <div className="flex flex-col">
          <Link href="/" className="text-sm font-bold tracking-tight">
            {siteTitle}
          </Link>
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-foreground/50">
            {siteTagline}
          </p>
        </div>
        <div className="flex items-center gap-3">
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
          className="space-y-8 border-t border-border/60 bg-surface px-6 py-8 shadow-xl"
        >
          <div className="space-y-4">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted">Navigation</p>
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = navIconMap[item.icon];

                return (
                  <li key={item.href}>
                    <NavItem
                      href={item.href}
                      active={isItemActive(pathname, item.href)}
                      className="w-full justify-start py-3"
                      icon={<Icon className="size-4" />}
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
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted">Connect</p>
            <ul className="grid grid-cols-2 gap-4">
              {externalLinks.map((link) => {
                const Icon = externalIconMap[link.icon];

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-3 text-sm text-foreground/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <Icon className="size-4" aria-hidden />
                      <span>{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center justify-between border-t border-border/60 pt-4">
            <p className="text-sm text-foreground/70">Appearance</p>
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </nav>
  );
}
