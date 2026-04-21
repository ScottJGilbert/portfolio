import { ExternalLink as ExternalLinkIconGlyph } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  type ExternalLink,
  externalIconMapActionbar,
} from "@/lib/site-content";

interface TopActionBarProps {
  externalLinks: readonly ExternalLink[];
}

export function TopActionBar({ externalLinks }: TopActionBarProps) {
  return (
    <header
      className="hidden items-center justify-end gap-(--space-xs) border-b border-outline-ghost bg-surface/85 px-6 py-3 shadow-ambient backdrop-blur-xl supports-backdrop-filter:bg-surface/75 lg:flex"
      aria-label="Top action bar"
    >
      {externalLinks.map((link) => {
        const Icon = externalIconMapActionbar[link.icon];

        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-(--space-2xs) rounded-md border border-outline-ghost bg-surface/75 px-(--space-xs) py-(--space-2xs) text-sm text-foreground/90 backdrop-blur transition-colors hover:bg-surface-alt/75 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Icon className="size-4" aria-hidden />
            <span>{link.label}</span>
            <ExternalLinkIconGlyph
              className="size-3.5 text-muted/85"
              aria-hidden
            />
          </a>
        );
      })}
      <ThemeToggle />
    </header>
  );
}
