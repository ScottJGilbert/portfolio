import Image from "next/image";
import { Headphones, Network, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeAssortmentContent, HomeBeyondCodeIcon } from "@/lib/site-content";

interface AssortmentGridProps {
  content: HomeAssortmentContent;
}

const iconMap: Record<HomeBeyondCodeIcon, typeof Headphones> = {
  headphones: Headphones,
  infrastructure: Network,
};

export function AssortmentGrid({ content }: AssortmentGridProps) {
  return (
    <section className="px-6 py-20 md:px-12 md:py-24" aria-labelledby="assortment-heading">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          level="h2"
          className="[&>div>h2]:text-2xl [&>div>h2]:font-bold"
          id="assortment-heading"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <Card
            variant="surface"
            padding="lg"
            className="space-y-8 border-border/60 transition-colors hover:bg-surface-alt md:col-span-8"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-bold">{content.coreStack.title}</h3>
              <div className="flex flex-wrap gap-3">
                {content.coreStack.technologies.map((technology) => (
                  <Chip key={technology} variant="neutral" className="px-5 py-2 text-sm font-bold text-primary">
                    {technology}
                  </Chip>
                ))}
              </div>
            </div>
            <p className="max-w-md leading-relaxed text-muted">{content.coreStack.description}</p>
          </Card>

          <Card
            variant="alt"
            padding="lg"
            className="border-border/60 bg-primary/10 text-foreground transition-opacity hover:opacity-95 md:col-span-4"
          >
            <Quote className="mb-6 size-9 text-primary" aria-hidden />
            <p className="text-xl font-medium italic leading-snug">{content.philosophy.quote}</p>
          </Card>

          <Card
            variant="surface"
            padding="lg"
            className="space-y-8 border-border/60 transition-colors hover:bg-surface-alt md:col-span-5"
          >
            <h3 className="text-xl font-bold">{content.lab.title}</h3>
            <ul className="space-y-4">
              {content.lab.items.map((item) => (
                <li key={item} className="flex items-center gap-4 text-foreground/80">
                  <span className="size-2 rounded-full bg-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card
            variant="surface"
            padding="lg"
            className="border-border/60 transition-colors hover:bg-surface-alt md:col-span-7"
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-center">
              <div className="flex-1 space-y-5">
                <h3 className="text-xl font-bold">{content.beyondCode.title}</h3>
                <p className="leading-relaxed text-muted">{content.beyondCode.description}</p>
                <div className="flex gap-4 text-muted">
                  {content.beyondCode.icons.map((icon) => {
                    const Icon = iconMap[icon];
                    return <Icon key={icon} className="size-5" aria-hidden />;
                  })}
                </div>
              </div>
              <div className="h-48 w-full overflow-hidden rounded-lg md:w-48 md:shrink-0">
                <Image
                  src={content.beyondCode.image.src}
                  alt={content.beyondCode.image.alt}
                  width={192}
                  height={192}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

