import { PageIntro } from "@/components/primitives/PageIntro";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { TimelineItem } from "@/components/primitives/TimelineItem";
import { aboutContent } from "@/data/about";

export default function AboutPage() {
  return (
    <div className="space-y-10 p-6">
      <PageIntro title={aboutContent.title} summary={aboutContent.lead} />
      {aboutContent.sections.map((section) => (
        <section key={section.heading} className="space-y-2">
          <SectionHeader title={section.heading} subtitle="" />
          <p>{section.body}</p>
        </section>
      ))}
      <section className="space-y-4">
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
      </section>
    </div>
  );
}
