import { NextRequest, NextResponse } from "next/server";
import { updateProject } from "@/lib/db"; // your DB update function
import { Project } from "@/lib/definitions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session?.user?.admin)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const data = await req.json();

  const projectData = data as Project;

  try {
    await updateProject(projectData);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("Error updating item: ", err);
    return NextResponse.json(
      { error: ("Failed to update project: " + err) as string },
      { status: 500 }
    );
  }
}
