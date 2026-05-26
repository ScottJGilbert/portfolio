import { Card } from "@/components/ui/card";
import { Project } from "../content";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import React from "react";
import { fetchStack } from "@/lib/tech-stack";
import TechStackComponent from "@/components/ui/tech-stack";

export default function ProjectCard({ project }: { project: Project }) {
  const stack = fetchStack(project.stack);

  return (
    <Card
      key={project.title}
      variant="surface"
      padding="lg"
      className="flex h-full flex-col gap-4"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">
          {project.title}
        </h2>
        <p className="text-sm leading-7 text-muted">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.categories.map((item) => (
          <Chip key={`${project.title}-${item}`} variant="outline">
            {item}
          </Chip>
        ))}
        {stack.map((item, index) => (
          <React.Fragment key={`${project.title}-${item.name}`}>
            {index < 7 && <TechStackComponent element={item} />}
          </React.Fragment>
        ))}
      </div>

      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View project: ${project.title}`}
        className="mt-auto inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary/80"
      >
        View Project
      </Link>
    </Card>
  );
}
