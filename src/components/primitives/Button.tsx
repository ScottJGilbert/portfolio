import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className, ...props }: Props) {
  return (
    <button
      className={cn(
        "rounded-full px-4 py-2 text-sm transition",
        variant === "primary" && "bg-[var(--primary)] text-[var(--surface)]",
        variant === "ghost" &&
          "bg-transparent border border-[var(--outline-ghost)] text-[var(--primary)]",
        className
      )}
      {...props}
    />
  );
}
