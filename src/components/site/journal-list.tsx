import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeJournalContent } from "@/lib/site-content";

interface JournalListProps {
  content: HomeJournalContent;
}

export function JournalList({ content }: JournalListProps) {
  return (
    <section className="px-6 py-20 md:px-12 md:py-24" aria-labelledby="journal-heading">
      <div className="mx-auto max-w-5xl space-y-12">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          level="h2"
          className="[&>div>h2]:text-2xl [&>div>h2]:font-bold"
          id="journal-heading"
        />

        <ol className="space-y-2">
          {content.entries.map((entry) => (
            <li key={entry.index}>
              <Link
                href={entry.href}
                className="group flex flex-col gap-4 rounded-xl px-4 py-6 transition-colors hover:bg-surface-alt active:bg-surface-alt/80 md:flex-row md:items-center md:justify-between md:px-6 md:py-8"
              >
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="text-sm font-bold tabular-nums text-foreground/30 transition-colors group-hover:text-primary">
                    {entry.index}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold">{entry.title}</h3>
                    <p className="text-sm text-foreground/50">{entry.description}</p>
                  </div>
                </div>
                <span className="self-end text-sm font-medium text-foreground/40 md:self-auto">{entry.date}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

