import { NextRequest, NextResponse } from "next/server";
import { updateComment, fetchCommentByID } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { checkCommentLength } from "@/lib/methods";
import { checkRateLimit } from "@/lib/methods";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

/*
!!! Before adding comment, verify these things:
1. The user is authenticated and is the owner of the comment.
2. The user is not banned.
3. The comment with the given ID exists.
4. The content is valid (not empty, not too long, no disallowed words, etc).
    - Max length for parent comments: 1600 characters
    - Max length for replies: 800 characters
5. Check against rate limiting to prevent spam.

!!! When adding comment, do the following:
1. Sanitize the content to prevent XSS attacks!

!!! JSON structure:
{
  id: number; // ID of the comment to edit
  text: string; // New content of the comment
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

    if (!(await checkRateLimit(user))) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    const json = await req.json();

    const { text, id }: { text: string; id: number } = json;

    const comment = await fetchCommentByID(id);

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.user_id !== user.id && !session.user.admin) {
      return NextResponse.json(
        { error: "User not authorized to edit this comment" },
        { status: 403 }
      );
    }

    if (!checkCommentLength({ ...comment, content: text })) {
      return NextResponse.json(
        { error: "Comment length exceeds the allowed limit" },
        { status: 400 }
      );
    }

    await updateComment({
      ...comment,
      content: purify.sanitize(text),
      edit_date: new Date(),
      edited: true,
    });

    return NextResponse.json(
      { message: "Comment updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error editing comment: ", err);
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
