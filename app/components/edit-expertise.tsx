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
      oldAreas.current.push(...(await fetchSkills([])));
      setAreas(oldAreas.current);

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
        console.log(skillsToRemove.current);
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
    <div>
      <Head>
        <meta name="robots" content="noindex,nofollow" key="noRobots" />
      </Head>
      <div className="my-4">
        <div>
          {categories.map((category) => {
            return (
              <div key={category}>
                <h3>{capitalizeFirstLetter(category)}</h3>
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 my-2">
                  {areas.map((area, index) => {
                    const remove = () => {
                      handleDelete(area.skill_id, index);
                    };

                    if (area.category !== category) return null;

                    return (
                      <div
                        key={area.name + "area"}
                        className="flex justify-between p-1 rounded-xl border-[var(--border)] border-1 text-sm"
                      >
                        <div className="flex gap-4">
                          <div className="flex gap-3">
                            <div className="ml-2 flex flex-col justify-center items-center">
                              <Image
                                height={16}
                                width={16}
                                src={
                                  area.image_url === ""
                                    ? "/profileIcon.svg"
                                    : area.image_url
                                }
                                alt={area.name}
                                className="w-4 h-4"
                              />
                            </div>
                            <span className="my-auto font-bold">
                              {area.name}
                            </span>
                          </div>
                          <p className="my-auto">
                            {capitalizeFirstLetter(area.subcategory)}
                          </p>
                          {area.parent_skill_id &&
                            area.parent_skill_id !== -1 && (
                              <span className="flex gap-2">
                                <span className="my-auto">Parent: </span>
                                <div className="flex flex-col justify-center items-center">
                                  <Image
                                    src={getParentUrl(
                                      area.parent_skill_id || -1
                                    )}
                                    height={16}
                                    width={16}
                                    alt="Parent"
                                    className="h-4 w-4"
                                  />
                                </div>
                              </span>
                            )}
                        </div>
                        <Button
                          onClick={remove}
                          className="bg-red-700 py-1 my-0 mx-0"
                        >
                          Delete
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2>New</h2>
        <hr></hr>
        <form className="flex gap-4 my-2 [&>*]:p-1 flex-wrap">
          <input
            type="text"
            name="name"
            placeholder="Name (required)"
            onChange={onChange}
            autoComplete="off"
            value={formData.name}
          />
          <input
            type="url"
            name="image_url"
            placeholder="Image URL"
            onChange={onChange}
            autoComplete="off"
            value={formData.image_url}
          />
          <select
            name="category"
            onChange={handleCategory}
            value={formData.category || "language"}
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
          <input
            onChange={onChange}
            value={formData.subcategory}
            name="subcategory"
            type="text"
            placeholder="Subcategory... (required)"
            required
          />
          <select
            onChange={handleSelectParent}
            value={formData.parent_skill_id || -1}
          >
            <option value={-1} className="bg-[var(--background-tertiary)]">
              Select Parent
            </option>
            {areas.map((skill) => {
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
          <Button onClick={newArea} className="py-1 px-4">
            Add +
          </Button>
        </form>
      </div>
      <div className="flex gap-4 justify-start items-center">
        <Upload
          onComplete={(result) => {
            setDisplayedImageUrl(result.ufsUrl);
          }}
        />
        <p>{displayedImageUrl}</p>
      </div>
      <div className="flex gap-4">
        <Button className="mt-4" onClick={save}>
          Save
        </Button>
        <div className="flex flex-col justify-center">
          <p>NO CHANGES ARE SAVED UNTIL THE BUTTON IS PRESSED.</p>
        </div>
      </div>
    </div>
  );
}
