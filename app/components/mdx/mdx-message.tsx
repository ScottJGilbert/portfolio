import { compileMDX } from "next-mdx-remote/rsc";
import { Message } from "@/lib/definitions";
import { components } from "@/lib/mdx";
import remarkGfm from "remark-gfm";

export default async function MDXMessage({ msg }: { msg: Message }) {
  const mdxResult = await compileMDX({
    source: msg.message,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <div key={msg.id} className="border p-4 my-2 rounded-lg">
      <p>
        <strong>From:</strong> {msg.first_name + " " + msg.last_name} (
        {msg.email})
      </p>
      <p>
        <strong>Message:</strong> {msg.message}
      </p>
      <p className="text-sm text-gray-500">
        <em>Received on: {new Date(msg.time_sent).toLocaleString()}</em>
      </p>
      {mdxResult.content}
    </div>
  );
}
