"use client";

import { useSearchParams } from "next/navigation";
import Search from "@/app/ui/search";
import { Suspense, useEffect, useState } from "react";
import { User } from "@/lib/definitions";
import Button from "@/app/ui/button";
import { ToastConfirm, ToastError, ToastSuccess } from "@/app/ui/toast";
import { authClient } from "@/lib/auth-client";

export default function UserDisplay() {
  const [users, setUsers] = useState<User[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const { data: session } = authClient.useSession();
  const currentUserId = session?.user?.id;

  useEffect(() => {
    const fetchUsers = async () => {
      const params = new URLSearchParams();
      if (query) {
        params.append("query", query);
      }
      const res = await fetch(`/api/users/fetch-users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, ids: [], useQuery: true }),
      });
      const data = await res.json();
      const users = data.users as User[];
      setUsers(users);
      setRefetch(false);
    };
    fetchUsers();
  }, [query, refetch]);

  const banUser = async (userId: string) => {
    if (userId === currentUserId) {
      ToastError("You cannot ban yourself.");
      return;
    }
    const userInfo = users.find((u) => u.id === userId);
    ToastConfirm("Are you sure you want to ban this user?", async () => {
      const res = await fetch(`/api/users/update-user-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userInfo, banned: true, admin: false }),
      });
      if (res.ok) {
        ToastSuccess("User banned successfully.");
        setRefetch(true);
        return;
      }
      ToastError("Failed to ban user.");
    });
  };

  const unbanUser = async (userId: string) => {
    ToastConfirm("Are you sure you want to unban this user?", async () => {
      const userInfo = users.find((u) => u.id === userId);
      const res = await fetch(`/api/users/update-user-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userInfo, banned: false }),
      });
      if (res.ok) {
        setRefetch(true);
        ToastSuccess("User unbanned successfully.");
        return;
      }
      ToastError("Failed to unban user.");
    });
  };

  const makeAdmin = async (userId: string) => {
    ToastConfirm(
      "Are you sure you want to make this user an admin?",
      async () => {
        const userInfo = users.find((u) => u.id === userId);
        const res = await fetch(`/api/users/update-user-admin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...userInfo, admin: true, banned: false }),
        });
        if (res.ok) {
          setRefetch(true);
          ToastSuccess("User is now an admin.");
          return;
        }
        ToastError("Failed to make user an admin.");
      }
    );
  };

  const removeAdmin = async (userId: string) => {
    if (userId === currentUserId) {
      ToastError("You cannot remove your own admin rights.");
      return;
    }
    ToastConfirm(
      "Are you sure you want to remove admin rights from this user?",
      async () => {
        const userInfo = users.find((u) => u.id === userId);
        const res = await fetch(`/api/users/update-user-admin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...userInfo, admin: false }),
        });
        if (res.ok) {
          setRefetch(true);
          ToastSuccess("Admin rights removed from user.");
          return;
        }
        ToastError("Failed to remove admin rights from user.");
      }
    );
  };

  const deleteUser = async (userId: string) => {
    if (userId === currentUserId) {
      ToastError("You cannot delete your own account.");
      return;
    }
    ToastConfirm("Are you sure you want to delete this user?", async () => {
      ToastConfirm(
        "Are you ABSOLUTELY sure you want to delete this user?",
        async () => {
          ToastConfirm(
            "This action is irreversible. Confirm delete?",
            async () => {
              ToastConfirm(
                "Last chance to back out. Delete user?",
                async () => {
                  const res = await fetch(`/api/users/delete-user-admin`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: userId }),
                  });
                  if (res.ok) {
                    setRefetch(true);
                    ToastSuccess("User deleted successfully.");
                    return;
                  }
                  ToastError("Failed to delete user.");
                }
              );
            }
          );
        }
      );
    });
  };

  if (!session || !session.user || !session.user.admin) {
    return <div>Unauthorized.</div>;
  }

  return (
    <div>
      <Suspense>
        <Search placeholder="Search users..." />
      </Suspense>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border border-[var(--border)] rounded-lg flex flex-col justify-between"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500 truncate max-w-full">
                {user.email}
              </p>
              <p className="mt-2 text-sm">
                Created at: {new Date(user.createdAt).toDateString()}
              </p>
              <p className="mt-2 text-sm">
                Updated at: {new Date(user.updatedAt).toDateString()}
              </p>
              <p className="mt-2">
                <span className="mt-2 text-sm mr-2">
                  Banned: {user.banned ? "Yes" : "No"}
                </span>
                <span className="mt-2 text-sm">
                  Admin: {user.admin ? "Yes" : "No"}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap mb-2">
              {!user.banned && (
                <Button
                  className="mt-2 w-full bg-blue-500 hover:bg-blue-400"
                  onClick={() => {
                    banUser(user.id);
                  }}
                  disabled={user.banned}
                >
                  Ban
                </Button>
              )}
              {user.banned && (
                <Button
                  className="mt-2 w-full bg-green-500 hover:bg-green-400"
                  onClick={() => {
                    unbanUser(user.id);
                  }}
                >
                  Unban
                </Button>
              )}
              {!user.admin && (
                <Button
                  className="mt-2 w-full bg-gray-500 hover:bg-gray-400"
                  onClick={() => {
                    makeAdmin(user.id);
                  }}
                >
                  Make Admin
                </Button>
              )}
              {user.admin && (
                <Button
                  className="mt-2 w-full bg-yellow-500 hover:bg-yellow-400"
                  onClick={() => {
                    removeAdmin(user.id);
                  }}
                >
                  Remove Admin
                </Button>
              )}
              <Button
                className="mt-2 w-full bg-red-500 hover:bg-red-400"
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
