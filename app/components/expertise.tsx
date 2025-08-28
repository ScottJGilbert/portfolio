"use client";

import type { Expertise } from "@/lib/definitions";
import ExpertiseBox from "@/app/ui/expertise";
import { useEffect, useState } from "react";

export default function Expertise() {
  const languages: Expertise[] = [];
  const platforms: Expertise[] = [];
  const hardware: Expertise[] = [];
  const tools: Expertise[] = [];
  const miscellaneous: Expertise[] = [];

  const [areas, setAreas] = useState<Expertise[]>([]);

  useEffect(() => {
    async function fetchAreas() {
      setAreas(await fetch("/api/fetch-expertise").then((res) => res.json()));
    }
    fetchAreas();
  }, []);

  for (const area of areas) {
    switch (area.category) {
      case "language":
        languages.push(area);
        break;
      case "hardware":
        hardware.push(area);
        break;
      case "platform":
        platforms.push(area);
        break;
      case "tool":
        tools.push(area);
        break;
      default:
        miscellaneous.push(area);
    }
  }

  return (
    <div>
      <div className="md:mx-16 mx-4">
        <div className="flex justify-center flex-wrap gap-2">
          {languages.map((area) => {
            return <ExpertiseBox key={area.name + "expertise"} area={area} />;
          })}
        </div>
        <div className="flex justify-center flex-wrap gap-2">
          {platforms.map((area) => {
            return <ExpertiseBox key={area.name + "expertise"} area={area} />;
          })}
        </div>
        <div className="flex justify-center flex-wrap gap-2">
          {hardware.map((area) => {
            return <ExpertiseBox key={area.name + "expertise"} area={area} />;
          })}
        </div>
        <div className="flex justify-center flex-wrap gap-2">
          {tools.map((area) => {
            return <ExpertiseBox key={area.name + "expertise"} area={area} />;
          })}
        </div>
        <div className="flex justify-center flex-wrap gap-2">
          {miscellaneous.map((area) => {
            return <ExpertiseBox key={area.name + "expertise"} area={area} />;
          })}
        </div>
      </div>
    </div>
  );
}
