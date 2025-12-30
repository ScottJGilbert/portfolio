import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { User } from "@/lib/definitions";
import { updateUser } from "@/lib/db";

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

    const { newEmail, newName }: { newEmail?: string; newName?: string } =
      await req.json();
    const newUserData: User = {
      ...user,
      email: newEmail || user.email,
      name: newName || user.name,
    };

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
