import { PageIntro } from "@/components/primitives/PageIntro";
import { SectionHeader } from "@/components/primitives/SectionHeader";

const legalSections = [
  {
    title: "Privacy and Data Handling",
    subtitle: "What is collected and how that data is used.",
    points: [
      "This site is a static portfolio and does not sell personal information.",
      "No advertising trackers or profiling scripts are intentionally deployed.",
      "If you contact me directly, your message is used only for professional correspondence.",
    ],
  },
  {
    title: "Content Usage and Licensing",
    subtitle: "How editorial and project content can be referenced.",
    points: [
      "Content is published for portfolio review, interviews, and technical discussion.",
      "Do not republish case studies, writing, or media assets as your own work.",
      "Quoted excerpts should include attribution and a direct link to the original page.",
    ],
  },
  {
    title: "Accuracy and Availability",
    subtitle: "Limits of liability and ongoing updates.",
    points: [
      "Information is maintained in good faith but may change without notice.",
      "External links may evolve, move, or become unavailable over time.",
      "No warranty is provided for fitness, completeness, or uninterrupted availability.",
    ],
  },
  {
    title: "Contact and Policy Updates",
    subtitle: "How to request clarification or report concerns.",
    points: [
      "Questions about rights, corrections, or attribution can be raised through the contact path listed in the site footer.",
      "Material policy updates are reflected on this page as the portfolio evolves.",
    ],
  },
] as const;

export default function LegalPage() {
  return (
    <div className="space-y-10 p-6">
      <PageIntro
        title="Legal"
        summary="Policy notes for privacy, usage rights, and attribution standards across this portfolio."
      />
      <div className="space-y-6">
        {legalSections.map((section) => (
          <section key={section.title} className="space-y-3 rounded-3xl bg-[var(--surface-high)] p-5">
            <SectionHeader title={section.title} subtitle={section.subtitle} />
            <ul className="list-disc space-y-2 pl-6 text-sm opacity-90">
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
