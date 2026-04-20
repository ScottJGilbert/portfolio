import { AssortmentGrid } from "@/components/site/assortment-grid";
import { HeroSection } from "@/components/site/hero-section";
import { JournalList } from "@/components/site/journal-list";
import { SiteFooter } from "@/components/site/site-footer";
import { WorkGrid } from "@/components/site/work-grid";
import { homeContent } from "@/lib/site-content";

export default function SiteHomePage() {
  return (
    <>
      <HeroSection content={homeContent.hero} />
      <AssortmentGrid content={homeContent.assortment} />
      <WorkGrid content={homeContent.work} />
      <JournalList content={homeContent.journal} />
      <SiteFooter content={homeContent.footer} />
    </>
  );
}
