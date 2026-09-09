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

        {(["Professional Experience", "Leadership & Involvement"] as const).map(
          (group) => {
            const entries = aboutPageContent.experience.filter(
              (entry) => entry.group === group,
            );
            const entryGroups = entries.reduce<
              Array<{
                key: string;
                groupKey?: string;
                entries: Array<(typeof entries)[number]>;
              }>
            >((groups, entry) => {
              const groupKey = "groupKey" in entry ? entry.groupKey : undefined;
              const key = groupKey ?? `${entry.company}-${entry.role}`;
              const existingGroup = groups.find((item) => item.key === key);

              if (existingGroup) {
                existingGroup.entries.push(entry);
              } else {
                groups.push({
                  key,
                  groupKey,
                  entries: [entry],
                });
              }

              return groups;
            }, []);

            return (
              <section
                key={group}
                className="space-y-4"
                aria-labelledby={`about-${group.toLowerCase().replaceAll(" ", "-")}-heading`}
              >
                <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      Career timeline
                    </p>
                    <h2
                      id={`about-${group.toLowerCase().replaceAll(" ", "-")}-heading`}
                      className="mt-1 text-xl font-semibold tracking-tight"
                    >
                      {group}
                    </h2>
                  </div>
                  <span className="hidden text-xs text-muted sm:block">
                    {entries.length} {entries.length === 1 ? "role" : "roles"}
                  </span>
                </div>
                <div className="relative space-y-4">
                  {entryGroups.map((entryGroup) => (
                    <div
                      key={entryGroup.key}
                      className={
                        entryGroup.groupKey ? "space-y-0" : "space-y-4"
                      }
                    >
                      {entryGroup.groupKey && (
                        <div className="rounded-xl mb-2 border-l-4 border-primary bg-primary/5 px-5 py-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                            {entryGroup.entries[0].company}
                          </p>
                          <p className="mt-1 text-xs text-muted">
                            Multiple roles ·{" "}
                            {
                              entryGroup.entries[entryGroup.entries.length - 1]
                                .period
                            }
                          </p>
                        </div>
                      )}
                      {entryGroup.entries.map((entry) => (
                        <Card
                          key={`${entry.company}-${entry.role}`}
                          variant="surface"
                          padding="lg"
                          className={`relative ml-0 space-y-4 border-l-4 border-l-primary/70 pl-5 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                            entryGroup.groupKey ? "rounded-b-xl ml-4" : ""
                          }`}
                        >
                          {/* <span className="absolute -left-6.25 top-7 h-3 w-3 rounded-full border-2 border-background bg-primary" /> */}
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                            <div className="space-y-1">
                              <p className="text-base font-semibold text-foreground">
                                {entry.role}
                              </p>
                              {!entryGroup.groupKey && (
                                <p className="text-sm font-medium text-primary">
                                  {entry.company}
                                </p>
                              )}
                            </div>
                            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-muted sm:text-right">
                              {entry.period}
                            </p>
                          </div>
                          {entry.location && (
                            <p className="text-xs uppercase tracking-[0.14em] text-muted">
                              {entry.location}
                            </p>
                          )}
                          <p className="text-sm leading-7 text-muted">
                            {entry.summary}
                          </p>
                          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted marker:text-primary">
                            {entry.highlights.map((highlight) => (
                              <li key={highlight}>{highlight}</li>
                            ))}
                          </ul>
                        </Card>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            );
          },
        )}

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
