"use client";

import { Suspense, useState } from "react";
import { Item, ItemWithMarkdown } from "@/lib/definitions";

export default function EditPage({
  initialData,
  markdown,
}: {
  initialData: Item;
  markdown: string;
}) {
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [text, setText] = useState(markdown);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      confirm(
        "Are you sure you want to save this? Any previous data will be overwritten."
      )
    ) {
      setIsSaving(true);

      const updatedFormData: ItemWithMarkdown = {
        ...formData,
        markdown: text,
      };

      const url =
        formData.creation_date === ""
          ? "/api/update-project"
          : "/api/update-post";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      setIsSaving(false);
      if (!res.ok) {
        alert("Failed to update project.");
      } else {
        alert("Saved!");
      }
    }
  };

  return (
    <div>
      <Suspense>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 my-2">
            <input
              type="text"
              placeholder="Title..."
              onChange={handleChange}
              defaultValue={formData.title}
            />
            <input
              type="text"
              onChange={handleChange}
              defaultValue={formData.image_url}
              placeholder="Image URL..."
            />
          </div>
          <div className="flex gap-2">
            <span>{formData.creation_date === "" ? "" : "Date created: "}</span>
            <span>
              {formData.creation_date === "" ? "" : "Date last edited: "}
            </span>
          </div>
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              className="p-2 border border-gray-300 rounded h-96 w-full"
            ></textarea>
          </div>
          <button disabled={isSaving}>{isSaving ? "Saving..." : "Save"}</button>
        </form>
      </Suspense>
    </div>
  );
}
