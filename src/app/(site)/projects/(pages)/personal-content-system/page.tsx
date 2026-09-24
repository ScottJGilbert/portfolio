import { getProjectMeta } from "@/lib/projects/content";
import { ProjectShell } from "../../components/project-shell";
import { projectMetadata } from "../../lib/metadata";

export const metadata = projectMetadata("personal-content-system");

export default function PersonalContentSystemPage() {
  const project = getProjectMeta("personal-content-system")!;

  return (
    <ProjectShell project={project}>
      <h2>A portfolio that is also a systems project.</h2>
      <p>
        The Personal Content System brings together the public-facing portfolio,
        structured content, authentication, workflow automation, and the
        services that support them. The goal is to make publishing flexible
        without losing the reliability and maintainability expected from a
        production application.
      </p>
    </ProjectShell>
  );
}
