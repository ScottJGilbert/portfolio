"use client";

import { useState, useEffect, useRef } from "react";
import { fetchSkills, fetchSkillSequence } from "@/lib/db";
import { Skill } from "@/lib/definitions";
import Button from "../ui/button";
import Image from "next/image";
import { isUrl } from "check-valid-url";
import Upload from "../admin/components/upload";
import { capitalizeFirstLetter } from "@/lib/methods";
import Head from "next/head";

//Categories: Languages, frameworks, tools(?)
export default function EditExpertise() {
  const blank: Skill = {
    skill_id: -1,
    name: "",
    image_url: "",
    category: "software",
    subcategory: "",
    parent_skill_id: -1,
  };

  const categories = ["software", "hardware", "technical", "soft"];

  const [formData, setFormData] = useState(blank);

  const oldAreas = useRef([] as Skill[]);
  const [areas, setAreas] = useState([] as Skill[]);

  const currentSequenceValue = useRef(0);

  const skillsToAdd = useRef([] as Skill[]);
  const skillsToRemove = useRef([] as number[]);

  const [displayedImageUrl, setDisplayedImageUrl] = useState("");

  useEffect(() => {
    const fetching = async () => {
      setAreas(await fetchSkills([]));

      currentSequenceValue.current = Number(await fetchSkillSequence());
    };
    fetching();
  }, []);

  async function save() {
    const res = await fetch("/api/skills/update-skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skillsToAdd: skillsToAdd.current,
        skillsToRemove: skillsToRemove.current,
      }),
    });

    if (!res.ok) {
      alert("Failed to update.");
    } else {
      alert("Saved!");
      window.location.reload();
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, category: e.target.value as Skill["category"] });
  };

  const handleSelectParent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setFormData({ ...formData, parent_skill_id: value === -1 ? null : value });
  };

  const handleDelete = (id: number, index: number) => {
    for (const area of areas) {
      if (area.parent_skill_id === id) area.parent_skill_id = null;
    }

    setAreas(areas.toSpliced(index, 1));

    for (let i = 0; i < skillsToAdd.current.length; i++) {
      const skill = skillsToAdd.current[i];
      if (skill.skill_id === id) {
        skillsToAdd.current.splice(i, 1);
        break;
      }
    }

    for (const area of oldAreas.current) {
      if (area.skill_id === id) {
        skillsToRemove.current.push(id);
        return;
      }
    }

    currentSequenceValue.current--;
  };

  const newArea = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name === "") {
      alert("Please include a name.");
      return;
    }

    for (const area of areas) {
      if (area.name === formData.name) {
        alert("An area with this name already exists.");
        return;
      }
    }

    if (formData.image_url !== "" && !isUrl(formData.image_url)) {
      alert("Please include a valid URL.");
      return;
    }

    const newArea: Skill = {
      ...formData,
      parent_skill_id:
        formData.parent_skill_id === -1 ? null : formData.parent_skill_id,
      skill_id: currentSequenceValue.current + 1,
    };
    setAreas(areas.concat(newArea));

    currentSequenceValue.current++;

    skillsToAdd.current.push(newArea);

    setFormData(blank);
  };

  function getParentUrl(id: number): string {
    for (const skill of areas) {
      if (skill.skill_id === id) {
        if (skill.image_url === "") {
          return "/profileIcon.svg";
        }
        return skill.image_url;
      }
    }
    return "/profileIcon.svg";
  }

  return (
    <div className="w-full mb-8">
      <Head>
        <meta name="robots" content="noindex,nofollow" key="noRobots" />
      </Head>
      <div className="mb-8">
        <div className="flex flex-col gap-8">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
                {capitalizeFirstLetter(category)}
              </h3>
              <div className="border rounded-2xl bg-[var(--background-tertiary)] border-[var(--border-secondary)] p-4 max-h-80 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {areas
                    .filter((area) => area.category === category)
                    .map((area, index) => {
                      const remove = () => {
                        handleDelete(area.skill_id, index);
                      };

                      return (
                        <div
                          key={area.name + "area"}
                          className="flex justify-between items-center p-3 rounded-xl border border-[var(--border-secondary)] bg-zinc-50 dark:bg-zinc-800 shadow-sm gap-2 min-w-0"
                        >
                          <div className="flex gap-3 items-center min-w-0 flex-1">
                            <span className="flex flex-col gap-1 min-w-0">
                              <span className="inline-flex gap-3">
                                {area.image_url && area.image_url !== "" && (
                                  <Image
                                    height={24}
                                    width={24}
                                    src={area.image_url}
                                    alt={area.name}
                                    className="p-1 w-6 h-6 rounded bg-zinc-600 object-contain border border-zinc-200 dark:border-zinc-700"
                                  />
                                )}
                                <span
                                  className="font-bold truncate max-w-[8rem] text-zinc-900 dark:text-zinc-100"
                                  title={area.name}
                                >
                                  {area.name}
                                </span>
                              </span>
                              <span
                                className="text-xs text-zinc-500 truncate max-w-[9rem]"
                                title={area.subcategory}
                              >
                                {capitalizeFirstLetter(area.subcategory)}
                              </span>
                            </span>
                            {area.parent_skill_id &&
                              area.parent_skill_id !== -1 && (
                                <span className="flex items-center gap-1 ml-2">
                                  <span className="text-xs text-zinc-400">
                                    Parent:
                                  </span>
                                  <Image
                                    src={getParentUrl(
                                      area.parent_skill_id || -1
                                    )}
                                    height={16}
                                    width={16}
                                    alt="Parent"
                                    className="h-6 w-6 rounded bg-zinc-600 p-1 border border-zinc-200 dark:border-zinc-700"
                                  />
                                </span>
                              )}
                          </div>
                          <Button
                            onClick={remove}
                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg text-xs"
                          >
                            Delete
                          </Button>
                        </div>
                      );
                    })}
                </div>
                {areas.filter((a) => a.category === category).length === 0 && (
                  <div className="text-zinc-400 text-sm text-center py-4">
                    No skills in this category.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
          Add New Skill
        </h2>
        <hr className="mb-4 border-zinc-200 dark:border-zinc-700" />
        <form
          className="flex flex-wrap gap-4 items-end"
          onSubmit={newArea}
          autoComplete="off"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-600 dark:text-zinc-300">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={onChange}
              autoComplete="off"
              value={formData.name}
              required
              className="px-3 py-2 rounded-lg border border-[var(--border-secondary)] bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-40"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-600 dark:text-zinc-300">
              Image URL
            </label>
            <input
              type="url"
              name="image_url"
              placeholder="Image URL"
              onChange={onChange}
              autoComplete="off"
              value={formData.image_url}
              className="px-3 py-2 rounded-lg border border-[var(--border-secondary)] bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-52"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-600 dark:text-zinc-300">
              Category
            </label>
            <select
              name="category"
              onChange={handleCategory}
              value={formData.category || "software"}
              className="px-3 py-2 rounded-lg border border-[var(--border-secondary)] bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-40"
            >
              <option value="software" className="text-black">
                Software
              </option>
              <option value="hardware" className="text-black">
                Hardware
              </option>
              <option value="technical" className="text-black">
                Technical Skill
              </option>
              <option value="soft" className="text-black">
                Soft Skill
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-600 dark:text-zinc-300">
              Subcategory<span className="text-red-500">*</span>
            </label>
            <input
              onChange={onChange}
              value={formData.subcategory}
              name="subcategory"
              type="text"
              placeholder="Subcategory"
              required
              className="px-3 py-2 rounded-lg border border-[var(--border-secondary)] bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-40"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-600 dark:text-zinc-300">
              Parent Skill
            </label>
            <select
              onChange={handleSelectParent}
              value={formData.parent_skill_id || -1}
              className="px-3 py-2 rounded-lg border border-[var(--border-secondary)] bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-44"
            >
              <option value={-1} className="bg-[var(--background-tertiary)]">
                Select Parent
              </option>
              {areas.map((skill) => {
                if (
                  skill.parent_skill_id ||
                  skill.category !== formData.category
                )
                  return null;

                return (
                  <option
                    key={skill.name + "selector"}
                    value={skill.skill_id}
                    className="bg-[var(--background-tertiary)]"
                  >
                    {skill.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-600 dark:text-zinc-300">
              Add Skill
            </label>
            <Button className="mx-0 my-0 py-2 px-6 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Add +
            </Button>
          </div>
        </form>
      </div>
      <div className="flex gap-4 items-center mb-8">
        <Upload
          onComplete={(result) => {
            setDisplayedImageUrl(result.ufsUrl);
          }}
        />
        <p className="truncate max-w-xs text-zinc-500">{displayedImageUrl}</p>
      </div>
      <div className="flex gap-4 items-center">
        <Button
          className="py-3 px-8 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
          onClick={save}
        >
          Save
        </Button>
        <div className="flex flex-col justify-center">
          <p className="text-xs text-zinc-500">
            <span className="font-semibold text-red-600 mr-1">NOTE:</span> No
            changes are saved until the button is pressed.
          </p>
        </div>
      </div>
    </div>
  );
}
