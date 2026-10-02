import Image from "next/image";
import { getProjectMeta } from "@/lib/projects/content";
import { ProjectShell } from "../../components/project-shell";
import {
  ArchitectureDiagram,
  CaseStudy,
  Highlights,
  RoleSplit,
} from "../../components/blocks";
import { projectMetadata } from "../../lib/metadata";

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
        <figcaption>The ICDA’s website before the redesign.</figcaption>
      </figure>
      <p>
        The Illinois Congressional Debate Association (ICDA) is the sole
        congressional debate (also called student congress) circuit in Illinois.
        It runs tournaments, supports member schools, and promotes the activity
        across the state. I competed in the ICDA throughout high school, and was
        offered the chance to rebuild its aging website.
      </p>

      <Highlights
        items={[
          {
            label: "~20K search impressions",
            detail: "Over four months, with about a 6% click-through rate.",
          },
          {
            label: "Top-10 Google ranking",
            detail: "Among student congress sites.",
          },
          {
            label: "30+ API endpoints",
            detail:
              "A PHP backend with three access levels for circuit administrators.",
          },
          {
            label: "No code needed to update",
            detail:
              "Administrators edit schools, tournaments, news, and results themselves.",
          },
        ]}
      />

      <h2>Version 1.0: a new site from the ground up</h2>
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
        Over the summer of 2024, a friend and I rebuilt the site with a new
        layout and design. We had largely free rein, so we focused on four
        goals:
      </p>
      <ol>
        <li>
          <strong>Explaining congressional debate:</strong> new pages about the
          ICDA and how the activity works.
        </li>
        <li>
          <strong>Tournament resources:</strong> dates, locations, legislation,
          and results that are easy to find.
        </li>
        <li>
          <strong>General resources:</strong> rules and key documents in one
          place.
        </li>
        <li>
          <strong>Recruitment:</strong> encouraging schools that aren’t members
          to join.
        </li>
      </ol>
      <p>
        We also standardized page layouts, improved the site on phones, and
        added multimedia to help new debaters. We collected feedback from the
        ICDA and from likely users throughout, and delivered on time despite a
        major limitation: the hosting had no server-side scripting, so the whole
        site had to be static HTML.
      </p>

      <h2>Version 2.0: a backend so the site can run itself</h2>
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
        The biggest problem with version 1.0 was data. Because every page was
        static HTML, constantly changing information like tournament dates and
        member schools could only be updated by editing code, which meant only
        the two of us could do it. In summer 2025, I led version 2.0 to fix
        that.
      </p>
      <RoleSplit
        contextTitle="Version 1.0 (shared)"
        context={[
          "A friend and I built the full front-end redesign together.",
          "Static HTML on Apache, with content changes made by hand in code.",
        ]}
        mineTitle="Version 2.0 (led by me)"
        mine={[
          "Designed and built the PHP backend and MySQL database.",
          "Built the admin interface, authentication, and the yearly archive process.",
          "Added news posts, SEO and social optimizations, and animations.",
        ]}
      />

      <ArchitectureDiagram
        title="ICDA website 2.0 (simplified)"
        caption="Public pages load their content from the API. Administrators sign in to manage it. A scheduled job handles upkeep."
        lanes={[
          {
            label: "Visitors and staff",
            nodes: [
              { name: "Visitors", note: "Read news, schedules, results" },
              {
                name: "Administrators",
                note: "Poster, Editor, or Administrator",
              },
            ],
            connector: "Browser",
          },
          {
            label: "Front end",
            nodes: [
              { name: "Static pages", note: "HTML, CSS, JavaScript" },
              { name: "React components", note: "Header and footer" },
              { name: "Admin screens" },
            ],
            connector: "JSON requests",
          },
          {
            label: "Backend",
            nodes: [
              { name: "PHP API", note: "30+ endpoints" },
              { name: "Models", note: "Prepared SQL queries" },
              { name: "Sessions and roles" },
            ],
            connector: "SQL",
          },
          {
            label: "Data",
            nodes: [
              {
                name: "MySQL",
                note: "Schools, tournaments, news, users, rules",
              },
              { name: "Files", note: "Legislation, results, and archive PDFs" },
            ],
          },
        ]}
      />

      <h2>Engineering details</h2>
      <CaseStudy
        title="Letting non-programmers update the site safely"
        problem="Circuit administrators with different responsibilities needed to edit content, but a single shared login would let anyone change anything."
        action="I built three access levels (Poster, Editor, and Administrator) with different permissions, and only Administrators can manage users. Sessions are stored in the database with the user, IP address, and browser, and expire after 30 minutes of inactivity. Passwords are hashed, queries use prepared statements, and user input is sanitized."
        result="Each administrator gets only the access their role needs, and stale sessions expire on their own."
      />
      <CaseStudy
        title="Archiving each season automatically"
        problem="Every August the previous season's legislation and results have to be moved into an archive, which was a manual, error-prone task."
        action="A token-protected scheduled job runs regularly. It clears expired sessions, and on August 1 it moves the season's legislation and results PDFs into a dated archive folder, builds the archive page, and records that it ran so it can't repeat within the year."
        result="The archive updates itself, and old records stay available."
      />
      <CaseStudy
        title="Being found"
        problem="A debate association's website is only useful if students and coaches can find it."
        action="I added SEO and social-sharing metadata, a sitemap, markdown-based news posts that give the site fresh content, and performance fixes to page and component load times."
        result="About 20K search impressions at a 6% click-through rate over four months, ranking among the top ten student congress sites on Google."
      />

      <h2>Where it stands</h2>
      <p>
        Version 2.0 is my last major update. I still offer limited support and
        bug fixes, and the ICDA captains committee handles future updates. The
        repository includes backup instructions and example configuration to
        make that handoff easier. See the live site at{" "}
        <a href="https://icdadebate.org" target="_blank" rel="noreferrer">
          icdadebate.org
        </a>
        .
      </p>
    </ProjectShell>
  );
}
