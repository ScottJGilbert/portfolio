import Image from "next/image";
import { getProjectMeta } from "@/lib/projects/content";
import { ProjectShell } from "../../components/project-shell";
import { CaseStudy, FlowDiagram, Highlights } from "../../components/blocks";
import { projectMetadata } from "../../lib/metadata";

export const metadata = projectMetadata("solar-heater-demonstration");

export default function SolarHeaterDemonstrationPage() {
  const project = getProjectMeta("solar-heater-demonstration")!;

  return (
    <ProjectShell project={project}>
      <p>
        For my high school’s senior Civic Engagement Project, I built an
        interactive solar energy demonstration for a local nature center’s Earth
        Day event. The centerpiece was a live temperature display for a solar
        oven, driven by an Arduino sensor and a Django web app I wrote end to
        end.
      </p>

      <Highlights
        items={[
          {
            label: "Sensor to screen",
            detail:
              "An Arduino reads the oven's temperature, and a Django dashboard shows it a few times a second.",
          },
          {
            label: "Built end to end",
            detail:
              "Hardware wiring, microcontroller code, data collection, database, web backend, and front end.",
          },
          {
            label: "Real audience",
            detail:
              "Shown to children and families at a community Earth Day event.",
          },
        ]}
      />

      <h2>The project</h2>
      <p>
        Each year, seniors at my school complete a year-long Civic Engagement
        Project (CEP) that connects their work to their community and to one of
        the 17 United Nations Sustainable Development Goals. I chose Goal 7:
        Affordable and Clean Energy.
      </p>
      <figure>
        <Image
          src="/projects/solar-heater-demonstration/goal7.svg"
          alt="UN Sustainable Development Goal 7"
          width={800}
          height={450}
          className="h-auto w-full max-h-128"
        />
      </figure>
      <p>
        I partnered with Spring Valley Nature Center to put together an
        educational presentation on how solar power is used in homes and
        businesses, and set it up at a booth at their Earth Day party in April.
      </p>
      <figure>
        <Image
          src="https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSf5urybuFpokv9xB2Lh3HYMJfGCRFldDUQiywA"
          alt="Earth Day Party Booth"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </figure>

      <h2>The demonstration</h2>
      <p>
        One of the demos was a solar oven, like the DIY science-fair ovens that
        cook pizza outside. The audience was mostly young children and their
        parents, so cooking food was out for safety reasons. Instead, I
        displayed the temperature inside the oven as a fun, readable graphic.
      </p>

      <FlowDiagram
        title="How a temperature reading reaches the screen"
        layout="column"
        steps={[
          {
            title: "DS18B20 sensor",
            detail:
              "Measures the oven's temperature, read over the OneWire protocol",
          },
          {
            title: "Arduino",
            detail:
              "Reads the sensor and prints each value over a serial connection",
          },
          {
            title: "Python collector",
            detail:
              "Reads the serial port, checks each value, and saves valid ones",
          },
          {
            title: "Django + SQLite",
            detail:
              "Stores readings and serves the latest one from a small API",
          },
          {
            title: "Browser dashboard",
            detail:
              "Polls the API several times a second and animates a thermometer",
          },
        ]}
      />
      <figure>
        <Image
          src="https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSfHOIbB4A7j2dCwemRUNlzQhFXrvxGb6VPuOWI"
          alt="Django web app dashboard"
          width={800}
          height={450}
          className="h-auto w-full"
        />
        <figcaption>
          The live dashboard: a clipart thermometer that fills with the oven
          temperature.
        </figcaption>
      </figure>

      <h2>Design details</h2>
      <CaseStudy
        title="Keeping the hardware and the website independent"
        problem="A web page can't read an Arduino directly, and a display that depends on a fragile live connection can freeze in front of a crowd."
        action="A separate Python script reads the serial port and writes each reading to the database through Django's models. The web app only ever reads the most recent saved value."
        result="The dashboard always has something to show, and each piece can be tested on its own. Persistent storage also allows me to analyze the temperature over time after the event."
      />
      <CaseStudy
        title="Dealing with noisy sensor data"
        problem="Connections can come loose (consequence of using a breadboard), serial data can arrive garbled or half-formed, or one bad value would make the thermometer jump."
        action="The collector converts each line to a number and discards anything that isn't a valid, positive reading before it reaches the database."
        result="The display stays steady and only shows real measurements."
      />
      <CaseStudy
        title="Making the data readable for kids"
        problem="A raw number like 98.6 doesn't mean much to a six-year-old."
        action="The front end maps the temperature onto a thermometer graphic that fills as it heats up, and changes the page's background color across five temperature bands from cool to very hot."
        result="Attendees could tell at a glance how hot the oven was getting."
      />

      <h2>How it went</h2>
      <p>
        The demos were a hit with both attendees and the nature center staff alike. I also learned that the kids liked
        the solar-powered T-Rex toy I bought at Walmart even more than the demos I spent multiple weeks building myself (welp ._.). Nevertheless, it was still
        a great learning experience in how circuits and electronics relate to
        computing and computer engineering.
      </p>
    </ProjectShell>
  );
}
