import { fetchPosts } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";
    const categoryString = searchParams.get("categories") || "";
    const selectedCategories = categoryString.split(",").filter(Boolean);

    const posts = await fetchPosts(query, selectedCategories);
    return Response.json(posts);
  } catch (error) {
    console.log("Error fetching posts: ", error);
    return Response.json({ error }, { status: 500 });
  }
}
