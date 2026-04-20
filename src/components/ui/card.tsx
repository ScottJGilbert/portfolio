import type { HTMLAttributes } from "react";

type CardVariant = "surface" | "alt" | "outline";
type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
}

const cardBaseClassName = "rounded-xl border border-border text-foreground";

const cardVariantClassName: Record<CardVariant, string> = {
  surface: "bg-surface",
  alt: "bg-surface-alt",
  outline: "bg-transparent",
};

const cardPaddingClassName: Record<CardPadding, string> = {
  none: "",
  sm: "p-[var(--space-sm)]",
  md: "p-[var(--space-md)]",
  lg: "p-[var(--space-lg)]",
};

const joinClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(" ");

export function Card({
  children,
  className,
  padding = "md",
  variant = "surface",
  ...props
}: CardProps) {
  return (
    <div
      className={joinClassNames(
        cardBaseClassName,
        cardVariantClassName[variant],
        cardPaddingClassName[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

