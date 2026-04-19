import { EditorialListItem } from "@/components/primitives/EditorialListItem";
import { PageIntro } from "@/components/primitives/PageIntro";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  return (
    <div className="space-y-8 p-6">
      <PageIntro
        title="Blog"
        summary="Writing on engineering systems, product clarity, and frontend architecture."
      />
      {blogPosts.map((post) => (
        <EditorialListItem
          key={post.title}
          title={post.title}
          summary={post.summary}
          date={post.date}
          category={post.category}
        />
      ))}
    </div>
  );
}
