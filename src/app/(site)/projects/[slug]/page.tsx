import Link from "next/link";
import { projects, type Project } from "./content";
import Viewer, {
  type ViewerProps,
} from "@scottjgilbert/lexical-blog-editor/viewer";
import "@scottjgilbert/lexical-blog-editor/styles/ViewerTheme.css";
import "./project-viewer.css";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project: Project | undefined = projects.find(
    (p) => p.slug === params.slug,
  );

  if (!project) {
    return (
      <section className="px-6 py-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-3xl rounded-2xl border border-outline-ghost bg-surface px-6 py-8 shadow-ambient">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Projects
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Project not found
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted">
            The requested project does not exist or is not currently published.
          </p>
          <Link
            href="/projects"
            className="mt-5 inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  const content: ViewerProps = {
    state: project.content,
    sanitize: true,
  };

  const hasCategories = project.categories.length > 0;
  const hasSkills = project.skills.length > 0;

  return (
    <section className="px-6 py-10 md:px-10 lg:px-12">
      <article className="project-article mx-auto max-w-3xl space-y-8">
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
                {project.start_date}
                {project.end_date ? ` - ${project.end_date}` : " - Present"}
              </dd>
            </div>

            {hasCategories ? (
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
            ) : null}

            {hasSkills ? (
              <div className="space-y-2 md:col-span-2">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Skills
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-outline-ghost bg-surface px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        </section>

        <section aria-label="Project content" className="space-y-4">
          <Viewer {...content} />
        </section>
      </article>
    </section>
  );
}
