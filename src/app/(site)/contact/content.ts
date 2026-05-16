import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "If you'd like to collaborate, ask a question, or discuss a project, send me a message here or reach out directly through email or social channels.",
};

export const contactPageContent = {
  title: "Contact",
  intro:
    "If you'd like to collaborate, ask a question, or discuss a project, send me a message here or reach out directly through email or social channels.",
  directChannels: [
    { label: "Email", href: "mailto:hello@scottgilbert.dev", icon: FaEnvelope },
    {
      label: "GitHub",
      href: "https://github.com/ScottJGilbert",
      icon: FaGithub,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/scottjgilbert",
      icon: FaLinkedin,
    },
  ] as const,
} as const;
