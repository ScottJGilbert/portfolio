"use client";

import { Skill } from "@/lib/definitions";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SkillBox({
  area,
  className,
}: {
  area: Skill;
  className?: string;
}) {
  const url = area.image_url;
  const [theme, setTheme] = useState("");
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    setTheme(localStorage.theme);
    setMatches(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const prefersDark = theme === "dark" || (!theme && matches);
  return (
    <span
      key={area.name + "area"}
      className={
        "bg-[var(--background-secondary)] p-2 rounded-xl border-1 border-[var(--border)] inline-flex justify-between gap-4 max-w-[90vw] shrink-0 " +
        className
      }
    >
      <div className="flex items-center gap-2">
        {url && (
          <Image
            src={
              url.includes("white") && !prefersDark
                ? url.slice(0, url.indexOf("white") - 1)
                : url
            }
            alt={area.name}
            width={16}
            height={16}
            loading="lazy"
            className={
              "w-4 h-4 " +
              (url.includes("feather-icons") && prefersDark ? "invert" : "")
            }
          />
        )}
      </div>
      <p>{area.name}</p>
    </span>
  );
}
