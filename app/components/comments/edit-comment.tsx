"use client";

import { Comment } from "@/lib/definitions";
import { useState } from "react";
import Button from "@/app/ui/button";
import { SignIn, SignUp } from "@/app/ui/sign-in-out";
import Link from "next/dist/client/link";

export default function EditComment(props: {
  comment?: Comment;
  onSubmit?: (value: string) => Promise<boolean>;
  newComment: boolean;
  maxLength: 800 | 1600;
}) {
  const { comment, onSubmit } = props;
  const [text, setText] = useState(comment?.content || "");

  async function handleSubmit() {
    if (onSubmit) {
      const success = await onSubmit(text);
      if (success) {
        setText("");
      }
    }
  }

  return (
    <div className="flex gap-2">
      <textarea
        className="w-full h-12 p-2 border border-[var(--border)] rounded-md"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          "Write your comment (" + props.maxLength + " character limit)..."
        }
        rows={4}
        maxLength={props.maxLength}
      ></textarea>
      <Button onClick={handleSubmit} className="my-0">
        {props.newComment ? "Post" : "Edit"}
      </Button>
    </div>
  );
}

export function SignedOutEditComment() {
  return (
    <div className="px-4 py-1 border border-[var(--border-color)] rounded-md bg-[var(--background-tertiary)] text-center">
      <p>
        Please{" "}
        <SignUp>
          <Button className="bg-blue-500 hover:bg-blue-400">Sign Up</Button>
        </SignUp>
        or{" "}
        <SignIn>
          <Button className="bg-blue-500 hover:bg-blue-400">Sign In</Button>
        </SignIn>{" "}
        to post comments.
      </p>
    </div>
  );
}

export function BannedEditComment() {
  return (
    <div className="p-4 border border-[var(--border-color)] rounded-md bg-[var(--background-tertiary)] text-center">
      <p>
        You have been banned from posting comments. Please contact me at{" "}
        <Link href="mailto:scott7gilbert@gmail.com">
          scott7gilbert@gmail.com
        </Link>{" "}
        if you believe this is a mistake.
      </p>
    </div>
  );
}
