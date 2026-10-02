import Link from "next/link";
import { projectMetadata } from "../../../lib/metadata";
import { Highlights } from "../../../components/blocks";

export const metadata = projectMetadata("delos", "array");

export default function DelosArrayPage() {
  return (
    <>
      <p>
        Delos carries a 6-square-meter solar array, the largest Illini Solar Car
        has built. It is the car’s only source of power while racing, so every
        part of it, from the carbon fiber substrate to the wiring and the MPPTs
        behind it, has to work.
      </p>

      <Highlights
        items={[
          {
            label: "6 m² array",
            detail: "The largest the team has built.",
          },
          {
            label: "1.5+ kW",
            detail:
              "Drawn through the array during FSGP/ASC 2026, more than any previous car.",
          },
          {
            label: "Zero electrical failures",
            detail: "Beyond outside damage to the car.",
          },
        ]}
      />

      <h2>My part</h2>
      <ul>
        <li>
          Contributed to composites fabrication (carbon fiber layups) for the
          array’s substrate.
        </li>
        <li>Led the array’s physical installation onto the car.</li>
        <li>
          Worked on the MPPTs that regulate the array’s output. See the{" "}
          <Link href="/projects/delos/mppts">MPPTs</Link> tab.
        </li>
      </ul>
    </>
  );
}
