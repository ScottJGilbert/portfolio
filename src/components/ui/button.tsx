import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const buttonBaseClassName =
  "inline-flex items-center justify-center gap-[var(--space-xs)] rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const buttonVariantClassName: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-primary text-primary-foreground hover:opacity-90",
  secondary: "border border-border bg-surface text-foreground hover:bg-surface-alt",
  ghost:
    "border border-transparent bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
};

const buttonSizeClassName: Record<ButtonSize, string> = {
  sm: "px-[var(--space-sm)] py-[var(--space-xs)] text-sm",
  md: "px-[var(--space-md)] py-[var(--space-sm)] text-sm",
  lg: "px-[var(--space-lg)] py-[var(--space-sm)] text-base",
};

const joinClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(" ");

export function Button({
  className,
  type = "button",
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={joinClassNames(
        buttonBaseClassName,
        buttonVariantClassName[variant],
        buttonSizeClassName[size],
        className,
      )}
      {...props}
    />
  );
}

