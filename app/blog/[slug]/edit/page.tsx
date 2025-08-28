"use server";

import EditPage from "@/app/components/mdx/edit-page";
import {
  fetchPost,
  fetchPostSlugs,
  fetchPostCategories,
  fetchPostMetadata,
} from "@/lib/db";
import { Post, Item, ItemMetadata } from "@/lib/definitions";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const data = (await fetchPostMetadata(slug)) as ItemMetadata;
  return {
    title: "Edit " + (data.title ?? "Post"),
    description: data.description ?? "",
    robots: "noindex,nofollow",
  };
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

  const [data, markdown] = await fetchPost(slug);
  const post = data as Post;
  const newItem: Item = {
    title: post.title,
    description: post.description,
    categories: post.categories,
    slug: post.slug,
    date_one: post.creation_date.toDateString(),
    date_two: post.edit_date.toDateString(),
    image_url: post.image_url,
  };
  return (
    <div>
      <EditPage
        initialData={newItem}
        markdown={markdown as string}
        categories={categories}
        type="post"
      ></EditPage>
    </div>
  );
}
