import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { projectsPageContent } from "./content";

export default function ProjectsPage() {
  return (
    <section className="px-6 py-10 md:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">{projectsPageContent.title}</h1>
          <p className="max-w-3xl text-sm leading-7 text-muted">{projectsPageContent.intro}</p>
        </header>

        <Card variant="surface" padding="lg" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
              Search
              <input
                type="text"
                placeholder="Search projects (coming soon)"
                disabled
                className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-muted"
              />
            </label>

            <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
              Category
              <select
                disabled
                defaultValue={projectsPageContent.filterOptions.categories[0]}
                className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-muted"
              >
                {projectsPageContent.filterOptions.categories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
              Sort
              <select
                disabled
                defaultValue={projectsPageContent.filterOptions.sort[0]}
                className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-muted"
              >
                {projectsPageContent.filterOptions.sort.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">
            Filtering controls are staged for a future interactive release.
          </p>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {projectsPageContent.projects.map((project) => (
            <Card key={project.title} variant="surface" padding="lg" className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">{project.title}</h2>
                <p className="text-sm leading-7 text-muted">{project.summary}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Chip variant="accent">{project.category}</Chip>
                <Chip variant="outline">{project.status}</Chip>
                {project.stack.map((item) => (
                  <Chip key={`${project.title}-${item}`} variant="outline">
                    {item}
                  </Chip>
                ))}
              </div>

              <Link
                href={project.href}
                aria-label={`View project: ${project.title}`}
                className="inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                View Project
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
