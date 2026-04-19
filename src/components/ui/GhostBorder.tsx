import React from 'react';
import { cn } from '@/lib/utils';

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
