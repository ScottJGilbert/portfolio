export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header className="space-y-2">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="text-sm opacity-80">{subtitle}</p>
    </header>
  );
}
