"use client";

import React, { useState } from 'react';
import { TonalSurface } from './TonalSurface';
import { cn } from '@/lib/utils';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  initialTier?: 'base' | 'low' | 'high' | 'highest';
  hoverTier?: 'base' | 'low' | 'high' | 'highest';
}

/**
 * BentoCard is a signature container for the grid layout.
 * It uses TonalSurface for its base and implements a "lift" hover effect
 * by transitioning between surface tiers.
 *
 * Design Spec:
 * - Corner Radius: xl (1.5rem)
 * - Hover: Shift surface tier (e.g., high -> highest)
 * - Rule: No-Line (handled by TonalSurface's soft boundaries)
 */
export const BentoCard = ({
  children,
  className,
  initialTier = 'high',
  hoverTier = 'highest',
}: BentoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn('group cursor-pointer', className)}
    >
      <TonalSurface
        tier={isHovered ? hoverTier : initialTier}
        className="rounded-xl overflow-hidden"
      >
        {children}
      </TonalSurface>
    </div>
  );
};
