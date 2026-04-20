import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonVariant } from "./button";

type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: ReactNode;
  label: string;
  variant?: ButtonVariant;
  size?: IconButtonSize;
}

const iconButtonBaseClassName =
  "inline-flex items-center justify-center rounded-md border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const iconButtonVariantClassName: Record<ButtonVariant, string> = {
  primary:
    "border-primary/25 bg-gradient-to-b from-primary to-primary-container text-primary-foreground hover:brightness-105",
  secondary:
    "border-outline-ghost bg-surface/75 text-primary backdrop-blur hover:bg-primary-container/50",
  ghost:
    "border-transparent bg-transparent text-foreground/75 hover:border-outline-ghost hover:bg-surface-alt/65 hover:text-foreground",
};

const iconButtonSizeClassName: Record<IconButtonSize, string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

const joinClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(" ");

export function IconButton({
  className,
  icon,
  label,
  size = "md",
  type = "button",
  variant = "ghost",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={joinClassNames(
        iconButtonBaseClassName,
        iconButtonVariantClassName[variant],
        iconButtonSizeClassName[size],
        className,
      )}
      {...props}
    >
      <span aria-hidden>{icon}</span>
      <span className="sr-only">{label}</span>
    </button>
  );
}

