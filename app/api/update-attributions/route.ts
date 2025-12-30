import { updateAttributions } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Attribution } from "@/lib/definitions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session?.user?.admin)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const attributions: Attribution[] = await request.json();

  try {
    // Update the attributions in the database
    await updateAttributions(attributions);
    return NextResponse.json({ message: "Attributions updated successfully." });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating attributions.", error },
      { status: 500 }
    );
  }
}
