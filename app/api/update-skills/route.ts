import { NextRequest, NextResponse } from "next/server";
import { updateSkills } from "@/lib/db"; // your DB update function
import { Skill } from "@/lib/definitions";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (
    !data ||
    !Array.isArray(data.skillsToAdd) ||
    !Array.isArray(data.skillsToRemove)
  ) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
  const { skillsToAdd, skillsToRemove } = data as {
    skillsToAdd: Skill[];
    skillsToRemove: number[];
  };

  const session = await auth();
  const email = session?.user?.email as string;
  if (email !== "scott7gilbert@gmail.com")
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  try {
    await updateSkills(skillsToAdd, skillsToRemove);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: ("Failed to update expertise areas: " + err) as string },
      { status: 500 }
    );
  }
}
