import { fetchSkills } from "@/lib/db";

export async function GET() {
  try {
    const areas = await fetchSkills([]);
    return Response.json(areas);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
