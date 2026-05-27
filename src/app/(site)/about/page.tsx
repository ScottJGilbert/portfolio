import Image from "next/image";
import { Card } from "@/components/ui/card";
import { aboutPageContent } from "./content";

export { metadata } from "./content";

export default function AboutPage() {
  return (
    <section className="px-6 py-10 md:px-10 lg:px-12">
      <div className="space-y-10">
        <header className="grid gap-6 md:grid-cols-[minmax(0,220px)_1fr] md:items-start">
          <div className="overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border/60">
            <Image
              src="/portrait.jpg"
              alt="Portrait"
              width={480}
              height={640}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight">
              {aboutPageContent.title}
            </h1>
            <div className="space-y-3 text-sm leading-7 text-muted">
              {aboutPageContent.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </header>

        <section
          className="space-y-4"
          aria-labelledby="about-experience-heading"
        >
          <h2
            id="about-experience-heading"
            className="text-xl font-semibold tracking-tight"
          >
            Work Experience
          </h2>
          <div className="space-y-4">
            {aboutPageContent.experience.map((entry) => (
              <Card
                key={`${entry.company}-${entry.role}`}
                variant="surface"
                padding="lg"
                className="space-y-4"
              >
                <div className="space-y-1">
                  <p className="text-base font-semibold text-foreground">
                    {entry.role}
                  </p>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">
                    {entry.company} · {entry.location} · {entry.period}
                  </p>
                </div>
                <p className="text-sm leading-7 text-muted">{entry.summary}</p>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section
          className="space-y-4"
          aria-labelledby="about-education-heading"
        >
          <h2
            id="about-education-heading"
            className="text-xl font-semibold tracking-tight"
          >
            Education
          </h2>
          <div className="space-y-4">
            {aboutPageContent.education.map((entry) => (
              <Card
                key={`${entry.institution}-${entry.credential}`}
                variant="surface"
                padding="lg"
                className="flex items-start gap-4"
              >
                <Image
                  src={entry.logo}
                  alt={`${entry.institution} logo`}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-lg object-contain border border-border bg-surface"
                />
                <div className="space-y-2">
                  <p className="text-base font-semibold text-foreground">
                    {entry.credential}
                  </p>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">
                    {entry.institution} · {entry.period}
                  </p>
                  <p className="text-sm leading-7 text-muted whitespace-break-spaces">
                    {entry.details}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
