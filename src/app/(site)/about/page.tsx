import Image from "next/image";
import { Card } from "@/components/ui/card";
import { OrgLogo, getInitials } from "@/components/ui/org-logo";
import { aboutPageContent } from "./content";

export { metadata } from "./content";

function getEntryLogo(entry: { logo?: string } | Record<string, unknown>) {
  return "logo" in entry ? (entry.logo as string | undefined) : undefined;
}

function getEntryMinor(entry: { minor?: string } | Record<string, unknown>) {
  return "minor" in entry ? (entry.minor as string | undefined) : undefined;
}

interface CertificationLike {
  name: string;
  issuer: string;
  date: string;
  detail?: string;
  group?: string;
}

function getCertGroup(cert: CertificationLike) {
  return cert.group;
}

type CertificationRow =
  | { type: "single"; cert: CertificationLike }
  | { type: "group"; group: string; certs: CertificationLike[] };

function groupCertifications(
  certifications: readonly CertificationLike[],
): CertificationRow[] {
  const rows: CertificationRow[] = [];

  for (const cert of certifications) {
    const group = getCertGroup(cert);

    if (!group) {
      rows.push({ type: "single", cert });
      continue;
    }

    const existingGroup = rows.find(
      (row): row is Extract<CertificationRow, { type: "group" }> =>
        row.type === "group" && row.group === group,
    );

    if (existingGroup) {
      existingGroup.certs.push(cert);
    } else {
      rows.push({ type: "group", group, certs: [cert] });
    }
  }

  return rows;
}

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
                <div className="relative space-y-6">
                  {entryGroups.map((entryGroup) => {
                    const isGrouped = Boolean(entryGroup.groupKey);
                    const primaryCompany = entryGroup.entries[0].company;

                    return (
                      <div key={entryGroup.key} className="space-y-3">
                        {isGrouped && (
                          <div className="flex items-center gap-3 rounded-xl border border-outline-ghost bg-primary/5 px-5 py-3">
                            <OrgLogo
                              src={getEntryLogo(entryGroup.entries[0])}
                              alt={`${primaryCompany} logo`}
                              initials={getInitials(primaryCompany)}
                              size={40}
                            />
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                                {primaryCompany}
                              </p>
                              <p className="mt-1 text-xs text-muted">
                                Multiple roles ·{" "}
                                {
                                  entryGroup.entries[
                                    entryGroup.entries.length - 1
                                  ].period
                                }
                              </p>
                            </div>
                          </div>
                        )}
                        <div
                          className={
                            isGrouped
                              ? "relative ml-5 space-y-3 border-l-2 border-primary/25 pl-6"
                              : "space-y-3"
                          }
                        >
                          {entryGroup.entries.map((entry) => (
                            <Card
                              key={`${entry.company}-${entry.role}`}
                              variant="surface"
                              padding="lg"
                              className={`relative space-y-4 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                                isGrouped
                                  ? ""
                                  : "border-l-4 border-l-primary/70 pl-5"
                              }`}
                            >
                              {isGrouped && (
                                <span
                                  className="absolute -left-[1.9rem] top-7 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary"
                                  aria-hidden
                                />
                              )}
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                                <div
                                  className={
                                    isGrouped
                                      ? "space-y-1"
                                      : "flex items-start gap-3"
                                  }
                                >
                                  {!isGrouped && (
                                    <OrgLogo
                                      src={getEntryLogo(entry)}
                                      alt={`${entry.company} logo`}
                                      initials={getInitials(entry.company)}
                                      size={40}
                                    />
                                  )}
                                  <div className="space-y-1">
                                    <p className="text-base font-semibold text-foreground">
                                      {entry.role}
                                    </p>
                                    {!isGrouped && (
                                      <p className="text-sm font-medium text-primary">
                                        {entry.company}
                                      </p>
                                    )}
                                  </div>
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
                      </div>
                    );
                  })}
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
                  {getEntryMinor(entry) && (
                    <p className="text-sm font-medium text-primary">
                      Minor: {getEntryMinor(entry)}
                    </p>
                  )}
                  <p className="text-sm leading-7 text-muted whitespace-break-spaces">
                    {entry.details}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section
          className="space-y-3"
          aria-labelledby="about-certifications-heading"
        >
          <h2
            id="about-certifications-heading"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-muted"
          >
            Certifications &amp; Licenses
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {groupCertifications(aboutPageContent.certifications).map(
              (row) =>
                row.type === "single" ? (
                  <li
                    key={row.cert.name}
                    className="rounded-lg border border-outline-ghost/70 bg-surface/60 px-4 py-3"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {row.cert.name}
                    </p>
                    <p className="text-xs text-muted">
                      {row.cert.issuer} · {row.cert.date}
                    </p>
                    {row.cert.detail && (
                      <p className="mt-1 text-xs italic text-muted">
                        {row.cert.detail}
                      </p>
                    )}
                  </li>
                ) : (
                  <li key={row.group}>
                    <details className="group rounded-lg border border-outline-ghost/70 bg-surface/60 px-4 py-3">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 marker:hidden">
                        <span className="text-sm font-medium text-foreground">
                          {row.group}
                        </span>
                        <span className="flex items-center gap-2 text-xs text-muted">
                          {row.certs.length} credentials
                          <span
                            className="text-primary transition-transform group-open:rotate-45"
                            aria-hidden
                          >
                            +
                          </span>
                        </span>
                      </summary>
                      <ul className="mt-3 space-y-2 border-t border-outline-ghost/60 pt-3">
                        {row.certs.map((cert) => (
                          <li key={cert.name}>
                            <p className="text-sm text-foreground">
                              {cert.name}
                            </p>
                            <p className="text-xs text-muted">
                              {cert.issuer} · {cert.date}
                            </p>
                            {cert.detail && (
                              <p className="mt-1 text-xs italic text-muted">
                                {cert.detail}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ),
            )}
          </ul>
        </section>
      </div>
    </section>
  );
}
