"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/components/ui/nav-item";
import { type ExternalLink, type SiteNavItem } from "@/lib/site-content";

interface DesktopSidebarProps {
  navItems: readonly SiteNavItem[];
  externalLinks: readonly ExternalLink[];
  promiseLink: ExternalLink;
  siteTitle?: string;
  siteTagline?: string;
  useAnchors?: boolean;
}

const isItemActive = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

export function DesktopSidebar({
  navItems,
  externalLinks,
  promiseLink,
  siteTitle = "Scott Gilbert",
  siteTagline = "Computer Engineer",
  useAnchors = false,
}: DesktopSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="hidden w-72 shrink-0 border-r border-outline-ghost bg-surface/80 px-8 py-8 shadow-ambient backdrop-blur-xl supports-backdrop-filter:bg-surface/70 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:gap-8"
      aria-label="Desktop sidebar"
    >
      <div className="space-y-1">
        {useAnchors ? (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a
            href="/"
            className="text-xl font-bold tracking-tight text-foreground"
          >
            {siteTitle}
          </a>
        ) : (
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground"
          >
            {siteTitle}
          </Link>
        )}
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
          {siteTagline}
        </p>
      </div>

      <nav className="flex flex-col gap-2" aria-label="Primary">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-muted">
          Navigation
        </p>
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => {
            // const Icon = item.icon;

            return (
              <li key={item.href}>
                <NavItem
                  href={item.href}
                  active={isItemActive(pathname, item.href)}
                  className="w-full justify-start"
                  icon={item.icon}
                  useAnchor={useAnchors}
                >
                  {item.label}
                </NavItem>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex flex-col gap-2" aria-label="Secondary">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-muted">
          Connect
        </p>
        <ul className="flex flex-col gap-2">
          {externalLinks.map((link) => {
            return (
              <li key={link.href}>
                <NavItem
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center gap-3 text-sm text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={link.label}
                  icon={link.icon}
                  useAnchor={useAnchors}
                >
                  <span>{link.label}</span>
                </NavItem>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className="bg-foreground/10 p-2 -my-2 -mx-1 text-center border border-outline-ghost rounded-lg flex flex-col gap-2"
        aria-label="Secondary"
      >
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-muted">
          Need someone to talk to?
        </p>
        <ul className="flex justify-center">
          <li key={promiseLink.href}>
            <NavItem
              href={promiseLink.href}
              target="_blank"
              rel="noreferrer"
              className="w-full px-4 inline-flex items-center gap-3 text-sm text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={promiseLink.label}
              icon={promiseLink.icon}
              useAnchor={useAnchors}
            >
              <span>{promiseLink.label}</span>
            </NavItem>
          </li>
        </ul>
      </div>
    </aside>
  );
}
