import { NextRequest, NextResponse } from "next/server";
import { addComment } from "@/lib/db";
import { Comment } from "@/lib/definitions";
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
1. The user is authenticated.
2. The user is not banned.
3. The content is valid (not empty, not too long, no disallowed words, etc).
    - Max length for parent comments: 1600 characters
    - Max length for replies: 800 characters
4. If a reply, that the comment replies to a parent comment (not a child comment).
5. Check again rate limiting to prevent spam.


!!! When adding comment, do the following:
1. Sanitize the content to prevent XSS attacks!

!!! JSON structure:
{
  item_id: number; // ID of the item being commented on
  parent_id: number; // ID of the parent comment
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

    const { item_id, text }: { item_id: number; text: string } =
      await req.json();

    const newComment: Comment = {
      id: 0, // Will be set by the database
      item_id: item_id,
      user_id: user.id,
      parent_comment_id: null,
      content: text,
      edit_date: new Date(),
      edited: false,
    };

    if (!checkCommentLength(newComment)) {
      return NextResponse.json(
        { error: "Comment length exceeds the allowed limit" },
        { status: 400 }
      );
    }

    await addComment({ ...newComment, content: purify.sanitize(text) });

    return NextResponse.json(
      { message: "Comment added successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error adding new comment: ", err);
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
