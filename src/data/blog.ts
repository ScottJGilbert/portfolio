export type BlogPost = {
  title: string;
  summary: string;
  date: string;
  category: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "Engineering Notes: Designing for Recovery",
    summary: "Recovery-first thinking for APIs and background workflows.",
    date: "2026-04-01",
    category: "Engineering Notes",
  },
  {
    title: "Engineering Notes: UI Systems That Scale",
    summary: "Design token boundaries and component contracts that hold up.",
    date: "2026-03-15",
    category: "Engineering Notes",
  },
];
