export function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <dl className="inline-flex items-baseline gap-2 rounded-full bg-[var(--surface-low)] px-3 py-1.5">
      <dt className="text-[0.65rem] uppercase tracking-[0.08em] opacity-70">{label}</dt>
      <dd className="text-sm font-semibold">{value}</dd>
    </dl>
  );
}
