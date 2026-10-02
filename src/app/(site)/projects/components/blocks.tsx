import type { ReactNode } from "react";

/*
 * Building blocks for hand-authored project write-ups.
 *
 * These deliberately use <div>/<span> (not <p>/<ul>/<h3>) for their inner
 * text: project-article.css is unlayered, so its `.project-article-body p/ul/li`
 * rules beat any Tailwind utility class and would re-add margins/bullets inside
 * the cards. Lists use role="list"/"listitem" to keep the semantics.
 */

const labelClass =
  "text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted";
// For labels on the stronger green (primary-container) fill, where muted text
// falls below 4.5:1 contrast in dark mode.
const labelClassStrong =
  "text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground";

/** A row of short, scannable "at a glance" facts (numbers or capabilities). */
export function Highlights({
  items,
}: {
  items: { label: string; detail: string }[];
}) {
  return (
    <div
      role="list"
      className={`my-6 grid gap-3 sm:grid-cols-2 ${
        items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
      }`}
    >
      {items.map((item) => (
        <div
          role="listitem"
          key={item.label}
          className="rounded-xl border border-outline-ghost bg-surface-alt/75 p-4"
        >
          <div className="text-lg font-semibold leading-snug text-foreground">
            {item.label}
          </div>
          <div className="mt-1 text-sm leading-6 text-muted">{item.detail}</div>
        </div>
      ))}
    </div>
  );
}

/** Problem -> what I did -> result, for one concrete piece of work. */
export function CaseStudy({
  title,
  problem,
  action,
  result,
}: {
  title: string;
  problem: ReactNode;
  action: ReactNode;
  result?: ReactNode;
}) {
  const cells: { label: string; body: ReactNode }[] = [
    { label: "The problem", body: problem },
    { label: "What I did", body: action },
  ];
  if (result) cells.push({ label: "Result", body: result });

  return (
    <div className="my-6 rounded-xl border border-outline-ghost bg-surface p-4 md:p-5">
      <div className="text-base font-semibold text-foreground">{title}</div>
      <div
        className={`mt-3 grid gap-4 ${
          cells.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}
      >
        {cells.map((cell) => (
          <div key={cell.label}>
            <div className={labelClass}>{cell.label}</div>
            <div className="mt-1 text-sm leading-6 text-foreground">
              {cell.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Makes ownership explicit: what already existed / belonged to others vs. what
 * I personally took on. Used where the work was inherited rather than designed.
 */
export function RoleSplit({
  contextTitle = "Already in place",
  context,
  mineTitle = "What I owned",
  mine,
}: {
  contextTitle?: string;
  context: ReactNode[];
  mineTitle?: string;
  mine: ReactNode[];
}) {
  const column = (title: string, items: ReactNode[], emphasized: boolean) => (
    <div
      className={`rounded-xl border p-4 ${
        emphasized
          ? "border-primary/40 bg-primary-container/60"
          : "border-outline-ghost bg-surface-alt/60"
      }`}
    >
      <div className={emphasized ? labelClassStrong : labelClass}>{title}</div>
      <div role="list" className="mt-2 space-y-2">
        {items.map((item, index) => (
          <div
            role="listitem"
            key={index}
            className="flex gap-2 text-sm leading-6 text-foreground"
          >
            <span aria-hidden className="mt-[0.15rem] text-muted">
              &ndash;
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="my-6 grid gap-3 md:grid-cols-2">
      {column(contextTitle, context, false)}
      {column(mineTitle, mine, true)}
    </div>
  );
}

/** A horizontal (or stacked) sequence of steps joined by arrows. */
export function FlowDiagram({
  title,
  caption,
  steps,
  layout = "row",
}: {
  title: string;
  caption?: string;
  steps: { title: string; detail?: string }[];
  layout?: "row" | "column";
}) {
  const isRow = layout === "row";

  return (
    <figure className="my-6">
      <div
        role="group"
        aria-label={title}
        className="rounded-xl border border-outline-ghost bg-surface-alt/50 p-4"
      >
        <div className={`${labelClass} mb-3`}>{title}</div>
        <div
          className={`flex flex-col gap-2 ${
            isRow ? "md:flex-row md:items-stretch" : ""
          }`}
        >
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`flex flex-col gap-2 ${
                isRow ? "md:flex-1 md:flex-row md:items-stretch" : ""
              }`}
            >
              <div className="flex-1 rounded-lg border border-outline-ghost bg-surface p-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {step.title}
                  </span>
                </div>
                {step.detail && (
                  <div className="mt-1 text-xs leading-5 text-muted">
                    {step.detail}
                  </div>
                )}
              </div>
              {index < steps.length - 1 && (
                <span
                  aria-hidden
                  className={`self-center text-muted ${
                    isRow ? "rotate-90 md:rotate-0" : "rotate-90"
                  }`}
                >
                  &rarr;
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/**
 * Stacked lanes (e.g. edge / services / data) with labelled connectors.
 * Nodes flagged `mine` are highlighted (used to show which parts I owned).
 */
export function ArchitectureDiagram({
  title,
  caption,
  lanes,
  arrows = true,
}: {
  title: string;
  caption?: string;
  /** Set false for a layer view where lanes aren't a flow of data. */
  arrows?: boolean;
  lanes: {
    label: string;
    nodes: { name: string; note?: string; mine?: boolean }[];
    connector?: string;
  }[];
}) {
  return (
    <figure className="my-6">
      <div
        role="group"
        aria-label={title}
        className="rounded-xl border border-outline-ghost bg-surface-alt/50 p-4"
      >
        <div className={`${labelClass} mb-3`}>{title}</div>
        <div className="space-y-1">
          {lanes.map((lane, index) => (
            <div key={lane.label}>
              <div className="grid gap-2 md:grid-cols-[8rem_1fr] md:items-center">
                <div className="text-xs font-semibold text-primary">
                  {lane.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {lane.nodes.map((node) => (
                    <div
                      key={node.name}
                      className={`rounded-lg border px-3 py-2 ${
                        node.mine
                          ? "border-primary/50 bg-primary-container/60"
                          : "border-outline-ghost bg-surface"
                      }`}
                    >
                      <div className="text-sm font-semibold text-foreground">
                        {node.name}
                      </div>
                      {node.note && (
                        <div className="text-xs leading-5 text-muted">
                          {node.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {index < lanes.length - 1 &&
                (arrows ? (
                  <div
                    aria-hidden
                    className="flex items-center gap-2 py-1 text-xs text-muted md:pl-[8.5rem]"
                  >
                    <span>&darr;</span>
                    {lane.connector && <span>{lane.connector}</span>}
                  </div>
                ) : (
                  <div aria-hidden className="h-2" />
                ))}
            </div>
          ))}
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** A short code excerpt with a caption. Keep these small and illustrative. */
export function CodeSample({
  caption,
  children,
}: {
  caption: string;
  children: string;
}) {
  return (
    <figure className="my-6">
      {/* tabIndex makes the scrollable block reachable by keyboard (WCAG 2.1.1). */}
      <pre
        tabIndex={0}
        aria-label="Code example"
        className="overflow-x-auto rounded-xl border border-outline-ghost bg-surface-inset p-4 text-[0.8rem] leading-6 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <code className="font-mono">{children}</code>
      </pre>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** A quiet aside for attribution, scope notes, or "what this isn't". */
export function Note({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="my-6 rounded-xl border border-outline-ghost bg-surface-inset p-4">
      <div className={labelClass}>{title}</div>
      <div className="mt-1 text-sm leading-6 text-foreground">{children}</div>
    </div>
  );
}
