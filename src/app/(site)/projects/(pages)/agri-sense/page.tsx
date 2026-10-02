import { getProjectMeta } from "@/lib/projects/content";
import { ProjectShell } from "../../components/project-shell";
import {
  ArchitectureDiagram,
  CaseStudy,
  Highlights,
  RoleSplit,
} from "../../components/blocks";
import { projectMetadata } from "../../lib/metadata";

export const metadata = projectMetadata("agri-sense");

export default function AgriSensePage() {
  const project = getProjectMeta("agri-sense")!;

  return (
    <ProjectShell project={project}>
      <p>
        Agri-Sense is a data-driven web application for monitoring the health of
        plants in vertical and indoor farms. It was a semester-long project in
        Project: Code UIUC, a student organization that builds software projects in teams. I served as backend team lead, managing a team of ten
        developers responsible for data handling, APIs, and the core logic that
        sits between the sensors and the web interface.
      </p>

      <Highlights
        items={[
          {
            label: "Team of ten",
            detail:
              "Led the backend developers and shared progress with the project, hardware, and frontend leads.",
          },
          {
            label: "Three sensor buses",
            detail:
              "Coordinated how UART, OneWire, and I2C data from IoT boards reaches the backend.",
          },
          {
            label: "Clear conventions",
            detail:
              "Set the branch, versioning, review, and code-structure rules the whole team followed.",
          },
        ]}
      />

      <h2>How the system fits together</h2>
      <ArchitectureDiagram
        title="Agri-Sense data flow (simplified)"
        caption="The backend team owned the middle layer, plus the contract it shares with the hardware and frontend teams."
        lanes={[
          {
            label: "Plants",
            nodes: [
              { name: "Sensors", note: "Plant and environment readings" },
            ],
            connector: "UART, OneWire, I2C",
          },
          {
            label: "Hardware",
            nodes: [
              { name: "IoT boards", note: "Collect and package readings" },
            ],
            connector: "Readings + metadata",
          },
          {
            label: "Backend",
            nodes: [
              { name: "Flask API", note: "Receives and serves data" },
              { name: "Data processing", note: "pandas and NumPy" },
              { name: "Storage", note: "Database chosen by team skills" },
            ],
            connector: "JSON over HTTP",
          },
          {
            label: "Frontend",
            nodes: [{ name: "React web app", note: "The grower-facing interface" }],
          },
        ]}
      />

      <h2>My part</h2>
      <RoleSplit
        contextTitle="The wider project"
        context={[
          "A hardware team designing the IoT boards and sensors.",
          "A frontend team building the web interface.",
          "A project lead coordinating the teams.",
        ]}
        mineTitle="What I did as backend lead"
        mine={[
          "Managed ten backend developers, ran weekly meetings, and reported progress to the project lead.",
          "Oversaw how data from the sensor buses (UART, OneWire, I2C) reaches the central backend.",
          "Set up the backend's structure, environment configuration, and review rules.",
          "Maintained the production branches, versioning, and CI policies, and kept API configuration shared with the hardware and frontend leads.",
        ]}
      />

      <h2>Decisions I made as lead</h2>
      <CaseStudy
        title="A backend structure ten people can work in at once"
        problem="With ten developers adding features at the same time, a backend with no agreed structure turns into merge conflicts and files that do five jobs."
        action="I reorganized the starter code into an application-factory Flask app, with routes grouped in blueprints and business logic in a services folder following a one-service-per-file rule. Settings come from environment variables so no secrets live in the repository."
        result="New features have an obvious place to go, and developers can work in separate files without stepping on each other."
      />
      <CaseStudy
        title="Choosing a database around the team, not the hype"
        problem="Early on, it wasn't clear which database would suit the project or the experience of the people maintaining it."
        action="The scaffold leaves storage open: it supports either a document database or an SQL ORM, with a note that an ORM would help if the team lacked SQL experience."
        result="The team could start building the API immediately without being locked into a database decision."
      />
      <CaseStudy
        title="Making code review automatic"
        problem="Reviews fall through the cracks on a large student team, especially when pull requests touch both backend and frontend code."
        action="The repository uses code-owner rules that automatically route backend changes to me and frontend changes to the frontend lead, and work reaches the main branch through pull requests."
        result="Every change gets reviewed by the person who owns that part of the system."
      />
    </ProjectShell>
  );
}
