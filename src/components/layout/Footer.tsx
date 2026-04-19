import React from 'react';
import Link from 'next/link';
import { TonalSurface } from '@/components/ui/TonalSurface';

export const Footer = () => {
  return (
    <TonalSurface tier="low" className="w-full py-6 px-8">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-xs font-medium text-primary/40">
          © {new Date().getFullYear()} The Curator. Built with intentionality.
        </div>

        <nav className="flex gap-6">
          <Link href="/legal" className="text-xs font-medium text-primary/60 hover:text-primary transition-colors">
            Legal
          </Link>
          <Link href="/privacy" className="text-xs font-medium text-primary/60 hover:text-primary transition-colors">
            Privacy
          </Link>
        </nav>
      </div>
    </TonalSurface>
  );
};
