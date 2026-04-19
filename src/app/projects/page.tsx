import React from 'react';
import Image from 'next/image';
import { TonalSurface } from '@/components/ui/TonalSurface';
import { EditorialChip } from '@/components/ui/EditorialChip';
import { cn } from '@/lib/utils';

interface Project {
  title: string;
  description: string;
  category: string;
  year: string;
  image: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    title: 'Atmospheric Architectures',
    description: 'An exploration of structural honesty and organic forms in digital space, focusing on the intersection of brutalist layouts and lush, atmospheric detailing.',
    category: 'Digital Design',
    year: '2026',
    image: '/api/placeholder/1600/900',
    tags: ['Next.js 16', 'Tailwind 4', 'Three.js'],
  },
  {
    title: 'The Tonal System',
    description: 'A comprehensive study on monochromatic depth and surface hierarchies, replacing traditional borders with tonal shifts to create intuitive visual boundaries.',
    category: 'Design System',
    year: '2025',
    image: '/api/placeholder/1600/900',
    tags: ['TypeScript', 'Figma', 'CSS Architecture'],
  },
  {
    title: 'Organic Brutalism',
    description: 'A conceptual framework for the modern web that balances raw, unadorned layouts with a high-end editorial sensibility and generous breathing room.',
    category: 'Conceptual',
    year: '2024',
    image: '/api/placeholder/1600/900',
    tags: ['Editorial', 'UX Research', 'Typography'],
  },
];

export default function ProjectsPage() {
  return (
    <TonalSurface tier="base" className="min-h-screen">
      <div className="flex flex-col items-center w-full">

        {/* Header Section */}
        <section className="w-full max-w-4xl px-6 py-16 md:py-24 flex flex-col items-start">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-8 leading-[1.1]">
            Selected <br /> Works
          </h1>
          <p className="text-lg md:text-xl text-on-surface/80 max-w-2xl leading-relaxed font-medium">
            A curated collection of projects exploring the balance between engineered structure and ephemeral atmosphere.
          </p>
        </section>

        {/* Projects List */}
        <div className="w-full flex flex-col gap-16 md:gap-24 pb-24">
          {PROJECTS.map((project, index) => (
            <section
              key={project.title}
              className={cn(
                "w-full flex flex-col",
                index % 2 === 0 ? "items-start" : "items-end"
              )}
            >
              <div className={cn(
                "w-full max-w-4xl px-6 flex flex-col gap-6",
                index % 2 === 0 ? "text-left" : "text-right"
              )}>
                {/* Metadata */}
                <div className="flex flex-wrap gap-2" style={{ justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end' }}>
                  <EditorialChip>{project.category}</EditorialChip>
                  <span className="text-xs font-medium uppercase tracking-wider text-on-surface/60 px-3 py-1">
                    {project.year}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.1]">
                    {project.title}
                  </h2>
                  <p className="text-lg md:text-xl text-on-surface/80 max-w-2xl leading-relaxed font-medium">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2" style={{ justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end' }}>
                  {project.tags.map(tag => (
                    <EditorialChip key={tag} className="opacity-80 hover:opacity-100 transition-opacity cursor-default">
                      {tag}
                    </EditorialChip>
                  ))}
                </div>
              </div>

              {/* Project Image - Edge to Edge bleed pattern */}
              <div className="w-full relative h-[60vh] md:h-[80vh] overflow-hidden mt-8">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </section>
          ))}
        </div>
      </div>
    </TonalSurface>
  );
}
