import { NextRequest, NextResponse } from "next/server";
import { updateProject } from "@/lib/db"; // your DB update function
import { Project } from "@/lib/definitions";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const projectData = data as Project;
  const markdown = data.markdown;

  try {
    await updateProject(projectData, markdown);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: ("Failed to update project: " + err) as string },
      { status: 500 }
    );
  }
}
