import type { ReactNode } from "react";
import TechStackComponent from "@/components/ui/tech-stack";
import { fetchStack } from "@/lib/tech-stack";
import type { ProjectMeta } from "@/lib/projects/content";
import "./project-article.css";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString();
}

export function ProjectShell({
  project,
  tabs,
  children,
}: {
  project: ProjectMeta;
  tabs?: ReactNode;
  children: ReactNode;
}) {
  const hasCategories = project.categories.length > 0;
  const hasStack = project.stack.length > 0;
  const hasLinks = Boolean(project.links && project.links.length > 0);
  const icons = fetchStack(project.stack);

  return (
    <section className="w-full px-6 py-10 md:px-10 lg:px-12">
      <article className="project-article mx-auto w-full space-y-8">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Project
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {project.title}
          </h1>
          <p className="text-sm leading-7 text-muted md:text-base">
            {project.description}
          </p>
        </header>

        <section
          aria-label="Project facts"
          className="rounded-2xl border border-outline-ghost bg-surface-alt/75 p-5 md:p-6"
        >
          <dl className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                Timeline
              </dt>
              <dd className="text-sm text-foreground">
                {formatDate(project.start_date)}
                {project.end_date
                  ? ` - ${formatDate(project.end_date)}`
                  : " - Present"}
              </dd>
            </div>

            {project.role && (
              <div className="space-y-1">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Role
                </dt>
                <dd className="text-sm text-foreground">{project.role}</dd>
              </div>
            )}

            {project.teamSize && (
              <div className="space-y-1">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Team
                </dt>
                <dd className="text-sm text-foreground">
                  {project.teamSize}
                </dd>
              </div>
            )}

            {hasCategories && (
              <div className="space-y-2">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Categories
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-outline-ghost bg-surface px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted"
                    >
                      {category}
                    </span>
                  ))}
                </dd>
              </div>
            )}

            {project.contribution && (
              <div className="space-y-1 md:col-span-2">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  My contribution
                </dt>
                <dd className="text-sm text-foreground">
                  {project.contribution}
                </dd>
              </div>
            )}

            {hasStack && (
              <div className="space-y-2 md:col-span-2">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Stack
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {icons.map((icon) => (
                    <TechStackComponent key={icon.name} element={icon} />
                  ))}
                </dd>
              </div>
            )}

            {hasLinks && (
              <div className="space-y-2 md:col-span-2">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Links
                </dt>
                <dd className="flex flex-wrap gap-3">
                  {project.links?.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      {link.label}
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </section>

        {tabs}

        <section
          aria-label="Project content"
          className="project-article-body space-y-4"
        >
          {children}
        </section>
      </article>
    </section>
  );
}
