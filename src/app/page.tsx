import { BentoCard } from "@/components/primitives/BentoCard";
import { Button } from "@/components/primitives/Button";
import { PageIntro } from "@/components/primitives/PageIntro";
import { homeContent } from "@/data/home";

export default function HomePage() {
  return (
    <div className="space-y-10 p-6">
      <PageIntro title={homeContent.title} summary={homeContent.summary} />
      <Button variant="primary">View Selected Work</Button>
      <section className="grid gap-4 md:grid-cols-3">
        {homeContent.highlights.map((item) => (
          <BentoCard key={item} title="Highlight">
            <p>{item}</p>
          </BentoCard>
        ))}
      </section>
    </div>
  );
}
