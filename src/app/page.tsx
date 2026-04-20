import { BentoCard } from "@/components/primitives/BentoCard";
import { Button } from "@/components/primitives/Button";
import { EditorialListItem } from "@/components/primitives/EditorialListItem";
import { MotionSection } from "@/components/motion/MotionSection";
import { PageIntro } from "@/components/primitives/PageIntro";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { StatPill } from "@/components/primitives/StatPill";
import { homeContent } from "@/data/home";

export default function HomePage() {
  return (
    <div className="space-y-10 p-6">
      <PageIntro title={homeContent.title} summary={homeContent.summary} />
      <Button variant="primary">{homeContent.cta}</Button>

      <MotionSection className="space-y-4" delay={0.05}>
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
      </MotionSection>

      <MotionSection className="space-y-4" delay={0.1}>
        <SectionHeader title={homeContent.impactHeading} subtitle={homeContent.impactSubtitle} />
        <div className="flex flex-wrap gap-3">
          {homeContent.metrics.map((metric) => (
            <StatPill key={metric.label} label={metric.label} value={metric.value} />
          ))}
        </div>
      </MotionSection>

      <MotionSection className="space-y-4" delay={0.15}>
        <SectionHeader title={homeContent.highlightsHeading} subtitle="" />
        <div className="grid gap-4 md:grid-cols-3">
          {homeContent.highlights.map((item) => (
            <BentoCard key={item.title} title={item.title}>
              <p>{item.body}</p>
            </BentoCard>
          ))}
        </div>
      </MotionSection>
    </div>
  );
}
