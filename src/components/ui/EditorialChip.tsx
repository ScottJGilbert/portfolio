import React from 'react';
import { TonalSurface } from './TonalSurface';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EditorialChipProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * EditorialChip is used for categorization and metadata tags.
 *
 * Design Spec:
 * - Surface: TonalSurface tier="highest"
 * - Shape: Pill (md radius - 0.75rem)
 * - Text: primary
 * - Contrast: High contrast
 */
export const EditorialChip = ({ children, className }: EditorialChipProps) => {
  return (
    <TonalSurface
      tier="highest"
      className={cn(
        'inline-flex items-center justify-center px-3 py-1 rounded-[0.75rem] text-primary text-xs font-semibold tracking-wide',
        className
      )}
    >
      {children}
    </TonalSurface>
  );
};
