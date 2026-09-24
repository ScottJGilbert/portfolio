import { getProjectMeta } from "@/lib/projects/content";
import { ProjectShell } from "../components/project-shell";
import { projectMetadata } from "../lib/metadata";

export const metadata = projectMetadata("illini-redstone-computing");

export default function IlliniRedstoneComputingPage() {
  const project = getProjectMeta("illini-redstone-computing")!;

  return (
    <ProjectShell project={project}>
      <h2>Building the infrastructure behind a community.</h2>
      <p>
        As president and systems administrator, I help guide both the
        organization&apos;s day-to-day decisions and its technical
        direction. The platform is organized around containerized services
        that support gaming, authentication, user management, and data
        pipelines.
      </p>
    </ProjectShell>
  );
}
