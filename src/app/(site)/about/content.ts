import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "My background, experience, education, and more.",
};

export interface AboutExperienceEntry {
  group: "Professional Experience" | "Leadership & Involvement";
  groupKey?: string;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights: readonly string[];
  logo?: string;
}

export interface EducationEntry {
  credential: string;
  institution: string;
  period: string;
  details: string;
  logo: string;
  minor?: string;
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  date: string;
  detail?: string;
  group?: string;
}

export const aboutPageContent = {
  title: "About",
  intro: [
    "Hello! I'm Scott Gilbert, an undergraduate computer engineering student at the University of Illinois Urbana-Champaign and a graduate of James B. Conant High School in Hoffman Estates, Illinois.",
    "I am a hard-working full-stack developer, problem-solver, and computer engineer who is dedicated to deploying information technology, computing, and electrical engineering solutions to both solve complex problems and working miracles in peoples' lives.",
    "...I also like the color green.",
  ] as const,
  experience: [
    {
      group: "Leadership & Involvement",
      groupKey: "illini-solar-car",
      role: "Array/MPPT Lead",
      company: "Illini Solar Car",
      location: "Urbana-Champaign Area · On-site",
      period: "May 2026 - Present",
      summary:
        "Leading the solar array and Maximum Power Point Tracking (MPPT) subsystems for a student-built solar-electric vehicle.",
      highlights: [
        "Develop maximum power point tracking firmware and use OpenGL-based tools to determine solar array layout specifications.",
        "Manage budgets and sponsorship agreements in the tens of thousands of dollars while contributing to overall electrical and vehicle optimization.",
      ],
    },
    {
      group: "Leadership & Involvement",
      groupKey: "illini-solar-car",
      role: "Webmaster",
      company: "Illini Solar Car",
      location: "Urbana-Champaign Area · On-site",
      period: "May 2026 - Present",
      summary:
        "Serve on the executive board, connecting the team's web presence and infrastructure across hosting services.",
      highlights: [
        "Integrate software across hosting services and manage containerization, DNS, and reverse proxies.",
        "Identify and resolve technical issues related to the team's web infrastructure within minutes of discovering a failure.",
      ],
    },
    {
      group: "Leadership & Involvement",
      groupKey: "illini-solar-car",
      role: "Electrical Team Member",
      company: "Illini Solar Car",
      location: "Urbana-Champaign Area · On-site",
      period: "Oct 2025 - Present",
      summary:
        "Participate in the design and implementation of both the the car's individual electrical components and the vehicle's high/low-voltage systems as a whole.",
      highlights: [
        "Design and test printed circuit boards (PCBs) with integrated NXP LPC15xx microcontrollers that control various vehicle systems.",
        "Integrate lights, solar array, battery management, and other electrical systems into the overall vehicle design.",
        "Participated in the 2026 Formula Sun Grand Prix and American Solar Challenge as part of the team's electrical pit crew, debugging car issues as they appeared and supporting the team's overall performance across 650+ miles of driving.",
      ],
    },
    {
      group: "Leadership & Involvement",
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
      group: "Professional Experience",
      role: "Computer Administrator",
      company: "University of Illinois Campus Honors Program",
      location: "Urbana, Illinois, United States · Hybrid",
      period: "Oct 2025 - Present",
      summary:
        "Maintaining CHP's computing hardware infrastructure, external storage integrations, and web services across multiple providers.",
      highlights: [
        "Collaborating with CHP staff, IT services, and other teams to modernize computing and internet resources for students.",
        "Supporting data synchronization between university admissions and CHP databases, reducing record-processing time by up to two weeks.",
        "Updating and maintaining the official CHP website in accordance with university standards.",
      ],
    },
    {
      group: "Professional Experience",
      role: "Full-Stack/AI Intern",
      company: "Team2Go, Inc.",
      location: "Yongin-si, Gyeonggi, South Korea · Remote",
      period: "Jun 2025 - Aug 2025",
      summary:
        "Built and shipped Dockerized systems and AI-driven interfaces for internal and external-facing tools.",
      highlights: [
        "Engineered Dockerized systems that improved integration between backend applications and user interfaces.",
        "Integrated custom OpenAI GPT models with streaming output, document-based vector embedding, and explicit instruction boundaries.",
        "Collaborated with executives through regular progress updates and delivered projects ahead of schedule.",
      ],
    },
    {
      group: "Leadership & Involvement",
      role: "Eagle Scout",
      company: "Scouting America",
      location: "",
      period: "Mar 2018 - Dec 2024",
      summary:
        "Led a community nature restoration project from planning through completion.",
      highlights: [
        "Planned and organized a coordinated restoration effort where volunteers contributed over 100 working hours.",
        "Collaborated with sponsors to secure resources and tooling, finishing the project a week ahead of schedule with zero workplace incidents.",
      ],
    },
  ] as const satisfies readonly AboutExperienceEntry[],
  education: [
    {
      credential: "B.S. Computer Engineering",
      institution: "University of Illinois at Urbana-Champaign",
      period: "2025 - Present",
      details:
        "Dean's List | GPA: 4.00/4.00\nActivities and Societies: Marching Illini, Illini Solar Car, Project: Code UIUC, IEEE UIUC, Engineers without Borders, Campus Honors Program",
      logo: "/illinois.png",
      minor: "Business (Gies College of Business) — in progress",
    },
    {
      credential: "High School Diploma",
      institution: "James B. Conant High School",
      period: "2021 - 2025",
      details:
        "Academic Scholar | GPA: 4.911./4.00 (Weighted), 4.00/4.00 (Unweighted)",
      logo: "/conant.png",
    },
  ] as const satisfies readonly EducationEntry[],
  certifications: [
    {
      name: "Amateur Radio General Operator Class License",
      issuer: "Federal Communications Commission",
      date: "Issued Mar 2026 · Expires Mar 2036",
      detail: "Credential ID: KE9FEX",
    },
    {
      name: "Next.js SEO Fundamentals",
      issuer: "Vercel",
      date: "Issued Jun 2025",
      detail: "Credential ID: seo",
      group: "Next.js by Vercel",
    },
    {
      name: "Next.js Pages Router Fundamentals",
      issuer: "Vercel",
      date: "Issued Jun 2025",
      detail: "Credential ID: pages-router",
      group: "Next.js by Vercel",
    },
    {
      name: "React Foundations for Next.js",
      issuer: "Vercel",
      date: "Issued May 2025",
      detail: "Credential ID: react-foundations",
      group: "Next.js by Vercel",
    },
    {
      name: "Next.js App Router Fundamentals",
      issuer: "Vercel",
      date: "Issued Jun 2025",
      detail: "Credential ID: dashboard-app",
      group: "Next.js by Vercel",
    },
  ] as const satisfies readonly CertificationEntry[],
} as const;
