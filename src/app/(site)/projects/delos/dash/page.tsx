import { projectMetadata } from "../../lib/metadata";

export const metadata = projectMetadata("delos", "dash");

export default function DelosDashPage() {
  return (
    <>
      <p>
        I led integration of Delos&apos; driver-facing dashboard, horns, and
        reverse camera into the car — building and fitting enclosures,
        running wiring harnesses, and validating each subsystem so none
        failed once installed.
      </p>
      <p>
        Along the way I debugged and repaired several PCB and firmware
        issues on the dashboard&apos;s NXP LPC15xx-based controller,
        including:
      </p>
      <ul>
        <li>
          A firmware bug reading a nonexistent I2C expander that had
          disabled the entire wheel PCB
        </li>
        <li>
          An uninitialized-pin reference causing a segmentation fault on the
          dashboard microcontroller
        </li>
        <li>
          Faulty diodes undervolting the dashboard&apos;s low-voltage power
          path
        </li>
      </ul>
      <p>
        Wiring throughout used Molex Micro-Fit/Picoblade and Anderson
        connectors, matching the rest of the car&apos;s electrical harness
        standards.
      </p>
    </>
  );
}
