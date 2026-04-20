export type BlogPost = {
  title: string;
  summary: string;
  date: string;
  category: string;
  readingTime: string;
};

export const featuredEssay: BlogPost = {
  title: "Designing Interfaces That Explain Systems",
  summary:
    "A practical method for translating infrastructure complexity into product surfaces that stay legible under pressure.",
  date: "2026-04-10",
  category: "Featured Essay",
  readingTime: "7 min",
};

export const blogPosts: BlogPost[] = [
  {
    title: "Engineering Notes: Designing for Recovery",
    summary: "Recovery-first thinking for APIs and background workflows.",
    date: "2026-04-01",
    category: "Engineering Notes",
    readingTime: "6 min",
  },
  {
    title: "Engineering Notes: UI Systems That Scale",
    summary: "Design token boundaries and component contracts that hold up.",
    date: "2026-03-15",
    category: "Engineering Notes",
    readingTime: "5 min",
  },
  {
    title: "Engineering Notes: Choosing Operational Metrics",
    summary: "How to pick metrics that explain behavior instead of merely logging activity.",
    date: "2026-02-20",
    category: "Engineering Notes",
    readingTime: "4 min",
  },
];
