import Link from "next/link";

const content = {
  name: "Scott Gilbert",
  statement: "© 2026 Scott Gilbert.",
  sections: [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "External",
      links: [
        { label: "Blog", href: "https://blog.scottgilbert.dev" }, // Example external link
        { label: "Resume", href: "/resume" },
        { label: "GitHub", href: "https://github.com/scottgilbert" },
        { label: "LinkedIn", href: "https://linkedin.com/in/scottgilbert" },
        { label: "Email", href: "mailto:scott@gilbert.dev" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Attributions", href: "/attributions" },
        { label: "Terms", href: "/legal#terms" },
        { label: "Privacy", href: "/legal#privacy" },
        { label: "Sitemap", href: "/sitemap" },
        { label: "RSS", href: "/rss" },
      ],
    },
  ],
};

export function SiteFooter() {
  return (
    <footer className="px-6 py-12 md:px-12" aria-label="Site footer">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 border-t border-outline-ghost/70 px-2 pt-10 text-center backdrop-blur md:grid md:grid-cols-4 md:text-left md:gap-x-8">
        <div className="space-y-2">
          <p className="font-medium text-foreground">{content.name}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {content.statement}
          </p>
        </div}
        {content.sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-[0.16em] text-muted font-medium">
              {section.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
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
