"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { Item, ItemWithMarkdown } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Head from "next/head";
import Button from "@/app/ui/button";
import Editor from "../../ui/editor";
import Upload from "../images/upload";

export default function EditPage({
  initialData,
  markdown,
  categories,
  type,
}: {
  initialData: Item;
  markdown: string;
  categories: string[];
  type: string;
}) {
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
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

      const updatedFormData: ItemWithMarkdown = {
        ...formData,
        markdown: text,
        description: description,
      };

      const url =
        type === "project" ? "/api/update-project" : "/api/update-post";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      setIsSaving(false);
      if (!res.ok) {
        alert("Failed to update.");
      } else {
        alert("Saved!");
      }
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData.slug === "") {
      alert("You can't delete this project!");
    } else {
      if (confirm("Are you sure you want to delete this " + type + "?")) {
        if (
          prompt("Please type in the " + type + " slug to proceed.") ===
          initialData.slug
        ) {
          const url =
            type === "project" ? "/api/delete-project" : "/api/delete-post";

          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(initialData.slug),
          });
          if (res.ok) {
            alert("Deleted!");
            if (type === "project") router.push("/projects");
            else if (type === "post") router.push("/blog");
            return;
          }
        }
      }
      alert("Failed to delete.");
    }
  };

  return (
    <div>
      <Head>
        <meta name="robots" content="noindex,nofollow" key="noRobots" />
      </Head>
      <Suspense>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col min-h-[calc(100vh-1rem)]"
        >
          <div className="flex-1 flex items-stretch gap-4">
            <div className="flex-1 flex-col items-stretch">
              <div className="flex items-stretch my-2">
                <div className="flex gap-3 my-2">
                  <div className="my-auto [&>input]:py-2 [&>input]:px-2 [&>input]:mr-4 [&>*]:border-1 [&>*]:border-gray-50 [&>*]:rounded-xl flex justify-between gap-6 flex-wrap">
                    <input
                      type="text"
                      name="title"
                      placeholder="Title... (required)"
                      onChange={handleChange}
                      defaultValue={formData.title}
                      required={true}
                    />
                    <input
                      type="url"
                      name="image_url"
                      onChange={handleChange}
                      defaultValue={formData.image_url}
                      placeholder="Image URL..."
                      className="flex-1"
                    />
                    {type === "project" && (
                      <>
                        <input
                          type="date"
                          name="date_one"
                          onChange={handleChange}
                          defaultValue={
                            formData.date_one === ""
                              ? ""
                              : new Date(formData.date_one)
                                  .toISOString()
                                  .split("T")[0]
                          }
                          min={"2007-01-01"}
                          max={"2200-01-01"}
                          required
                          suppressHydrationWarning
                        />
                        <input
                          type="date"
                          name="date_two"
                          onChange={handleChange}
                          defaultValue={
                            formData.date_two === ""
                              ? ""
                              : new Date(formData.date_two)
                                  .toISOString()
                                  .split("T")[0]
                          }
                          min={"2007-01-01"}
                          max={"2200-01-01"}
                          suppressHydrationWarning
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <span>
                  {type === "project"
                    ? ""
                    : "Created on " +
                      new Date(initialData.date_one).toDateString()}
                </span>
                <span>
                  {type === "project"
                    ? ""
                    : "| Last edited on " +
                      new Date(initialData.date_two).toDateString()}
                </span>
              </div>
              <div>
                <textarea
                  name="description"
                  className="p-2 mb-2 w-full border border-gray-300 rounded-xl"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="relative flex-1">
                <div className="p-2 border border-gray-300 rounded-xl w-full">
                  <Editor markdown={text} onChange={setText} />
                </div>
              </div>
            </div>
            <div>
              <div className="pl-2 flex flex-col">
                <div className="mt-4 flex rounded-xl border border-gray-300">
                  <input
                    name="new_category"
                    className="pl-2 rounded-xl"
                    type="text"
                    placeholder="New category..."
                    onChange={(e) => {
                      setNewCategory(e.target.value);
                    }}
                    value={newCategory}
                  />
                  <Button
                    className="!m-1 !px-2 !p-1"
                    onClick={onSetNewCategory}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-col mt-4 h-72">
                  <p>Categories:</p>
                  {listedCategories.map((category) => {
                    return (
                      <span key={category + "checkbox"} className="flex gap-2">
                        <input
                          type="checkbox"
                          name={category}
                          id={category + "id"}
                          checked={formData.categories.includes(category)}
                          onChange={handleCategory}
                        />
                        <label htmlFor={category + "id"}>{category}</label>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-4 mt-2">
              <Button className="ml-0" onClick={handleClick}>
                ← Go Back
              </Button>
              <Button disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Upload
                onComplete={(result) => setDisplayedImageUrl(result.ufsUrl)}
              />
              <p className="flex items-center">{displayedImageUrl}</p>
            </div>
            <Button
              onClick={handleDelete}
              className="px-4 rounded-xl bg-red-800 hover:bg-red-900 hover:cursor-pointer text-center flex flex-col justify-center border-solid border-1 border-gray-50"
            >
              Delete
            </Button>
          </div>
        </form>
      </Suspense>
    </div>
  );
}
