"use client";

import { useState, useEffect } from "react";
import { fetchSkills } from "@/lib/db";
import { Skill } from "@/lib/definitions";
import Link from "next/link";
import Button from "../ui/button";
import Image from "next/image";
import { isUrl } from "check-valid-url";
import Upload from "./images/upload";

//Categories: Languages, frameworks, tools(?)
export default function EditExpertise() {
  const blank: Skill = {
    skill_id: -1,
    name: "",
    image_url: "",
    category: "software",
    subcategory: "language",
  };

  const blankArray: Skill[] = [];

  const [formData, setFormData] = useState(blank);
  const [areas, setAreas] = useState(blankArray);

  const [displayedImageUrl, setDisplayedImageUrl] = useState("");

  useEffect(() => {
    const fetching = async () => {
      setAreas(await fetchSkills([]));
    };
    fetching();
  }, []);

  async function save() {
    const res = await fetch("/api/update-expertise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(areas),
    });

    if (!res.ok) {
      alert("Failed to update.");
    } else {
      alert("Saved!");
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, category: e.target.value as Skill["category"] });
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

    if (formData.name !== "") {
      const newArea: Skill = {
        ...formData,
      };
      setAreas(areas.concat(newArea));

      setFormData(blank);
    } else {
    }
  };

  return (
    <div>
      {/* <Head>
        <meta name="robots" content="noindex,nofollow" key="noRobots" />
      </Head> */}
      <div className="flex justify-between gap-4">
        <h2>Skills</h2>
        <div className="flex gap-4">
          <Link
            href="/about"
            className="flex flex-col justify-center rounded-xl px-2 bg-[var(--background-secondary)] hover:bg-blue-950 hover:cursor-pointer border-solid border-1 border-[var(--border)]"
          >
            ← Go Back
          </Link>
        </div>
      </div>
      <div className="my-4">
        <div className="flex gap-4">
          <p>
            <b>Name</b>
          </p>
          <p>
            <b>Category</b>
          </p>
          <p>
            <b>Image</b>
          </p>
        </div>
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-2 my-2">
          {areas.map((area) => {
            const index = areas.indexOf(area);

            const remove = () => {
              setAreas(areas.toSpliced(index, 1));
            };

            return (
              <div
                key={area.name + "area"}
                className="flex justify-between p-2 rounded-xl border-[var(--border)] border-1"
              >
                <p className="my-auto">{area.name}</p>
                <p className="my-auto">
                  {area.category.charAt(0).toUpperCase() +
                    area.category.slice(1)}
                </p>
                <Image
                  height={16}
                  width={16}
                  src={
                    area.image_url === "" ? "/profileIcon.svg" : area.image_url
                  }
                  alt="Link"
                />
                <Button onClick={remove} className="bg-red-700 py-1 my-0">
                  Delete
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2>New</h2>
        <hr></hr>
        <form className="flex gap-4 my-2 [&>*]:p-1">
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
