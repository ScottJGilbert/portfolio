"use server";

import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { components } from "@/lib/mdx";

export default async function MDXExperience({
  markdown,
}: {
  markdown: string;
}) {
  const mdxResult = await compileMDX({
    source: markdown,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return <div className="mb-2 [&>*]:mb-2">{mdxResult.content}</div>;
}
