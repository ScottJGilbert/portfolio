import { BentoCard } from "@/components/primitives/BentoCard";
import { Button } from "@/components/primitives/Button";
import { EditorialListItem } from "@/components/primitives/EditorialListItem";
import { PageIntro } from "@/components/primitives/PageIntro";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { StatPill } from "@/components/primitives/StatPill";
import { homeContent } from "@/data/home";

export default function HomePage() {
  return (
    <div className="space-y-10 p-6">
      <PageIntro title={homeContent.title} summary={homeContent.summary} />
      <Button variant="primary">{homeContent.cta}</Button>

      <section className="space-y-4">
        <SectionHeader
          title={homeContent.selectedWorkHeading}
          subtitle={homeContent.selectedWorkSubtitle}
        />
        <div className="grid gap-4">
          {homeContent.selectedWork.map((project) => (
            <EditorialListItem
              key={project.title}
              title={project.title}
              summary={project.summary}
              date={project.year}
              category={project.category}
              impact={project.impact}
              platform={project.platform}
              variant="project"
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title={homeContent.impactHeading} subtitle={homeContent.impactSubtitle} />
        <div className="flex flex-wrap gap-3">
          {homeContent.metrics.map((metric) => (
            <StatPill key={metric.label} label={metric.label} value={metric.value} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title={homeContent.highlightsHeading} subtitle="" />
        <div className="grid gap-4 md:grid-cols-3">
          {homeContent.highlights.map((item) => (
            <BentoCard key={item.title} title={item.title}>
              <p>{item.body}</p>
            </BentoCard>
          ))}
        </div>
      </section>
    </div>
  );
}
