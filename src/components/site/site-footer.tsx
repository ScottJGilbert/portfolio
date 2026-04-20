import Link from "next/link";
import type { HomeFooterContent } from "@/lib/site-content";

interface SiteFooterProps {
  content: HomeFooterContent;
}

export function SiteFooter({ content }: SiteFooterProps) {
  return (
    <footer className="px-6 py-12 md:px-12" aria-label="Site footer">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-8 border-t border-border/70 px-2 pt-10 text-center md:flex-row md:px-8 md:text-left">
        <div className="space-y-2">
          <p className="font-medium text-foreground">{content.name}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-foreground/40">{content.statement}</p>
        </div>
        <nav aria-label="Footer links">
          <ul className="flex gap-8">
            {content.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs uppercase tracking-[0.16em] text-foreground/40 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

