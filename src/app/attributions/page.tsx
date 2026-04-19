import { PageIntro } from "@/components/primitives/PageIntro";

const sources = [
  "Next.js documentation",
  "Tailwind CSS documentation",
  "Hero and icon assets credited per source license",
];

export default function AttributionsPage() {
  return (
    <div className="space-y-8 p-6">
      <PageIntro
        title="Attributions"
        summary="Libraries and references used in this public portfolio."
      />
      <ul className="list-disc pl-6 space-y-2">
        {sources.map((source) => (
          <li key={source}>{source}</li>
        ))}
      </ul>
    </div>
  );
}
