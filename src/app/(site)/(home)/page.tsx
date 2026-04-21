import { AssortmentGrid } from "./components/assortment-grid";
import { HeroSection } from "./components/hero-section";
import { HomeJournalContent, JournalList } from "./components/journal-list";
import { HomeHeroContent } from "./components/hero-section";
import { HomeAssortmentContent } from "./components/assortment-grid";
import {
  HomeProjectsContent,
  ProjectsGrid,
} from "./components/projects-grid";

interface HomeContent {
  hero: HomeHeroContent;
  assortment: HomeAssortmentContent;
  projects: HomeProjectsContent;
  journal: HomeJournalContent;
}

const homeContent: HomeContent = {
  hero: {
    title: "I'm Scott Gilbert",
    description:
      "A systems engineer building resilient backends and high-fidelity gaming experiences. Bridging the gap between kernel-level performance and user-centric design.",
    ctaLabel: "Learn More",
  },
  assortment: {
    eyebrow: "Assortment",
    title: "The Technical Stack",
    coreStack: {
      title: "Core Stack",
      technologies: ["Rust", "Python", "C++"],
      description:
        "Low-level precision combined with high-level developer experience. I specialize in memory-safe systems and performant APIs.",
    },
    philosophy: {
      quote:
        '"Resilience is not just about error handling; it\'s about building systems that anticipate the unknown."',
    },
    lab: {
      title: "The Lab",
      items: ["React / Next.js", "Docker & K8s", "PostgreSQL / Redis"],
    },
    beyondCode: {
      title: "Beyond Code",
      description:
        "When I'm not optimizing binaries, I'm deep into high-performance audio engineering or managing complex Minecraft automation servers.",
      icons: ["headphones", "infrastructure"],
      image: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsHz5O_oGLs21qrIh7ptNl0l8QITqcrFV24QxlQbL8ExqVzoQk8SEk-VZL1wR7VtXrV02rHQuO7eW5ZPfrYAAcnjOaizE2fqsSuhoQeXJvvnep5-Pq64uzAtL2wlSU7LcEN_z-GUiTpoJQrSdJOKrSeboBtQcd_YJNTQ2IKCmpOgZR02DWH8wNg6pOuFmUWtG-405U_QCSzJL7dTrDfphN0elEAA_cU_dAB5-N3NC0V64Xd9BS8VfJFkT6T0cVAjguSPqJExdNwTtf",
        alt: "Modern desk setup with professional audio equipment, studio monitors, and a mechanical keyboard in soft natural lighting",
      },
    },
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected Projects",
    archiveLabel: "View Archive",
    archiveHref: "/projects",
    projects: [
      {
        title: "Vector Engine v2.0",
        description:
          "A custom-built physics engine for 2D spatial simulations, written entirely in Rust for maximum throughput.",
        tags: ["Rust", "WASM"],
        href: "/projects",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVirNabt4MGo8NdfcP7iE-zUWP6LXFij6g7M-gWG0YYq2Q5TkRFqwrEa1HiY96vFctwk-VQy9YHDStBgu0DJjG54XduSmpOtp9-1G-jkVvY64SLL7bzkKgKmQRJVcVlXmH4jHoJxUhGB9OIPlhs63iyPE7zL9f2m7F0foKmgbw0iAjfDHeq2aWWc-8iqbGyqXRNpRPmjbpFg3tFcR3PxSMWSzwVpPkbs9FhQ7QsQNawWAiV7kqB0srviN5WZ1ULIF2EWgOwSuuC39o",
          alt: "Abstract visualization of complex data structures and nodes glowing with emerald green light against a dark background",
        },
      },
      {
        title: "Chlorophyll.ui",
        description:
          "An organic-inspired design system focusing on sustainability and high-performance frontend rendering.",
        tags: ["React", "Tailwind"],
        href: "/projects",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkkPrTjWS_EESzZGm-VgnoTdgY7S4ynmtOpACPZfPJr8w07_sP_UNxbjxJIoX3vHAzywZpVuU7kd8lTZR-ve3KvTDsDrarbAlj-T9Rjrfs-GcS52HBOzYyejhBdEUeA0JxyV26x_xjYgDcjM4LqzMMRgP-fCz3YuhRWmV_iZinjDEAnPK4gcfZua52eXehZYIhg6wZkC-LDSXpB94G4LcLpsyC499GiBwpLuF-MESxlLqQWxFqKNylwUS6IeYGF0UNIyLtMnzUTVAr",
          alt: "Sleek user interface wireframe on a high-resolution display with soft green accents and minimalist design elements",
        },
      },
    ],
  },
  journal: {
    eyebrow: "Journal",
    title: "Thoughts & Writings",
    entries: [
      {
        index: "01",
        title: "Minimalist Toolchains",
        description: "Reducing cognitive overhead in development environments.",
        date: "MAR 2024",
        href: "/journal",
      },
      {
        index: "02",
        title: "Rust in the Enterprise",
        description: "Strategies for incremental adoption in legacy systems.",
        date: "FEB 2024",
        href: "/journal",
      },
      {
        index: "03",
        title: "High-Performance Audio Kernels",
        description: "Real-time processing and latency optimization.",
        date: "JAN 2024",
        href: "/journal",
      },
    ],
  },
};

export default function SiteHomePage() {
  return (
    <>
      <HeroSection content={homeContent.hero} />
      <AssortmentGrid content={homeContent.assortment} />
      <ProjectsGrid content={homeContent.projects} />
      <JournalList content={homeContent.journal} />
    </>
  );
}
