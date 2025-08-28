import { NextRequest, NextResponse } from "next/server";
import { updatePost } from "@/lib/db"; // your DB update function
import { Post } from "@/lib/definitions";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const postData = data as Post;
  const markdown = data.markdown;

  postData.creation_date = new Date(data.date_one as string) || new Date();
  postData.edit_date = new Date();

  const session = await auth();
  const email = session?.user?.email as string;
  if (email !== "scott7gilbert@gmail.com")
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  try {
    await updatePost(postData, markdown);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: ("Failed to update post: " + err) as string },
      { status: 500 }
    );
  }
}
