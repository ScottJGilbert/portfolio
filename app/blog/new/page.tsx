import { Post } from "@/lib/definitions";
import { fetchPostCategories } from "@/lib/db";
import { Metadata } from "next";
import EditPost from "../components/edit-post";

export const metadata: Metadata = {
  title: "New Blog",
  robots: "noindex,nofollow",
};

export default async function Page() {
  const newItem: Post = {
    slug: "",
    title: "",
    description: "",
    categories: [],
    creation_date: new Date(),
    edit_date: new Date(),
    image_url: "",
    item_id: 0,
  };

  return (
    <div>
      <EditPost
        initialData={newItem}
        markdown={""}
        categories={await fetchPostCategories()}
      />
    </div>
  );
}
