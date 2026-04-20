export function TimelineItem({
  year,
  title,
  detail,
}: {
  year: string;
  title: string;
  detail: string;
}) {
  return (
    <article className="space-y-1 rounded-2xl bg-[var(--surface-high)] p-4">
      <p className="text-xs uppercase tracking-[0.08em] opacity-70">{year}</p>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>{detail}</p>
    </article>
  );
}
