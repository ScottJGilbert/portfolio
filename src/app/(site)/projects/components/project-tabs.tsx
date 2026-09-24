"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface ProjectTab {
  href: string;
  label: string;
}

export function ProjectTabs({ tabs }: { tabs: readonly ProjectTab[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Project sections"
      className="flex flex-wrap gap-2 border-b border-outline-ghost pb-3"
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted hover:bg-surface-alt hover:text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
