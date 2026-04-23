import { Card } from "@/components/ui/card";
import { legalPageContent } from "./content";

export default function LegalPage() {
  return (
    <section className="px-6 py-10 md:px-10 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">{legalPageContent.title}</h1>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">
            Last updated {legalPageContent.lastUpdated}
          </p>
        </header>

        <section id="terms" aria-labelledby="terms-heading" className="space-y-4">
          <h2 id="terms-heading" className="text-xl font-semibold tracking-tight">
            Terms of Service
          </h2>
          <div className="space-y-4">
            {legalPageContent.terms.map((section) => (
              <Card key={section.id} variant="surface" padding="lg" className="space-y-3">
                <h3 className="text-base font-semibold tracking-tight">{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-muted">
                    {paragraph}
                  </p>
                ))}
              </Card>
            ))}
          </div>
        </section>

        <section id="privacy" aria-labelledby="privacy-heading" className="space-y-4">
          <h2 id="privacy-heading" className="text-xl font-semibold tracking-tight">
            Privacy Policy
          </h2>
          <div className="space-y-4">
            {legalPageContent.privacy.map((section) => (
              <Card key={section.id} variant="surface" padding="lg" className="space-y-3">
                <h3 className="text-base font-semibold tracking-tight">{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-muted">
                    {paragraph}
                  </p>
                ))}
              </Card>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
