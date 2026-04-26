import { projectsPageData } from "./content";
// import Search from "./components/search";
import ProjectCard from "./components/project-card";
import { projects } from "./content";

export default function ProjectsPage() {
  return (
    <section className="px-6 py-10 md:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {projectsPageData.title}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-muted">
            {projectsPageData.description}
          </p>
        </header>

        {/* <Search /> */}

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
