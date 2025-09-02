"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";

const EditorComp = dynamic(() => import("../components/mdx/editor"), {
  ssr: false,
});

export default function ContactPage() {
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
    } else {
      const json = await res.json();
      setError(
        "Failed to send message due to the following error: " + json.error
      );
      setSuccess(false);
    }
  };

  return (
    <div className="mt-4 rounded-2xl p-6 bg-gradient-to-b from-green-950 to-green-900 text-white mx-auto min-h-full border-gray-50 border">
      <h1>Contact Me</h1>
      <form className="mb-4" data-color-mode="light" onSubmit={submitForm}>
        <div className="mb-4 [&>input]:mr-4 [&>input]:mb-4">
          <input
            className="p-2 border border-gray-300 rounded-xl"
            type="text"
            placeholder="First Name (Required)"
            name="first_name"
            required
          />
          <input
            className="p-2 border border-gray-300 rounded-xl"
            type="text"
            placeholder="Last Name (Required)"
            name="last_name"
            required
          />
          <input
            className="p-2 border border-gray-300 rounded-xl"
            type="email"
            placeholder="Email (Required)"
            name="email"
            required
          />
        </div>
        <div className="mb-4 border-white border rounded">
          <Suspense fallback={null}>
            <EditorComp markdown={""} onChange={setMarkdown} />
          </Suspense>
        </div>
        <button
          className="px-4 py-2 bg-green-950 text-white rounded border border-gray-50 hover:bg-green-900 hover:cursor-pointer"
          type="submit"
        >
          Send
        </button>
        {!success && error && <p className="text-red-800 mt-2">{error}</p>}
        {success && (
          <p className="text-green-200 mt-4">
            Message sent! I will get back to you as soon as I can.
          </p>
        )}
      </form>
    </div>
  );
}
