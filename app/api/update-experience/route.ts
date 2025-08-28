import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Experience } from "@/lib/definitions";
import { updateExperience } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth();
  const email = session?.user?.email as string;
  if (email !== "scott7gilbert@gmail.com")
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const data = await req.json();

  console.log(data);

  const experience = data as Experience;

  console.log(experience);

  try {
    await updateExperience(experience);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: ("Failed to update experience: " + err) as string },
      { status: 500 }
    );
  }
}
