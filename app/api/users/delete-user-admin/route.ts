import { NextRequest, NextResponse } from "next/server";
import { deleteUser, fetchUsers } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

    const { id }: { id: string } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (id === user.id) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    const affectingUser = (await fetchUsers([id], undefined, false))[0]; // Verify user exists

    if (!affectingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (affectingUser.deleted) {
      return NextResponse.json(
        { error: "User already deleted" },
        { status: 400 }
      );
    }

    await deleteUser(id);

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error deleting user: ", err);
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
