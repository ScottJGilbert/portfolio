import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const PRIMARY_NAV = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Work', href: '/work' },
  { name: 'Journal', href: '/journal' },
];

const EXTERNAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com', external: true },
  { name: 'LinkedIn', href: 'https://linkedin.com', external: true },
  { name: 'Socials', href: 'https://twitter.com', external: true },
  { name: 'Email', href: 'mailto:hello@example.com', external: true },
];

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 p-8 justify-between overflow-y-auto">
      <div className="flex flex-col gap-16">
        {/* Brand/Logo Area */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-full" />
          <span className="font-bold text-lg tracking-tight">The Curator</span>
        </div>

        {/* Tier 1: Primary Navigation */}
        <nav className="flex flex-col gap-4">
          <div className="text-xs font-medium uppercase tracking-widest text-primary/60 mb-4">
            Navigation
          </div>
          <ul className="flex flex-col gap-3">
            {PRIMARY_NAV.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    "block py-1"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Tier 2: External Links */}
      <nav className="flex flex-col gap-4">
        <div className="text-xs font-medium uppercase tracking-widest text-primary/60 mb-4">
          Connect
        </div>
        <ul className="flex flex-col gap-3">
          {EXTERNAL_LINKS.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "text-xs font-medium text-primary/70 transition-colors hover:text-primary",
                  "block py-1"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
