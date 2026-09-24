import { cookies } from "next/headers";
import { projectsPageData } from "./content";
import FeaturedProjectCard from "./components/featured-project-card";
import { ProjectsExplorer } from "./components/projects-explorer";
import { projects } from "@/lib/projects/content";
import { selectFeaturedProjects } from "@/lib/projects/select-featured";
import {
  RECRUITER_COOKIE_NAME,
  parseRecruiterCategories,
} from "@/lib/recruiter-links";

export { metadata } from "./content";

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const recruiterCategories = parseRecruiterCategories(
    cookieStore.get(RECRUITER_COOKIE_NAME)?.value,
  );

  const featuredProjects = selectFeaturedProjects(
    projects,
    recruiterCategories,
  );
  const featuredSlugSet = new Set(featuredProjects.map((p) => p.slug));
  const remainingProjects = projects.filter(
    (project) => !featuredSlugSet.has(project.slug),
  );

  return (
    <section className="px-6 py-10 md:px-10 lg:px-12">
      <div className="mx-auto min-w-0 max-w-7xl space-y-14">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {projectsPageData.title}
          </h1>
        </header>

        {featuredProjects.length > 0 && (
          <section
            aria-labelledby="featured-projects-heading"
            className="space-y-6"
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Selected work
              </p>
              <h2
                id="featured-projects-heading"
                className="text-2xl font-semibold tracking-tight"
              >
                Featured projects
              </h2>
            </div>

            <div className="grid min-w-0 items-stretch gap-6 lg:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.slug}
                  className={`flex *:h-full ${
                    index === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  <FeaturedProjectCard
                    project={project}
                    prominent={index === 0}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {remainingProjects.length > 0 && (
          <details className="group space-y-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 border-y border-outline-ghost py-5 text-lg font-semibold tracking-tight marker:hidden">
              <span>More projects</span>
              <span
                className="text-sm font-medium text-primary transition-transform group-open:rotate-45"
                aria-hidden
              >
                +
              </span>
            </summary>

            <div className="min-w-0 pt-2">
              <ProjectsExplorer projects={remainingProjects} />
            </div>
          </details>
        )}
      </div>
    </section>
  );
}
