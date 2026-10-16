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
  // Bio intro is hand-authored JSX directly in page.tsx (it needs inline
  // bold/italic emphasis a plain string array can't carry) — no `intro`
  // field here.
  experience: [
    {
      group: "Leadership & Involvement",
      groupKey: "illini-solar-car",
      role: "Array/MPPT Lead",
      company: "Illini Solar Car",
      logo: "/isc-logo.png",
      location: "Urbana-Champaign Area · On-site",
      period: "May 2026 - Present",
      summary:
        "Leading the solar array and Maximum Power Point Tracking (MPPT) subsystems for a student-built solar-electric vehicle.",
      highlights: [
        "Co-led the design of Illini Solar Car’s most efficient array to date (1.5 kW, 6 m²) by configuring MPPT firmware, modeling sun exposure in OpenGL, and evaluating array layouts.",
        "Collaborate with the strategy team to model array output and with the finance team to manage ~$45K budgets.",
        "Assist development and deployment of strategy/telemetry platforms, including cloud-based message brokers, databases, and web applications.",
      ],
    },
    {
      group: "Leadership & Involvement",
      groupKey: "illini-solar-car",
      role: "Webmaster",
      company: "Illini Solar Car",
      logo: "/isc-logo.png",
      location: "Urbana-Champaign Area · On-site",
      period: "May 2026 - Present",
      summary:
        "Serve on the executive board, connecting the team's web presence and infrastructure across hosting services.",
      highlights: [
        "Maintain mission-critical software across hosting providers, including the team's MediaWiki knowledgebase, institutional/outreach website, and communication platforms.",
        "Manage the virtual machines, DNS, and reverse proxies behind these services, and address critical failures and other service requests on call.",
      ],
    },
    {
      group: "Leadership & Involvement",
      groupKey: "illini-solar-car",
      role: "Electrical Team Member",
      company: "Illini Solar Car",
      logo: "/isc-logo.png",
      location: "Urbana-Champaign Area · On-site",
      period: "Oct 2025 - Present",
      summary:
        "Participate in the design and implementation of both the car's individual electrical components and the vehicle's high/low-voltage systems as a whole.",
      highlights: [
        "Design and test printed circuit boards with integrated NXP LPC15xx microcontrollers that control various vehicle systems.",
        "Modernized firmware to support new Arm Cortex MCUs, I2C expander removal, boost converter power delivery, and CAN messaging, helping power the car 650+ miles without failure.",
        "Finalized and deployed key wheel, dash, and MPPT embedded subsystems on the Delos solar electric vehicle within one month of the start of electrical integration.",
        "Coordinated development, testing, and/or integration (enclosures, cooling, and wiring within the vehicle) of key systems like MPPTs, wheel, solar array, power distribution, and dash.",
        "Participated in the 2026 Formula Sun Grand Prix and American Solar Challenge as part of the team's electrical pit crew, debugging car issues as they appeared and supporting overall performance across over a week and a half of competition.",
      ],
    },
    {
      group: "Leadership & Involvement",
      role: "President & Co-Founder",
      company: "Illini Redstone Computing",
      logo: "/irc-logo.png",
      location: "Urbana-Champaign Area · On-site",
      period: "Jan 2026 - Present",
      summary:
        "Manage the organization's day-to-day financial, administrative, and technical decision-making.",
      highlights: [
        "Direct executive operations, budget management, and technical strategy for an engineering student organization that empowers students to build devices like fully functional 8-bit CPUs, keyboards, and displays completely from scratch.",
        "Added 100+ new members in 2026 and built relationships with multiple campus departments and student organizations through coordinated outreach.",
        "Designed the organization's computing backbone, deploying three container orchestrations and various other services across four hosting providers.",
        "Integrated gaming servers, WebDAV, DNS, web-based administration, datastores, messaging services, staff/admin authentication, API gateways, and secure connection tunneling into one modular stack that supports future upgrades and expansions.",
      ],
    },
    {
      group: "Professional Experience",
      role: "Computer Administrator",
      company: "University of Illinois Campus Honors Program",
      logo: "/illinois.png",
      location: "Urbana, Illinois, United States · Hybrid",
      period: "Oct 2025 - Present",
      summary:
        "Maintaining CHP's computing hardware infrastructure, external storage integrations, and web services across multiple providers.",
      highlights: [
        "Coordinating with 15+ CHP staff, IT staff, and other administrators to modernize computing resources and increase their accessibility and utility to students.",
        "Synchronizing data between university admissions and CHP databases, reducing entry time for critical record processing by up to two weeks.",
        "Updating and maintaining the official CHP website in accordance with university standards.",
      ],
    },
    {
      group: "Professional Experience",
      role: "Full-Stack/AI Intern",
      company: "Team2Go, Inc.",
      logo: "/team2go-logo.jpg",
      location: "Yongin-si, Gyeonggi, South Korea · Remote",
      period: "Jun 2025 - Aug 2025",
      summary:
        "Built and shipped Dockerized systems and AI-driven interfaces for internal and external-facing tools.",
      highlights: [
        "Collaborated with an intern team to deploy a full-stack AI application publishing platform with Retrieval-Augmented Generation, a custom chat interface, rigid boundary/instruction declaration, Docker virtualization, and full English and Korean localization.",
        "Integrated custom OpenAI GPT models with streaming output, document-based vector embedding, and explicit instruction boundaries.",
        "Explored and deployed prompt-engineering techniques to reduce LLM hallucination and improve accuracy without sacrificing ease of deployment.",
        "Reported regular progress to senior executives and shipped key deliverables two weeks ahead of schedule.",
      ],
    },
    {
      group: "Leadership & Involvement",
      role: "Backend Team Lead",
      company: "Project: Code UIUC",
      logo: "/project-code.svg",
      location: "Urbana-Champaign Area · On-site",
      period: "Sep 2025 - Dec 2025",
      summary:
        "Led the backend team for Agri-Sense, a data-driven, all-in-one crop monitoring platform.",
      highlights: [
        "Managed a team of ten developers building the data handling, APIs, and core logic for the platform.",
        "Oversaw integration of UART, OneWire, and I2C data buses on IoT boards to communicate sensor readings and other metadata to the central backend.",
        "Maintained production branches, versioning and CI policies, and shared progress and API configuration with the project, hardware, and frontend leads.",
      ],
    },
    {
      group: "Leadership & Involvement",
      role: "Eagle Scout",
      company: "Scouting America",
      logo: "/bsa-logo.webp",
      location: "",
      period: "Mar 2018 - Dec 2024",
      summary:
        "Led a community nature restoration project from planning through completion.",
      highlights: [
        "Led the restoration of 1500+ square feet of nature trail, coordinating materials sponsorship, design, volunteer safety training, and logistics.",
        "20+ volunteers contributed 100+ working hours with zero safety incidents, and the project finished a week ahead of schedule.",
        "Earned 27 merit badges and 10+ other certifications/awards, and held 5 leadership positions, including troop guide and assistant senior patrol leader.",
      ],
    },
  ] as const satisfies readonly AboutExperienceEntry[],
  education: [
    {
      credential: "B.S. Computer Engineering",
      institution: "University of Illinois at Urbana-Champaign",
      period: "2025 - Expected May 2029",
      details:
        "Dean's List | Chancellor's Scholar | GPA: 4.00/4.00\nActivities and Societies: Marching Illini, Illini Solar Car, Project: Code UIUC, IEEE UIUC, Engineers without Borders, Campus Honors Program",
      logo: "/illinois.png",
      minor: "Business (Gies College of Business) — in progress",
    },
    {
      credential: "High School Diploma",
      institution: "James B. Conant High School",
      period: "2021 - 2025",
      details:
        "Academic Scholar | GPA: 4.911/4.00 (Weighted), 4.00/4.00 (Unweighted)",
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
