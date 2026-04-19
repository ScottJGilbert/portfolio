export interface Project {
  title: string;
  description: string;
  category: string;
  year: string;
  image: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
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
