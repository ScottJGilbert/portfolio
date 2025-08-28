import EditPage from "@/app/components/mdx/edit-page";
import { Item } from "@/lib/definitions";
import { fetchPostCategories } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Blog",
  robots: "noindex,nofollow",
};

export default async function Page() {
  const newItem: Item = {
    title: "",
    description: "",
    categories: [],
    slug: "",
    date_one: new Date().toISOString(),
    date_two: new Date().toISOString(),
    image_url: "",
  };
  return (
    <div>
      <EditPage
        initialData={newItem}
        markdown={""}
        categories={await fetchPostCategories()}
        type="post"
      ></EditPage>
    </div>
  );
}
