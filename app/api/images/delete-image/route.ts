import { NextRequest, NextResponse } from "next/server";
import { deleteImage } from "@/lib/db";
import { UTApi } from "uploadthing/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session?.user?.admin)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const { key } = await request.json();

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    const utapi = new UTApi();
    const del = utapi.deleteFiles([key]);

    if (!(await del).success)
      throw new Error("Failed to delete from uploadthing");

    await deleteImage(key);

    return NextResponse.json(
      { success: true, message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
