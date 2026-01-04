/* eslint-disable */

// import type { Skill } from "@/lib/definitions";
import SkillBox from "@/app/ui/skill-box";
// import { useEffect, useState } from "react";
import { fetchSkills } from "@/lib/db";
// import Marquee from "react-fast-marquee";
import React from "react";

const MARQUEE_CONFIGS = [
  { start: 1, end: 10, direction: "left" },
  { start: 11, end: 20, direction: "right" },
  { start: 21, end: 30, direction: "left" },
];

export const revalidate = 300; // Revalidate every five minutes

/* eslint-enable */

export default async function Expertise() {
  const unshuffledAreas = await fetchSkills([]); // Fetch all skills

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const areas = shuffleArray(
    unshuffledAreas.filter(
      (area) => area.category === "software" || area.category === "hardware"
    )
  );

  return (
    <div className="relative">
      {/* <div className="flex flex-col gap-12 py-8 mx-auto max-w-full md:max-w-160 overflow-hidden md:border md:border-[var(--border)] rounded-2xl">
        {MARQUEE_CONFIGS.map((config, idx) => (
          <div
            key={idx}
            className="flex gap-2 justify-center w-full max-w-full overflow-hidden"
          >
            <Marquee
              gradient={false}
              speed={50}
              direction={config.direction as "left" | "right"}
              className="max-w-90 md:max-w-full overflow-hidden"
            >
              {areas.slice(config.start, config.end).map((area) => (
                <SkillBox
                  key={area.name + "skill"}
                  area={area}
                  className="mx-1 shrink-0 max-w-[90vw]"
                />
              ))}
            </Marquee>
          </div>
        ))}
      </div> */}
      <div className="flex flex-wrap justify-center gap-4 py-8 px-2 mx-auto max-w-full md:max-w-4xl overflow-hidden rounded-2xl">
        {areas.map((area, index) => (
          <React.Fragment key={area.name + "fragment"}>
            {index < 20 && (
              <SkillBox
                key={area.name + "skill"}
                area={area}
                className="shrink-0 max-w-[90vw]"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
