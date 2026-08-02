"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const SUBJECTS = [
  "General hello",
  "School or library visit",
  "Bookstore / stockist enquiry",
  "Press & media",
];

export default function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          subject: form.get("subject"),
          message: form.get("message"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "Something went wrong — please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-jungle-mist p-8 text-center">
        <p className="font-display text-2xl text-jungle-deep mb-2">
          Message received! 🐾
        </p>
        <p className="text-ink-soft">
          Thank you — April reads every message and will get back to you soon.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-2xl border-2 border-tiger/20 bg-paper px-5 py-3.5 font-semibold text-ink outline-none transition focus:border-tiger";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-display text-ink">
            Your name
          </label>
          <input id="name" name="name" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block font-display text-ink">
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-1.5 block font-display text-ink">
          What&apos;s it about?
        </label>
        <select
          id="subject"
          name="subject"
          defaultValue={defaultSubject ?? SUBJECTS[0]}
          className={inputClasses}
        >
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block font-display text-ink">
          Your message
        </label>
        <textarea id="message" name="message" required rows={5} className={inputClasses} />
      </div>
      {status === "error" && (
        <p className="text-sm font-semibold text-berry">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-tiger px-8 py-3.5 font-display text-lg text-cream shadow-storybook transition hover:bg-tiger-deep hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
