import { NextRequest, NextResponse } from "next/server";
import { updateSkill } from "@/lib/db";
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

  if (!skill.skill_id || skill.skill_id <= 0) {
    return NextResponse.json({ error: "Invalid skill ID." }, { status: 400 });
  }

  if (!skill.name || skill.name.trim() === "") {
    return NextResponse.json(
      { error: "Skill name cannot be empty." },
      { status: 400 }
    );
  }

  try {
    await updateSkill(skill);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("Error updating skill: ", err);
    return NextResponse.json(
      { error: ("Failed to update skill: " + err) as string },
      { status: 500 }
    );
  }
}
