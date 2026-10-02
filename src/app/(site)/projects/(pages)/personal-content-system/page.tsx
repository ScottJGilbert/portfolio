import { getProjectMeta } from "@/lib/projects/content";
import { ProjectShell } from "../../components/project-shell";
import {
  ArchitectureDiagram,
  CaseStudy,
  Highlights,
  Note,
} from "../../components/blocks";
import { projectMetadata } from "../../lib/metadata";

export const metadata = projectMetadata("personal-content-system");

export default function PersonalContentSystemPage() {
  const project = getProjectMeta("personal-content-system")!;

  return (
    <ProjectShell project={project}>
      <p>
        The Personal Content System is the set of tools behind this portfolio
        and my blog. I wanted a setup where I can write and publish without
        editing code, and where the site itself is built like a production
        application: fast, accessible, and easy to maintain. It is also where I
        practice running and securing real services, from DNS and TLS to
        containers and CI/CD.
      </p>

      <Highlights
        items={[
          {
            label: "Next.js 16 + React 19",
            detail:
              "This portfolio: statically rendered pages, a typed content registry, and light and dark themes built on design tokens.",
          },
          {
            label: "Published npm package",
            detail:
              "A rich-text editor and a sanitizing viewer that I packaged so any of my sites can reuse them.",
          },
          {
            label: "Core web vitals above 95",
            detail:
              "Performance and accessibility got a dedicated pass, including contrast, focus states, and SEO fixes.",
          },
          {
            label: "Privacy-conscious personalization",
            detail:
              "Recruiter links reorder featured projects with a first-party cookie and no third-party tracking.",
          },
        ]}
      />

      <h2>How it fits together</h2>
      <ArchitectureDiagram
        title="Personal Content System layers (simplified)"
        caption="The portfolio and the editor package are covered in detail below. The platform services are the supporting infrastructure."
        arrows={false}
        lanes={[
          {
            label: "Public sites",
            nodes: [
              { name: "Portfolio", note: "Next.js, this site" },
              { name: "Blog", note: "Next.js" },
            ],
          },
          {
            label: "Content tooling",
            nodes: [
              {
                name: "Lexical blog editor",
                note: "Editor + viewer, published on npm",
              },
              {
                name: "Project content registry",
                note: "Typed metadata for every project",
              },
            ],
          },
          {
            label: "Platform services",
            nodes: [
              { name: "PostgreSQL" },
              { name: "Account management" },
              { name: "Workflow automation" },
              { name: "Backend services" },
            ],
          },
          {
            label: "Delivery",
            nodes: [
              { name: "GitHub + CI/CD" },
              { name: "Vercel" },
              { name: "Custom DNS + TLS" },
            ],
          },
        ]}
      />

      <h2>Decisions worth explaining</h2>

      <CaseStudy
        title="One source of truth for project data"
        problem="Each project's details are needed in several places: the listing, search and filters, the featured picks on the home page, the sitemap, and each project's facts panel. Copying them around means they drift."
        action="Project metadata lives in one typed registry. Each project's write-up is hand-authored JSX in its own route folder. A route folder always takes precedence over the catch-all route, so a project without a write-up automatically renders a 'coming soon' page from its metadata alone."
        result="Adding a project is one registry entry plus an optional page. There is no routing config, and every listing stays consistent."
      />

      <CaseStudy
        title="Personalizing without trackers"
        problem="I wanted to show a recruiter the projects most relevant to their role first, but I didn't want to add a third-party tracker to do it."
        action="Short vanity links (for example on a resume or QR code) hit a route handler that sets a first-party, httpOnly cookie listing a few categories. The server reads it to reorder the featured projects. The cookie is disclosed on the privacy page and can be cleared with one link."
        result="Visitors see relevant projects immediately, with no flash of the wrong content. The tradeoff is that the pages reading the cookie render dynamically instead of being cached, which I documented and accepted."
      />

      <CaseStudy
        title="A reusable, safe rich-text editor"
        problem="Blog editing usually means one-off glue code, and rendering user-written rich text raises the risk of unsafe HTML."
        action="I turned Meta's Lexical editor playground into a reusable package with a full toolbar, 30+ plugins, tables, images, embeds, equations, and syntax-highlighted code blocks. Its viewer is a separate entry point that sanitizes output with DOMPurify and an allowlist for embedded iframes. I published it to npm with typed props and documentation."
        result="Any of my sites can drop in an editor and a viewer in a few lines. When a JSDOM version failed in a serverless environment, I dropped it and released a fix."
      />

      <CaseStudy
        title="Accessibility and performance as a finishing pass"
        problem="A site can look finished and still fail keyboard users, screen readers, and search crawlers."
        action="I ran a dedicated accessibility and Lighthouse pass: fixing color contrast in both themes, adding visible focus states, correcting sitemap and robots issues, and making icons decorative where adjacent text already names them."
        result="Core web vitals scores above 95, and a site built to work with keyboards and assistive technology."
      />

      <h2>What I’m adding next</h2>
      <ul>
        <li>LDAP-based authentication for the supporting services</li>
        <li>Newsletter publishing directly through SMTP</li>
        <li>Interoperability with open document standards</li>
        <li>Data caching to improve outreach and content quality</li>
      </ul>

      <Note title="How I build it">
        I use AI coding assistants on this project and keep the repository’s
        conventions in a guide file they follow. I make the design decisions and
        review what ships.
      </Note>
    </ProjectShell>
  );
}
