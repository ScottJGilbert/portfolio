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

  return (
    <div>
      <Suspense>
        <MDXPage type="post" slug={slug} />
      </Suspense>
    </div>
  );
}
