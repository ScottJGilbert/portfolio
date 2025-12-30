import { NextRequest, NextResponse } from "next/server";
import { fetchCommentByID, deleteComment } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/*
!!! Before adding comment, verify these things:
1. The user is authenticated and is the owner of the comment.
2. The user is not banned.
3. The comment with the given ID exists.

!!! JSON structure:
{
  id: number; // ID of the comment to delete
}
*/

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

    if (user.banned) {
      return NextResponse.json({ error: "User is banned" }, { status: 403 });
    }

    const { id } = (await req.json()) as { id: number };

    const comment = await fetchCommentByID(id);

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.user_id !== user.id && !session.user.admin) {
      return NextResponse.json(
        { error: "User not authorized to delete this comment" },
        { status: 403 }
      );
    }

    await deleteComment(id);

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error deleting comment: ", err);
    return NextResponse.json(
      {
        error:
          "Internal server error: " +
          (err instanceof Error ? err.message : String(err)),
      },
      { status: 500 }
    );
  }
}
