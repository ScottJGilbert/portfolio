import { EditorialListItem } from "@/components/primitives/EditorialListItem";
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
      <section className="space-y-4">
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
      </section>
      <section className="space-y-4">
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
      </section>
    </div>
  );
}
