import { EditorialListItem } from "@/components/primitives/EditorialListItem";
import { MotionSection } from "@/components/motion/MotionSection";
import { PageIntro } from "@/components/primitives/PageIntro";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { blogPosts, featuredEssay } from "@/data/blog";

export default function BlogPage() {
  return (
    <div className="space-y-10 p-6">
      <PageIntro
        title="Blog"
        summary="Long-form essays and engineering notes on system clarity, delivery rigor, and product architecture."
      />
      <MotionSection className="space-y-4" delay={0.05}>
        <SectionHeader
          title="Featured Essay"
          subtitle="One in-depth piece focused on systems thinking and interface decisions."
        />
        <EditorialListItem
          title={featuredEssay.title}
          summary={featuredEssay.summary}
          date={featuredEssay.date}
          category={featuredEssay.category}
          readingTime={featuredEssay.readingTime}
          variant="project"
        />
      </MotionSection>
      <MotionSection className="space-y-4" delay={0.1}>
        <SectionHeader
          title="Archive"
          subtitle="Field notes and implementation reflections from recent delivery cycles."
        />
        <div className="space-y-4">
          {blogPosts.map((post) => (
            <EditorialListItem
              key={post.title}
              title={post.title}
              summary={post.summary}
              date={post.date}
              category={post.category}
              readingTime={post.readingTime}
            />
            ))}
          </div>
      </MotionSection>
    </div>
  );
}
