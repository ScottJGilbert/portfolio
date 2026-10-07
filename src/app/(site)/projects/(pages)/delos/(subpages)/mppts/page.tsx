import { projectMetadata } from "../../../../lib/metadata";
import { FlowDiagram, ImageGrid, RoleSplit } from "../../../../components/blocks";

export const metadata = projectMetadata("delos", "mppts");

export default function DelosMpptsPage() {
  return (
    <>
      <p>
        A solar array’s voltage and current change constantly with sunlight,
        temperature, and shading. Maximum Power Point Trackers (MPPTs) sit
        between the array and the battery and continuously adjust the load according to a special tracking algorithm to ensure that
        the array delivers as much power as it can. Delos’ MPPT subsystem keeps
        the array running at peak efficiency across changing conditions.
      </p>

      <FlowDiagram
        title="From sunlight to battery"
        caption="Simplified. Each MPPT also reports its voltage and current on CAN, which the driver and the strategy team see."
        steps={[
          { title: "Solar array", detail: "6 m², 1.5+ kW at the race" },
          { title: "MPPTs", detail: "Track the maximum power point, adjusting the load to maintain peak efficiency" },
          { title: "Boost converter", detail: "Steps up the MPPT output to the battery voltage" },
          { title: "Battery pack", detail: "Charged by the array" },
        ]}
      />

      <h2>My part</h2>
      <RoleSplit
        context={[
          "The MPPTs themselves, which were purchased from a vendor and came pre-assembled.",
          "The base CAN telemetry definitions, which covered three MPPTs on the previous car.",
          "The strategy and telemetry team that uses the data.",
        ]}
        mine={[
          "Configured the MPPTs to be compatible with Delos's pack current, pack voltage, and CAN definitions.",
          "Worked with the strategy and telemetry team to extend CAN telemetry support to a fourth and a fifth (hot-spare) MPPT, up from three.",
          "Assembled the MPPT enclosure, including high and low-voltage wiring, active cooling, and mounting to the car.",
          "Debugged live MPPT issues as part of the electrical pit crew during scrutineering and racing, keeping the array feeding the battery pack throughout FSGP/ASC 2026.",
        ]}
      />

      <h2>Images</h2>
      <ImageGrid
        images={[
          { src: "/projects/delos/IMG_7531.jpg", alt: "MPPTs 1" },
          { src: "/projects/delos/IMG_7672.jpg", alt: "MPPTs 2" },
        ]}
      />
    </>
  );
}
