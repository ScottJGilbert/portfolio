"use client";

import { useState, useEffect, useRef } from "react";
import { Item, Post } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Button from "@/app/ui/button";
import Upload from "@/app/admin/components/upload";
import EditPageMDX from "@/app/components/mdx/edit-page-mdx";
import Image from "next/image";

export default function EditPost(props: {
  initialData: Post;
  item: Item;
  categories: string[];
}) {
  const { initialData, item, categories } = props;
  const markdown = item.markdown;

  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [published, setPublished] = useState(item.published);
  const [description, setDescription] = useState(initialData.description);
  const [text, setText] = useState(markdown);
  const router = useRouter();
  const currentPath = usePathname();
  const newPath = currentPath.split("/").slice(0, -1).join("/");
  const [listedCategories, setListedCategories] = useState(categories);
  const [newCategory, setNewCategory] = useState("");

  const [displayedImageUrl, setDisplayedImageUrl] = useState("");
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onSetNewCategory = (e: React.FormEvent) => {
    e.preventDefault();
    setListedCategories(listedCategories.concat(newCategory));
    setNewCategory("");
  };

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to leave this page? Any unsaved data will be lost."
    );
    if (confirmed) {
      // Strip the last part of the current path
      router.push(newPath);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.name;
    const isChecked = e.target.checked;

    setFormData((prev) => ({
      ...prev,
      categories: isChecked
        ? [...prev.categories, category]
        : prev.categories.filter((c) => c !== category),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      confirm(
        "Are you sure you want to save this? Any previous data will be overwritten."
      )
    ) {
      setIsSaving(true);

      if (formData.slug === "") {
        const res = await fetch("/api/items/add-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ item: { markdown: text }, data: formData }),
        });

        setIsSaving(false);
        if (!res.ok) {
          alert("Failed to update.");
        } else {
          alert("Saved!");
          if (initialData.slug === "") {
            router.push("/blog/" + formData.slug);
          }
        }
      } else {
        const res = await fetch("/api/items/update-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            item: { ...item, markdown: text },
            data: formData,
          }),
        });
        setIsSaving(false);
        if (!res.ok) {
          alert("Failed to update.");
        } else {
          alert("Saved!");
        }
      }
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData.slug === "") {
      alert("You can't delete this project!");
    } else {
      if (confirm("Are you sure you want to delete this post?")) {
        if (
          prompt("Please type in the post slug to proceed.") ===
          initialData.slug
        ) {
          const url = "/api/delete-post";

          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(initialData.slug),
          });
          if (res.ok) {
            alert("Deleted!");
            router.push("/blog");
            return;
          }
        }
      }
      alert("Failed to delete.");
    }
  };

  const publishPost = async () => {
    const res = await fetch("/api/items/publish-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id: formData.item_id }),
    });
    if (res.ok) {
      alert("Post published!");
      setPublished(true);
    } else {
      alert("Failed to publish post.");
    }
  };

  const unpublishPost = async () => {
    const res = await fetch("/api/items/unpublish-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id: formData.item_id }),
    });
    if (res.ok) {
      alert("Post unpublished!");
      setPublished(false);
    } else {
      alert("Failed to unpublish post.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen mt-4">
      <div className="w-full bg-[var(--background-tertiary)] rounded-3xl shadow-xl p-8 border border-[var(--border-secondary)] flex flex-col gap-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Main post fields */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title... (required)"
                    onChange={handleChange}
                    value={formData.title}
                    required
                    className="flex-1 px-4 py-2 rounded-xl border border-[var(--border-secondary)] bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                  <input
                    type="url"
                    name="image_url"
                    onChange={handleChange}
                    value={formData.image_url}
                    placeholder="Image URL..."
                    className="flex-1 px-4 py-2 rounded-xl border border-[var(--border-secondary)] bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
                <div className="flex gap-4">
                  <span className="text-zinc-700 dark:text-zinc-200">
                    {"Created on " +
                      new Date(initialData.creation_date).toDateString()}
                  </span>
                  <span className="text-zinc-700 dark:text-zinc-200">
                    {"| Last edited on " +
                      new Date(initialData.edit_date).toDateString()}
                  </span>
                </div>
              </div>
              <textarea
                name="description"
                className="p-4 min-h-[80px] w-full rounded-xl border border-[var(--border-secondary)] bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Post description..."
              />
              <div className="relative flex-1 min-h-[200px]">
                <EditPageMDX
                  markdown={text}
                  onTextChange={(markdown) => setText(markdown)}
                />
              </div>
            </div>
            {/* Right: Categories, Image Upload */}
            <div className="w-full md:w-80 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex rounded-xl border border-[var(--border-secondary)] bg-zinc-50 dark:bg-zinc-700">
                  <input
                    name="new_category"
                    className="flex-1 px-3 py-2 rounded-l-xl bg-transparent focus:outline-none"
                    type="text"
                    placeholder="New category..."
                    onChange={(e) => setNewCategory(e.target.value)}
                    value={newCategory}
                  />
                  <Button
                    className="!m-1 !px-3 !py-2 rounded-r-xl"
                    onClick={onSetNewCategory}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-col gap-1 my-2 max-h-40 overflow-y-auto">
                  <p className="font-semibold text-zinc-700 dark:text-zinc-200 mb-1">
                    Categories:
                  </p>
                  {listedCategories.map((category) => (
                    <label
                      key={category + "checkbox"}
                      className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200"
                    >
                      <input
                        type="checkbox"
                        name={category}
                        id={category + "id"}
                        checked={formData.categories.includes(category)}
                        onChange={handleCategory}
                        className="accent-blue-600"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 border-t border-[var(--border-secondary)] pt-4">
                <p className="font-semibold text-zinc-700 dark:text-zinc-200 mb-1">
                  Image Upload:
                </p>
                <Upload
                  onComplete={(result) => setDisplayedImageUrl(result.ufsUrl)}
                />
                {displayedImageUrl && (
                  <div className="flex items-center gap-2 mt-2">
                    <Image
                      src={displayedImageUrl}
                      alt="Uploaded"
                      className="w-16 h-16 object-cover rounded-lg border border-[var(--border-secondary)]"
                    />
                    <span className="text-xs break-all text-zinc-500">
                      {displayedImageUrl}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Bottom: Actions */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-3">
              <Button className="ml-0" onClick={handleClick}>
                ← Go Back
              </Button>
              <Button disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
              {published ? (
                <Button
                  onClick={unpublishPost}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  Unpublish
                </Button>
              ) : (
                <Button
                  onClick={publishPost}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Publish
                </Button>
              )}
            </div>
            <Button
              onClick={handleDelete}
              className="px-4 rounded-xl bg-red-800 hover:bg-red-900 text-white border border-[var(--border-secondary)]"
            >
              Delete
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
