import { updateAttributions } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Attribution } from "@/lib/definitions";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (
    !session ||
    !session.user ||
    session.user.email !== "scott7gilbert@gmail.com"
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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
