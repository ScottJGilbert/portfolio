import Link from "next/link";

const content = {
  name: "Scott Gilbert",
  statement: "© 2024 Scott Gilbert. Built for Systems.",
  links: [
    { label: "Terms", href: "/legal#terms" },
    { label: "Privacy", href: "/legal#privacy" },
    { label: "Contact", href: "/contact" },
  ],
};

export function SiteFooter() {
  return (
    <footer
      className="bg-surface/35 px-6 py-12 md:px-12"
      aria-label="Site footer"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-8 border-t border-outline-ghost/70 bg-surface/55 px-2 pt-10 text-center backdrop-blur supports-backdrop-filter:bg-surface/45 md:flex-row md:px-8 md:text-left">
        <div className="space-y-2">
          <p className="font-medium text-foreground">{content.name}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {content.statement}
          </p>
        </div>
        <nav aria-label="Footer links">
          <ul className="flex gap-8">
            {content.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-primary"
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
