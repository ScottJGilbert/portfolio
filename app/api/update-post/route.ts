import { NextRequest, NextResponse } from "next/server";
import { updatePost } from "@/lib/db"; // your DB update function
import { Post } from "@/lib/definitions";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const postData = data as Post;
  const markdown = data.markdown;

  postData.creation_date = new Date(data.creation_date as string);
  postData.edit_date = new Date();

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
