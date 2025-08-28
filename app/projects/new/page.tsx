import EditPage from "@/app/components/mdx/edit-page";
import { Item } from "@/lib/definitions";
import { fetchProjectCategories } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Project",
  robots: "noindex,nofollow",
};

export default async function Page() {
  const newItem: Item = {
    title: "",
    description: "",
    categories: [],
    slug: "",
    date_one: "",
    date_two: "",
    image_url: "",
  };
  return (
    <div>
      <EditPage
        initialData={newItem}
        markdown={""}
        categories={await fetchProjectCategories()}
        type="project"
      ></EditPage>
    </div>
  );
}
