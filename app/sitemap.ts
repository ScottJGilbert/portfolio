import type { MetadataRoute } from "next";
import { fetchPostSlugs, fetchProjectSlugs } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectMap = await projects();
  const postMap = await posts();

  return [
    {
      url: `https://scott-gilbert.vercel.app`,
      priority: 1,
    },
    {
      url: `https://scott-gilbert.vercel.app/about`,
      priority: 0.8,
    },
    {
      url: `https://scott-gilbert.vercel.app/experience`,
      priority: 0.5,
    },
    {
      url: `https://scott-gilbert.vercel.app/projects`,
      priority: 0.5,
    },
    {
      url: `https://scott-gilbert.vercel.app/blog`,
      priority: 0.5,
    },
    {
      url: `https://scott-gilbert.vercel.app/resume`,
      priority: 0.8,
    },
    {
      url: `https://scott-gilbert.vercel.app/attributions`,
      priority: 0.1,
    },
    ...projectMap,
    ...postMap,
  ];
}

async function projects() {
  const slugs: string[] = await fetchProjectSlugs();
  const map: MetadataRoute.Sitemap = slugs.map((slug) => {
    return {
      url: `https://scott-gilbert.vercel.app/projects/${slug}`,
      priority: 0.35,
    };
  });

  return map;
}

async function posts() {
  const slugs: string[] = await fetchPostSlugs();
  const map: MetadataRoute.Sitemap = slugs.map((slug) => {
    return {
      url: `https://scott-gilbert.vercel.app/blog/${slug}`,
      priority: 0.35,
    };
  });

  return map;
}
