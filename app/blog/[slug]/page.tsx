import MDXPage from "@/app/components/mdx/mdx-page";
import { fetchPostSlugs, fetchPostMetadata } from "@/lib/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ItemMetadata } from "@/lib/definitions";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const data = (await fetchPostMetadata(slug)) as ItemMetadata;
  return {
    title: data.title ?? "",
    description: data.description ?? "",
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

  return (
    <div>
      <Suspense>
        <MDXPage type="post" slug={slug} />
      </Suspense>
    </div>
  );
}
