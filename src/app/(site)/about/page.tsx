export default function AboutPage() {
  return (
    <section className="px-6 py-10 md:px-10 lg:px-12">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Placeholder details while the full about page is in progress.
      </p>

      <div className="mt-8 space-y-8">
        <section id="privacy" className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Privacy</h2>
          <p className="text-sm text-muted-foreground">
            This section will outline what data is collected and how it is used.
          </p>
        </section>

        <section id="accessibility" className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Accessibility</h2>
          <p className="text-sm text-muted-foreground">
            This section will describe accessibility goals and current support.
          </p>
        </section>

        <section id="colophon" className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Colophon</h2>
          <p className="text-sm text-muted-foreground">
            This section will share the tools and stack used to build this site.
          </p>
        </section>
      </div>
    </section>
  );
}
