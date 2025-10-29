"use client";

import Image from "next/image";
import { capitalizeFirstLetter } from "@/lib/methods";
import { SkillGroup } from "@/lib/definitions";
import { useEffect, useState } from "react";

export default function Title({ group }: { group: SkillGroup }) {
  const url = group.parent.image_url;
  const [theme, setTheme] = useState("");
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    setTheme(localStorage.theme);
    setMatches(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const prefersDark = theme === "dark" || (!theme && matches);
  return (
    <>
      <span className="relative h-full w-auto">
        <Image
          src={
            url
              ? url.includes("white") && !prefersDark
                ? url.slice(0, url.indexOf("white") - 1)
                : url
              : "/profileIcon.svg"
          }
          alt={group.parent.name}
          width={16}
          height={16}
          loading="lazy"
          className={
            "w-12 h-12 " +
            (url.includes("feather-icons") && prefersDark ? "invert" : "")
          }
        />
      </span>
      <h2>{capitalizeFirstLetter(group.parent.name)}</h2>
    </>
  );
}
