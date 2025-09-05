import { NextRequest, NextResponse } from "next/server";
import { deleteMessage } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!(session?.user?.email === "scott7gilbert@gmail.com")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  if (typeof id !== "number") {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await deleteMessage(id);
    return NextResponse.json(
      { message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
