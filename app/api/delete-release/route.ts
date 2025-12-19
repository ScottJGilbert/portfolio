import { NextRequest, NextResponse } from "next/server";
import { deleteRelease } from "@/lib/db";
import { UTApi } from "uploadthing/server";

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json();

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    if (!key.startsWith("UNKEYED")) {
      const utapi = new UTApi();
      const del = utapi.deleteFiles([key]);

      if (!(await del).success)
        throw new Error("Failed to delete from uploadthing");
    }

    await deleteRelease(key);

    return NextResponse.json(
      { success: true, message: "Resource deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 }
    );
  }
}
