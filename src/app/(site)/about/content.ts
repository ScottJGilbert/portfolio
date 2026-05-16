import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "My background, experience, education, and more.",
};

export interface AboutExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights: readonly string[];
}

export interface EducationEntry {
  credential: string;
  institution: string;
  period: string;
  details: string;
}

export const aboutPageContent = {
  title: "About",
  intro: [
    "Hello! I'm Scott, an undergraduate computer engineering student at the University of Illinois at Urbana-Champaign and a graduate of James B. Conant High School in Hoffman Estates, Illinois.",
    "I am a hard-working full-stack developer, problem-solver, and computer engineer who is dedicated to deploying information technology, computing, and electrical engineering solutions to both solve complex problems and working miracles in peoples' lives.",
    "...I also like the color green.",
  ] as const,
  experience: [
    {
      role: "Webmaster & Array/MPPT Subteam Lead",
      company: "Electrical Team - Illini Solar Car",
      location: "Urbana-Champaign Area · On-site",
      period: "Oct 2025 - Present",
      summary:
        "Contributing across web development and electrical systems for a student engineering team, spanning website operations, subsystem leadership, and hardware development.",
      highlights: [
        "Leading development of the array and Maximum Power Point Tracking (MPPT) subsystems.",
        "Serving as lead developer for the Power Distribution subsystem.",
        "Supporting motor controller, battery pack, and monohassis substructure development while assisting with team operations and sponsorship tasks.",
      ],
    },
    {
      role: "President & Systems Administrator",
      company: "Illini Redstone Computing",
      location: "Urbana-Champaign Area · On-site",
      period: "Jan 2026 - Present",
      summary:
        "Manage the organization's day-to-day financial, administrative, and technical decision-making.",
      highlights: [
        "Act as primary liaison to the university and other organizations at UIUC.",
        "Develop and maintain a network of containerized applications across gaming, authentication, user management, and data pipelining services.",
      ],
    },
    {
      role: "Computer Administrator",
      company: "University of Illinois Campus Honors Program",
      location: "Urbana, Illinois, United States · Hybrid",
      period: "Oct 2025 - Present",
      summary:
        "Maintaining and modernizing CHP technical systems, with a focus on website reliability and data interoperability.",
      highlights: [
        "Updating and maintaining the official CHP website in accordance with university standards.",
        "Automating interfaces with external data sources using CHP computing hardware.",
        "Assisting with application processing and transfer of core information across persistent storage services.",
      ],
    },
    {
      role: "Summer Intern",
      company: "Team2Go, Inc.",
      location: "Remote",
      period: "Jun 2025 - Aug 2025",
      summary:
        "Built and shipped internal web tools and AI-driven interfaces during a focused summer internship.",
      highlights: [
        "Engineered and deployed Dockerized, reverse-proxied Next.js applications for internal platforms.",
        "Integrated custom OpenAI GPT models with streaming output, secure authentication, and Zod-based form validation.",
        "Connected applications to AWS infrastructure and delivered projects ahead of schedule through regular executive updates.",
      ],
    },
  ] as const satisfies readonly AboutExperienceEntry[],
  education: [
    {
      credential: "B.S. Computer Engineering",
      institution: "University of Illinois at Urbana-Champaign",
      period: "2025 - Present",
      details:
        "Activities and Societies: Marching Illini, Illini Solar Car, Project: Code UIUC, IEEE UIUC, Engineers without Borders, Campus Honors Program",
    },
    {
      credential: "High School Diploma",
      institution: "James B. Conant High School",
      period: "2021 - 2025",
      details:
        "Academic Scholar, GPA: 4.911./4.00 (Weighted), 4.00/4.00 (Unweighted)",
    },
  ] as const satisfies readonly EducationEntry[],
} as const;
