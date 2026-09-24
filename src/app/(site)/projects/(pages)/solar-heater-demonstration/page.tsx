import Image from "next/image";
import { getProjectMeta } from "@/lib/projects/content";
import { ProjectShell } from "../../components/project-shell";
import { projectMetadata } from "../../lib/metadata";

export const metadata = projectMetadata("solar-heater-demonstration");

export default function SolarHeaterDemonstrationPage() {
  const project = getProjectMeta("solar-heater-demonstration")!;

  return (
    <ProjectShell project={project}>
      <h2>CEP</h2>
      <p>
        Each year, seniors at my high school complete a Civic Engagement Project
        (CEP), a year-long project that aims to get students more involved with
        their community through service, civic participation, and other means.
        Part of the project also focuses on making contributions to one of the
        17 United Nations Sustainable Development Goals.
      </p>
      <p>
        For my CEP project, I decided to focus on UN Goal 7: Affordable and
        Clean Energy.
      </p>
      <figure>
        <Image
          src="https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSfqr8cK1MoCbFi54gd0fkcuswp7r2RtAKhTej9"
          alt="UN Sustainable Development Goal 7"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </figure>

      <h2>The Presentation</h2>
      <p>
        As part of the project, I collaborated with Spring Valley Nature Center,
        a local nature preserve, to make an educational presentation on some of
        the benefits, implementations, and applications of solar power in
        commercial/residential areas.
      </p>
      <p>
        I would then be able to show my presentation at a booth at Spring
        Valley&apos;s Earth Day Party in April, where people in attendance would
        be able to learn about different methods of conservation and
        sustainability.
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

      <h2>The Demonstration</h2>
      <p>
        Part of this presentation included a set of demonstrations on different
        applications of solar energy, one of which was a solar oven (similar to
        the DIY science fair ovens used to cook pizza outside).
      </p>
      <p>
        Since the event was largely catered to young children and their parents,
        the information about the solar oven had to be presented in a fun and
        safe way. Since cooking food was off the table (too much of a health
        risk), I decided to display the temperature inside the oven with
        infographics instead.
      </p>
      <p>
        To achieve this, I first setup a Django web app that handled my
        frontend, backend (including model structure), and communication between
        the services.
      </p>
      <p>
        From there, I connected a DS18B20 thermometer to an Arduino and, via the
        OneWire protocol, read and displayed the internal temperature data on
        the serial monitor for my port. I could read the monitor with a separate
        python script, and copy the data into an SQLite database running in my
        app via Django.
      </p>
      <p>
        On my frontend, I had a script that requested the most recent value in
        the database every second and used it to alter the state of a clipart
        mercury thermometer, allowing the temperature data to be displayed in a
        fun and interesting way on my laptop screen.
      </p>
      <figure>
        <Image
          src="https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSfHOIbB4A7j2dCwemRUNlzQhFXrvxGb6VPuOWI"
          alt="Django web app dashboard"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </figure>
      <p>
        Overall, the project was a success and it proved to be very fun and
        engaging for the event attendees. However, I also learned that the kids
        enjoyed playing with the solar-powered T-Rex toy I bought at Walmart way
        more. Fortunately, it was still a great learning experience that taught
        me a lot about how circuits and electronics relate in the realm of
        computing and computer engineering.
      </p>
    </ProjectShell>
  );
}
