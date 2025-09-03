export default function Category({ area }: { area: string }) {
  return (
    <span
      key={area + "category"}
      className="text-sm py-1 px-2 rounded-lg bg-green-900 border-1 border-gray-50 inline-flex justify-between gap-4"
    >
      <p>{area}</p>
    </span>
  );
}
