"use client";

import { Experience, Skill } from "@/lib/definitions";
import { useState } from "react";
import Editor from "@/app/ui/editor";

export default function EditExperience({
  initialData,
  expertiseAreas,
}: {
  initialData: Experience;
  expertiseAreas: Skill[];
}) {
  const [markdown, setMarkdown] = useState(initialData.markdown);
  const [expertiseStrings, setExpertiseStrings] = useState(
    initialData.skills.map((e) => e.name)
  );
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    const area = e.target.name;
    const isChecked = e.target.checked;
    setExpertiseStrings((prev) => {
      if (isChecked) {
        return [...prev, area];
      } else {
        return prev.filter((c) => c !== area);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      confirm(
        "Are you sure you want to save this? Any previous data will be overwritten."
      )
    ) {
      setIsSaving(true);

      const updatedFormData: Experience = {
        ...formData,
        markdown: markdown,
        skills: expertiseAreas.filter((area) =>
          expertiseStrings.includes(area.name)
        ),
      };

      const res = await fetch("/api/update-experience", {
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

  return (
    <form
      onSubmit={handleSubmit}
      className="my-4 flex flex-col gap-8 w-full bg-[var(--background-tertiary)] rounded-3xl shadow-xl p-8 border border-[var(--border-secondary)]"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Main fields */}
        <div className="flex flex-col gap-4 w-full md:w-80">
          <input
            name="title"
            type="text"
            defaultValue={initialData.title}
            placeholder="Title... (Required)"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl border border-[var(--border-secondary)] bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            name="organization"
            type="text"
            defaultValue={initialData.organization}
            placeholder="Organization..."
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-[var(--border-secondary)] bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <div className="flex flex-col gap-4">
            <label
              htmlFor="start_date"
              className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200"
            >
              Start:
              <input
                type="date"
                name="start_date"
                id="start_date"
                defaultValue={initialData.start_date.toISOString().slice(0, 10)}
                min={"2007-01-01"}
                max={"2200-01-01"}
                onChange={handleChange}
                required
                suppressHydrationWarning
                className="px-2 py-2 rounded-xl border border-[var(--border-secondary)] bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
              />
            </label>
            <label
              htmlFor="end_date"
              className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200"
            >
              End:
              <input
                type="date"
                name="end_date"
                id="end_date"
                defaultValue={initialData.end_date?.toISOString().slice(0, 10)}
                min={"2007-01-01"}
                max={"2200-01-01"}
                onChange={handleChange}
                suppressHydrationWarning
                className="px-2 py-2 rounded-xl border border-[var(--border-secondary)] bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
              />
            </label>
          </div>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
              <input
                type="checkbox"
                name="self_employed"
                id="self_employed"
                onChange={handleCheck}
                defaultChecked={initialData.self_employed}
                className="accent-blue-600"
              />
              Self Employed
            </label>
            <label className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
              <input
                type="checkbox"
                name="volunteer"
                id="volunteer"
                onChange={handleCheck}
                defaultChecked={initialData.volunteer}
                className="accent-blue-600"
              />
              Volunteer
            </label>
          </div>
          <button
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors hover:cursor-pointer"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
        {/* Middle: Expertise Areas */}
        <div className="max-h-96 overflow-y-auto px-4 flex flex-col gap-1 w-full md:w-64 border-l border-[var(--border-secondary)]">
          <p className="font-semibold text-zinc-700 dark:text-zinc-200 mb-1">
            Expertise Areas:
          </p>
          {expertiseAreas.map((expertise) => (
            <label
              key={expertise.name + "checkbox"}
              className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200"
            >
              <input
                type="checkbox"
                name={expertise.name}
                id={expertise.name + "id"}
                defaultChecked={expertiseStrings.includes(expertise.name)}
                onChange={handleArea}
                className="accent-blue-600"
              />
              {expertise.name}
            </label>
          ))}
        </div>
        {/* Right: Markdown Editor */}
        <div className="flex-1 min-w-0">
          <Editor markdown={markdown} onChange={setMarkdown} />
        </div>
      </div>
    </form>
  );
}
