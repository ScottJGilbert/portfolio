import type { MetadataRoute } from "next";
import { projects as projectsJSON } from "./(site)/projects/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectMap = await projects();

  return [
    {
      url: `${process.env.BASE_URL || "https://scottgilbert.dev"}/`,
      priority: 1,
    },
    {
      url: `${process.env.BASE_URL || "https://scottgilbert.dev"}/about`,
      priority: 0.8,
    },
    {
      url: `${process.env.BASE_URL || "https://scottgilbert.dev"}/skills`,
      priority: 0.6,
    },
    {
      url: `${process.env.BASE_URL || "https://scottgilbert.dev"}/projects`,
      priority: 0.5,
    },
    {
      url: `${process.env.BASE_URL || "https://scottgilbert.dev"}/blog`,
      priority: 0.5,
    },
    {
      url: `${process.env.BASE_URL || "https://scottgilbert.dev"}/resume.pdf`,
      priority: 0.8,
    },
    {
      url: `${process.env.BASE_URL || "https://scottgilbert.dev"}/attributions`,
      priority: 0.1,
    },
    {
      url: `${process.env.BASE_URL || "https://scottgilbert.dev"}/legal`,
      priority: 0.1,
    },
    {
      url: `${process.env.BASE_URL || "https://scottgilbert.dev"}/signin`,
      priority: 0.25,
    },
    {
      url: `${process.env.BASE_URL || "https://scottgilbert.dev"}/signup`,
      priority: 0.25,
    },
    ...projectMap,
  ];
}

async function projects() {
  const slugs: string[] = projectsJSON.map((project) => project.slug);
  const map: MetadataRoute.Sitemap = slugs.map((slug) => {
    return {
      url: `${process.env.BASE_URL || "https://scottgilbert.dev"}/projects/${slug}`,
      priority: 0.35,
    };
  });

  return map;
}
