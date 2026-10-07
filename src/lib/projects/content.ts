/**
 * Project metadata registry.
 *
 * This is the single source of truth for project data used across the site
 * (listing cards, homepage featured projects, sitemap, search/filter, and
 * the per-project facts panel). Body content itself lives as JSX in each
 * project's own route under src/app/(site)/projects/<slug>/page.tsx — see
 * src/app/(site)/projects/lib/metadata.ts for how those pages derive their
 * <title>/<description> from this registry instead of duplicating them.
 *
 * `recruiterCategories` is a small, deliberately closed vocabulary used to
 * personalize featured-project selection for recruiter-tracking links (see
 * src/lib/recruiter-links.ts and src/lib/projects/select-featured.ts). It is
 * kept separate from the free-form `categories` field (which drives the
 * display chips and the listing page's search/filter UI) so that adding a
 * new display category never silently creates a new recruiter segment.
 */

export type RecruiterCategory =
  | "embedded"
  | "hardware"
  | "software"
  | "cloud-devops"
  | "quantum";

export type ProjectCategory =
  | "Mechanical"
  | "Electrical"
  | "Software"
  | "Full Stack"
  | "DevOps"
  | "AI/ML"
  | "Systems"
  | "Frontend"
  | "Embedded"
  | "Circuitry"
  | "Quantum";

export interface ProjectMeta {
  slug: string;
  title: string;
  start_date: string;
  end_date: string | null;
  description: string;
  categories: ProjectCategory[];
  recruiterCategories: RecruiterCategory[];
  image_url: string;
  stack: string[];
  role?: string;
  teamSize?: string;
  contribution?: string;
  links?: { label: string; href: string }[];
  subPages?: ProjectSubPage[];
}

export interface ProjectSubPage {
  slug: string;
  title: string;
  description: string;
}

const delosSubPages: ProjectSubPage[] = [
  {
    slug: "dash",
    title: "Delos — Dashboard",
    description:
      "The dashboard subsystem: brake, drive-direction, and light controls, horn, and reverse camera integration.",
  },
  {
    slug: "wheel",
    title: "Delos — Steering Wheel",
    description:
      "The steering wheel subsystem: driver controls, telemetry display, and the firmware that sends driver commands over CAN.",
  },
  {
    slug: "array",
    title: "Delos — Solar Array",
    description:
      "The 6-square-meter solar array subsystem: layout, installation, and integration.",
  },
  {
    slug: "mppts",
    title: "Delos — MPPTs",
    description:
      "The Maximum Power Point Tracking subsystem: firmware and CANdef telemetry across the array.",
  },
  {
    slug: "radio",
    title: "Delos — Radio",
    description:
      "The radio subsystem: communication with the pit crew and other teams.",
  },
];

export const projects: ProjectMeta[] = [
  {
    title: "Delos",
    start_date: "2025-10-01 00:00:00",
    end_date: null,
    description:
      "The University of Illinois' most powerful and capable solar electric vehicle to date.",
    categories: ["Mechanical", "Electrical", "Software"],
    recruiterCategories: ["hardware", "embedded", "software"],
    slug: "delos",
    image_url: "/delos.webp",
    stack: [
      "C++",
      "Mbed OS",
      "NXP",
      "Arm",
      "MCUxpresso",
      "CAN",
      "KiCad",
      "MQTT",
    ],
    role: "Electrical Engineer, Illini Solar Car",
    teamSize: "Multi-disciplinary student engineering team",
    contribution:
      "Took the dashboard, steering-wheel, PDS, and MPPT boards from finished designs to working parts in the car: fixed existing firmware and hardware issues, configured and extended MPPT telemetry, and handled wiring and integration. Also assisted with composites fabrication, battery assembly, and race-week debugging and radio support.",
    subPages: delosSubPages,
    links: [
      {
        label: "Official Car Page",
        href: "https://illinisolarcar.com/delos",
      },
    ],
  },
  {
    title: "Personal Content System",
    start_date: "2025-05-01 00:00:00",
    end_date: null,
    description:
      "The platform behind my portfolio and blog: a Next.js site, a published rich-text editor package, and the services around them.",
    categories: ["Full Stack", "DevOps", "AI/ML"],
    recruiterCategories: ["software", "cloud-devops"],
    slug: "personal-content-system",
    image_url: "/portfolio.png",
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Lexical",
      "PostgreSQL",
      "Docker",
      "GitHub",
      "Vercel",
    ],
    role: "Sole developer",
    teamSize: "Solo project",
    contribution:
      "Designed and built the entire platform end-to-end: this portfolio, a published rich-text editor package, and the hosting and delivery pipeline behind them.",
  },
  {
    title: "Illini Redstone Computing",
    start_date: "2026-01-01 00:00:00",
    end_date: null,
    description:
      "Containerized infrastructure for a student computing and gaming organization: game servers, admin tools, automated backups, and secure access.",
    categories: ["Software", "Systems", "DevOps"],
    recruiterCategories: ["software", "cloud-devops"],
    slug: "illini-redstone-computing",
    image_url: "",
    stack: [
      "Docker",
      "Linux",
      "GitHub",
      "Python",
      "PostgreSQL",
      "MariaDB",
      "NestJS",
      "Svelte",
      "Caddy",
      "WireGuard",
    ],
    role: "Co-Founder, President & Systems Administrator",
    teamSize: "Student-led computing and gaming organization",
    contribution:
      "Run the organization's operations, budget, and technical strategy, and designed its containerized service infrastructure. Membership grew by 100+ in a year.",
  },
  {
    title: "Team2Go AI Tools",
    start_date: "2025-06-01 00:00:00",
    end_date: "2025-08-31 00:00:00",
    description:
      "A bilingual (English and Korean) platform for publishing document-grounded AI chatbots, built during a remote full-stack internship.",
    categories: ["Software", "Full Stack", "AI/ML"],
    recruiterCategories: ["software", "cloud-devops"],
    slug: "team2go-ai-tools",
    image_url: "",
    stack: [
      "TypeScript",
      "Next.js",
      "PostgreSQL",
      "NGINX",
      "Docker",
      "OpenAI",
      "Python",
      "GitHub",
      "Linux",
    ],
    role: "Full-Stack/AI Intern",
    teamSize: "Remote internship team",
    contribution:
      "Engineered Dockerized systems connecting backend applications and user interfaces; integrated custom OpenAI GPT models with streaming output and document-based vector embeddings.",
  },
  {
    title: "ICDA Website",
    start_date: "2024-04-22 00:00:00",
    end_date: "2025-08-27 00:00:00",
    description:
      "Rebuilt a state debate association's website, then added a PHP/MySQL backend so administrators can update it without touching code.",
    categories: ["Frontend", "Full Stack"],
    recruiterCategories: ["software"],
    slug: "icda-website",
    image_url:
      "https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSfUx4z18H2OkrGivuB5YZznLWoy4qtmIjDpwAE",
    stack: [
      "JavaScript",
      "React",
      "MySQL",
      "HTML",
      "SQL",
      "PHP",
      "Git",
      "Linux",
      "Ubuntu",
      "Markdown",
      "Apache",
      "GitHub",
      "phpMyAdmin",
      "Composer",
      "Project Management",
      "Database Administration",
      "Backend Development",
      "Frontend Design",
    ],
    role: "Website Developer",
    teamSize: "2-person team",
    contribution:
      "Co-built v1.0's full frontend redesign with a friend, then led v2.0's PHP/MySQL backend build so circuit administrators could update content without editing code.",
    links: [{ label: "Live site", href: "https://icdadebate.org" }],
  },
  {
    title: "Solar Heater Demonstration",
    start_date: "2024-10-03 00:00:00",
    end_date: "2025-04-25 00:00:00",
    description:
      "An Arduino temperature sensor feeding a live Django dashboard for a community Earth Day solar energy demo.",
    categories: ["Circuitry", "Embedded", "Full Stack"],
    recruiterCategories: ["hardware", "embedded"],
    slug: "solar-heater-demonstration",
    image_url:
      "https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSfGci14qrlOfnR2QEFZu59e8aW0moPky13Vsxd",
    stack: ["Django", "Python", "SQLite", "SQL", "Arduino"],
    role: "Sole developer",
    teamSize: "Solo project",
    contribution:
      "Designed and built the Django web app, Arduino/DS18B20 sensor pipeline, and live temperature dashboard end-to-end for a high school Civic Engagement Project.",
  },
  {
    title: "Agri-Sense",
    start_date: "2025-09-27 00:00:00",
    end_date: "2025-12-04 00:00:00",
    description:
      "Led a ten-developer backend team building the API for a plant-monitoring platform for indoor and vertical farms.",
    categories: ["Embedded", "Full Stack"],
    recruiterCategories: ["hardware", "embedded"],
    slug: "agri-sense",
    image_url:
      "https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSfH2gOSu7j2dCwemRUNlzQhFXrvxGb6VPuOWIA",
    stack: ["Git", "Arduino", "GitHub", "JSON", "Flask", "Python"],
    role: "Backend Team Lead",
    teamSize: "Backend team of ten developers (Project: Code UIUC)",
    contribution:
      "Led the backend developers and set the backend's structure, branch and review rules, and CI policy. Oversaw how sensor data from UART, OneWire, and I2C buses on IoT boards reaches the central backend.",
  },
  {
    title: "Clouds and Computers",
    start_date: "2025-11-17 00:00:00",
    end_date: "2025-12-10 00:00:00",
    description:
      "A 3D game that links a 3-qubit quantum computer simulator to a hydrogen-atom orbital model, built for an honors physics course.",
    categories: ["Software", "Quantum"],
    recruiterCategories: ["software", "quantum"],
    slug: "clouds-and-computers",
    image_url:
      "https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSfs6QqbpUgFivDeYLpORhK0W6GkVxaZbol7qEr",
    stack: ["Blender", "UPBGE", "NumPy", "SciPy", "Matplotlib", "Python"],
    role: "Solo project (PHYS 199 CHP final project)",
    teamSize: "Solo project",
    contribution:
      "Designed the concept, modeled the 3D scenes in Blender, and connected a NumPy qubit simulator and a SciPy hydrogen-orbital solver to the game. Built with AI coding assistance, with credit to open-source and CC0 material.",
  },
  {
    title: "Miracle Makers",
    start_date: "2026-01-02 00:00:00",
    end_date: null,
    description:
      "YOU have the power to work miracles. Let's get started. (Coming soon 👀)",
    categories: [],
    recruiterCategories: [],
    slug: "miracle-makers",
    image_url: "",
    stack: [],
  },
];

export const featuredProjectSlugs = [
  "delos",
  "personal-content-system",
  "illini-redstone-computing",
] as const;

export function getProjectMeta(slug: string): ProjectMeta | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getSubPageMeta(
  parentSlug: string,
  slug: string,
): ProjectSubPage | undefined {
  const projectSubPages = getProjectMeta(parentSlug)?.subPages;
  return projectSubPages?.find((subPage) => subPage.slug === slug);
}
