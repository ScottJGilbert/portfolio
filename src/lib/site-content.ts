import {
  FaGithub as GitHub,
  FaLinkedin as LinkedIn,
  FaGlobe as Globe,
  FaUser as User,
  FaEnvelope as Envelope,
  FaHouseUser as HouseUser,
  FaBriefcase as Briefcase,
  FaFileAlt as File,
  FaShieldAlt as Shield,
} from "react-icons/fa";
import { createElement, ReactNode } from "react";

export interface SiteNavItem {
  href: "/" | `/${string}`;
  label: string;
  icon: ReactNode;
}

export interface ExternalLink {
  href: string;
  label: string;
  icon: ReactNode;
}

export interface SiteShellContent {
  announcement?: string;
  siteTitle: string;
  siteTagline: string;
  navItems: readonly SiteNavItem[];
  externalLinks: readonly ExternalLink[];
  promiseLink: ExternalLink;
}

export const navItems: readonly SiteNavItem[] = [
  { href: "/", label: "Home", icon: createElement(HouseUser) },
  { href: "/about", label: "About", icon: createElement(User) },
  { href: "/projects", label: "Projects", icon: createElement(Briefcase) },
  { href: "/contact", label: "Contact", icon: createElement(Envelope) },
];

export const externalLinks: readonly ExternalLink[] = [
  {
    href: "https://blog.scottgilbert.dev",
    label: "Blog",
    icon: createElement(Globe),
  },
  { href: "/resume.pdf", label: "Resume", icon: createElement(File) },
  {
    href: "https://github.com/ScottJGilbert",
    label: "GitHub",
    icon: createElement(GitHub),
  },
  {
    href: "https://www.linkedin.com/in/scott-j-gilbert",
    label: "LinkedIn",
    icon: createElement(LinkedIn),
  },
  {
    href: "mailto:hello@scottgilbert.dev",
    label: "Email",
    icon: createElement(Envelope),
  },
];

export const promiseLink: ExternalLink = {
  href: "https://promise.scottgilbert.dev",
  label: "My Promise",
  icon: createElement(Shield),
};

export const siteShellContent: SiteShellContent = {
  announcement: "New portfolio is live!",
  siteTitle: "Scott Gilbert",
  siteTagline: "Computer Engineer",
  navItems,
  externalLinks,
  promiseLink,
};
