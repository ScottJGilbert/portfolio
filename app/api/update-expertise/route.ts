import { NextRequest, NextResponse } from "next/server";
import { updateExpertiseAreas } from "@/lib/db"; // your DB update function
import { Expertise } from "@/lib/definitions";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const areas = data as Expertise[];

  const session = await auth();
  const email = session?.user?.email as string;
  if (email !== "scott7gilbert@gmail.com")
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  try {
    await updateExpertiseAreas(areas);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: ("Failed to update expertise areas: " + err) as string },
      { status: 500 }
    );
  }
}
