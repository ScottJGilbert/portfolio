import { AssortmentGrid } from "./components/assortment-grid";
import { HeroSection } from "./components/hero-section";
import { JournalList } from "./components/journal-list";
import { ProjectsGrid } from "./components/projects-grid";
import { Project, projects } from "../projects/content";

import { homeContent } from "./content";

export default function SiteHomePage() {
  const featuredProjects: Project[] = projects
    .filter((p) => !p.description.includes("(WIP)"))
    .slice(0, 2);
  return (
    <>
      <HeroSection content={homeContent.hero} />
      <AssortmentGrid content={homeContent.assortment} />
      <ProjectsGrid
        content={{
          ...homeContent.projects,
          projects: featuredProjects,
        }}
      />
      <JournalList content={homeContent.journal} />
    </>
  );
}
