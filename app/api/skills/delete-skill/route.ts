import { NextRequest, NextResponse } from "next/server";
import { deleteSkill } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  if (!session.user?.admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await request.json();
  if (!id || id <= 0) {
    return NextResponse.json({ error: "Invalid skill ID." }, { status: 400 });
  }
  try {
    await deleteSkill(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("Error deleting skill: ", err);
    return NextResponse.json(
      { error: ("Failed to delete skill: " + err) as string },
      { status: 500 }
    );
  }
}
