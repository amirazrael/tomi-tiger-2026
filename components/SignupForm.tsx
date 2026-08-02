"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function SignupForm({
  source,
  buttonText = "Send me the colouring page",
  light = false,
}: {
  source: string;
  buttonText?: string;
  light?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setMessage("Hooray! Check your inbox — Tomi is on his way. 🐯");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "Something went wrong — please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <p
        className={`rounded-2xl px-5 py-4 font-semibold ${
          light ? "bg-cream/20 text-cream" : "bg-jungle-mist text-jungle-deep"
        }`}
      >
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <label className="sr-only" htmlFor={`email-${source}`}>
          Email address
        </label>
        <input
          id={`email-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={`flex-1 rounded-full px-5 py-3.5 font-semibold outline-none border-2 transition ${
            light
              ? "bg-cream text-ink border-transparent focus:border-sunshine"
              : "bg-paper text-ink border-tiger/20 focus:border-tiger"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-tiger px-6 py-3.5 font-display text-lg text-cream shadow-storybook transition hover:bg-tiger-deep hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "loading" ? "Sending…" : buttonText}
        </button>
      </div>
      {status === "error" && (
        <p className={`mt-2 text-sm font-semibold ${light ? "text-sunshine" : "text-berry"}`}>
          {message}
        </p>
      )}
      <p className={`mt-2 text-xs ${light ? "text-cream/70" : "text-ink-soft"}`}>
        No spam, ever. Just Tomi news and free goodies. Unsubscribe anytime.
      </p>
    </form>
  );
}
