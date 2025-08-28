"use client";

import { useState, useEffect } from "react";
import { fetchExpertiseAreas } from "@/lib/db";
import { Expertise } from "@/lib/definitions";
import Link from "next/link";
import Button from "../ui/button";

//Categories: Languages, frameworks, tools(?)
export default function EditExpertise() {
  const blank: Expertise = {
    expertise_id: -1,
    name: "",
    image_url: "",
    category: "",
  };

  const blankArray: Expertise[] = [];

  const [formData, setFormData] = useState(blank);
  const [areas, setAreas] = useState(blankArray);

  useEffect(() => {
    const fetching = async () => {
      setAreas(await fetchExpertiseAreas([]));
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
    setFormData({ ...formData, category: e.target.value });
  };

  const newArea = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name !== "") {
      const newArea: Expertise = {
        ...formData,
      };
      setAreas(areas.concat(newArea));

      setFormData(blank);
    } else {
      alert("Please include a name.");
    }
  };

  return (
    <div>
      {/* <Head>
        <meta name="robots" content="noindex,nofollow" key="noRobots" />
      </Head> */}
      <div className="flex justify-between gap-4">
        <h2>Expertise Areas</h2>
        <div className="flex gap-4">
          <Link
            href="/about"
            className="flex flex-col justify-center rounded-xl px-2 bg-green-950 hover:bg-blue-950 hover:cursor-pointer border-solid border-1 border-gray-50"
          >
            ← Go Back
          </Link>
          <Link
            href="/images"
            target="_blank"
            className="p-2 rounded-xl bg-red-800 hover:bg-red-900 hover:cursor-pointer text-center flex flex-col justify-center border-solid border-1 border-gray-50"
          >
            Ensure all images are uploaded →
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
            <b>Image Url</b>
          </p>
        </div>
        {areas.map((area) => {
          const index = areas.indexOf(area);

          const remove = () => {
            setAreas(areas.toSpliced(index, 1));
          };

          return (
            <div key={area.name + "area"} className="flex gap-4">
              <p className="my-auto">{area.name}</p>
              <p className="my-auto">
                {area.category.charAt(0).toUpperCase() + area.category.slice(1)}
              </p>
              <a
                href={area.image_url}
                target="_blank"
                className="block my-auto"
              >
                {area.image_url}
              </a>
              <Button onClick={remove} className="bg-red-700 py-1 my-0">
                Delete
              </Button>
            </div>
          );
        })}
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
          ></input>
          <input
            type="url"
            name="image_url"
            placeholder="Image URL"
            onChange={onChange}
          ></input>
          <select name="category" onChange={handleCategory}>
            <option value="language" className="text-black">
              Language
            </option>
            <option value="framework" className="text-black">
              Framework
            </option>
            <option value="hardware" className="text-black">
              Hardware
            </option>
            <option value="tool" className="text-black">
              Tool
            </option>
            <option value="miscellaneous" className="text-black">
              Miscellaenous
            </option>
          </select>
          <Button onClick={newArea} className="py-1 px-4">
            Add +
          </Button>
        </form>
      </div>
      <div className="flex gap-4">
        <Button className="mt-4" onClick={save}>
          Save
        </Button>
        <div className="flex flex-col justify-center">
          <p>
            All changes (including deletions) will not be saved until the save
            button is pressed.
          </p>
        </div>
      </div>
    </div>
  );
}
