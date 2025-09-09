"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useRef } from "react";
import clsx from "clsx";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { motion } from "motion/react";

const EditorComp = dynamic(() => import("../ui/editor"), {
  ssr: false,
});

export default function ContactPage() {
  const editorRef = useRef<MDXEditorMethods | null>(null);

  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append("message", markdown);
    const res = await fetch("/api/send-message", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setSuccess(true);
      setError("");

      form.reset();
      setMarkdown("");
      editorRef.current?.setMarkdown("");
    } else {
      const json = await res.json();
      setError(json.error);
      setSuccess(false);
    }
  };

  return (
    <div
      className={clsx("mt-4 rounded-2xl p-6 mx-auto", {
        "md:min-h-[calc(100vh-6rem)]": success || (error && !success),
        "md:min-h-[calc(100vh-2rem)]": !success && !error,
      })}
    >
      <h1>Contact Me</h1>
      <form className="mb-4 text-[var(--foreground)]" onSubmit={submitForm}>
        <div className="mb-4 [&>input]:mr-4 [&>input]:mb-4 [&>input]:text-gray-600 [&>input]:dark:text-gray-300">
          <input
            className="p-2 border border-[var(--border)] rounded-xl"
            type="text"
            placeholder="First Name (Required)"
            name="first_name"
            required
          />
          <input
            className="p-2 border border-[var(--border)] rounded-xl"
            type="text"
            placeholder="Last Name (Required)"
            name="last_name"
            required
          />
          <input
            className="p-2 border border-[var(--border)] rounded-xl"
            type="email"
            placeholder="Email (Required)"
            name="email"
            required
          />
        </div>
        <div className="mb-4 border-[var(--border)] border rounded">
          <Suspense fallback={null}>
            <EditorComp
              key={success ? "reset" : "editor"} // or use markdown.length as a key
              editorRef={editorRef}
              markdown={markdown}
              onChange={setMarkdown}
            />
          </Suspense>
        </div>
        <motion.button
          className="px-4 py-2 bg-[var(--background-secondary)] rounded border border-[var(--border)] hover:bg-[var(--background-tertiary)] hover:cursor-pointer"
          type="submit"
          initial={{ scale: 1 }} // Initial state
          whileHover={{ scale: 1.05 }} // Scale up on hover
          whileTap={{ scale: 0.95 }} // Scale down on tap/click
          transition={{ type: "spring", stiffness: 300, damping: 20 }} // Spring animation settings
        >
          Send
        </motion.button>
        {!success && error && (
          <div className="p-1 rounded-lg bg-amber-100 mt-4 border-2 border-black">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        {success && (
          <div className="p-1 rounded-lg bg-green-200 mt-4 border-2 border-black">
            <p className="text-green-900">
              Message sent! Please be checking your email - I will get back to
              you as soon as I can.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
