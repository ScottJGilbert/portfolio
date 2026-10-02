import { projectMetadata } from "../../../lib/metadata";
import { FlowDiagram, RoleSplit } from "../../../components/blocks";

export const metadata = projectMetadata("delos", "pds");

export default function DelosPdsPage() {
  return (
    <>
      <p>
        The power distribution system (PDS) decides when the car’s high voltage
        is actually connected. It controls the contactors that join the battery
        to the solar array and to the motor, and it brings them in carefully so
        nothing sees a sudden surge. I took over the PDS firmware after its
        initial design and worked through the issues found before it went into
        the car.
      </p>

      <h2>What the PDS does</h2>
      <ul>
        <li>
          <strong>Sequences power-up:</strong> waits for the battery management
          system to report that it’s alive, then connects the solar path and the
          motor path one at a time.
        </li>
        <li>
          <strong>Precharges before closing:</strong> each path is brought up
          through a precharge circuit first, and its main contactor is closed
          only after that finishes. This avoids a large inrush current into
          capacitive loads.
        </li>
        <li>
          <strong>Watches for contactor faults:</strong> a contactor’s auxiliary
          contact is read back to check that it did what it was told, so the
          firmware can tell a contactor that failed to close from one that is
          welded shut.
        </li>
        <li>
          <strong>Opens everything on loss of safety signals:</strong> if the
          battery system stops reporting, or a shutdown is requested, the
          contactors are driven open. The PDS also reports its own state and
          errors on CAN.
        </li>
      </ul>

      <FlowDiagram
        title="Bringing the car up"
        caption="Simplified sequence. Each stage only starts once the one before it has finished."
        layout="column"
        steps={[
          {
            title: "Battery system reports alive",
            detail: "Nothing is connected until this happens",
          },
          {
            title: "Solar path: precharge, then close contactor",
          },
          {
            title: "Motor path: precharge, then close contactor",
          },
          {
            title: "PDS reports operational on CAN",
            detail: "The wheel shows this status to the driver",
          },
        ]}
      />

      <h2>My part</h2>
      <RoleSplit
        context={[
          "The PDS board and the original firmware, designed and written before I took it over.",
          "The battery management system, motor controller, and shared CAN definitions the PDS coordinates with.",
        ]}
        mine={[
          "Took over the PDS firmware after its initial design.",
          "Worked through existing firmware issues before the PDS was integrated into the car.",
          "Debugged the PDS live during scrutineering and racing as part of the electrical pit crew.",
        ]}
      />
    </>
  );
}
