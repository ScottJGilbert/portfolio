"use client";

import { Comment } from "@/lib/definitions";
import EditComment from "./edit-comment";
import { useState } from "react";
import { User } from "@/lib/definitions";
import Image from "next/image";
import clsx from "clsx";

export default function CommentBlock({
  comment,
  user,
  onReply,
  onEdit,
  onDelete,
  canEdit = false,
  canReply,
}: {
  comment: Comment;
  user: User;
  onReply: (text: string) => Promise<boolean>;
  onEdit: (text: string) => Promise<boolean>;
  onDelete: () => void;
  canEdit?: boolean;
  canReply: boolean;
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="flex gap-3">
      <Image
        src={user.image || "/blank-profile.png"}
        alt={`${user.name}'s profile picture`}
        width={40}
        height={40}
        className="mt-1 w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="mb-2">
          {!showEdit && (
            <div>
              <p>
                <b
                  className={clsx("mr-2", {
                    "italic text-gray-500": user.banned,
                  })}
                >
                  {user.name}
                </b>
                <span>
                  {new Date(comment.edit_date).toDateString() +
                    (comment.edited ? " (edited)" : "")}
                </span>
                <br />
                {comment.content}
              </p>
            </div>
          )}
          {showEdit && (
            <EditComment
              comment={comment}
              newComment={false}
              onSubmit={async (value: string): Promise<boolean> => {
                if (await onEdit(value)) {
                  setShowEdit(false);
                  return true;
                }
                return false;
              }}
              maxLength={1600}
            />
          )}
        </div>
        <div className="flex gap-2 [&>a]:no-underline mb-2">
          {canReply && !showReply && (
            <p
              className="text-sm text-gray-500 hover:cursor-pointer"
              onClick={() => setShowReply(!showReply)}
            >
              {showReply ? "Cancel" : "Reply"}
            </p>
          )}
          {canEdit && (
            <>
              <p
                className="text-sm text-gray-500 hover:cursor-pointer"
                onClick={() => setShowEdit(!showEdit)}
              >
                {showEdit ? "Cancel" : "Edit"}
              </p>
              <p
                className="text-sm text-red-500 hover:cursor-pointer"
                onClick={() => onDelete()}
              >
                Delete
              </p>
            </>
          )}
        </div>
        {showReply && (
          <EditComment
            newComment={true}
            onSubmit={async (value: string): Promise<boolean> => {
              if (await onReply(value)) {
                setShowReply(false);
                return true;
              }
              return false;
            }}
            maxLength={800}
          />
        )}
      </div>
    </div>
  );
}
