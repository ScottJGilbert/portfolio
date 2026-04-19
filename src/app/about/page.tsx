import { PageIntro } from "@/components/primitives/PageIntro";
import { SectionHeader } from "@/components/primitives/SectionHeader";
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
    </div>
  );
}
