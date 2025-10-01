import type { Skill } from "@/lib/definitions";
import SkillBox from "@/app/ui/skill-box";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const MARQUEE_CONFIGS = [
  { start: 1, end: 10, direction: "left" },
  { start: 11, end: 20, direction: "right" },
  { start: 21, end: 30, direction: "left" },
];

export default function Expertise() {
  const [areas, setAreas] = useState<Skill[]>([]);

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    async function fetchAreas() {
      const newAreas: Skill[] = await fetch("/api/fetch-skills").then((res) =>
        res.json()
      );
      setAreas(shuffleArray(newAreas));
    }
    fetchAreas();
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-col gap-12 py-8 mx-auto max-w-full md:max-w-160 overflow-hidden md:border md:border-[var(--border)] rounded-2xl">
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
      </div>
    </div>
  );
}
