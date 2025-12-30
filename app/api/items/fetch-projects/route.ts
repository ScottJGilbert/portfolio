import { fetchProjects } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";
    const categoryString = searchParams.get("categories") || "";
    const selectedCategories = categoryString.split(",").filter(Boolean);

    const projects = await fetchProjects(query, selectedCategories);
    return Response.json(projects);
  } catch (error) {
    console.log("Error fetching projects: ", error);
    return Response.json({ error }, { status: 500 });
  }
}
