"use client";

import { useState, type FormEvent } from "react";

const SUBJECTS = [
  "General Inquiry",
  "Report a cybercrime tip",
  "Press / Media",
  "Partnership",
  "Correction Request",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "A valid email is required.";
    if (message.length < 10) nextErrors.message = "Message must be at least 10 characters.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
      const res = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="panel p-8 text-center">
        <p className="label-eyebrow text-xs text-accent">Message Received</p>
        <p className="mt-3 text-sm text-text-dim">
          Thanks for reaching out. We&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-text-dim">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="min-h-11 w-full rounded-lg border border-line bg-surface px-4 text-sm text-text placeholder:text-text-dim focus:border-brand"
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-danger">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-text-dim">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="min-h-11 w-full rounded-lg border border-line bg-surface px-4 text-sm text-text placeholder:text-text-dim focus:border-brand"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-danger">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-text-dim">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          defaultValue={SUBJECTS[0]}
          className="min-h-11 w-full rounded-lg border border-line bg-surface px-4 text-sm text-text focus:border-brand"
        >
          {SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-text-dim">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-text placeholder:text-text-dim focus:border-brand"
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-danger">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-danger">Could not send — please try again later.</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
