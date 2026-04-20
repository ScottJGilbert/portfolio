import { coreNav, externalNav } from "@/data/navigation";
import { ExternalLinksGroup } from "./ExternalLinksGroup";
import { SidebarNavGroup } from "./SidebarNavGroup";
import { SidebarPanel } from "./SidebarPanel";

export function DesktopSidebar() {
  return (
    <SidebarPanel className="hidden md:block w-72 p-6" aria-label="Desktop Navigation">
      <div className="space-y-8">
        <SidebarNavGroup ariaLabel="Desktop Navigation" items={coreNav} />
        <ExternalLinksGroup ariaLabel="Desktop External Links" items={externalNav} />
      </div>
    </SidebarPanel>
  );
}
