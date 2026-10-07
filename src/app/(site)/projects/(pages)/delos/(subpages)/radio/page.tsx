import { ImageGrid } from "@/app/(site)/projects/components/blocks";

export default function RadioPage() {
  return (
    <>
      <p>
        The radio system is the primary means of communication between the car and
        the various vehicles in the ASC convoy. It consists of a 2-meter band transceiver and a 33-centimeter band transceiver in the car,
        and a 2-meter band transceiver, a 33-centimeter band
        transceiver, and an 11-meter band transceiver in the chase vehicle. The 2-meter band (HAM radio) and 11-meter band (CB radio) are used for voice
        communication, while the 33-centimeter band is used for telemetry data.
      </p>
      <p>
        I was the lead radio technician for the convoy, responsible for setting up and maintaining the radio equipment, ensuring clear communication between the car and the chase vehicles.
      </p>
      <p>
        I also integrated the push-to-talk system into the car, connecting a button on the steering wheel with a radio and headset in the driver&apos;s helmet to allow for easy communication without taking hands off the wheel.
      </p>
      <ImageGrid
        images={[
          { src: "/projects/delos/IMG_7672.jpg", alt: "Radio 1" },
          { src: "/projects/delos/IMG_7843.jpg", alt: "Radio 2" },
        ]}
      />
    </>
  );
}