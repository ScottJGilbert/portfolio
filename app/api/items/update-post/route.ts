import { NextRequest, NextResponse } from "next/server";
import { updatePost } from "@/lib/db"; // your DB update function
import { Post } from "@/lib/definitions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const postData = data as Post;

  postData.creation_date = new Date(data.date_one as string) || new Date();
  postData.edit_date = new Date();

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session?.user?.admin)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  try {
    await updatePost(postData);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("Error updating item: ", err);
    return NextResponse.json(
      { error: ("Failed to update post: " + err) as string },
      { status: 500 }
    );
  }
}
