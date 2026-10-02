import { getProjectMeta } from "@/lib/projects/content";
import { ProjectShell } from "../../components/project-shell";
import {
  ArchitectureDiagram,
  CaseStudy,
  Highlights,
} from "../../components/blocks";
import { projectMetadata } from "../../lib/metadata";

export const metadata = projectMetadata("illini-redstone-computing");

export default function IlliniRedstoneComputingPage() {
  const project = getProjectMeta("illini-redstone-computing")!;

  return (
    <ProjectShell project={project}>
      <p>
        Illini Redstone Computing (IRC) is a student-led computing and gaming
        organization at the University of Illinois. Members build things like
        working 8-bit CPUs, keyboards, and displays completely from scratch, and
        the organization runs its own community servers. I&apos;m its
        co-founder and president, so I split my time between running the
        organization and building the infrastructure it runs on.
      </p>

      <Highlights
        items={[
          {
            label: "100+ new members in a year",
            detail:
              "Growth came from outreach coordinated with campus departments and student organizations.",
          },
          {
            label: "3 container orchestrations",
            detail:
              "Plus other services, spread across four hosting providers.",
          },
          {
            label: "Automated backups",
            detail: "Daily, consistent snapshots sent to off-site storage.",
          },
          {
            label: "Built to be handed off",
            detail:
              "Documented so the next set of officers can run and extend it.",
          },
        ]}
      />

      <h2>Running the organization</h2>
      <p>
        As president I direct day-to-day operations, manage the budget, and set
        the technical strategy. I also maintain the general infrastructure:
        gaming services, file storage, workplace productivity tools, and
        communication channels.
      </p>

      <h2>The infrastructure</h2>
      <p>
        I designed the organization&apos;s computing backbone as a set of
        modular container stacks, so each service can be upgraded or replaced
        without touching the others. The stacks bring together game servers,
        file access, DNS, web-based administration, datastores, messaging,
        staff authentication, API gateways, and secure connection tunneling.
      </p>

      <ArchitectureDiagram
        title="Main service stack (simplified)"
        caption="The Minecraft servers are the community hook. The web services let officers run everything without a shell."
        lanes={[
          {
            label: "Players and staff",
            nodes: [
              { name: "Players", note: "Connect through one address" },
              { name: "Officers", note: "Manage through the browser" },
            ],
          },
          {
            label: "Entry points",
            nodes: [
              { name: "Minecraft proxy", note: "Routes players between servers" },
              { name: "Reverse proxy", note: "HTTPS for web tools" },
            ],
          },
          {
            label: "Game servers",
            nodes: [
              { name: "Lobby" },
              { name: "Survival" },
              { name: "Onboarding" },
              { name: "Redstone computing server", note: "For building CPUs in-game" },
              { name: "Project servers" },
            ],
          },
          {
            label: "Web services",
            nodes: [
              { name: "Backend API" },
              { name: "Admin panel" },
              { name: "File manager" },
              { name: "Permissions and SFTP tools" },
            ],
          },
          {
            label: "Data and safety",
            nodes: [
              { name: "PostgreSQL" },
              { name: "MariaDB", note: "Player permissions" },
              { name: "Shared volume" },
              { name: "Scheduled backups", note: "To S3-compatible storage" },
            ],
          },
        ]}
        arrows={false}
      />

      <h2>Design decisions</h2>

      <CaseStudy
        title="Starting a dozen services in the right order"
        problem="Many services depend on a database or on shared storage being ready. If they start in the wrong order, they crash or run against empty directories."
        action="A small init container creates the shared folder structure and permissions first. Every other service declares what it depends on and waits for health checks to pass before it starts."
        result="One command brings the whole stack up from nothing, in the right order, every time."
      />
      <CaseStudy
        title="Backups that don't corrupt live game worlds"
        problem="Copying a game world while the server is writing to it can produce a backup that won't load."
        action="A backup container runs on a schedule, briefly stops the labeled services while it snapshots their data, and uploads compressed archives to S3-compatible storage with a retention policy."
        result="Consistent, restorable backups with no manual steps."
      />
      <CaseStudy
        title="Letting officers manage servers without shell access"
        problem="Officers need to edit server files, manage player permissions, and check on services, but giving everyone SSH access is a security risk and a support burden."
        action="I put web tools in front of the stack: a file manager that signs in through the organization's own backend, an admin panel, a permissions interface, and SFTP behind an HTTPS reverse proxy. A WireGuard tunnel links a private host to the public-facing server."
        result="Staff handle day-to-day work from the browser, and the servers' shell stays locked down."
      />
      <CaseStudy
        title="Making it easy for the next person"
        problem="Student organizations turn over every few years, and infrastructure only one person understands doesn't survive that."
        action="Each stack has a README that covers deployment, daily operations, backups, and troubleshooting. Adding a new game server takes a folder, a Dockerfile, and one block in the compose file. Secrets are supplied through example environment files and are never committed."
        result="New officers can deploy and extend the stack from the documentation."
      />
    </ProjectShell>
  );
}
