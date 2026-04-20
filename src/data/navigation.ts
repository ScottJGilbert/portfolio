export type NavItem = { label: string; href: string; external?: boolean };
export type FooterColumn = { title: string; links: NavItem[] };

export const coreNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

export const externalNav: NavItem[] = [
  { label: "GitHub", href: "https://github.com/ScottJGilbert", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/scottgilbert", external: true },
  { label: "X/Twitter", href: "https://x.com", external: true },
  { label: "Email", href: "mailto:hello@scottgilbert.dev", external: true },
];

export const utilityNav: NavItem[] = [
  { label: "Legal", href: "/legal" },
  { label: "Attributions", href: "/attributions" },
];

export const footerColumns: FooterColumn[] = [
  { title: "Sitemap", links: coreNav },
  { title: "Legal", links: utilityNav },
  { title: "Elsewhere", links: externalNav },
];