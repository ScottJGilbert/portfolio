import { projectMetadata } from "../../../lib/metadata";

export const metadata = projectMetadata("delos", "mppts");

export default function DelosMpptsPage() {
  return (
    <>
      <p>
        Delos&apos; Maximum Power Point Tracking (MPPT) subsystem keeps the
        solar array running at peak efficiency across changing sunlight and load
        conditions. I worked with the strategy/telemetry team to extend CANdef
        telemetry support to a fourth and fifth (hot-spare) MPPT, up from three
        on the previous car.
      </p>
      <p>
        During scrutineering and racing at FSGP/ASC 2026, I debugged live MPPT
        issues as part of the electrical pit crew, keeping the array feeding the
        battery pack throughout the event.
      </p>
    </>
  );
}
