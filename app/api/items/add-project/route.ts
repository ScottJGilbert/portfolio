import { NextRequest, NextResponse } from "next/server";
import { addProject, addItem } from "@/lib/db"; // your DB update function
import { Project, Item } from "@/lib/definitions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session?.user?.admin)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const { item, data } = await req.json();

  const projectItem = item as Item;
  const projectData = data as Project;

  try {
    const id = await addItem(projectItem.markdown);
    projectData.item_id = id;
    await addProject(projectData);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("Error adding project: ", err);
    return NextResponse.json(
      { error: ("Failed to add project: " + err) as string },
      { status: 500 }
    );
  }
}
