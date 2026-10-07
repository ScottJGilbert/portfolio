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
        organization I co-founded at the University of Illinois in January 2026. Members build things like
        working 8-bit CPUs, keyboards, and displays completely from scratch in the video game Minecraft, and
        the organization runs its own community servers. As president, I split my time between running the organization and
        building the infrastructure it runs on.
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
              "Plus other services, spread across multiple hosting providers.",
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
        As president, I direct day-to-day operations, manage the budget, and set
        the technical strategy. I also maintain the general infrastructure:
        gaming services, file storage, workplace productivity tools, and
        communication channels.
      </p>

      <h2>The infrastructure</h2>
      <p>
        I designed the organization’s computing backbone as a set of modular
        container stacks, so each service can be upgraded or replaced without
        touching the others. The stacks bring together game servers, file
        access, DNS, web-based administration, datastores, messaging, staff
        authentication, API gateways, and secure connection tunneling.
      </p>

      <ArchitectureDiagram
        title="Main service stack (simplified)"
        lanes={[
          {
            label: "Entry points",
            nodes: [
              {
                name: "WireGuard",
                note: "Tunnel to off-site VPS that accepts public traffic"
              },
              {
                name: "Velocity (Minecraft proxy)",
                note: "Routes players between servers",
              },
              { name: "Caddy (Reverse proxy)", note: "HTTPS for web tools" },
            ],
          },
          {
            label: "Game servers",
            nodes: [
              { name: "Lobby" },
              { name: "Survival Multiplayer" },
              { name: "Onboarding", note: "New members start here" },
              {
                name: "MCHPRS",
                note: "High-speed testing server written in Rust",
              },
              { name: "Project servers" },
            ],
          },
          {
            label: "Web services",
            nodes: [
              { name: "Backend API" },
              { name: "WebDAV access point" },
            ],
          },
          {
            label: "Data and safety",
            nodes: [
              { name: "MariaDB", note: "Player permissions" },
              { name: "Shared volumes" },
              { name: "Scheduled backups", note: "To S3-compatible storage" },
            ],
          },
        ]}
        arrows={false}
      />

      <ArchitectureDiagram
        title="Administration stack (simplified)"
        caption="The admin stack is a separate container orchestration that handles staff authentication, user management, and backups without exposing the main stack to direct access. It boils down application complexity into simple API calls to the main stack with all necessary information."
        lanes={[
          {
            label: "Entry points",
            nodes: [
              { name: "Caddy (Reverse proxy)", note: "HTTPS for web tools" },
              { name: "Cloudflare tunnel", note: "IP masking and secure connection to the admin stack" },
            ],
          },
          {
            label: "Web services",
            nodes: [
              { name: "Admin panel" },
              { name: "Backend API" },
              { name: "File manager" },
            ],
          },
          {
            label: "Data and safety",
            nodes: [
              { name: "PostgreSQL" },
              { name: "Scheduled backups", note: "To external storage" },
            ],
          },
        ]}
        arrows={false}
      />

      <h2>Design decisions</h2>

      <CaseStudy
        title="Properly configuring service volumes"
        problem="Many services depend on a volume shared with the WebDAV file transfer and backup services. If they try to access the volume in the wrong order, they crash or run against empty directories."
        action="A small init container creates the shared folder structure and permissions first. Every other service declares what it depends on and waits for health checks to pass before it starts."
        result="One command brings the whole stack up from nothing, in the right order, every time."
      />
      <CaseStudy
        title="Managing player permissions"
        problem="Setting access and permission for hundreds of players across multiple servers the old way - by editing JSON files - is error-prone and time-consuming."
        action="A web-based admin panel interfaces with Luckperms, a permissions manager for Minecraft servers. Officers can set permissions and groups through the panel, and the changes propagate to all servers automatically via SQL messaging."
        result="Officers can now manage player permissions efficiently and without the risk of errors."
      />
      <CaseStudy
        title="Letting officers manage servers without shell access"
        problem="Officers need to edit server files, view logs, and check on services, but giving everyone SSH access is a security risk and a support burden."
        action="I put web tools in front of the stack: file management and admin authentication is handled through a web interface in a separate container application, and file transfers are all managed through a single WebDAV connection."
        result="Staff handle day-to-day work from the browser, and the servers' shell stays locked down."
      />
      <CaseStudy
        title="Making it easy for the next person"
        problem="Student organizations turn over every few years, and infrastructure only one person understands doesn't survive that."
        action="Each stack is built from the ground up with maintainability and modularity in mind, and has a README that covers deployment, daily operations, backups, and troubleshooting. Adding a new game server is as simple as pasting a folder template and adding one block in the compose file."
        result="New officers can deploy and extend the stack from the documentation."
      />
    </ProjectShell>
  );
}
