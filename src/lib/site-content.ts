import {
  AtSign,
  BriefcaseBusiness,
  Globe,
  House,
  Link2,
  Mail,
  NotebookPen,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export type SiteNavIcon = "home" | "projects" | "journal" | "about" | "contact";

export interface SiteNavItem {
  href: "/" | `/${string}`;
  label: string;
  icon: SiteNavIcon;
}

export type ExternalLinkIcon = "blog" | "github" | "linkedin" | "email";

export const navIconMap: Record<SiteNavIcon, LucideIcon> = {
  home: House,
  projects: BriefcaseBusiness,
  journal: NotebookPen,
  about: UserRound,
  contact: Mail,
};

export const externalIconMapSidebar: Record<ExternalLinkIcon, LucideIcon> = {
  blog: Globe,
  github: Link2,
  linkedin: Globe,
  email: AtSign,
};

export const externalIconMapActionbar: Record<ExternalLinkIcon, LucideIcon> = {
  blog: Globe,
  github: Link2,
  linkedin: Globe,
  email: AtSign,
};

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
  { href: "/projects", label: "Projects", icon: "projects" },
  { href: "/journal", label: "Journal", icon: "journal" },
  { href: "/about", label: "About", icon: "about" },
  { href: "/contact", label: "Contact", icon: "contact" },
];

export const externalLinks: readonly ExternalLink[] = [
  { href: "https://blog.scottgilbert.dev", label: "Blog", icon: "blog" },
  { href: "https://github.com/ScottJGilbert", label: "GitHub", icon: "github" },
  {
    href: "https://www.linkedin.com/in/scottjgilbert",
    label: "LinkedIn",
    icon: "linkedin",
  },
  { href: "mailto:hello@scottgilbert.dev", label: "Email", icon: "email" },
];

export const siteShellContent: SiteShellContent = {
  siteTitle: "Scott Gilbert",
  siteTagline: "Portfolio.",
  navItems,
  externalLinks,
};
