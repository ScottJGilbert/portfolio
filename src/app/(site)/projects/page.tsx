import { featuredProjectSlugs, projectsPageData } from "./content";
import FeaturedProjectCard from "./components/featured-project-card";
import Search from "./components/search";
import ProjectCard from "./components/project-card";
import { projects } from "./content";

export { metadata } from "./content";

const featuredSlugSet = new Set<string>(featuredProjectSlugs);
const featuredProjects = featuredProjectSlugs.reduce(
  (selectedProjects, slug) => {
    const project = projects.find((candidate) => candidate.slug === slug);

    if (!project || selectedProjects.some((item) => item.slug === slug)) {
      return selectedProjects;
    }

    return [...selectedProjects, project];
  },
  [] as typeof projects,
);
const remainingProjects = projects.filter(
  (project) => !featuredSlugSet.has(project.slug),
);

export default function ProjectsPage() {
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

            <div className="min-w-0 space-y-6 pt-2">
              <Search />
              <div className="grid min-w-0 gap-6 md:grid-cols-2">
                {remainingProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          </details>
        )}
      </div>
    </section>
  );
}
