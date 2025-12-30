import { NextRequest, NextResponse } from "next/server";
import { fetchReleases } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const project_key = req.nextUrl.searchParams.get("project_key") as
      | string
      | null;
    if (project_key) {
      const releases = await fetchReleases(project_key);
      return NextResponse.json(releases);
    }

    const releases = await fetchReleases();
    return NextResponse.json(releases);
  } catch (error) {
    console.error("Error fetching releases:", error);
    return NextResponse.json(
      { error: "Failed to fetch releases" },
      { status: 500 }
    );
  }
}
