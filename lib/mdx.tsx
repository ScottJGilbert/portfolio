import Image, { ImageProps } from "next/image";
import Link from "next/link";

export const components = {
  img: (props: ImageProps) => (
    <Image
      {...props}
      className="rounded-2xl max-w-4xl mx-auto"
      layout="responsive"
      width={props.width || 800}
      height={props.height || 600}
      alt={props.alt || ""}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link
      {...props}
      href={props.href || ""}
      className="text-blue-300 hover:text-blue-400"
      target={props.target || "_self"}
      rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="list-disc list-inside mb-4" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="list-decimal list-inside mb-4" />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="max-w-full border border-gray-500 rounded-md overflow-x-hidden mb-4">
      <div className="w-full overflow-x-auto">
        <table
          {...props}
          className="text-sm max-w-full table-auto border border-gray-500 rounded-md overflow-hidden"
        />
      </div>
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="border border-gray-500 bg-gray-800 px-4 py-2 text-left"
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td {...props} className="border border-gray-500 px-4 py-2 align-top" />
  ),
};
