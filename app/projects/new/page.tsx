import { fetchProjectCategories, fetchSkills } from "@/lib/db";
import { Project } from "@/lib/definitions";
import { Metadata } from "next";
import EditProject from "../components/edit-project";

export const metadata: Metadata = {
  title: "New Project",
  robots: "noindex,nofollow",
};

export default async function Page() {
  const newItem: Project = {
    title: "",
    description: "",
    categories: [],
    slug: "",
    start_date: new Date(),
    end_date: new Date(),
    image_url: "",
    skills: [],
    item_id: 0,
  };
  return (
    <div>
      <EditProject
        initialData={newItem}
        markdown={""}
        categories={await fetchProjectCategories()}
        allSkills={await fetchSkills([])}
      />
    </div>
  );
}
