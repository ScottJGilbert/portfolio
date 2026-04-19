import { MetaRow } from "./MetaRow";

export function EditorialListItem({
  title,
  summary,
  date,
  category,
}: {
  title: string;
  summary: string;
  date: string;
  category: string;
}) {
  return (
    <article className="space-y-2">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <MetaRow date={date} category={category} />
      <p>{summary}</p>
    </article>
  );
}
