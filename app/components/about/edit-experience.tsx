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
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 py-2 justify-between min-h-full">
          <input
            name="title"
            type="text"
            defaultValue={initialData.title}
            placeholder="Title... (Required)"
            onChange={handleChange}
            required
          />
          <input
            name="organization"
            type="text"
            defaultValue={initialData.organization}
            placeholder="Organization..."
            onChange={handleChange}
          />
          <input
            type="date"
            name="start_date"
            defaultValue={initialData.start_date.toISOString().slice(0, 10)}
            min={"2007-01-01"}
            max={"2200-01-01"}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="end_date"
            defaultValue={initialData.end_date?.toISOString().slice(0, 10)}
            min={"2007-01-01"}
            max={"2200-01-01"}
            onChange={handleChange}
          />
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="self_employed"
              id="self_employed"
              onChange={handleCheck}
              defaultChecked={initialData.self_employed}
            />
            <label htmlFor="self_employed">Self Employed</label>
            <input
              type="checkbox"
              name="volunteer"
              id="volunteer"
              onChange={handleCheck}
              defaultChecked={initialData.volunteer}
            />
            <label htmlFor="volunteer">Volunteer</label>
          </div>
          <button
            className="py-4 px-4 rounded-xl bg-[var(--background-secondary)] hover:bg-blue-950 hover:cursor-pointer border-solid border-1 border-[var(--border)]"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto px-4 flex flex-col">
          <p>Expertise Areas:</p>
          {expertiseAreas.map((expertise) => {
            return (
              <span key={expertise.name + "checkbox"} className="flex gap-2">
                <input
                  type="checkbox"
                  name={expertise.name}
                  id={expertise.name + "id"}
                  defaultChecked={expertiseStrings.includes(expertise.name)}
                  onChange={handleArea}
                />
                <label htmlFor={expertise.name + "id"}>{expertise.name}</label>
              </span>
            );
          })}
        </div>
        <div className="flex-1">
          <Editor markdown={markdown} onChange={setMarkdown} />
        </div>
      </div>
    </form>
  );
}
