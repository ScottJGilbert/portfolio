import { NextRequest, NextResponse } from "next/server";
import { fetchComments } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const itemId = searchParams.get("item_id");

  if (!itemId) {
    return NextResponse.json(
      { error: "Missing item_id parameter" },
      { status: 400 }
    );
  }

  if (isNaN(Number(itemId))) {
    return NextResponse.json(
      { error: "Invalid item_id parameter" },
      { status: 400 }
    );
  }

  try {
    const comments = await fetchComments(Number(itemId));
    return NextResponse.json(comments);
  } catch (error) {
    console.log("Error fetching comments: ", error);
    return NextResponse.json(
      {
        error:
          "Failed to fetch comments: " +
          (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
