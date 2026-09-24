"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import ProjectCard from "./project-card";
import type { ProjectCategory, ProjectMeta } from "@/lib/projects/content";

const PAGE_SIZE = 6;

export function ProjectsExplorer({
  projects,
}: {
  projects: readonly ProjectMeta[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | ProjectCategory>("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const project of projects) {
      for (const category of project.categories) {
        set.add(category);
      }
    }
    return Array.from(set).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const matches = projects.filter((project) => {
      const matchesQuery =
        normalizedQuery === "" ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery) ||
        project.stack.some((item) =>
          item.toLowerCase().includes(normalizedQuery),
        );
      const matchesCategory =
        category === "all" || project.categories.includes(category);

      return matchesQuery && matchesCategory;
    });

    return [...matches].sort((a, b) => {
      const aTime = new Date(a.start_date).getTime();
      const bTime = new Date(b.start_date).getTime();
      return sort === "newest" ? bTime - aTime : aTime - bTime;
    });
  }, [projects, query, category, sort]);

  const visibleProjects = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function resetPaging() {
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div className="min-w-0 space-y-6">
      <Card variant="surface" padding="lg" className="space-y-4">
        <label className="block space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
          Search
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              resetPaging();
            }}
            placeholder="Search by title, description, or tech"
            className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
            Category
            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value as "all" | ProjectCategory);
                resetPaging();
              }}
              className="mt-1 w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
            Sort
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as "newest" | "oldest");
                resetPaging();
              }}
              className="mt-1 w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>
        </div>
      </Card>

      {visibleProjects.length > 0 ? (
        <div className="grid min-w-0 gap-6 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">
          No projects match your search — try a different keyword or category.
        </p>
      )}

      {hasMore && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="rounded-full border border-outline-ghost bg-surface px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
