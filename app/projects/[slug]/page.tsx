import MDXPage from "@/app/ui/mdx-page/mdx-page";
import { fetchProjectSlugs } from "@/lib/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  const slugs = await fetchProjectSlugs();

  if (!slugs.includes(slug)) {
    notFound();
  }

  return (
    <div>
      <Suspense>
        <MDXPage type="project" slug={slug} />
      </Suspense>
    </div>
  );
}
