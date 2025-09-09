"use server";

import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { components } from "@/lib/mdx";
import MdxLink from "@/lib/mdx-link";

export default async function MDXExperience({
  markdown,
}: {
  markdown: string;
}) {
  const mdxResult = await compileMDX({
    source: markdown,
    components: { ...components, a: MdxLink },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return <div className="mb-2 [&>*]:mb-2">{mdxResult.content}</div>;
}
