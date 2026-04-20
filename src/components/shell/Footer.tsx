import { footerColumns } from "@/data/navigation";
import { FooterColumn } from "./FooterColumn";

export function Footer() {
  return (
    <footer className="mt-12 p-6 md:p-8" role="contentinfo">
      <div className="grid gap-6 md:grid-cols-3">
        {footerColumns.map((column) => (
          <FooterColumn key={column.title} title={column.title} links={column.links} />
        ))}
      </div>
    </footer>
  );
}
