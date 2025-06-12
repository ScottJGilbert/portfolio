import EditPage from "@/app/ui/mdx-page/edit-page";
import { fetchPost } from "@/lib/db";
import { Post, Item } from "@/lib/definitions";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  const [data, markdown] = await fetchPost(slug);
  const post = data as Post;
  const newItem: Item = {
    title: post.title,
    description: post.description,
    categories: post.categories,
    slug: post.slug,
    creation_date: "",
    edit_date: "",
    image_url: post.image_url,
  };
  return (
    <div>
      <EditPage initialData={newItem} markdown={markdown as string}></EditPage>
    </div>
  );
}
