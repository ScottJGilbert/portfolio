import { HomeJournalContent } from "./components/journal-list";
import { HomeHeroContent } from "./components/hero-section";
import { HomeAssortmentContent } from "./components/assortment-grid";
import { HomeProjectsContent } from "./components/projects-grid";
import { projects } from "../projects/content";
import { GiTrombone, GiGamepad } from "react-icons/gi";
import { FaRunning } from "react-icons/fa";

export interface HomeContent {
  hero: HomeHeroContent;
  assortment: HomeAssortmentContent;
  projects: HomeProjectsContent;
  journal: HomeJournalContent;
}

export const homeContent: HomeContent = {
  hero: {
    title: "Hi, I'm Scott Gilbert",
    typewriterPhrases: [
      "I'm a trombone player",
      "I'm a full-stack developer",
      "I'm a cross-country runner",
      "I'm an avid volunteer",
      "I'm a Minecraft gamer",
      "I'm a tinkerer",
    ],
    description:
      "And a computer engineer ready to make miracles for the world.",
    ctaLabel: "Learn More",
  },
  assortment: {
    eyebrow: "Assortment",
    title: "Bits and Pieces About Me",
    coreStack: {
      title: "Selections From the Stack",
      technologies: [
        "Blender",
        "TypeScript",
        "JavaScript",
        "Django",
        "UPBGE",
        "React",
        "PostgreSQL",
        "MySQL",
        "SQLite",
        "Bash",
        "HTML",
        "PowerShell",
        "SQL",
        "Node.js",
        "PHP",
        "Vercel",
        "Next.js",
        "Git",
        "Ubuntu",
        "YAML",
        "Tailwind CSS",
        "Markdown",
        "Docker",
        "NGINX",
        "Apache",
        "Zod",
        "Arduino",
        "Java",
        "GitHub",
        "npm",
        "pnpm",
        "KiCad",
        "C",
        "C++",
        "Composer",
        "Vivado",
        "MCUxpresso",
        "phpMyAdmin",
        "Wolfram",
        "Wolfram Language",
        "libGDX",
        "JSON",
        "Auth.js",
        "ESLint",
        "NumPy",
        "SciPy",
        "Matplotlib",
        "Wordpress",
        "Flask",
        "OpenAI",
        "Linux",
        "Better Auth",
        "Mathematica",
        "Python",
      ],
    },
    philosophy: {
      quote: '"Anyone can make a miracle. How do we start?"',
    },
    lab: {
      title: "Key Skills",
      items: [
        "Full-Stack Development",
        "Embedded Systems",
        "Project Management",
      ],
    },
    beyondCode: {
      title: "Beyond Code",
      description:
        "When I'm not engineering something new, you can find me running, gaming with friends, or playing trombone in the marching band.",
      icons: [GiTrombone, GiGamepad, FaRunning],
      image: {
        src: "/marchingillini.webp",
        alt: "Modern desk setup with professional audio equipment, studio monitors, and a mechanical keyboard in soft natural lighting",
      },
    },
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected Projects",
    archiveLabel: "View Archive",
    archiveHref: "/projects",
    projects,
  },
  journal: {
    eyebrow: "Journal",
    title: "Latest Blog Entries",
    entries: [
      {
        index: "01",
        title: "The Road Ahead",
        description:
          "A series coming to an end, but a road only just beginning.",
        date: "Mar 28, 2026",
        href: "https://blog.scottgilbert.dev/",
        src: "https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSfGbguBhrlOfnR2QEFZu59e8aW0moPky13Vsxd",
      },
      {
        index: "02",
        title: "Looking Back",
        description: "Reflecting on the good to inform the road ahead.",
        date: "Mar 18, 2026",
        href: "https://blog.scottgilbert.dev/",
        src: "https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSfY2yp1ZtGg6wqKrt42LHVnioMJx0mU397S8Oh",
      },
      {
        index: "03",
        title: "Discovering the Obstacles",
        description:
          "As two of world's largest religions begin their holy seasons, it's important for us all to take a step back and reflect.",
        date: "Feb 28, 2026",
        href: "https://blog.scottgilbert.dev/",
        src: "https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSf2e8W9cZYORBVJkweEFfotaCqLA6IGjZSQvXm",
      },
    ],
  },
};
