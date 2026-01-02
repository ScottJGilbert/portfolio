import {
  fetchProject,
  fetchProjectSlugs,
  fetchProjectCategories,
  fetchSkills,
  fetchItem,
} from "@/lib/db";
import { Project } from "@/lib/definitions";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import EditProject from "../../components/edit-project";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session?.user?.admin) {
    return {
      title: "Unauthorized",
      description: "",
      robots: "noindex,nofollow",
    };
  }

  const { slug } = await props.params;
  const data = await fetchProject(slug);
  if (!data) {
    return {
      title: "Project Not Found",
      description: "",
    };
  }
  return {
    title: data.title ?? "",
    description: data.description ?? "",
  };
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await fetchProjectSlugs();
  return slugs.map((slug) => ({ slug: slug }));
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session?.user?.admin) {
    redirect("/no-access");
  }

  const params = await props.params;
  const slug = params.slug;

  const slugs = await fetchProjectSlugs();

  if (!slugs.includes(slug)) {
    notFound();
  }

  const project_data = await fetchProject(slug);

  if (!project_data) {
    notFound();
  }

  const project_item = await fetchItem(project_data?.item_id);

  const categories = await fetchProjectCategories();
  const allSkills = await fetchSkills([]);

  return (
    <div>
      <EditProject
        initialData={project_data as Project}
        item={project_item}
        categories={categories}
        allSkills={allSkills}
      />
    </div>
  );
}
