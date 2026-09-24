import { notFound } from "next/navigation";
import { getProjectMeta } from "@/lib/projects/content";
import { ProjectShell } from "../components/project-shell";
import { projectMetadata } from "../lib/metadata";

import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  return projectMetadata(slug);
}

export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const project = getProjectMeta(slug);

  if (!project) {
    notFound();
  }

  return (
    <ProjectShell project={project}>
      <p>
        The full write-up for this project is still in progress — check
        back soon for more details.
      </p>
    </ProjectShell>
  );
}
