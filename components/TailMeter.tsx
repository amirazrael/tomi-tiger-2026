"use client";

import { useState } from "react";

/**
 * Tomi's tail-o-meter — from the character bible: Tomi's tail is his
 * truth-teller. Tap a feeling, watch the tail respond.
 */
const FEELINGS = [
  {
    key: "happy",
    emoji: "😊",
    label: "Happy",
    tailClass: "tail-happy",
    caption: "Bouncing high! The higher the bounce, the happier Tomi is.",
  },
  {
    key: "sad",
    emoji: "😢",
    label: "Sad",
    tailClass: "tail-sad",
    caption: "Completely still… when Tomi is sad, his tail drops and he looks down at his paws.",
  },
  {
    key: "nervous",
    emoji: "😟",
    label: "Nervous",
    tailClass: "tail-nervous",
    caption: "Twitching and curling — “just a little brave,” Tomi whispers.",
  },
  {
    key: "uncertain",
    emoji: "🤔",
    label: "Not sure",
    tailClass: "tail-uncertain",
    caption: "One slow swish, side to side, while Tomi thinks it over.",
  },
] as const;

export default function TailMeter() {
  const [active, setActive] = useState<(typeof FEELINGS)[number]>(FEELINGS[0]);

  return (
    <div className="rounded-3xl bg-paper p-6 shadow-storybook">
      <p className="font-display text-xl text-tiger-deep">
        Try Tomi&apos;s tail-o-meter
      </p>
      <p className="mt-1 text-sm text-ink-soft">
        Tomi can&apos;t hide how he feels — his tail always tells the truth.
        Pick a feeling:
      </p>

      <div className="mt-4 flex items-end gap-5">
        <div className="shrink-0">
          <svg viewBox="0 0 120 140" className="w-24 h-28" aria-hidden>
            {/* haunch */}
            <ellipse cx="30" cy="126" rx="26" ry="12" fill="#e68a3c" />
            <g className={`tail-svg ${active.tailClass}`}>
              <path
                d="M24 124 C58 116 84 84 74 44 C70 28 60 18 48 16"
                fill="none"
                stroke="#e68a3c"
                strokeWidth="17"
                strokeLinecap="round"
              />
              {/* stripes */}
              <path d="M60 103 l16 9" stroke="#45311f" strokeWidth="6" strokeLinecap="round" />
              <path d="M72 82 l17 4" stroke="#45311f" strokeWidth="6" strokeLinecap="round" />
              <path d="M74 60 l17 -1" stroke="#45311f" strokeWidth="6" strokeLinecap="round" />
              {/* tail tip */}
              <circle cx="47" cy="17" r="9" fill="#45311f" />
            </g>
          </svg>
        </div>
        <p
          key={active.key}
          className="word-in flex-1 text-sm text-ink-soft leading-relaxed"
        >
          {active.caption}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {FEELINGS.map((feeling) => (
          <button
            key={feeling.key}
            type="button"
            onClick={() => setActive(feeling)}
            aria-pressed={active.key === feeling.key}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              active.key === feeling.key
                ? "bg-tiger text-cream shadow-storybook"
                : "bg-cream-deep text-ink-soft hover:bg-sunshine/40"
            }`}
          >
            <span className="mr-1.5">{feeling.emoji}</span>
            {feeling.label}
          </button>
        ))}
      </div>
    </div>
  );
}
