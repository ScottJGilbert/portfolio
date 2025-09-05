"use client";

import { compileMDX } from "next-mdx-remote/rsc";
import { Message } from "@/lib/definitions";
import { components } from "@/lib/mdx";
import remarkGfm from "remark-gfm";
import Button from "@/app/ui/button";
import { useEffect, useState } from "react";

export default function MDXMessages({
  originalMessages,
}: {
  originalMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(originalMessages);

  const deleteMessage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) {
      return;
    }
    // Implement the logic to delete the message with the given id
    const res = await fetch("/api/delete-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      alert("Failed to delete message");
    } else {
      alert("Message deleted successfully");
      setMessages(messages.filter((msg) => msg.id !== id));
    }
  };

  return (
    <div className="mt-4 rounded-2xl p-6 bg-gradient-to-b from-green-950 to-green-900 text-white mx-auto md:min-h-[calc(100vh-7rem)] border-gray-50 border">
      {messages.map((msg) => (
        <div key={msg.id + "message"} className="border p-4 my-2 rounded-lg">
          <MDXMessage key={msg.id} msg={msg} />
          <Button
            className="bg-red-700 !m-0 !mt-2"
            onClick={() => {
              deleteMessage(msg.id);
            }}
          >
            Delete Message
          </Button>
        </div>
      ))}
    </div>
  );
}

function MDXMessage({ msg }: { msg: Message }) {
  const [mdxResult, setMdxResult] = useState<React.ReactNode>(null);

  useEffect(() => {
    async function compileMessage() {
      const mdxResult = await compileMDX({
        source: msg.message,
        components,
        options: {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      });
      setMdxResult(mdxResult.content);
    }
    compileMessage();
  }, [msg.message]);

  if (!mdxResult) {
    return <p>Loading message...</p>;
  }

  return (
    <div>
      <p className="mb-1">
        <strong>From:</strong> {msg.first_name + " " + msg.last_name} (
        {msg.email})
      </p>
      <p className="text-gray-500 mb-2">
        <em>Received on: {new Date(msg.time_sent).toLocaleString()}</em>
      </p>
      {mdxResult}
    </div>
  );
}
