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
  | "cloud-devops";

export interface ProjectMeta {
  slug: string;
  title: string;
  start_date: string;
  end_date: string | null;
  description: string;
  categories: string[];
  recruiterCategories: RecruiterCategory[];
  image_url: string;
  stack: string[];
  role?: string;
  teamSize?: string;
  contribution?: string;
  links?: { label: string; href: string }[];
}

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
    stack: ["C++", "NXP", "Arm", "MCUxpresso", "MQTT"],
  },
  {
    title: "Personal Content System",
    start_date: "2025-05-01 00:00:00",
    end_date: null,
    description:
      "A modular platform for my portfolio, blog, automations, AI-assisted workflows, and more.",
    categories: ["Full Stack", "DevOps", "AI/ML"],
    recruiterCategories: ["software", "cloud-devops"],
    slug: "personal-content-system",
    image_url: "/portfolio.png",
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "PostgreSQL",
      "Docker",
      "GitHub",
      "Vercel",
    ],
  },
  {
    title: "Illini Redstone Computing",
    start_date: "2026-01-01 00:00:00",
    end_date: null,
    description:
      "Developing and supporting the infrastructure for a student-led computing and gaming organization.",
    categories: ["Systems", "DevOps", "Leadership"],
    recruiterCategories: ["software", "cloud-devops"],
    slug: "illini-redstone-computing",
    image_url: "",
    stack: ["Docker", "Linux", "GitHub", "Python", "PostgreSQL"],
  },
  {
    title: "Team2Go AI Tools",
    start_date: "2025-06-01 00:00:00",
    end_date: "2025-08-31 00:00:00",
    description:
      "Exploring Docker, proxies, and more while building AI-powered applications at a full-stack internship.",
    categories: ["Full Stack", "AI/ML", "DevOps"],
    recruiterCategories: ["software", "cloud-devops"],
    slug: "team2go-ai-tools",
    image_url: "",
    stack: ["Python", "Docker", "OpenAI", "GitHub", "Linux"],
  },
  {
    title: "ICDA Website",
    start_date: "2024-04-22 00:00:00",
    end_date: "2025-08-27 00:00:00",
    description:
      "Overhauling a not-for-profit's website with new code, multimedia, and more.",
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
  },
  {
    title: "Solar Heater Demonstration",
    start_date: "2024-10-03 00:00:00",
    end_date: "2025-04-25 00:00:00",
    description:
      "Collecting temperature data with an Arduino and displaying it with Django.",
    categories: ["Circuitry", "Arduino"],
    recruiterCategories: ["hardware", "embedded"],
    slug: "solar-heater-demonstration",
    image_url:
      "https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSfGci14qrlOfnR2QEFZu59e8aW0moPky13Vsxd",
    stack: ["Django", "Python", "SQLite", "SQL", "Arduino"],
  },
  {
    title: "Agri-Sense",
    start_date: "2025-09-27 00:00:00",
    end_date: "2025-12-04 00:00:00",
    description:
      "Leading the backend team for a data-driven plant-monitoring and growth-supporting web application.",
    categories: ["Arduino"],
    recruiterCategories: ["hardware", "embedded"],
    slug: "agri-sense",
    image_url:
      "https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSfH2gOSu7j2dCwemRUNlzQhFXrvxGb6VPuOWIA",
    stack: ["Git", "Arduino", "GitHub", "JSON", "Flask", "Python"],
  },
  {
    title: "Clouds and Computers",
    start_date: "2025-11-17 00:00:00",
    end_date: null,
    description:
      "My final project (a hybrid quantum computing and orbitals and art video game) for my PHYS 199 CHP class.",
    categories: [],
    recruiterCategories: ["software"],
    slug: "clouds-and-computers",
    image_url:
      "https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSfs6QqbpUgFivDeYLpORhK0W6GkVxaZbol7qEr",
    stack: ["Blender", "UPBGE", "NumPy", "SciPy", "Matplotlib", "Python"],
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

export interface ProjectSubPage {
  parentSlug: string;
  slug: string;
  title: string;
  description: string;
}

export const projectSubPages: ProjectSubPage[] = [
  {
    parentSlug: "delos",
    slug: "dash",
    title: "Delos — Dashboard",
    description:
      "The driver-facing dashboard subsystem: display, controls, horns, and reverse camera integration.",
  },
  {
    parentSlug: "delos",
    slug: "array",
    title: "Delos — Solar Array",
    description:
      "The 6-square-meter solar array subsystem: layout, installation, and integration.",
  },
  {
    parentSlug: "delos",
    slug: "mppts",
    title: "Delos — MPPTs",
    description:
      "The Maximum Power Point Tracking subsystem: firmware and CANdef telemetry across the array.",
  },
];

export function getProjectMeta(slug: string): ProjectMeta | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getSubPageMeta(
  parentSlug: string,
  slug: string,
): ProjectSubPage | undefined {
  return projectSubPages.find(
    (subPage) => subPage.parentSlug === parentSlug && subPage.slug === slug,
  );
}
