import { cn } from "@/lib/utils";
import { MetaRow } from "./MetaRow";

type EditorialListVariant = "article" | "project" | "legal-note";

export function EditorialListItem({
  title,
  summary,
  date,
  category,
  variant = "article",
  readingTime,
  impact,
  platform,
  metaItems,
}: {
  title: string;
  summary: string;
  date: string;
  category: string;
  variant?: EditorialListVariant;
  readingTime?: string;
  impact?: string;
  platform?: string;
  metaItems?: string[];
}) {
  const toneByVariant: Record<EditorialListVariant, string> = {
    article: "space-y-2",
    project: "space-y-2 rounded-3xl bg-[var(--surface-high)] p-5",
    "legal-note": "space-y-2 rounded-2xl bg-[var(--surface-low)] p-4",
  };

  return (
    <article className={toneByVariant[variant]}>
      <h3 className={cn("text-2xl font-semibold", variant === "legal-note" && "text-xl")}>
        {title}
      </h3>
      <MetaRow
        date={date}
        category={category}
        readingTime={readingTime}
        impact={impact}
        platform={platform}
        items={metaItems}
      />
      <p className={cn(variant === "legal-note" && "text-sm opacity-80")}>{summary}</p>
    </article>
  );
}
