import { projectMetadata } from "../../lib/metadata";
import {
  ArchitectureDiagram,
  Highlights,
  RoleSplit,
} from "../../components/blocks";

export const metadata = projectMetadata("delos");

export default function DelosOverviewPage() {
  return (
    <>
      <p>
        Delos is Illini Solar Car&apos;s fourth-generation solar electric
        vehicle, built to race in the 2026 American Solar Challenge. It is the
        first car in the team&apos;s history built on a two-year design and
        build cycle, with a 6-square-meter solar array, the team&apos;s most
        advanced composites, a new dynamics system, and its most efficient
        electrical subsystems to date.
      </p>
      <p>
        I joined the electrical team in fall 2025, after most of the
        car&apos;s boards and firmware had already been designed. My job was to
        take specific pieces of that electronics stack from &ldquo;designed&rdquo;
        to &ldquo;working reliably in the car&rdquo;: finding and fixing the
        problems that kept them from running, configuring and extending them, and
        integrating them into the vehicle in time for the race.
      </p>

      <h2>My part</h2>
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
              "Took over the PDS firmware and worked through the issues found before it went into the car.",
          },
          {
            label: "MPPT configuration",
            detail:
              "Configured the array's maximum power point trackers and extended telemetry from three to five units.",
          },
          {
            label: "CAD & integration",
            detail:
              "Modeled enclosures and mounting hardware in CAD, then built the wiring, cooling, and ergonomics around them.",
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
              { name: "Battery management" },
              {
                name: "MPPTs",
                note: "Configuration and telemetry",
                mine: true,
              },
              { name: "Solar array", note: "6 m², 1.5+ kW" },
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
        Solar car electronics are a relay race. Boards and firmware are passed
        down through design generations, and each new car needs someone to make
        the inherited pieces actually work together. That was my role.
      </p>
      <RoleSplit
        context={[
          "The dashboard, steering-wheel, and PDS boards and their original firmware were designed by earlier and current team members, some of it carried over from previous cars.",
          "A shared CAN network and message definitions that every board speaks.",
          "A strategy and telemetry team that consumes the data the car produces.",
        ]}
        mine={[
          "Took ownership of the dashboard and wheel boards after their designs were done, and got them working in the car.",
          "Found and fixed existing firmware and hardware issues in the PDS, dashboard, and wheel before integration.",
          "Configured the MPPTs and extended CAN telemetry to cover a fourth and a fifth (hot-spare) unit.",
          "Modeled enclosures in CAD and handled wiring, cooling, and ergonomics for the subsystems above.",
          "Helped with composites fabrication (carbon fiber layups) and battery characterization and assembly.",
        ]}
      />

      <h2>Race: FSGP/ASC 2026</h2>
      <p>
        As a member of the electrical pit crew, I debugged live issues across
        the BPS, PDS, array, and MPPTs during scrutineering and racing. I also
        served as <strong>lead radio technician</strong>:
      </p>
      <ul>
        <li>
          Set up HAM/CB radio stations across the convoy vehicles and a
          trackside base station
        </li>
        <li>
          Wired a wheel-mounted push-to-talk system connecting the driver&apos;s
          headset directly to a HAM radio
        </li>
        <li>
          Kept the team&apos;s handheld radios charged and running, repairing
          multiple broken chargers mid-race
        </li>
      </ul>

      <h2>Results</h2>
      <p>These are results for the whole team and car, not just my subsystems.</p>
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
          <strong>Zero</strong> electrical failures beyond outside damage to the
          car
        </li>
        <li>
          Key dashboard, wheel, and MPPT subsystems deployed within about a
          month of the start of electrical integration
        </li>
      </ul>
      <p>
        Beyond the technical work, Delos taught me how a real engineering
        organization runs: coordinating across electrical, mechanical,
        composites, and strategy teams, working with sponsors, and handling a
        full purchasing and reimbursement process from request to close-out.
      </p>
    </>
  );
}
