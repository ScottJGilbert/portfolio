import type { HTMLAttributes } from "react";

type ChipVariant = "neutral" | "accent" | "outline";
type ChipSize = "sm" | "md";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: ChipVariant;
  size?: ChipSize;
}

const chipBaseClassName =
  "inline-flex items-center rounded-full border font-medium leading-none";

const chipVariantClassName: Record<ChipVariant, string> = {
  neutral: "border-outline-ghost bg-surface-alt/80 text-foreground/85",
  accent: "border-primary/20 bg-primary-container/85 text-primary",
  outline: "border-outline-ghost bg-surface/55 text-muted",
};

const chipSizeClassName: Record<ChipSize, string> = {
  sm: "px-[var(--space-xs)] py-[var(--space-2xs)] text-xs",
  md: "px-[var(--space-sm)] py-[var(--space-xs)] text-sm",
};

const joinClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(" ");

export function Chip({
  children,
  className,
  size = "sm",
  variant = "neutral",
  ...props
}: ChipProps) {
  return (
    <span
      className={joinClassNames(
        chipBaseClassName,
        chipVariantClassName[variant],
        chipSizeClassName[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

