import { NextRequest, NextResponse } from "next/server";
import { deleteProject } from "@/lib/db"; // your DB update function
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session?.user?.admin)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  try {
    await deleteProject(data as string);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("Error deleting project: ", err);
    return NextResponse.json(
      { error: ("Failed to delete project: " + err) as string },
      { status: 500 }
    );
  }
}
