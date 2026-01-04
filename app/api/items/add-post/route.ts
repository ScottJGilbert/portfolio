import { NextRequest, NextResponse } from "next/server";
import { addPost, addItem } from "@/lib/db"; // your DB update function
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

  if (!postItem.markdown || postItem.markdown === "") {
    return NextResponse.json(
      { error: "Markdown content cannot be empty." },
      { status: 400 }
    );
  }

  postData.creation_date = new Date();
  postData.edit_date = new Date();

  try {
    const id = await addItem(postItem.markdown);
    postData.item_id = id;
    await addPost(postData);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("Error adding post: ", err);
    return NextResponse.json(
      { error: ("Failed to add post: " + err) as string },
      { status: 500 }
    );
  }
}
