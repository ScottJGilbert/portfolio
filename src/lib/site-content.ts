export type SiteNavIcon = "home" | "work" | "journal" | "about" | "contact";

export interface SiteNavItem {
  href: "/" | `/${string}`;
  label: string;
  icon: SiteNavIcon;
}

export type ExternalLinkIcon = "github" | "linkedin" | "email";

export interface ExternalLink {
  href: string;
  label: string;
  icon: ExternalLinkIcon;
}

export interface SiteShellContent {
  siteTitle: string;
  siteTagline: string;
  navItems: readonly SiteNavItem[];
  externalLinks: readonly ExternalLink[];
}

export const navItems: readonly SiteNavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/work", label: "Work", icon: "work" },
  { href: "/journal", label: "Journal", icon: "journal" },
  { href: "/about", label: "About", icon: "about" },
  { href: "/contact", label: "Contact", icon: "contact" },
];

export const externalLinks: readonly ExternalLink[] = [
  { href: "https://github.com", label: "GitHub", icon: "github" },
  { href: "https://www.linkedin.com", label: "LinkedIn", icon: "linkedin" },
  { href: "mailto:hello@example.com", label: "Email", icon: "email" },
];

export const siteShellContent: SiteShellContent = {
  siteTitle: "Personal Portfolio",
  siteTagline: "Designing, building, and writing with intent.",
  navItems,
  externalLinks,
};
