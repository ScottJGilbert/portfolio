import { NextRequest, NextResponse } from "next/server";
import { updatePost, updateItem } from "@/lib/db"; // your DB update function
import { Post, Item } from "@/lib/definitions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session?.user?.admin)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const { item, data } = await req.json();

  const postItem = item as Item;
  const postData = data as Post;

  if (!data.creation_date) {
    return NextResponse.json(
      { error: "Creation date is required." },
      { status: 400 }
    );
  }

  if (!postItem.markdown || postItem.markdown === "") {
    return NextResponse.json(
      { error: "Markdown content cannot be empty." },
      { status: 400 }
    );
  }

  if (!postItem.id || postItem.id <= 0) {
    return NextResponse.json(
      { error: "Invalid item ID for post." },
      { status: 400 }
    );
  }

  postData.creation_date = new Date(data.creation_date as string);
  postData.edit_date = new Date();

  try {
    await updateItem(postItem);
    await updatePost(postData);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("Error updating post: ", err);
    return NextResponse.json(
      { error: ("Failed to update post: " + err) as string },
      { status: 500 }
    );
  }
}
