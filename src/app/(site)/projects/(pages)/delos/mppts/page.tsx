import { projectMetadata } from "../../../lib/metadata";
import { FlowDiagram, RoleSplit } from "../../../components/blocks";

export const metadata = projectMetadata("delos", "mppts");

export default function DelosMpptsPage() {
  return (
    <>
      <p>
        A solar array’s voltage and current change constantly with sunlight,
        temperature, and shading. Maximum Power Point Trackers (MPPTs) sit
        between the array and the battery and continuously adjust their load so
        the array delivers as much power as it can. Delos’ MPPT subsystem keeps
        the array running at peak efficiency across changing conditions.
      </p>

      <FlowDiagram
        title="From sunlight to battery"
        caption="Simplified. Each MPPT also reports its voltage and current on CAN, which the driver and the strategy team see."
        steps={[
          { title: "Solar array", detail: "6 m², 1.5+ kW at the race" },
          { title: "MPPTs", detail: "Track the maximum power point" },
          { title: "Battery pack", detail: "Charged by the array" },
        ]}
      />

      <h2>My part</h2>
      <RoleSplit
        context={[
          "The base CAN telemetry definitions, which covered three MPPTs on the previous car.",
          "The strategy and telemetry team that uses the data.",
        ]}
        mine={[
          "Configured the MPPTs for Delos.",
          "Worked with the strategy and telemetry team to extend CAN telemetry support to a fourth and a fifth (hot-spare) MPPT, up from three.",
          "Debugged live MPPT issues as part of the electrical pit crew during scrutineering and racing, keeping the array feeding the battery pack throughout FSGP/ASC 2026.",
        ]}
      />
    </>
  );
}
