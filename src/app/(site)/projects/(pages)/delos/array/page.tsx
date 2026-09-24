import { projectMetadata } from "../../../lib/metadata";

export const metadata = projectMetadata("delos", "array");

export default function DelosArrayPage() {
  return (
    <>
      <p>
        Delos carries a 6-square-meter solar array — the largest Illini Solar
        Car has built. I contributed to composites fabrication (carbon fiber
        layups) for the array&apos;s substrate and led its physical installation
        onto the car.
      </p>
      <p>
        During racing at FSGP/ASC 2026, the array drew <strong>1.5+ kW</strong>,
        more than any car the team has previously fielded, with zero electrical
        failures beyond outside damage to the car.
      </p>
    </>
  );
}
