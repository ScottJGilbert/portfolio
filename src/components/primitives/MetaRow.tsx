import { cn } from "@/lib/utils";

type MetaRowProps = {
  date: string;
  category: string;
  readingTime?: string;
  impact?: string;
  platform?: string;
  items?: string[];
  className?: string;
};

export function MetaRow({
  date,
  category,
  readingTime,
  impact,
  platform,
  items,
  className,
}: MetaRowProps) {
  const extraItems = [readingTime, impact, platform, ...(items ?? [])].filter(
    (item): item is string => Boolean(item)
  );

  return (
    <p className={cn("text-xs uppercase tracking-[0.08em] opacity-70", className)}>
      {[category, date, ...extraItems].join(" · ")}
    </p>
  );
}
