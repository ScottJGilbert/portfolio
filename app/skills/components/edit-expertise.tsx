"use client";

import { useState, useEffect } from "react";
import { fetchSkills } from "@/lib/db";
import { Skill } from "@/lib/definitions";
import Button from "../../ui/button";
import Image from "next/image";
import Upload from "../../admin/components/upload";
import { capitalizeFirstLetter } from "@/lib/methods";
import SkillForm from "./skill-form";

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

  const [areas, setAreas] = useState([] as Skill[]);

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const [displayedImageUrl, setDisplayedImageUrl] = useState("");

  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      setAreas(await fetchSkills([]));
    };
    fetching();
    setRefetch(false);
  }, [refetch]);

  const addSkill = async (skill: Skill) => {
    const res = await fetch("/api/skills/add-skill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skill),
    });

    if (!res.ok) {
      alert("Failed to add skill.");
      return;
    }
    alert("Skill added successfully.");
    setRefetch(true);
  };

  const updateSkill = async (skill: Skill) => {
    const res = await fetch("/api/skills/update-skill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skill),
    });
    if (!res.ok) {
      alert("Failed to update skill.");
      return;
    }
    alert("Skill updated successfully.");
    setRefetch(true);
  };

  const deleteSkill = async (id: number) => {
    if (areas.find((a) => a.parent_skill_id === id)) {
      alert("Cannot delete skill that is a parent of another skill.");
      return;
    }

    const res = await fetch("/api/skills/delete-skill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      alert("Failed to delete skill.");
      return;
    }
    alert("Skill deleted successfully.");
    setRefetch(true);
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
      <div className="mb-8">
        <div className="flex flex-col gap-8">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
                {capitalizeFirstLetter(category)}
              </h3>
              <div className="border rounded-2xl bg-[var(--background-tertiary)] border-[var(--border-secondary)] p-4 max-h-80 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {areas
                    .filter((area) => area.category === category)
                    .map((area) => {
                      const remove = () => {
                        deleteSkill(area.skill_id);
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
                          <div className="flex flex-col gap-1">
                            <Button
                              onClick={() => setSelectedSkill(area)}
                              className="bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-3 rounded-lg text-xs my-0"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={remove}
                              className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg text-xs my-0"
                            >
                              Delete
                            </Button>
                          </div>
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
          Update Skill
        </h2>
        <hr className="mb-4 border-zinc-200 dark:border-zinc-700" />
        <SkillForm
          initialData={selectedSkill || undefined}
          parents={areas}
          submitSkill={async (skill: Skill) => {
            await updateSkill(skill);
          }}
          activated={selectedSkill !== null}
        />
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
          Add Skill
        </h2>
        <hr className="mb-4 border-zinc-200 dark:border-zinc-700" />
        <SkillForm
          initialData={blank}
          parents={areas}
          submitSkill={async (skill: Skill) => {
            await addSkill(skill);
          }}
          activated={true}
        />
      </div>
      <div className="flex gap-4 items-center mb-8">
        <Upload
          onComplete={(result) => {
            setDisplayedImageUrl(result.ufsUrl);
          }}
        />
        <p className="text-zinc-500">{displayedImageUrl}</p>
      </div>
    </div>
  );
}
