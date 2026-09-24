import Link from "next/link";
import { navItems, externalLinks } from "@/lib/site-content";

const content = {
  name: "Scott Gilbert",
  statement: "© 2026 Scott Gilbert.",
  sections: [
    {
      title: "Navigation",
      // Sourced from site-content.ts, the single source of truth also used
      // by the sidebar/mobile nav, so this can't drift out of sync with it.
      links: navItems.map((item) => ({
        label: item.label,
        href: item.href,
        external: false,
      })),
    },
    {
      title: "External",
      links: externalLinks.map((link) => ({
        label: link.label,
        href: link.href,
        external: true,
      })),
    },
    {
      title: "Other",
      links: [
        { label: "Attributions", href: "/attributions", external: false },
        { label: "Terms", href: "/legal#terms", external: false },
        { label: "Privacy", href: "/legal#privacy", external: false },
        { label: "Sitemap", href: "/sitemap.xml", external: true },
      ],
    },
  ],
};

export function SiteFooter({ useAnchors = false }: { useAnchors?: boolean }) {
  return (
    <footer className="px-6 py-12 md:px-12" aria-label="Site footer">
      <div className="flex flex-col gap-10 border-t border-outline-ghost/70 px-2 pt-10 text-center backdrop-blur md:flex-row md:justify-between md:text-left md:gap-x-8">
        <div className="space-y-2">
          <p className="font-medium text-foreground">{content.name}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {content.statement}
          </p>
        </div>
        {content.sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-[0.16em] text-muted font-medium">
              {section.title}
            </h3>
            <ul className="mx-auto md:mx-0 flex md:flex-col gap-4 md:gap-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  {useAnchors ? (
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-primary"
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-primary"
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
