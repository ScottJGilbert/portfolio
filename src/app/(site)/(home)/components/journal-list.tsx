import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";

interface HomeJournalEntry {
  index: string;
  title: string;
  description: string;
  date: string;
  href: string;
  src: string;
}

export interface HomeJournalContent {
  eyebrow: string;
  title: string;
  entries: readonly HomeJournalEntry[];
}

interface JournalListProps {
  content: HomeJournalContent;
}

export function JournalList({ content }: JournalListProps) {
  return (
    <section
      className="px-6 py-20 md:px-12 md:py-24"
      aria-labelledby="journal-heading"
    >
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
                className="group flex flex-col gap-4 rounded-xl bg-surface/55 px-4 py-8 ring-1 ring-inset ring-outline-ghost/55 transition-colors hover:bg-surface-alt/75 active:bg-surface-alt/70 md:flex-row md:items-center md:justify-between md:px-6 md:py-8"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-1 ring-inset ring-outline-ghost/55 md:h-20 md:w-20">
                    <Image
                      src={entry.src}
                      alt={entry.title}
                      fill
                      sizes="(min-width: 768px) 80px, 64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-6 md:gap-12">
                    <span className="text-sm font-bold tabular-nums text-muted/90 transition-colors group-hover:text-primary">
                      {entry.index}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold">{entry.title}</h3>
                      <p className="text-sm text-muted">{entry.description}</p>
                    </div>
                  </div>
                </div>
                <span className="self-end whitespace-nowrap text-sm hidden md:block font-medium text-muted md:self-auto">
                  {entry.date}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
