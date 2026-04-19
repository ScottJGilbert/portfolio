import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TonalTier = 'base' | 'low' | 'high' | 'highest';

interface TonalSurfaceProps {
  tier?: TonalTier;
  children: React.ReactNode;
  className?: string;
}

/**
 * TonalSurface provides a standardized background shift based on the tier.
 * Boundaries are softened using a subtle inner shadow/gradient to avoid hard edges,
 * adhering to the "Organic Brutalism" design spec.
 */
export const TonalSurface = ({
  tier = 'base',
  children,
  className
}: TonalSurfaceProps) => {
  const tierMap: Record<TonalTier, string> = {
    base: 'bg-surface',
    low: 'bg-surface-container-low',
    high: 'bg-surface-container-high',
    highest: 'bg-surface-container-highest',
  };

  return (
    <div
      className={cn(
        'relative transition-colors duration-300 ease-in-out',
        tierMap[tier],
        className
      )}
    >
      {/*
        Subtle boundary transition:
        An inset box-shadow or linear-gradient overlay that softens the edge.
        Using a very low opacity gradient to avoid the "hard line" look.
      */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/[0.02] rounded-inherit" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
