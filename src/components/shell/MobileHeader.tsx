import { coreNav, externalNav } from "@/data/navigation";
import { ExternalLinksGroup } from "./ExternalLinksGroup";
import { SidebarNavGroup } from "./SidebarNavGroup";

export function MobileHeader() {
  return (
    <header className="md:hidden p-4" aria-label="Mobile Navigation">
      <div className="space-y-3">
        <SidebarNavGroup ariaLabel="Mobile Navigation" items={coreNav} listClassName="flex gap-4 flex-wrap" />
        <ExternalLinksGroup
          ariaLabel="Mobile External Links"
          items={externalNav}
          listClassName="flex gap-3 flex-wrap text-sm"
          labelSuffix=" ↗"
        />
      </div>
    </header>
  );
}
