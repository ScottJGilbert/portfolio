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
  NotebookPen,
  type LucideIcon,
  UserRound,
} from "lucide-react";
import { NavItem } from "@/components/ui/nav-item";
import type { ExternalLink, ExternalLinkIcon, SiteNavIcon, SiteNavItem } from "@/lib/site-content";

interface DesktopSidebarProps {
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

export function DesktopSidebar({
  navItems,
  externalLinks,
  siteTitle = "Portfolio",
  siteTagline = "Personal content system",
}: DesktopSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="hidden w-72 shrink-0 border-r border-border bg-surface/70 px-6 py-8 lg:flex lg:flex-col"
      aria-label="Desktop sidebar"
    >
      <div className="space-y-[var(--space-xs)]">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {siteTitle}
        </Link>
        <p className="text-sm text-muted">{siteTagline}</p>
      </div>

      <nav className="mt-[var(--space-xl)] flex flex-col gap-[var(--space-xs)]" aria-label="Primary">
        {navItems.map((item) => {
          const Icon = navIconMap[item.icon];

          return (
            <NavItem
              key={item.href}
              href={item.href}
              active={isItemActive(pathname, item.href)}
              className="w-full justify-start"
              icon={<Icon className="size-4" />}
            >
              {item.label}
            </NavItem>
          );
        })}
      </nav>

      <div className="mt-auto space-y-[var(--space-sm)]">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Connect</p>
        <ul className="flex flex-wrap gap-[var(--space-xs)]">
          {externalLinks.map((link) => {
            const Icon = externalIconMap[link.icon];

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={link.label}
                >
                  <Icon className="size-4" aria-hidden />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
