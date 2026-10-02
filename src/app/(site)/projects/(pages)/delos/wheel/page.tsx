import { projectMetadata } from "../../../lib/metadata";
import {
  CaseStudy,
  CodeSample,
  FlowDiagram,
  RoleSplit,
} from "../../../components/blocks";

export const metadata = projectMetadata("delos", "wheel");

export default function DelosWheelPage() {
  return (
    <>
      <p>
        The steering wheel is where the driver actually talks to the car. It
        holds the turn signals, horn, cruise control, accelerator and regen
        controls, a flag button, menu buttons, and push-to-talk, plus a screen
        that shows live telemetry from the rest of the car. It is removable, so
        it connects through a quick-disconnect hub and communicates entirely
        over CAN. I owned the wheel board and firmware after the design was
        finished and worked on getting it running reliably in the car.
      </p>

      <h2>What the wheel does</h2>
      <ul>
        <li>
          <strong>Sends driver commands:</strong> turn signals, horn, cruise
          control, flag, and push-to-talk go out over CAN as compact messages
          the dash and motor controller act on.
        </li>
        <li>
          <strong>Turns pedal position into a torque request:</strong> the
          accelerator and regen controls are read by magnetic angle encoders
          over SPI and converted into a torque percentage for the motor
          controller.
        </li>
        <li>
          <strong>Shows the driver what matters:</strong> an OLED screen
          displays pack current, cell voltages and temperatures, motor power,
          MPPT power, and warnings pulled from the CAN bus, while a separate
          7-segment display shows speed regardless of which menu is open.
        </li>
        <li>
          <strong>Watches its own health:</strong> it monitors its own
          temperatures, reports warnings and errors over CAN, and runs a
          watchdog timer.
        </li>
      </ul>

      <FlowDiagram
        title="From pedal to motor"
        caption="Simplified: how the wheel turns a driver input into a drive command."
        steps={[
          {
            title: "Driver moves the control",
            detail: "Accelerator or regen",
          },
          {
            title: "Encoder is read",
            detail: "Checked for errors on every read",
          },
          {
            title: "Wheel computes torque",
            detail: "Scaled to a 0-100% request",
          },
          {
            title: "Command sent over CAN",
            detail: "Motor controller applies it",
          },
        ]}
      />

      <h2>Safety behavior built into the firmware</h2>
      <p>
        A few design choices in the firmware stood out to me because they favor
        a safe failure over a convenient one:
      </p>
      <ul>
        <li>
          Every encoder reading is checked for parity and sensor error flags
          before it is used.
        </li>
        <li>
          After a reset, or when the driver switches between accelerating and
          regen, the torque request stays at zero until the control returns near
          its rest position. A stale or jumped position can’t turn into a sudden
          command.
        </li>
        <li>
          Cruise control is disabled automatically in states where it shouldn’t
          be active.
        </li>
        <li>
          Turn signals use a request-then-confirm handshake with the dash, shown
          below, so the dash only ever sees well-defined state changes.
        </li>
      </ul>
      <CodeSample caption="Simplified illustration of the wheel's turn-signal handshake with the dash (not the production code).">
        {`// States the dash expects: off -> requestOn -> on -> requestOff -> off
if (button_pressed) {
    if (state == off)             state = requestOn;
    else if (state == requestOn)  state = on;
} else {
    if (state == on)              state = requestOff;
    else if (state == requestOff) state = off;
}
send_over_can(state);`}
      </CodeSample>

      <h2>My part</h2>
      <RoleSplit
        context={[
          "The wheel board design and the bulk of its firmware, written by earlier team members.",
          "The encoder, display, and LED driver code, and the shared CAN library the firmware builds on.",
        ]}
        mine={[
          "Took over the board and firmware after the design was done.",
          "Found and fixed a firmware bug that had disabled the entire wheel PCB.",
          "Wired the wheel-mounted push-to-talk system that connects the driver's headset directly to a HAM radio.",
          "Integrated the wheel into the car.",
        ]}
      />

      <CaseStudy
        title="A missing chip that took down the whole board"
        problem="The firmware read from an I2C I/O expander that isn't on the board, and that bad read disabled the entire wheel PCB."
        action="Identified the read of the nonexistent expander as the cause and fixed the firmware so the wheel no longer depends on it."
        result="The wheel PCB runs again, and it went into the car working."
      />
    </>
  );
}
