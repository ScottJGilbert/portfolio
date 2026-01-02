import { publishItem } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.user?.admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { item_id } = await request.json();
    if (!item_id || typeof item_id !== "number") {
      return NextResponse.json(
        { error: "Invalid or missing item_id" },
        { status: 400 }
      );
    }

    await publishItem(item_id);

    return NextResponse.json(
      { message: "Item published successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error publishing item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
