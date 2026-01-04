"use client";

import { useState, useEffect } from "react";
import { fetchAttributions } from "@/lib/db";
import { Attribution } from "@/lib/definitions";
import Button from "@/app/ui/button";

export default function EditAttributionsPage() {
  const [attributions, setAttributions] = useState<Attribution[]>([]);

  useEffect(() => {
    const fetching = async () => {
      setAttributions(await fetchAttributions());
    };
    fetching();
  }, []);

  async function save(updatedAttributions: Attribution[]) {
    if (!confirm("Are you sure you want to save this?")) {
      return;
    }
    const res = await fetch("/api/update-attributions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAttributions),
    });
    if (!res.ok) {
      alert("Failed to update.");
    } else {
      alert("Saved!");
      window.location.reload();
    }
  }

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    setAttributions((prev) => {
      const newAttributions = [...prev];
      newAttributions[index] = {
        ...newAttributions[index],
        [e.target.name]: e.target.value,
      };
      return newAttributions;
    });
  };

  const addAttribution = (e: React.FormEvent) => {
    e.preventDefault();
    setAttributions((prev) => [
      ...prev,
      { name: "", url: "", description: "" },
    ]);
  };

  const removeAttribution = (index: number) => {
    setAttributions((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div>
      <div className="mt-4">
        <h1>Edit Attributions</h1>
        <p className="mb-4">
          Saving and adding attributions can be done at the bottom of the page.
        </p>
        {attributions.map((attr, index) => (
          <div
            key={index}
            className="mb-6 px-4 py-2 border rounded bg-[var(--background-secondary)]"
          >
            <div className="flex gap-4">
              <div className="mb-2 flex gap-2 items-center">
                <label
                  className="block mb-1 font-bold"
                  htmlFor={`name-${index}`}
                >
                  Name:
                </label>
                <input
                  type="text"
                  id={`name-${index}`}
                  name="name"
                  value={attr.name}
                  onChange={(e) => onChange(e, index)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-2 flex gap-2 flex-1 items-center">
                <label
                  className="block mb-1 font-bold"
                  htmlFor={`url-${index}`}
                >
                  URL:
                </label>
                <input
                  type="url"
                  id={`url-${index}`}
                  name="url"
                  value={attr.url}
                  onChange={(e) => onChange(e, index)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <Button
                onClick={() => removeAttribution(index)}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Remove Attribution
              </Button>
            </div>
            <div className="mb-2">
              <label
                className="block mb-1 font-bold"
                htmlFor={`description-${index}`}
              >
                Description:
              </label>
              <textarea
                id={`description-${index}`}
                name="description"
                value={attr.description}
                onChange={(e) => onChange(e, index)}
                className="w-full p-2 border rounded"
                rows={3}
                required
              ></textarea>
            </div>
          </div>
        ))}
        <div className="flex gap-2">
          <form onSubmit={addAttribution} className="mb-4">
            <Button>Add Attribution</Button>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              save(attributions);
            }}
          >
            <Button className="bg-green-500 text-white hover:bg-green-600!">
              Save All Changes
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
