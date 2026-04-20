export type NavItem = Readonly<{ label: string; href: string; external?: boolean }>;
export type FooterColumn = Readonly<{ title: string; links: readonly NavItem[] }>;

export const coreNav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

export const externalNav: readonly NavItem[] = [
  { label: "GitHub", href: "https://github.com/ScottJGilbert", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/scottgilbert", external: true },
  { label: "X/Twitter", href: "https://x.com", external: true },
  { label: "Email", href: "mailto:hello@scottgilbert.dev", external: true },
];

export const utilityNav: readonly NavItem[] = [
  { label: "Legal", href: "/legal" },
  { label: "Attributions", href: "/attributions" },
];

const sitemapFooterLinks: readonly NavItem[] = [...coreNav];
const legalFooterLinks: readonly NavItem[] = [...utilityNav];
const elsewhereFooterLinks: readonly NavItem[] = [...externalNav];

export const footerColumns: readonly FooterColumn[] = [
  { title: "Sitemap", links: sitemapFooterLinks },
  { title: "Legal", links: legalFooterLinks },
  { title: "Elsewhere", links: elsewhereFooterLinks },
];
