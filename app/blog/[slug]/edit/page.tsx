import {
  fetchPost,
  fetchPostSlugs,
  fetchPostCategories,
  fetchItem,
} from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import EditPost from "../../components/edit-post";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await fetchPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "",
    };
  }

  return {
    title: "Edit " + (post.title ?? "Post"),
    description: post.description ?? "",
    robots: "noindex,nofollow",
  };
}

export const revalidate = 600; // Revalidate every ten minutes - MAKE SURE TO REPLACE THIS WITH 600 LATER
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await fetchPostSlugs();
  return slugs.map((slug) => ({ slug: slug }));
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  const slugs = await fetchPostSlugs();

  if (!slugs.includes(slug)) {
    notFound();
  }

  const categories = await fetchPostCategories();

  const post = await fetchPost(slug);

  if (!post) {
    notFound();
  }

  const post_item = await fetchItem(post?.item_id);

  return (
    <div>
      <EditPost
        initialData={post}
        markdown={post_item?.markdown as string}
        categories={categories}
      />
    </div>
  );
}
