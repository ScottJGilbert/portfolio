import { EditorialListItem } from "@/components/primitives/EditorialListItem";
import { PageIntro } from "@/components/primitives/PageIntro";
import { TagChip } from "@/components/primitives/TagChip";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="space-y-8 p-6">
      <PageIntro
        title="Projects"
        summary="Selected implementation work and architecture outcomes."
      />
      {projects.map((project) => (
        <article key={project.title} className="space-y-3">
          <EditorialListItem
            title={project.title}
            summary={project.summary}
            date={project.year}
            category={project.category}
          />
          <div className="flex gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <TagChip key={tag}>{tag}</TagChip>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
