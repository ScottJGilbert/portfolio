import Image from "next/image";
import { getProjectMeta } from "@/lib/projects/content";
import { ProjectShell } from "../components/project-shell";
import { projectMetadata } from "../lib/metadata";

export const metadata = projectMetadata("icda-website");

export default function IcdaWebsitePage() {
  const project = getProjectMeta("icda-website")!;

  return (
    <ProjectShell project={project}>
      <h2>The ICDA</h2>
      <figure>
        <Image
          src="https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSf4g9AnkRICPnY2wjo1dQV7fGrxAUle6uNHZFE"
          alt="Old ICDA Website"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </figure>
      <p>
        The Illinois Congressional Debate Association (ICDA) is the sole
        congressional debate (otherwise known as student congress) circuit
        in the state of Illinois. It provides leadership for the
        development, supervision, and promotion of congressional debate
        competition across Illinois, and stresses the educational
        importance of congressional debate activities, along with a spirit
        of cooperation and friendship amongst our membership.
      </p>
      <p>
        I was a competitor in the ICDA throughout my time in high school,
        and was privileged to be offered an opportunity to refurbish and
        update its old website.
      </p>

      <h2>Version 1.0</h2>
      <figure>
        <Image
          src="https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSfUx4z18H2OkrGivuB5YZznLWoy4qtmIjDpwAE"
          alt="ICDA Website v1.0"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </figure>
      <p>
        Over the summer of 2024, my friend and I expanded and overhauled the
        ICDA&apos;s website, building it from the ground up with a total new
        layout and design theme.
      </p>
      <p>
        We were given largely free reign to create whatever we wanted, so we
        focused on a couple key priorities:
      </p>
      <ol>
        <li>
          <strong>Disseminating information:</strong> Adding new spots to
          showcase information about ICDA and the structure of
          congressional debate.
        </li>
        <li>
          <strong>Tournament resources:</strong> Providing more
          easily-accessible information about tournament dates, locations,
          and important documents like legislation and results.
        </li>
        <li>
          <strong>General resources:</strong> Increasing accessibility of
          documents and other general information about key parts of
          congressional debate and ICDA rules.
        </li>
        <li>
          <strong>Recruitment:</strong> Encouraging site users who are not
          current members of the ICDA to join and/or urge their schools to
          join.
        </li>
      </ol>
      <p>
        Other changes included standardized page/heading content, improved
        mobile accessibility for Android, iOS, and other cellular devices,
        and multimedia elements aimed at expanding awareness, encouraging
        increased participation, and providing valuable resources for
        new/returning debaters.
      </p>
      <p>
        During the process of building this website, we gathered feedback
        on design and functionality from both the ICDA and potential end
        users, collaborated with oversight with continuous information flow
        to modernize specific design choices and improve website
        appearance, and overcame severe limitations (including a lack of
        suitable support for server-side scripting) to deliver a
        functioning and visually-appealing website within the designated
        timeframe.
      </p>

      <h2>Version 2.0</h2>
      <figure>
        <Image
          src="https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSf0LLg7t5gypH8qdJC1LjbUioscP6wenQT9KXM"
          alt="ICDA Website v2.0"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </figure>
      <p>
        While we were certainly happy with our progress in developing
        version 1.0, the new ICDA website was certainly not without its
        flaws.
      </p>
      <p>
        The largest problem was a data one — since the entire site was just
        static HTML pages served by an Apache HTTP server, updates could
        only be made by physically altering the HTML code. As a result,
        important and constantly changing information (i.e. tournament
        dates, member schools, etc.) could only be changed by us, the
        programmers. Because of this and other problems, during the summer
        of 2025, we focused on developing version 2.0 of the website.
      </p>
      <p>
        The key focus of this version was adding a full backend written in
        PHP and connected to an external MySQL database, which would allow
        circuit administrators to securely update important data and other
        information on the website without having to fully update the
        source code, future-proofing the website for long term use. Some
        other changes included:
      </p>
      <ul>
        <li>
          Support for dynamic, markdown-based news posts to share
          additional information on what ICDA is doing.
        </li>
        <li>
          An automatically-updating archive of old tournament
          records/information.
        </li>
        <li>SEO and Social Media Optimizations.</li>
        <li>Animations to make the site feel more alive.</li>
      </ul>
      <p>
        Version 2.0 is my last major update of ICDA Website. While I will
        continue to offer limited support/bug-fixing where necessary,
        future updates will be made by members of the ICDA captains
        committee.
      </p>
      <p>
        Check out the ICDA Website at{" "}
        <a href="https://icdadebate.org" target="_blank" rel="noreferrer">
          icdadebate.org
        </a>
        .
      </p>
    </ProjectShell>
  );
}
