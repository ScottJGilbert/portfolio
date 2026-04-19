import { PageIntro } from "@/components/primitives/PageIntro";

export default function LegalPage() {
  return (
    <div className="space-y-8 p-6">
      <PageIntro title="Legal" summary="Terms and public site usage notes." />
      <section className="space-y-2">
        <h2>Privacy</h2>
        <p>This site does not sell personal information and does not run ad tracking scripts.</p>
      </section>
      <section className="space-y-2">
        <h2>Usage</h2>
        <p>Content is provided for portfolio review and professional discussion.</p>
      </section>
    </div>
  );
}
