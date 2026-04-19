import React from 'react';
import { cn } from '@/lib/utils';

interface AmbientShadowProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * AmbientShadow applies the tinted, high-blur shadow defined in the theme tokens.
 */
export const AmbientShadow = ({ children, className }: AmbientShadowProps) => {
  return (
    <div className={cn('ambient-shadow', className)}>
      {children}
    </div>
  );
};
