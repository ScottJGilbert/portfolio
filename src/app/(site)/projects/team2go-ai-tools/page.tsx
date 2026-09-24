import { getProjectMeta } from "@/lib/projects/content";
import { ProjectShell } from "../components/project-shell";
import { projectMetadata } from "../lib/metadata";

export const metadata = projectMetadata("team2go-ai-tools");

export default function Team2GoAiToolsPage() {
  const project = getProjectMeta("team2go-ai-tools")!;

  return (
    <ProjectShell project={project}>
      <h2>Practical AI integration for real products.</h2>
      <p>
        This internship focused on connecting backend systems and
        user-facing tools through Dockerized services. The work included
        streaming responses from custom OpenAI GPT models, document-based
        vector embeddings, and carefully defined instructions and
        boundaries for model behavior.
      </p>
    </ProjectShell>
  );
}
