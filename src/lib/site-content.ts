export type SiteNavIcon = "home" | "work" | "journal" | "about" | "contact";

export interface SiteNavItem {
  href: "/" | `/${string}`;
  label: string;
  icon: SiteNavIcon;
}

export type ExternalLinkIcon = "github" | "linkedin" | "email";

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

export type HomeBeyondCodeIcon = "headphones" | "infrastructure";

export interface HomeHeroContent {
  title: string;
  description: string;
  ctaLabel: string;
}

export interface HomeAssortmentContent {
  eyebrow: string;
  title: string;
  coreStack: {
    title: string;
    technologies: readonly string[];
    description: string;
  };
  philosophy: {
    quote: string;
  };
  lab: {
    title: string;
    items: readonly string[];
  };
  beyondCode: {
    title: string;
    description: string;
    icons: readonly HomeBeyondCodeIcon[];
    image: {
      src: string;
      alt: string;
    };
  };
}

export interface HomeWorkProject {
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface HomeWorkContent {
  eyebrow: string;
  title: string;
  archiveLabel: string;
  archiveHref: string;
  projects: readonly HomeWorkProject[];
}

export interface HomeJournalEntry {
  index: string;
  title: string;
  description: string;
  date: string;
  href: string;
}

export interface HomeJournalContent {
  eyebrow: string;
  title: string;
  entries: readonly HomeJournalEntry[];
}

export interface HomeFooterContent {
  name: string;
  statement: string;
  links: readonly {
    label: string;
    href: string;
  }[];
}

export interface HomeContent {
  hero: HomeHeroContent;
  assortment: HomeAssortmentContent;
  work: HomeWorkContent;
  journal: HomeJournalContent;
  footer: HomeFooterContent;
}

export const navItems: readonly SiteNavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/work", label: "Work", icon: "work" },
  { href: "/journal", label: "Journal", icon: "journal" },
  { href: "/about", label: "About", icon: "about" },
  { href: "/contact", label: "Contact", icon: "contact" },
];

export const externalLinks: readonly ExternalLink[] = [
  { href: "https://github.com", label: "GitHub", icon: "github" },
  { href: "https://www.linkedin.com", label: "LinkedIn", icon: "linkedin" },
  { href: "mailto:hello@example.com", label: "Email", icon: "email" },
];

export const siteShellContent: SiteShellContent = {
  siteTitle: "Personal Portfolio",
  siteTagline: "Designing, building, and writing with intent.",
  navItems,
  externalLinks,
};

export const homeContent: HomeContent = {
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
  work: {
    eyebrow: "Work",
    title: "Selected Projects",
    archiveLabel: "View Archive",
    archiveHref: "/work",
    projects: [
      {
        title: "Vector Engine v2.0",
        description:
          "A custom-built physics engine for 2D spatial simulations, written entirely in Rust for maximum throughput.",
        tags: ["Rust", "WASM"],
        href: "/work",
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
        href: "/work",
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
  footer: {
    name: "Scott Gilbert",
    statement: "© 2024 Scott Gilbert. Built for Systems.",
    links: [
      { label: "Privacy", href: "/about#privacy" },
      { label: "Accessibility", href: "/about#accessibility" },
      { label: "Colophon", href: "/about#colophon" },
    ],
  },
};
