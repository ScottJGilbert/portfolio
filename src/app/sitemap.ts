import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects/content";

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || "https://scottgilbert.dev";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return [
    { url: `${baseUrl}/`, priority: 1 },
    { url: `${baseUrl}/about`, priority: 0.8 },
    { url: `${baseUrl}/projects`, priority: 0.7 },
    { url: `${baseUrl}/contact`, priority: 0.6 },
    { url: `${baseUrl}/resume.pdf`, priority: 0.8 },
    { url: `${baseUrl}/legal`, priority: 0.1 },
    { url: `${baseUrl}/attributions`, priority: 0.1 },
    ...projects.flatMap((project) => [
      {
        url: `${baseUrl}/projects/${project.slug}`,
        priority: 0.5,
      },
      ...(project.subPages ?? []).map((subpage) => ({
        url: `${baseUrl}/projects/${project.slug}/${subpage.slug}`,
        priority: 0.4,
      })),
    ]),
    
  ];
}
