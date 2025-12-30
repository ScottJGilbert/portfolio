import { NextRequest, NextResponse } from "next/server";
import { updateUser } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { User } from "@/lib/definitions";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const user = session?.user;

    if (!session || !user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    if (!session.user.admin) {
      return NextResponse.json(
        { error: "User not authorized" },
        { status: 403 }
      );
    }

    const newUserData: User = await req.json();

    if (!newUserData.id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (newUserData.id === user.id) {
      return NextResponse.json(
        { error: "You cannot change your own account" },
        { status: 400 }
      );
    }

    await updateUser(newUserData);

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error updating user: ", err);
    return NextResponse.json(
      {
        error:
          "Internal server error: " +
          (err instanceof Error ? err.message : "Unknown error"),
      },
      { status: 500 }
    );
  }
}
