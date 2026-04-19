export function MetaRow({ date, category }: { date: string; category: string }) {
  return (
    <p className="text-xs uppercase tracking-[0.08em] opacity-70">
      {category} · {date}
    </p>
  );
}
