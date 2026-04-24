import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Project } from "@/app/(site)/projects/content";

export interface HomeProjectsContent {
  eyebrow: string;
  title: string;
  archiveLabel: string;
  archiveHref: string;
  projects: readonly Project[];
}

interface ProjectsGridProps {
  content: HomeProjectsContent;
}

export function ProjectsGrid({ content }: ProjectsGridProps) {
  return (
    <section
      className="px-6 py-20 md:px-12 md:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          level="h2"
          className="[&>div>h2]:text-2xl [&>div>h2]:font-bold"
          action={
            <Link
              href={content.archiveHref}
              className="text-sm font-bold uppercase tracking-[0.16em] text-primary transition-colors hover:underline hover:underline-offset-8"
            >
              {content.archiveLabel}
            </Link>
          }
          id="projects-heading"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {content.projects.map((project) => (
            <Link
              key={project.title}
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <Card
                variant="surface"
                padding="none"
                className="overflow-hidden border-outline-ghost/80 bg-surface/85 transition-colors hover:bg-surface-alt/80"
              >
                <div className="aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element -- intentional plain image to avoid unoptimized next/image usage */}
                  <img
                    src={project.image_url}
                    alt={project.title}
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-6 p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-bold leading-tight">
                      {project.title}
                    </h3>
                    <FaArrowUpRightFromSquare
                      className="mt-1 size-5 shrink-0 text-muted/85 transition-colors group-hover:text-primary"
                      aria-hidden
                    />
                  </div>
                  <p className="leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <ul className="flex flex-wrap gap-3">
                    {project.categories.map((tag) => (
                      <li key={tag}>
                        <Chip
                          variant="outline"
                          className="text-[0.7rem] font-bold uppercase tracking-[0.14em]"
                        >
                          {tag}
                        </Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
