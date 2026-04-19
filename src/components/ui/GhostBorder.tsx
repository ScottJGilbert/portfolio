import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GhostBorderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * GhostBorder applies the accessibility-driven low-opacity boundary utility.
 */
export const GhostBorder = ({ children, className }: GhostBorderProps) => {
  return (
    <div className={cn('ghost-border', className)}>
      {children}
    </div>
  );
};
