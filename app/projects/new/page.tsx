import { fetchProjectCategories, fetchSkills } from "@/lib/db";
import { Item, Project } from "@/lib/definitions";
import { Metadata } from "next";
import EditProject from "../components/edit-project";

export const metadata: Metadata = {
  title: "New Project",
  robots: "noindex,nofollow",
};

export default async function Page() {
  const newProject: Project = {
    title: "",
    description: "",
    categories: [],
    slug: "",
    start_date: new Date(),
    end_date: null,
    image_url: "",
    skills: [],
    item_id: 0,
  };

  const newItem: Item = {
    id: 0,
    markdown: "",
    published: false,
  };

  return (
    <div>
      <EditProject
        initialData={newProject}
        item={newItem}
        categories={await fetchProjectCategories()}
        allSkills={await fetchSkills([])}
      />
    </div>
  );
}
