"use client";

import { useState, type ChangeEvent, type SubmitEvent } from "react";

import { showToastError, showToastSuccess } from "@/components/ui/toast";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (process.env.NEXT_PUBLIC_CONTACT_URL) {
      fetch(`${process.env.NEXT_PUBLIC_CONTACT_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          showToastSuccess("Message sent!", "Your message has been sent.");
          return data;
        })
        .catch(() => {
          showToastError("Failed to send.", "Please try again later.");
        });
    } else {
      showToastError(
        "Failed to send.",
        "This form is not currently accepting responses.",
      );
    }
  };

  return (
    <form
      className="space-y-5"
      aria-describedby="contact-form-note"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm text-foreground">
          <span className="text-xs uppercase tracking-[0.14em] text-muted">
            Name<span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label className="space-y-2 text-sm text-foreground">
          <span className="text-xs uppercase tracking-[0.14em] text-muted">
            Email<span className="text-red-500">*</span>
          </span>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-foreground">
        <span className="text-xs uppercase tracking-[0.14em] text-muted">
          Message<span className="text-red-500">*</span>
        </span>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm"
          placeholder="Tell me a bit about what you’d like to discuss."
          value={formData.message}
          onChange={handleChange}
        />
      </label>

      <button
        type="submit"
        className="inline-flex items-center rounded-md border border-outline-ghost bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 hover:cursor-pointer"
      >
        Send Message
      </button>
    </form>
  );
}
