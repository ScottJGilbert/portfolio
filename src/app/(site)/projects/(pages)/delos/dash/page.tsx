import { projectMetadata } from "../../../lib/metadata";
import { CaseStudy, FlowDiagram, RoleSplit } from "../../../components/blocks";

export const metadata = projectMetadata("delos", "dash");

export default function DelosDashPage() {
  return (
    <>
      <p>
        The dashboard is one half of Delos’ driver interface. It reads the
        inputs that aren’t on the steering wheel, controls the car’s lights,
        horn, and reverse camera, and reports what it sees to the rest of the
        car over CAN. I owned this board and its firmware once the design was
        finished, and was responsible for getting it working in the car.
      </p>

      <h2>What the dashboard does</h2>
      <ul>
        <li>
          <strong>Reads driver inputs:</strong> the brake sensor, the
          forward/neutral/reverse switch, and the hazard, headlight, camera, and
          charge-enable buttons, each debounced in software.
        </li>
        <li>
          <strong>Runs the lights:</strong> daytime running lights, headlights,
          brake, reverse, parking, hazards, and turn signals. Turn signals flash
          about 90 times a minute, inside the 60–120 range the race rules
          require.
        </li>
        <li>
          <strong>Reports to the car:</strong> sends brake and drive-direction
          state, light state, and a regular heartbeat over CAN, so other boards
          (and the telemetry team) can see it’s alive.
        </li>
        <li>
          <strong>Fails safe:</strong> if the steering wheel’s horn messages
          stop arriving, the dash turns the horn off on its own, and a watchdog
          timer resets the board if its main loop ever hangs.
        </li>
      </ul>
      <p>
        The board is built around an NXP LPC15xx microcontroller running Mbed
        OS, with protection on its 24 V power inputs and an isolated CAN
        interface. Critical controls pass through the dash rather than the
        wheel, because the wheel is removable and shouldn’t be a single point of
        failure.
      </p>

      <FlowDiagram
        title="From driver action to light"
        caption="Simplified: how a turn signal request becomes a flashing light and an indicator on the wheel."
        steps={[
          {
            title: "Driver flips a switch",
            detail: "On the wheel or the dash",
          },
          {
            title: "Request goes out on CAN",
            detail: "The wheel sends its state",
          },
          {
            title: "Dash updates its light groups",
            detail: "Turn signals flash, DRLs yield",
          },
          {
            title: "Dash reports the result",
            detail: "Wheel indicators mirror it",
          },
        ]}
      />

      <h2>My part</h2>
      <RoleSplit
        context={[
          "The dashboard board design and the original firmware, written before I joined.",
          "The shared CAN library and message definitions the firmware builds on.",
        ]}
        mine={[
          "Took over the board and firmware after the design was done.",
          "Diagnosed and fixed the firmware and hardware issues below before the dash went into the car.",
          "Integrated the dash, horn, and reverse camera into the car: enclosures, wiring harnesses, and validation of each subsystem.",
        ]}
      />

      <CaseStudy
        title="Microcontroller crashing on an uninitialized pin"
        problem="The dashboard microcontroller hit a segmentation fault at runtime, which would have taken the lights and brake reporting offline."
        action="Traced the fault to a reference to a pin that was never initialized, and fixed the firmware so the pin is set up before anything uses it."
        result="The dash runs without crashing and stayed up through integration."
      />
      <CaseStudy
        title="Low-voltage rail running under voltage"
        problem="Faulty diodes on the dashboard's low-voltage power path were undervolting the board."
        action="Tracked the undervoltage to those diodes and repaired the board."
        result="The dash powers correctly once installed in the car."
      />

      <h2>Integration</h2>
      <p>
        Beyond the board itself, I built and fitted the dashboard’s enclosures,
        ran its wiring harnesses, and validated the horn and reverse camera so
        that none of them failed after installation. Wiring uses Molex
        Micro-Fit, PicoBlade, and Anderson connectors, matching the rest of the
        car’s electrical harness standards.
      </p>
    </>
  );
}
