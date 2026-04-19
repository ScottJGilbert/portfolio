export function PageIntro({ title, summary }: { title: string; summary: string }) {
  return (
    <section className="space-y-3">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="max-w-2xl">{summary}</p>
    </section>
  );
}
