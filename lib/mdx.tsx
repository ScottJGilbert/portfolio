import Image, { ImageProps } from "next/image";

export const components = {
  img: (props: ImageProps) => (
    <Image
      {...props}
      className="w-auto h-auto rounded-2xl max-w-full md:max-w-4xl max-h-3xl mx-auto layout-responsive"
      width={props.width || 800}
      height={props.height || 600}
      alt={props.alt || ""}
      loading="lazy"
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="list-disc list-inside mb-4" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="list-decimal list-inside mb-4" />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="max-w-full border border-[var(--border)] rounded-md overflow-x-hidden mb-4">
      <div className="w-full overflow-x-auto">
        <table
          {...props}
          className="text-sm max-w-full table-auto border border-[var(--border)] rounded-md overflow-hidden"
        />
      </div>
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="border border-[var(--border)] bg-gray-400 dark:bg-gray-800 px-4 py-2 text-left"
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      {...props}
      className="border border-[var(--border)]0 px-4 py-2 align-top"
    />
  ),
};
