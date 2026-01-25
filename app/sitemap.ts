import type { MetadataRoute } from "next";
import { fetchPostSlugs, fetchProjectSlugs } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectMap = await projects();
  const postMap = await posts();

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
    ...postMap,
  ];
}

async function projects() {
  const slugs: string[] = await fetchProjectSlugs();
  const map: MetadataRoute.Sitemap = slugs.map((slug) => {
    return {
      url: `${process.env.BASE_URL || "https://scottgilbert.dev"}/projects/${slug}`,
      priority: 0.35,
    };
  });

  return map;
}

async function posts() {
  const slugs: string[] = await fetchPostSlugs();
  const map: MetadataRoute.Sitemap = slugs.map((slug) => {
    return {
      url: `${process.env.BASE_URL || "https://scottgilbert.dev"}/blog/${slug}`,
      priority: 0.35,
    };
  });

  return map;
}
