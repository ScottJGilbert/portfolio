import { NextRequest, NextResponse } from "next/server";
import { deletePost } from "@/lib/db"; // your DB update function
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session?.user?.admin)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  try {
    await deletePost(data as string);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("Error deleting post: ", err);
    return NextResponse.json(
      { error: ("Failed to delete post: " + err) as string },
      { status: 500 }
    );
  }
}
