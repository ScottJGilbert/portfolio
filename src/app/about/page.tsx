import { MotionSection } from "@/components/motion/MotionSection";
import { PageIntro } from "@/components/primitives/PageIntro";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { TimelineItem } from "@/components/primitives/TimelineItem";
import { aboutContent } from "@/data/about";

export default function AboutPage() {
  return (
    <div className="space-y-10 p-6">
      <PageIntro title={aboutContent.title} summary={aboutContent.lead} />
      {aboutContent.sections.map((section, index) => (
        <MotionSection key={section.heading} className="space-y-2" delay={index * 0.04}>
          <SectionHeader title={section.heading} subtitle="" />
          <p>{section.body}</p>
        </MotionSection>
      ))}
      <MotionSection className="space-y-4" delay={0.16}>
        <SectionHeader title={aboutContent.timelineHeading} subtitle={aboutContent.timelineSubtitle} />
        <div className="grid gap-4 md:grid-cols-3">
          {aboutContent.timeline.map((item) => (
            <TimelineItem
              key={`${item.year}-${item.title}`}
              year={item.year}
              title={item.title}
              detail={item.detail}
            />
          ))}
        </div>
      </MotionSection>
    </div>
  );
}
