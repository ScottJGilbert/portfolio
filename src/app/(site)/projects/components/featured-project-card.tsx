import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import { Chip } from "@/components/ui/chip";
import TechStackComponent from "@/components/ui/tech-stack";
import { fetchStack } from "@/lib/tech-stack";
import { Card } from "@/components/ui/card";

import { Project } from "../content";

function formatProjectDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function FeaturedProjectCard({
  project,
  prominent = false,
}: {
  project: Project;
  prominent?: boolean;
}) {
  const stack = fetchStack(project.stack).slice(0, 7);

  return (
    <Card
      variant="surface"
      padding="none"
      className="group min-w-0 overflow-hidden border-outline-ghost/80 transition-colors hover:bg-surface-alt/80"
    >
      <div
        className={
          prominent
            ? "aspect-video overflow-hidden md:aspect-16/8 md:min-h-72"
            : "aspect-video overflow-hidden"
        }
      >
        <Image
          src={project.image_url || "/marchingillini.webp"}
          alt={project.title}
          width={1280}
          height={720}
          loading="lazy"
          decoding="async"
          className="h-full w-full max-w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div
        className={
          prominent
            ? "min-w-0 space-y-4 p-5 md:space-y-6 md:p-10"
            : "min-w-0 space-y-5 p-5 md:p-6"
        }
      >
        <div className="flex min-w-0 items-start justify-between gap-4">
          <div className="min-w-0 space-y-3">
            <p className="wrap-break-word text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {formatProjectDate(project.start_date)} -{" "}
              {project.end_date
                ? formatProjectDate(project.end_date)
                : "Present"}
            </p>
            <h2
              className={
                prominent
                  ? "wrap-break-word text-2xl font-semibold tracking-tight md:text-4xl"
                  : "wrap-break-word text-xl font-semibold tracking-tight md:text-2xl"
              }
            >
              {project.title}
            </h2>
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <FaArrowUpRightFromSquare
              className="mt-1 size-5 shrink-0 text-muted/85 transition-colors group-hover:text-primary"
              aria-hidden
            />
          </Link>
        </div>

        <p className="max-w-3xl leading-7 text-muted">{project.description}</p>

        <div className="flex min-w-0 flex-wrap gap-2">
          {project.categories.map((category) => (
            <Chip key={`${project.title}-${category}`} variant="outline">
              {category}
            </Chip>
          ))}
          {stack.map((item) => (
            <React.Fragment key={`${project.title}-${item.name}`}>
              <TechStackComponent element={item} />
            </React.Fragment>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          View project
          <span className="sr-only">: {project.title}</span>
        </Link>
      </div>
    </Card>
  );
}
