import {
  featuredProjectSlugs,
  type ProjectMeta,
  type RecruiterCategory,
} from "./content";

/**
 * Picks which projects to feature. With no recruiter-category cookie, this
 * returns today's static default order unchanged. With one, it ranks
 * projects by how many of their `recruiterCategories` match the visitor's,
 * then pads up to `limit` with the default featured list so the result
 * never comes up short.
 */
export function selectFeaturedProjects(
  allProjects: readonly ProjectMeta[],
  recruiterCategories: readonly RecruiterCategory[] | null,
  fallbackSlugs: readonly string[] = featuredProjectSlugs,
  limit = 3,
): ProjectMeta[] {
  const defaultOrder = fallbackSlugs
    .map((slug) => allProjects.find((project) => project.slug === slug))
    .filter((project): project is ProjectMeta => Boolean(project));

  if (!recruiterCategories || recruiterCategories.length === 0) {
    return defaultOrder.slice(0, limit);
  }

  const matchScore = (project: ProjectMeta) =>
    project.recruiterCategories.filter((category) =>
      recruiterCategories.includes(category),
    ).length;

  const ranked = [...allProjects]
    .filter((project) => matchScore(project) > 0)
    .sort((a, b) => matchScore(b) - matchScore(a));

  const selected: ProjectMeta[] = [];
  const usedSlugs = new Set<string>();

  for (const project of [...ranked, ...defaultOrder]) {
    if (selected.length >= limit) break;
    if (usedSlugs.has(project.slug)) continue;
    usedSlugs.add(project.slug);
    selected.push(project);
  }

  return selected;
}
