import type { Metadata } from "next";
import { getProjectMeta, getSubPageMeta } from "@/lib/projects/content";

/**
 * Derives a project (or project sub-page) route's <title>/<description>
 * straight from the metadata registry, so individual page.tsx files never
 * hand-duplicate copy that already exists in src/lib/projects/content.ts.
 */
export function projectMetadata(slug: string, subSlug?: string): Metadata {
  if (subSlug) {
    const subPage = getSubPageMeta(slug, subSlug);
    if (subPage) {
      return { title: subPage.title, description: subPage.description };
    }
  }

  const project = getProjectMeta(slug);
  if (!project) {
    return { title: "Project Not Found", description: "" };
  }

  return { title: project.title, description: project.description };
}
