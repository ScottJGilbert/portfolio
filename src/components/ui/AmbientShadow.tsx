import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
