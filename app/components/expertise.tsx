"use client";

import type { Expertise } from "@/lib/definitions";
import ExpertiseBox from "@/app/ui/expertise";
import { useEffect, useState } from "react";

export default function Expertise() {
  const languages: Expertise[] = [];
  const libraries: Expertise[] = [];
  const frameworks: Expertise[] = [];
  const services: Expertise[] = [];
  const hardware: Expertise[] = [];
  const tools: Expertise[] = [];
  const miscellaneous: Expertise[] = [];

  const [areas, setAreas] = useState<Expertise[]>([]);

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    async function fetchAreas() {
      const newAreas: Expertise[] = await fetch("/api/fetch-expertise").then(
        (res) => res.json()
      );
      setAreas(shuffleArray(newAreas));
    }
    fetchAreas();
  }, []);

  for (const area of areas) {
    switch (area.category) {
      case "language":
        languages.push(area);
        break;
      case "library":
        libraries.push(area);
        break;
      case "framework":
        frameworks.push(area);
        break;
      case "service":
        services.push(area);
        break;
      case "hardware":
        hardware.push(area);
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
      <div className="flex gap-2 flex-wrap justify-center">
        {areas.map((area) => {
          return <ExpertiseBox key={area.name + "expertise"} area={area} />;
        })}
      </div>
      {/* <div className="md:mx-16 mx-4 flex flex-col gap-4">
        <div className="flex justify-center flex-wrap gap-2">
          {languages.map((area) => {
            return <ExpertiseBox key={area.name + "expertise"} area={area} />;
          })}
        </div>
        <div className="flex justify-center flex-wrap gap-2">
          {libraries.map((area) => {
            return <ExpertiseBox key={area.name + "expertise"} area={area} />;
          })}
        </div>
        <div className="flex justify-center flex-wrap gap-2">
          {frameworks.map((area) => {
            return <ExpertiseBox key={area.name + "expertise"} area={area} />;
          })}
        </div>
        <div className="flex justify-center flex-wrap gap-2">
          {services.map((area) => {
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
      </div> */}
    </div>
  );
}
