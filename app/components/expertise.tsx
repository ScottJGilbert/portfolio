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
    <div className="flex flex-col gap-8">
      {MARQUEE_CONFIGS.map((config, idx) => (
        <div className="flex gap-2 flex-wrap justify-center" key={idx}>
          <Marquee
            gradient={false}
            speed={50}
            className="overflow-clip mb-4 md:max-w-160"
            direction={config.direction as "left" | "right"}
          >
            {areas.slice(config.start, config.end).map((area) => (
              <SkillBox
                className="mx-1"
                key={area.name + "skill"}
                area={area}
              />
            ))}
          </Marquee>
        </div>
      ))}
    </div>
  );
}
