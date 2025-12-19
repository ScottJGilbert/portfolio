import { addRelease } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Release } from "@/lib/definitions";

export async function POST(request: NextRequest) {
  try {
    const release: Release = (await request.json()) as Release;

    if (release.url === "") throw new Error("Release URL cannot be empty");

    if (!release.key || release.key === "") {
      release.key = "UNKEYED" + Math.random().toString(36).substring(2, 15);
    }

    console.log("Adding release:", release);

    await addRelease(release);
    return NextResponse.json({
      status: 200,
      message: "Release added successfully",
    });
  } catch (error) {
    console.error("Error adding release:", error);
    return NextResponse.json(
      { error: "Failed to add release" },
      { status: 500 }
    );
  }
}
