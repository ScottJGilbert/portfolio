"use client";

import { useState, useEffect } from "react";
import { Skill } from "@/lib/definitions";
import Button from "@/app/ui/button";

export default function SkillForm({
  submitSkill,
  parents,
  initialData,
  activated,
}: {
  submitSkill: (skill: Skill) => void;
  parents: Skill[];
  initialData?: Skill;
  activated: boolean;
}) {
  const [formData, setFormData] = useState<Skill>(
    initialData || {
      skill_id: 0,
      name: "",
      image_url: "",
      category: "software",
      subcategory: "",
      parent_skill_id: null,
    }
  );

  // Update formData when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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

  return (
    <form
      className="flex flex-wrap gap-4 items-end"
      onSubmit={(e) => {
        e.preventDefault();
        submitSkill(formData as Skill);
      }}
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
          {parents.map((skill) => {
            if (skill.parent_skill_id || skill.category !== formData.category)
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
        {activated && (
          <>
            <label className="text-xs text-zinc-600 dark:text-zinc-300">
              Add Skill
            </label>
            <Button
              disabled={!activated}
              className="mx-0 my-0 py-2 px-6 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Save
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
