"use server";

//Categories to use: computer science/software engineering, computer engineering, electrical engineering

import EditPage from "@/app/components/mdx/edit-page";
import {
  fetchProject,
  fetchProjectSlugs,
  fetchProjectCategories,
  fetchProjectMetadata,
} from "@/lib/db";
import { Project, Item, ItemMetadata } from "@/lib/definitions";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const data = (await fetchProjectMetadata(slug)) as ItemMetadata;
  return {
    title: "Edit " + (data.title ?? "Project"),
    description: data.description ?? "",
    robots: "noindex,nofollow",
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  const slugs = await fetchProjectSlugs();

  if (!slugs.includes(slug)) {
    notFound();
  }

  const categories = await fetchProjectCategories();

  const [data, markdown] = await fetchProject(slug);
  const project = data as Project;
  const newItem: Item = {
    title: project.title,
    description: project.description,
    categories: project.categories,
    slug: project.slug,
    date_one: project.start_date.toDateString(),
    date_two: project.end_date?.toDateString() || "",
    image_url: project.image_url,
  };
  return (
    <div>
      <EditPage
        initialData={newItem}
        markdown={markdown as string}
        categories={categories}
        type="project"
      ></EditPage>
    </div>
  );
}
