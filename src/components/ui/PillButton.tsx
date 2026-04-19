import React from 'react';
import { GhostBorder } from './GhostBorder';
import { cn } from '@/lib/utils';

interface PillButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

/**
 * PillButton is a high-contrast call-to-action.
 *
 * Variants:
 * - Primary: Linear gradient (primary -> primary-container), white/sage text.
 * - Secondary: GhostBorder outline, primary text.
 *
 * Design Spec:
 * - Shape: Pill (rounded-full)
 * - No-Pure-Black: All colors derived from theme tokens.
 */
export const PillButton = ({
  children,
  onClick,
  className,
  variant = 'primary',
}: PillButtonProps) => {
  const variants = {
    primary: cn(
      'bg-gradient-to-br from-primary to-primary-container',
      'text-white/90 font-medium hover:brightness-110 active:brightness-95'
    ),
    secondary: cn(
      'text-primary font-medium',
      'hover:bg-primary/5 transition-colors'
    ),
  };

  const content = (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-6 py-2.5 rounded-full transition-all duration-200 inline-flex items-center justify-center',
        variants[variant],
        className
      )}>
      {children}
    </button>
  );

  if (variant === 'secondary') {
    return (
      <GhostBorder className="inline-block rounded-full">
        {content}
      </GhostBorder>
    );
  }

  return content;
};
