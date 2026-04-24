import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <section className="px-6 py-12 md:px-10 lg:px-12">
      <div className="mx-auto max-w-3xl rounded-2xl border border-outline-ghost bg-surface px-6 py-8 shadow-ambient">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          Projects
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Project not found
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          The requested project does not exist or is not currently published.
        </p>
        <Link
          href="/projects"
          className="mt-5 inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Back to Projects
        </Link>
      </div>
    </section>
  );
}
