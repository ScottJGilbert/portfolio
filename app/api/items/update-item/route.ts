import { NextRequest, NextResponse } from "next/server";
import { updateItem, addItem } from "@/lib/db"; // your DB update function
import { Item } from "@/lib/definitions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session?.user?.admin)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const data = await req.json();

  const itemData = data as Item;
  if (
    itemData.markdown === undefined ||
    itemData.markdown === null ||
    itemData.markdown === ""
  ) {
    return NextResponse.json(
      { error: "Markdown content cannot be empty." },
      { status: 400 }
    );
  }

  try {
    if (itemData.id && itemData.id > 0) {
      const item_id = await updateItem(itemData);
      return NextResponse.json({ success: true, item_id });
    } else {
      const item_id = await addItem(itemData.markdown);
      return NextResponse.json({ success: true, item_id }, { status: 200 });
    }
  } catch (err) {
    console.log("Error updating item: ", err);
    return NextResponse.json(
      { error: ("Failed to update item: " + err) as string },
      { status: 500 }
    );
  }
}
