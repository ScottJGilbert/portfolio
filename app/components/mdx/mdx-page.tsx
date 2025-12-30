import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { components } from "@/lib/mdx";
import MdxLink from "@/lib/mdx-link";

export const revalidate = 600;

export default async function MDXPage({ markdown }: { markdown: string }) {
  const mdxResult = await compileMDX({
    source: markdown,
    components: { ...components, a: MdxLink },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <div>
      <hr className="my-2"></hr>
      <div className="max-w-full space-y-4 [&>*]:text-wrap">
        {mdxResult.content}
      </div>
    </div>
  );
}
