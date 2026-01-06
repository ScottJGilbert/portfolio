import { NextRequest, NextResponse } from "next/server";
import { addSkill } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Skill } from "@/lib/definitions";

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

  const skill = (await request.json()) as Skill;

  if (!skill.name || skill.name.trim() === "") {
    return NextResponse.json(
      { error: "Skill name cannot be empty." },
      { status: 400 }
    );
  }

  try {
    await addSkill(skill);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("Error adding skill: ", err);
    return NextResponse.json(
      { error: ("Failed to add skill: " + err) as string },
      { status: 500 }
    );
  }
}
