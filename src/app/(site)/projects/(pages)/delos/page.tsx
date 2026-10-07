import { projectMetadata } from "../../lib/metadata";
import {
  ArchitectureDiagram,
  Highlights,
  RoleSplit,
} from "../../components/blocks";
import Image from "next/image";

export const metadata = projectMetadata("delos");

export default function DelosOverviewPage() {
  return (
    <>
      <p>
        Delos is Illini Solar Car’s fourth-generation solar electric vehicle,
        built to race in the 2026 American Solar Challenge. It is the first car
        in the team’s history built on a two-year design and build cycle, with a
        6-square-meter solar array, the team’s most advanced composites, a new
        dynamics system, and its most efficient electrical subsystems to date.
      </p>
      <p>
        I joined the electrical team in fall 2025, after most of the car’s
        boards and firmware had already been designed. My job was to take
        specific pieces of that electronics stack from “designed” to “working
        reliably in the car”: finding and fixing the problems that kept them
        from running, configuring and extending them, and integrating them into
        the vehicle in time for the race.
      </p>

      <Image src="/projects/delos/55416110128_53ca11c22b_o-1920w.webp" className="rounded-lg w-full" alt="Delos solar car" width={800} height={600} />

      <h2>How the electronics fit together</h2>
      <p>
        Every board on the car talks over a shared CAN bus, so a fault or a
        change in one subsystem shows up in the others. The simplified map below
        shows where my subsystems sit; the highlighted boxes are the ones I
        worked on.
      </p>
      <ArchitectureDiagram
        title="Delos electrical systems (simplified)"
        caption="Highlighted: subsystems I worked on. Not a complete wiring diagram."
        lanes={[
          {
            label: "Driver interface",
            nodes: [
              {
                name: "Steering wheel",
                note: "Controls, display, push-to-talk",
                mine: true,
              },
              {
                name: "Dashboard",
                note: "Brake, direction, lights, horn, camera",
                mine: true,
              },
            ],
            connector: "CAN bus",
          },
          {
            label: "Power",
            nodes: [
              {
                name: "PDS",
                note: "Contactors and precharge",
                mine: true,
              },
              { name: "Battery protection system" },
              {
                name: "MPPTs",
                note: "Configuration and telemetry",
                mine: true,
              },
              { name: "Solar array", note: "6 m², 1.5+ kW", mine: true },
            ],
            connector: "CAN bus",
          },
          {
            label: "Drive",
            nodes: [{ name: "Motor controller" }, { name: "Motor" }],
            connector: "CAN bus",
          },
          {
            label: "Telemetry",
            nodes: [
              { name: "Data logger" },
              { name: "Strategy team dashboards" },
            ],
          },
        ]}
      />

      <h2>How I fit into the team</h2>
      <p>
        Solar car is not a sprint, but a marathon. All of the boards and firmware used in each of our cars are passed
        down through design generations and interated upon year-after-year, so we rarely need to start from scratch and design completely new boards. However, making those pieces  production-ready and integrating them into the car is an equally huge task. That&apos;s where my focus was.
      </p>
      <RoleSplit
        context={[
          "The dashboard, steering-wheel, and PDS boards and their original firmware were designed by earlier and current team members, some of it carried over from previous cars.",
          "A shared CAN network and message definitions that every board speaks.",
          "A strategy and telemetry team that consumes the data the car produces.",
        ]}
        mine={[
          "Took ownership of the dashboard and after its designs were done, and got them working in the car.",
          "Found and fixed existing firmware and hardware issues in the PDS, dashboard, and wheel before integration.",
          "Configured the MPPTs and extended CAN telemetry to cover a fourth and a fifth (hot-spare) unit.",
          "Handled wiring, and cooling, and ergonomics for the subsystems above.",
          "Helped with composites fabrication (carbon fiber layups), enclosure design, and battery characterization and assembly.",
        ]}
      />

      <h3>Key Contributions</h3>

      <Highlights
        items={[
          {
            label: "Dashboard & steering wheel",
            detail:
              "Took ownership of both boards (mostly the dashboard) and their firmware once the designs were finished. Fixed existing hardware and firmware issues before integration.",
          },
          {
            label: "Power distribution (PDS)",
            detail:
              "Validated PDS firmware and worked through the issues found before it went into the car.",
          },
          {
            label: "MPPT configuration",
            detail:
              "Configured the array's maximum power point trackers and extended telemetry to support two additional units.",
          },
          {
            label: "Solar array integration",
            detail:
              "Helped lay out and lay down the 6 m² solar array onto the car's top shell, and integrate it into the car's electrical system via the MPPTs.",
          },
          {
            label: "Race-week debugging",
            detail:
              "Electrical pit crew member: diagnosed live BPS, PDS, array, and MPPT issues during scrutineering and racing.",
          },
          {
            label: "Radio systems",
            detail:
              "Lead radio technician for the convoy, including a wheel-mounted push-to-talk for the driver.",
          },
        ]}
      />

      <h2>Race: FSGP/ASC 2026</h2>
      <p>
        As a member of the electrical pit crew, I debugged live issues across
        the BPS, PDS, array, and MPPTs during scrutineering and racing. I also
        served as <strong>lead radio technician</strong>, where I set up and maintained the radio equipment for the car and convoy, including:
      </p>
      <ul>
        <li>
          Setting up HAM/CB radio stations across the convoy vehicles and a
          trackside base station
        </li>
        <li>
          Wiring a wheel-mounted push-to-talk system connecting the driver’s
          headset directly to a HAM radio
        </li>
        <li>
          Keeping the team’s handheld radios charged and running, repairing
          broken equipment mid-race
        </li>
      </ul>

      <h2>Results</h2>
      <p>
        These are results for the whole team and car, not just my subsystems.
      </p>
      <ul>
        <li>
          <strong>650+ miles</strong> driven in competition, including nearly
          300 in a single day
        </li>
        <li>
          <strong>1.5+ kW</strong> drawn through the solar array, more than any
          car the team has built
        </li>
        <li>
          <strong>60+ mph</strong> top speed
        </li>
        <li>
          <strong>Zero</strong> electrical failures on systems I owned
        </li>
        <li>
          Key dashboard, wheel, and MPPT subsystems deployed within less than a
          month of the start of electrical integration
        </li>
      </ul>
      <p>
        Beyond the technical work, Delos taught me how a real engineering
        organization runs: coordinating across electrical, mechanical,
        composites, and strategy teams, working with sponsors, and handling a
        full purchasing and reimbursement process from request to close-out. 
      </p>
      <p>Most of all, working Delos showed me the value of teamwork and perseverance in the face of challenging problems in a way I&apos;ve never witnessed before, and it forged strong bonds with my teammates I will never forget. Despite all of its challenges and the lack of sleep it caused, I am eternally grateful for the opportunity to be part of such an amazing project and team.</p>
    </>
  );
}
