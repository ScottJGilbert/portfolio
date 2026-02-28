"use client";

import { Comment as CommentType, User } from "@/lib/definitions";
import React, { useState, useEffect } from "react";
import EditComment, {
  BannedEditComment,
  SignedOutEditComment,
} from "./edit-comment";
import CommentBlock from "./comment-block";
import { ToastSuccess, ToastError, ToastConfirm } from "@/app/ui/toast";
import { filterInPlace } from "@/lib/methods";

interface SortedComments {
  parent: CommentType;
  parentUser: User;
  children: { child: CommentType; childUser: User }[];
}

export default function CommentSection({
  item_id,
  user,
}: {
  item_id: number;
  user: User | undefined;
}) {
  const [comments, setComments] = useState<SortedComments[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const fetchComments = async () => {
      const data: CommentType[] = await fetch(
        "/api/comments/fetch-comments?item_id=" + item_id,
      ).then((res) => res.json());

      const userIDs = Array.from(
        new Set(data.map((comment) => comment.user_id)),
      );

      const json = await fetch("/api/users/fetch-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: "", ids: userIDs, useQuery: false }),
      }).then((res) => res.json());

      const usersData: User[] = json.users;

      const usersMap = new Map<string, User>();

      if (usersData.length > 0)
        usersData.forEach((user) => {
          usersMap.set(user.id, user);
        });

      setComments(sortComments(data, usersMap));
    };
    fetchComments();
  }, [item_id, refetch]);

  const newComment = (text: string, parent_id?: number): Promise<boolean> => {
    if (!parent_id) {
      // Post new comment to API
      const res = fetch("/api/comments/new-parent-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_id, text }),
      });

      res.then((response) => {
        if (response.ok) {
          ToastSuccess("Comment posted successfully!");
          setRefetch(!refetch);
          return true;
        } else {
          ToastError("Failed to post, please try again later.");
          return false;
        }
      });
      return res.then((response) => response.ok);
    } else {
      // Post new child comment to API
      const res = fetch("/api/comments/new-child-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_id, parent_id, text }),
      });
      res.then((response) => {
        if (response.ok) {
          ToastSuccess("Comment posted successfully!");
          setRefetch(!refetch);
          return true;
        } else {
          ToastError("Failed to post, please try again later.");
          return false;
        }
      });
      return res.then((response) => response.ok);
    }
  };

  const editComment = (text: string, id: number): Promise<boolean> => {
    // Submit edited comment to API
    const res = fetch("/api/comments/edit-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        text: text,
      }),
    });

    res.then((response) => {
      if (response.ok) {
        ToastSuccess("Comment edited successfully!");
        setRefetch(!refetch);
        return true;
      } else {
        ToastError("Failed to edit, please try again later.");
        return false;
      }
    });
    return res.then((response) => response.ok);
  };

  const deleteComment = (id: number) => {
    // Use a toast prompt from the toastify to confirm deletion
    ToastConfirm("Are you sure you want to delete this comment?", () => {
      // Implement delete logic here
      const res = fetch("/api/comments/delete-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      res.then((response) => {
        if (response.ok) {
          ToastSuccess("Comment deleted successfully!");
          setRefetch(!refetch);
        } else {
          ToastError("Failed to delete, please try again later.");
        }
      });
    });
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Comments</h1>
      {!user && <SignedOutEditComment />}
      {user && user?.banned && <BannedEditComment />}
      {user && !user.banned && (
        <EditComment
          newComment={true}
          onSubmit={async (value: string): Promise<boolean> => {
            return newComment(value);
          }}
          maxLength={1600}
        />
      )}
      <div className="mt-6 flex flex-col gap-4">
        {comments.map((commentGroup) => (
          <div key={commentGroup.parent.id}>
            {/* Parent Comment */}
            <CommentBlock
              comment={commentGroup.parent}
              user={commentGroup.parentUser}
              onReply={(text: string) =>
                newComment(text, commentGroup.parent.id)
              }
              onEdit={async (text: string): Promise<boolean> => {
                return editComment(text, commentGroup.parent.id);
              }}
              onDelete={() => deleteComment(commentGroup.parent.id)}
              canEdit={
                (user &&
                  !user.banned &&
                  user.id === commentGroup.parent.user_id) ||
                user?.admin
              }
              canReply={user !== undefined && !user.banned}
            />
            <div className="ml-6 mt-4 flex flex-col gap-4">
              {commentGroup.children.map((childGroup) => (
                <React.Fragment key={childGroup.child.id}>
                  <CommentBlock
                    comment={childGroup.child}
                    user={childGroup.childUser}
                    onReply={(text: string) =>
                      newComment(text, commentGroup.parent.id)
                    }
                    onEdit={async (text: string): Promise<boolean> => {
                      return editComment(text, childGroup.child.id);
                    }}
                    onDelete={() => deleteComment(childGroup.child.id)}
                    canEdit={
                      (user &&
                        !user.banned &&
                        user.id === commentGroup.parent.user_id) ||
                      user?.admin
                    }
                    canReply={user !== undefined && !user.banned}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function sortComments(
  comments: CommentType[],
  users: Map<string, User>,
): SortedComments[] {
  const sortedComments: SortedComments[] = [];

  const parents = filterInPlace(comments, (comment) => {
    return comment.parent_comment_id === null;
  });
  for (const parent of parents) {
    const children = filterInPlace(comments, (child) => {
      return child.parent_comment_id === parent.id;
    });
    const childrenMap = children.map((child) => {
      return {
        child: child,
        childUser: users.get(child.user_id)!,
      };
    });
    sortedComments.push({
      parent: parent,
      parentUser: users.get(parent.user_id)!,
      children: childrenMap,
    });
  }
  for (const comment of comments) {
    if (!comment.parent_comment_id === null) {
      continue;
    }
    const children = filterInPlace(comments, (child) => {
      return child.parent_comment_id === comment.id;
    });
    const childrenMap = children.map((child) => {
      return {
        child: child,
        childUser: users.get(child.user_id)!,
      };
    });
    sortedComments.push({
      parent: comment,
      parentUser: users.get(comment.user_id)!,
      children: childrenMap,
    });
  }
  return sortedComments;
}
