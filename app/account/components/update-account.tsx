"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { ToastSuccess, ToastError, ToastConfirm } from "@/app/ui/toast";
import Button from "@/app/ui/button";

export function UpdateAccount() {
  const { data: session } = authClient.useSession();
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  });
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    setFormData({
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    });
    setRefetch(false);
  }, [session, refetch]);

  const updateAccount = async () => {
    const res = await fetch(`/api/users/update-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newName: formData.name,
        newEmail: formData.email,
      }),
    });
    if (res.ok) {
      ToastSuccess("Account updated successfully.");
      setRefetch(true);
      return;
    }
    ToastError("Failed to update account.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[var(--background-secondary)] rounded-3xl shadow-xl p-8 flex flex-col gap-6 border border-[var(--border-secondary)]">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Update Account
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateAccount();
        }}
        className="flex flex-col gap-4"
      >
        <input
          onChange={handleChange}
          name="name"
          value={formData.name}
          placeholder="Name"
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          onChange={handleChange}
          name="email"
          value={formData.email}
          placeholder="Email"
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <Button
          onClick={updateAccount}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors hover:cursor-pointer"
        >
          Update Account
        </Button>
      </form>
    </div>
  );
}

export function RedZone() {
  const deleteAccount = async () => {
    ToastConfirm(
      "Are you sure you want to delete your account? This action is irreversible.",
      async () => {
        ToastConfirm(
          "Are you really sure you want to delete your account?",
          async () => {
            ToastConfirm(
              "Last chance to back out. Delete account?",
              async () => {
                const res = await fetch(`/api/users/delete-user`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                if (res.ok) {
                  ToastSuccess("Account deleted successfully.");
                  window.location.reload();
                  return;
                }
                ToastError("Failed to delete account.");
              }
            );
          }
        );
      }
    );
  };

  return (
    <div className="bg-red-300 dark:bg-red-950 rounded-3xl shadow-xl p-8 flex flex-col gap-6 border border-[var(--border-secondary)]">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Red Zone
      </h2>
      <Button
        onClick={deleteAccount}
        className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors hover:cursor-pointer"
      >
        Delete Account
      </Button>
    </div>
  );
}
