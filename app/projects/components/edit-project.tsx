"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { Skill, Project, Item } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Head from "next/head";
import Button from "@/app/ui/button";
import Upload from "@/app/admin/components/upload";
import EditPageMDX from "@/app/components/mdx/edit-page-mdx";
import UploadRelease from "./upload-blob";

export default function EditProject({
  initialData,
  item,
  categories,
  allSkills,
}: {
  initialData: Project;
  item: Item;
  categories: string[];
  allSkills?: Skill[];
}) {
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [description, setDescription] = useState(initialData.description);
  const [text, setText] = useState(item.markdown);
  const [published, setPublished] = useState(item.published);
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

      const url = "/api/items/update-project";

      const skillStrings = allSkills
        ? (formData.skills || []).map((skill) =>
            typeof skill === "string" ? skill : skill.name
          )
        : [];

      const item_res = await fetch("/api/items/update-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_id: initialData.item_id,
          markdown: text,
        }),
      });

      if (!item_res.ok) {
        alert("Failed to update item.");
        setIsSaving(false);
        return;
      }

      if (formData.slug === "") {
        const json = await item_res.json();
        const new_item_id = json.item_id;
        formData.item_id = new_item_id;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          description: description,
          skills: skillStrings,
        }),
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
      if (confirm("Are you sure you want to delete this project?")) {
        if (
          prompt("Please type in the project slug to proceed.") ===
          initialData.slug
        ) {
          const url = "/api/delete-project";
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(initialData.slug),
          });
          if (res.ok) {
            alert("Deleted!");
            router.push("/projects");
            return;
          }
        }
      }
      alert("Failed to delete.");
    }
  };

  const publishProject = async () => {
    const res = await fetch("/api/items/publish-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id: formData.item_id }),
    });
    if (res.ok) {
      alert("Project published!");
      setPublished(true);
    } else {
      alert("Failed to publish project.");
    }
  };

  const unpublishProject = async () => {
    const res = await fetch("/api/items/unpublish-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id: formData.item_id }),
    });
    if (res.ok) {
      alert("Project unpublished!");
      setPublished(false);
    } else {
      alert("Failed to unpublish project.");
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
                  <div className="my-auto [&>input]:py-2 [&>input]:px-2 [&>input]:mr-4 [&>*]:border-1 [&>*]:border-[var(--border)] [&>*]:rounded-xl flex justify-between gap-6 flex-wrap">
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
                    <label htmlFor="start_date" className="mr-2">
                      Start:
                      <input
                        type="date"
                        name="start_date"
                        id="start_date"
                        onChange={handleChange}
                        defaultValue={
                          formData.start_date
                            ? ""
                            : new Date(formData.start_date)
                                .toISOString()
                                .split("T")[0]
                        }
                        min={"2007-01-01"}
                        max={"2200-01-01"}
                        required
                        suppressHydrationWarning
                      />
                    </label>

                    <label htmlFor="end_date" className="mr-2">
                      End:{" "}
                      <input
                        type="date"
                        name="end_date"
                        id="end_date"
                        onChange={handleChange}
                        defaultValue={
                          formData.end_date
                            ? ""
                            : formData.end_date
                            ? new Date(formData.end_date)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        min={"2007-01-01"}
                        max={"2200-01-01"}
                        suppressHydrationWarning
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <textarea
                  name="description"
                  className="p-2 mb-2 w-full border border-black dark:border-gray-300 rounded-xl"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="relative flex-1">
                <EditPageMDX
                  markdown={text}
                  onTextChange={(markdown) => setText(markdown)}
                />
              </div>
            </div>
            <div>
              <div className="pl-2 flex flex-col">
                <div className="mt-4 flex rounded-xl border border-black dark:border-gray-300">
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
                <div className="flex flex-col my-4 max-h-48 overflow-y-auto">
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
                {allSkills && (
                  <>
                    <hr></hr>
                    <div className="mt-4 flex flex-col max-h-72 overflow-y-auto">
                      <p>Skills:</p>
                      {allSkills.map((skill) => {
                        return (
                          <span
                            key={skill.name + "checkbox"}
                            className="flex gap-2"
                          >
                            <input
                              type="checkbox"
                              name={skill.name}
                              id={skill.name + "id" + "skill"}
                              checked={checkIfSkillInArray(
                                skill,
                                (formData.skills as Skill[]) || []
                              )}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                const skillName = e.target.name;
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                  const skillToAdd = allSkills.find(
                                    (s) => s.name === skillName
                                  );
                                  if (skillToAdd) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      skills: [
                                        ...(prev.skills || []),
                                        skillToAdd,
                                      ],
                                    }));
                                  }
                                } else {
                                  setFormData((prev) => ({
                                    ...prev,
                                    skills: (prev.skills || []).filter(
                                      (s) =>
                                        typeof s === "object" &&
                                        s.name !== skillName
                                    ),
                                  }));
                                }
                              }}
                            />
                            <label htmlFor={skill.name + "id"}>
                              {skill.name}
                            </label>
                          </span>
                        );
                      })}
                    </div>
                  </>
                )}
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
              {published ? (
                <Button
                  onClick={unpublishProject}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  Unpublish
                </Button>
              ) : (
                <Button
                  onClick={publishProject}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Publish
                </Button>
              )}
              <Upload
                onComplete={(result) => setDisplayedImageUrl(result.ufsUrl)}
              />
              <p className="flex items-center">{displayedImageUrl}</p>
            </div>
            <Button
              onClick={handleDelete}
              className="px-4 rounded-xl bg-red-800 hover:bg-red-900 hover:cursor-pointer text-center flex flex-col justify-center border-solid border-1 border-[var(--border)]"
            >
              Delete
            </Button>
          </div>
        </form>
      </Suspense>
      <UploadRelease project_key={initialData.slug} />
    </div>
  );
}

function checkIfSkillInArray(skill: Skill, skillArray: Skill[]): boolean {
  for (const skillInArray of skillArray) {
    if (skillInArray.skill_id === skill.skill_id) return true;
  }
  return false;
}
