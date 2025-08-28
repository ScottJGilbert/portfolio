import type { MetadataRoute } from "next";
import { fetchPostSlugs, fetchProjectSlugs } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectMap = await projects();
  const postMap = await posts();

  return [
    {
      url: `${process.env.BASE_URL}`,
      priority: 1,
    },
    {
      url: `${process.env.BASE_URL}/about`,
      priority: 0.8,
    },
    {
      url: `${process.env.BASE_URL}/experience`,
      priority: 0.5,
    },
    {
      url: `${process.env.BASE_URL}/projects`,
      priority: 0.5,
    },
    {
      url: `${process.env.BASE_URL}/blog`,
      priority: 0.5,
    },
    {
      url: `${process.env.BASE_URL}/resume`,
      priority: 0.8,
    },
    {
      url: `${process.env.BASE_URL}/attributions`,
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
      url: `${process.env.BASE_URL}/projects/${slug}`,
      priority: 0.35,
    };
  });

  return map;
}

async function posts() {
  const slugs: string[] = await fetchPostSlugs();
  const map: MetadataRoute.Sitemap = slugs.map((slug) => {
    return {
      url: `${process.env.BASE_URL}/blog/${slug}`,
      priority: 0.35,
    };
  });

  return map;
}
