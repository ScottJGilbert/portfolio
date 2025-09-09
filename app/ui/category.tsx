export default function Category({ area }: { area: string }) {
  return (
    <span
      key={area + "category"}
      className="text-sm py-1 px-2 rounded-lg bg-[var(--background-tertiary)] border-1 border-[var(--border)] inline-flex justify-between gap-4"
    >
      <p>{area}</p>
    </span>
  );
}
