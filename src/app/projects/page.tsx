import { EditorialListItem } from "@/components/primitives/EditorialListItem";
import { MotionSection } from "@/components/motion/MotionSection";
import { PageIntro } from "@/components/primitives/PageIntro";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { StatPill } from "@/components/primitives/StatPill";
import { TagChip } from "@/components/primitives/TagChip";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="space-y-10 p-6">
      <PageIntro
        title="Projects"
        summary="Case studies focused on challenge framing, implementation strategy, and measurable outcomes."
      />
      <MotionSection className="space-y-4" delay={0.05}>
        <SectionHeader
          title="Case Studies"
          subtitle="Each study captures the problem context, delivery approach, and post-launch effect."
        />
        <div className="space-y-8">
          {projects.map((project) => (
            <article key={project.title} className="space-y-4">
              <EditorialListItem
                title={project.title}
                summary={project.challenge}
                date={project.year}
                category={project.category}
                variant="project"
              />
              <section className="space-y-2">
                <h4 className="text-base font-semibold">Approach</h4>
                <p>{project.approach}</p>
              </section>
              <section className="space-y-2">
                <h4 className="text-base font-semibold">Outcome</h4>
                <p>{project.outcome}</p>
              </section>
              <div className="flex flex-wrap gap-3">
                {project.metrics.map((metric) => (
                  <StatPill key={metric.label} label={metric.label} value={metric.value} />
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <TagChip key={tag}>{tag}</TagChip>
                ))}
              </div>
            </article>
          ))}
        </div>
      </MotionSection>
      <MotionSection className="space-y-4" delay={0.1}>
        <SectionHeader
          title="Outcome Signals"
          subtitle="Cross-project indicators used to evaluate reliability, speed, and editorial quality."
        />
        <div className="flex flex-wrap gap-3">
          {projects.flatMap((project) =>
            project.metrics.map((metric) => (
              <StatPill
                key={`${project.title}-${metric.label}`}
                label={metric.label}
                value={metric.value}
              />
            ))
          )}
        </div>
      </MotionSection>
    </div>
  );
}
