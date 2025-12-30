import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { deleteUser } from "@/lib/db";

export async function POST() {
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

    if (user?.deleted) {
      return NextResponse.json(
        { error: "Your account has already been deleted" },
        { status: 403 }
      );
    }

    if (user?.admin) {
      return NextResponse.json(
        { error: "Admins cannot delete their own accounts" },
        { status: 403 }
      );
    }

    await deleteUser(user.id);

    await auth.api.signOut({
      headers: await headers(),
    });

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
