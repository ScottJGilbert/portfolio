"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { TonalSurface } from '@/components/ui/TonalSurface';

const PRIMARY_NAV = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Work', href: '/work' },
  { name: 'Journal', href: '/journal' },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Glassmorphic Header */}
      <header className="lg:hidden fixed top-4 left-4 right-4 z-50">
        <div className={cn(
          "flex items-center justify-between px-6 py-4 rounded-2xl",
          "bg-surface/70 backdrop-blur-xl shadow-xl",
          "border border-white/10"
        )}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-primary rounded-full" />
            <span className="font-bold text-md tracking-tight">The Curator</span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className={cn("h-0.5 w-full bg-current transition-transform", isOpen && "rotate-45 translate-y-2")} />
              <span className={cn("h-0.5 w-full bg-current transition-opacity", isOpen && "opacity-0")} />
              <span className={cn("h-0.5 w-full bg-current transition-transform", isOpen && "-rotate-45 -translate-y-2")} />
            </div>
          </button>
        </div>
      </header>

      {/* Full-screen Overlay Menu */}
      {isOpen && (
        <TonalSurface
          tier="base"
          className="fixed inset-0 z-[60] p-8 flex flex-col animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="p-4 text-primary font-medium uppercase tracking-widest text-xs"
            >
              Close
            </button>
          </div>

          <nav className="flex flex-col gap-12 mt-12">
            <ul className="flex flex-col gap-8">
              {PRIMARY_NAV.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-bold tracking-tighter hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-6 pt-8 border-t border-primary/10">
              <Link href="https://github.com" className="text-sm font-medium text-primary/60 hover:text-primary">GitHub</Link>
              <Link href="https://linkedin.com" className="text-sm font-medium text-primary/60 hover:text-primary">LinkedIn</Link>
              <Link href="mailto:hello@example.com" className="text-sm font-medium text-primary/60 hover:text-primary">Email</Link>
            </div>
          </nav>
        </TonalSurface>
      )}
    </>
  );
};
