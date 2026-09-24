import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getProjectMeta } from "@/lib/projects/content";
import { ProjectShell } from "../components/project-shell";
import { ProjectTabs, type ProjectTab } from "../components/project-tabs";

const tabs: ProjectTab[] = [
  { href: "/projects/delos", label: "Overview" },
  { href: "/projects/delos/dash", label: "Dashboard" },
  { href: "/projects/delos/array", label: "Solar Array" },
  { href: "/projects/delos/mppts", label: "MPPTs" },
];

export default function DelosLayout({ children }: { children: ReactNode }) {
  const project = getProjectMeta("delos");

  if (!project) {
    notFound();
  }

  return (
    <ProjectShell project={project} tabs={<ProjectTabs tabs={tabs} />}>
      {children}
    </ProjectShell>
  );
}
