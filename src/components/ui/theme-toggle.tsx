"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className={`inline-flex items-center justify-center rounded-md border border-outline-ghost bg-surface/75 p-2 text-foreground/80 backdrop-blur transition-colors hover:bg-surface-alt/75 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`.trim()}
      aria-label={`Switch to ${nextTheme} mode`}
    >
      {isDark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
      <span className="sr-only">Switch to {nextTheme} mode</span>
    </button>
  );
}
