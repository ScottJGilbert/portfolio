import Link from "next/link";

const content = {
  name: "Scott Gilbert",
  statement: "© 2026 Scott Gilbert.",
  sections: [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "/", external: false },
        { label: "About", href: "/about", external: false },
        { label: "Projects", href: "/projects", external: false },
        { label: "Contact", href: "/contact", external: false },
      ],
    },
    {
      title: "External",
      links: [
        {
          label: "Blog",
          href: "https://blog.scottgilbert.dev",
          external: true,
        }, // Example external link
        { label: "Resume", href: "/resume", external: true },
        {
          label: "GitHub",
          href: "https://github.com/scottgilbert",
          external: true,
        },
        {
          label: "LinkedIn",
          href: "https://linkedin.com/in/scottgilbert",
          external: true,
        },
        {
          label: "Email",
          href: "mailto:hello@scottgilbert.dev",
          external: true,
        },
      ],
    },
    {
      title: "Other",
      links: [
        { label: "Attributions", href: "/attributions", external: false },
        { label: "Terms", href: "/legal#terms", external: false },
        { label: "Privacy", href: "/legal#privacy", external: false },
        { label: "Sitemap", href: "/sitemap.xml", external: true },
        { label: "RSS", href: "/rss", external: true },
      ],
    },
  ],
};

export function SiteFooter() {
  return (
    <footer className="px-6 py-12 md:px-12" aria-label="Site footer">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 border-t border-outline-ghost/70 px-2 pt-10 text-center backdrop-blur md:flex-row md:justify-between md:text-left md:gap-x-8">
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
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
