import { NextRequest, NextResponse } from "next/server";
import { updateProject } from "@/lib/db"; // your DB update function
import { Project } from "@/lib/definitions";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  const email = session?.user?.email as string;
  if (email !== "scott7gilbert@gmail.com")
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const data = await req.json();

  const projectData = data as Project;
  const markdown = data.markdown;

  projectData.start_date = new Date(data.date_one as string);
  projectData.end_date =
    (data.date_two as string) === "" ? null : new Date(data.date_two as string);

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
