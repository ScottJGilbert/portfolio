import { cookies } from "next/headers";
import { AssortmentGrid } from "./components/assortment-grid";
import { HeroSection } from "./components/hero-section";
import { JournalList } from "./components/journal-list";
import { ProjectsGrid } from "./components/projects-grid";
import { projects } from "@/lib/projects/content";
import { selectFeaturedProjects } from "@/lib/projects/select-featured";
import {
  RECRUITER_COOKIE_NAME,
  parseRecruiterCategories,
} from "@/lib/recruiter-links";

import { homeContent } from "./content";

export default async function SiteHomePage() {
  const cookieStore = await cookies();
  const recruiterCategories = parseRecruiterCategories(
    cookieStore.get(RECRUITER_COOKIE_NAME)?.value,
  );
  const featuredProjects = selectFeaturedProjects(
    projects,
    recruiterCategories,
    undefined,
    2,
  );

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
