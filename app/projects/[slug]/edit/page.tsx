"use server";

import EditPage from "@/app/ui/mdx-page/edit-page";
import { fetchProject } from "@/lib/db";
import { Project, Item } from "@/lib/definitions";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  const [data, markdown] = await fetchProject(slug);
  const project = data as Project;
  const newItem: Item = {
    title: project.title,
    description: project.description,
    categories: project.categories,
    slug: project.slug,
    creation_date: "",
    edit_date: "",
    image_url: project.image_url,
  };
  return (
    <div>
      <EditPage initialData={newItem} markdown={markdown as string}></EditPage>
    </div>
  );
}
