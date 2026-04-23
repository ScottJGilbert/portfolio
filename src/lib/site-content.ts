import {
  FaGithub as GitHub,
  FaLinkedin as LinkedIn,
  FaGlobe as Globe,
  FaPen as Pen,
  FaUser as User,
  FaEnvelope as Envelope,
  FaHouseUser as HouseUser,
  FaBriefcase as Briefcase,
  type FaIcons,
} from "react-icons/fa";

export type SiteNavIcon = "home" | "projects" | "journal" | "about" | "contact";

export interface SiteNavItem {
  href: "/" | `/${string}`;
  label: string;
  icon: SiteNavIcon;
}

export type ExternalLinkIcon = "blog" | "github" | "linkedin" | "email";

export const navIconMap: Record<SiteNavIcon, typeof FaIcons> = {
  home: HouseUser,
  projects: Briefcase,
  journal: Pen,
  about: User,
  contact: Envelope,
};

export const externalIconMapSidebar: Record<ExternalLinkIcon, typeof FaIcons> =
  {
    blog: Globe,
    github: GitHub,
    linkedin: LinkedIn,
    email: Envelope,
  };

export const externalIconMapActionbar: Record<
  ExternalLinkIcon,
  typeof FaIcons
> = {
  blog: Globe,
  github: GitHub,
  linkedin: LinkedIn,
  email: Envelope,
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
    href: "https://www.linkedin.com/in/scott-j-gilbert",
    label: "LinkedIn",
    icon: "linkedin",
  },
  { href: "mailto:hello@scottgilbert.dev", label: "Email", icon: "email" },
];

export const siteShellContent: SiteShellContent = {
  siteTitle: "Scott Gilbert",
  siteTagline: "Computer Engineer",
  navItems,
  externalLinks,
};
