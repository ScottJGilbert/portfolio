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
        Project: Code UIUC, a student organization that builds software projects
        in teams. I served as backend team lead, managing a team of ten
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
            nodes: [
              { name: "React web app", note: "The grower-facing interface" },
            ],
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
        title="A backend ten people can actually work in"
        problem="With ten developers adding features at the same time, a backend with no agreed structure turns into merge conflicts and files that do five jobs."
        action="I reorganized the starter code into an application-factory Flask app, with routes grouped in blueprints and business logic in a services folder following a one-service-per-file rule. Settings come from environment variables so no secrets live in the repository."
        result="New features have an obvious place to go, and developers can work in separate files without stepping on each other."
      />
      <CaseStudy
        title="Separating backend and frontend branches"
        problem="Passing changes between branches owned by different teams can lead to conflicts and delays for no real reason."
        action="I create a specific development branch for the backend team where all changes (made on individual feature branches) are merged before being integrated into the main branch. Backend and frontend code are merged in batches rather than once for every new feature."
        result="Preventing merge conflicts became a lot easier (relatively speaking), and the frontend could continue asking a working (even if unfinished) backend without individual new features blocking it from running when needed."
      />
    </ProjectShell>
  );
}
