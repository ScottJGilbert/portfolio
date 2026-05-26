import { notFound } from "next/navigation";
import { projects, type Project } from "../content";
import Viewer, {
  type ViewerProps,
} from "@scottjgilbert/lexical-blog-editor/viewer";
import "@scottjgilbert/lexical-blog-editor/styles/ViewerTheme.css";
import "./project-viewer.css";
import { fetchStack, TechStackElement } from "@/lib/tech-stack";
import TechStackComponent from "@/components/ui/tech-stack";

import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const data = projects.find((p) => p.slug === slug);
  if (!data) {
    return {
      title: "Project Not Found",
      description: "",
    };
  }
  return {
    title: data.title ?? "",
    description: data.description ?? "",
  };
}
export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  const project: Project | undefined = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const content: ViewerProps = {
    state: project.content,
    sanitize: true,
  };

  const hasCategories = project.categories.length > 0;
  const hasStack = project.stack.length > 0;

  const icons = fetchStack(project.stack);

  return (
    <section className="px-6 py-10 md:px-10 lg:px-12">
      <article className="project-article mx-auto space-y-8">
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
                {new Date(project.start_date).toLocaleDateString()}
                {project.end_date
                  ? ` - ${new Date(project.end_date).toLocaleDateString()}`
                  : " - Present"}
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

            {hasStack ? (
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
