import Link from "next/link";
import { projectMetadata } from "../../../../lib/metadata";
import { Highlights, ImageGrid } from "../../../../components/blocks";

export const metadata = projectMetadata("delos", "array");

export default function DelosArrayPage() {
  return (
    <>
      <p>
        Delos carries a 6-square-meter solar array, the largest Illini Solar Car
        has built. It is the car’s only source of power while racing, so every
        part of it, from the carbon fiber substrate to the wiring and the MPPTs
        behind it, has to work flawlessly.
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
            detail: "The solar array performed flawlessly throughout the competition, always operating at peak efficiency.",
          },
        ]}
      />

      <h2>My part</h2>
      <ul>
        <li>
          Planned the layout and zoning of the array modules, balancing the need for maximum power with the need to stay above a minimum voltage for the MPPTs to operate and prevent large zones from being current-limited by shaded panels.
        </li>
        <li>
          Contributed to composites fabrication (carbon fiber layups) for the
          array’s substrate.
        </li>
        <li>Assisted the array’s physical installation onto the car.</li>
        <li>
          Worked on the MPPTs that regulate the array’s output and hooked them up to the array and PDS. See the{" "}
          <Link href="/projects/delos/mppts">MPPTs</Link> tab for more information.
        </li>
      </ul>

      <h2>Images</h2>
      <ImageGrid
        images={[
          { src: "/projects/delos/IMG_7006.jpg", alt: "Array 1" },
          { src: "/projects/delos/watermarked_1784318127065.jpg", alt: "Array 2" },
        ]}
      />
    </>
  );
}
