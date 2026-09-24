import { projectMetadata } from "../../lib/metadata";

export const metadata = projectMetadata("delos");

export default function DelosOverviewPage() {
  return (
    <>
      <p>
        In the fall of 2024, before I&apos;d even submitted my application to
        the University of Illinois, Illini Solar Car set out to build its
        fastest, toughest, and most capable car yet — one built to compete in
        the 2026 American Solar Challenge. In the summer of 2026, after
        completing the team&apos;s first-ever two-year design and build cycle,
        that vision became <strong>Delos</strong>, Illini Solar Car&apos;s
        fourth-generation vehicle: a 6-square-meter solar array, the team&apos;s
        most advanced composites, an entirely new dynamics system, and its most
        efficient electrical subsystems to date.
      </p>
      <p>
        Joining the team in fall 2025, I stepped into Delos&apos; development as
        an electrical engineer, taking on hardware, firmware, and integration
        work that carried through to the car&apos;s race debut at FSGP/ASC 2026.
        My work spanned composites fabrication, battery characterization and
        assembly, general car wiring, and debugging and integrating the
        dashboard, array, and MPPT subsystems — see the tabs above for a closer
        look at each one.
      </p>

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

      <h2>Delos&apos; Results</h2>
      <ul>
        <li>
          <strong>650+ miles</strong> driven in competition, including nearly
          300 in a single day
        </li>
        <li>
          <strong>1.5+ kW</strong> drawn through the solar array — more than any
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
          First car in team history successfully built on a two-year cycle
        </li>
      </ul>
      <p>
        Beyond the technical work, Delos taught me how real engineering
        organizations run: coordinating across electrical, mechanical,
        composites, and strategy teams, working with sponsors, and navigating a
        full purchasing and reimbursement process from request to close-out. It
        was also, simply, a lesson in what a dedicated team can build together
        in two years.
      </p>
    </>
  );
}
