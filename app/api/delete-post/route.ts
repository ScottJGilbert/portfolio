import { NextRequest, NextResponse } from "next/server";
import { deletePost } from "@/lib/db"; // your DB update function
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const session = await auth();
  const email = session?.user?.email as string;
  if (email !== "scott7gilbert@gmail.com")
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  try {
    await deletePost(data as string);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: ("Failed to delete post: " + err) as string },
      { status: 500 }
    );
  }
}
