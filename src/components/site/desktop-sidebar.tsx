"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/components/ui/nav-item";
import {
  type ExternalLink,
  type SiteNavItem,
  navIconMap,
  externalIconMapSidebar,
} from "@/lib/site-content";

interface DesktopSidebarProps {
  navItems: readonly SiteNavItem[];
  externalLinks: readonly ExternalLink[];
  siteTitle?: string;
  siteTagline?: string;
}

const isItemActive = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

export function DesktopSidebar({
  navItems,
  externalLinks,
  siteTitle = "Portfolio",
  siteTagline = "Personal content system",
}: DesktopSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="hidden w-72 shrink-0 border-r border-outline-ghost bg-surface/80 px-8 py-8 shadow-ambient backdrop-blur-xl supports-backdrop-filter:bg-surface/70 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:gap-12"
      aria-label="Desktop sidebar"
    >
      <div className="space-y-1">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          {siteTitle}
        </Link>
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
          {siteTagline}
        </p>
      </div>

      <nav className="flex flex-col gap-6" aria-label="Primary">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-muted">
          Navigation
        </p>
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = navIconMap[item.icon];

            return (
              <li key={item.href}>
                <NavItem
                  href={item.href}
                  active={isItemActive(pathname, item.href)}
                  className="w-full justify-start"
                  icon={<Icon className="size-4" />}
                >
                  {item.label}
                </NavItem>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto space-y-6">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-muted">
          Connect
        </p>
        <ul className="space-y-4">
          {externalLinks.map((link) => {
            const Icon = externalIconMapSidebar[link.icon];

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={link.label}
                >
                  <Icon className="size-4" aria-hidden />
                  <span>{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
