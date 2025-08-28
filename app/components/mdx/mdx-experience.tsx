"use server";

import { MDXRemote } from "next-mdx-remote-client/rsc";
import Image, { ImageProps } from "next/image";

const components = {
  img: (props: ImageProps) => (
    <Image
      {...props}
      className="rounded-2xl"
      layout="responsive"
      width={props.width || 800}
      height={props.height || 600}
      alt={props.alt || ""}
    />
  ),
};

export default async function MDXExperience({
  markdown,
}: {
  markdown: string;
}) {
  return (
    <div className="mb-2">
      <MDXRemote components={components} source={markdown} />
    </div>
  );
}
