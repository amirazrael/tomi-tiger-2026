"use client";

import { useEffect, useRef, useState } from "react";
import { PawPrint } from "./decor";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const NOTES = [
  { char: "♪", left: "8%", delay: "0s" },
  { char: "♫", left: "30%", delay: "0.9s" },
  { char: "♪", left: "58%", delay: "1.6s" },
  { char: "♬", left: "82%", delay: "0.4s" },
];

/**
 * Karaoke lyrics. `t` = the second each line starts being sung — extracted
 * from the actual recording via speech recognition. For manual fine-tuning,
 * open the page with #tune in the URL and tap along once.
 */
type LyricLine = { t: number; text: string; section?: string; chorus?: boolean };

const LINES: LyricLine[] = [
  { t: 1.5, text: "(Yeah yeah)", section: "Intro" },
  { t: 3.0, text: "Tomi" },
  { t: 4.5, text: "Tomi" },
  { t: 6.0, text: "Little tiger" },
  { t: 6.2, text: "Let’s go" },
  { t: 7.7, text: "Tomi the tiger", section: "Verse 1" },
  { t: 9.1, text: "Tiny paws on the floor" },
  { t: 10.5, text: "Tail starts to twitch" },
  { t: 12.6, text: "Heart knocking at the door (whoa!)" },
  { t: 14.4, text: "Just a little brave" },
  { t: 16.1, text: "Shaking but you try" },
  { t: 17.7, text: "One step forward" },
  { t: 19.9, text: "Big deep sigh" },
  { t: 22.2, text: "Left foot", section: "Pre-Chorus" },
  { t: 23.6, text: "Right foot" },
  { t: 24.4, text: "Listen to the rhyme" },
  { t: 26.0, text: "Heart going boom-boom" },
  { t: 27.8, text: "One splash at a time" },
  { t: 30.0, text: "Walk and walk", section: "Chorus — everybody sing!", chorus: true },
  { t: 31.7, text: "Tomi the tiger", chorus: true },
  { t: 33.4, text: "Walk and walk (hey!)", chorus: true },
  { t: 35.1, text: "Just a little brave", chorus: true },
  { t: 36.8, text: "But you never stop", chorus: true },
  { t: 38.8, text: "Little claws tapping", chorus: true },
  { t: 40.3, text: "Down the trail in a line", chorus: true },
  { t: 42.0, text: "It’s okay to be scared", chorus: true },
  { t: 44.1, text: "One splash at a time", chorus: true },
  { t: 47.6, text: "Walk and walk", chorus: true },
  { t: 49.8, text: "Tomi the tiger", chorus: true },
  { t: 51.3, text: "Walk and walk (oh yeah!)", chorus: true },
  { t: 53.5, text: "You can close your eyes", chorus: true },
  { t: 54.8, text: "You can hold on tight", chorus: true },
  { t: 56.8, text: "Every small try", chorus: true },
  { t: 58.2, text: "Makes your stripes shine bright", chorus: true },
  { t: 60.0, text: "That’s okay", chorus: true },
  { t: 60.6, text: "I’ll keep looking", chorus: true },
  { t: 61.8, text: "One splash at a time", chorus: true },
  { t: 64.4, text: "Puddle in the pathway", section: "Verse 2" },
  { t: 66.4, text: "Looks like the sea" },
  { t: 68.0, text: "All your friends jumping" },
  { t: 70.1, text: "You stand by a tree" },
  { t: 71.6, text: "You touch it with a toe" },
  { t: 73.5, text: "Then a paw goes in too" },
  { t: 74.8, text: "Cold water" },
  { t: 76.1, text: "Warm smile" },
  { t: 77.2, text: "Everyone cheers for you" },
  { t: 79.6, text: "Left foot", section: "Pre-Chorus" },
  { t: 80.9, text: "Right foot" },
  { t: 81.7, text: "You’re doing just fine" },
  { t: 83.3, text: "Hear your friends calling" },
  { t: 85.2, text: "One splash at a time" },
  { t: 87.4, text: "Walk and walk", section: "Chorus — sing it again!", chorus: true },
  { t: 88.9, text: "Tomi the tiger", chorus: true },
  { t: 90.6, text: "Walk and walk (let’s go!)", chorus: true },
  { t: 92.4, text: "Just a little brave", chorus: true },
  { t: 94.1, text: "But you never stop", chorus: true },
  { t: 96.2, text: "Little claws tapping", chorus: true },
  { t: 97.6, text: "Down the trail in a line", chorus: true },
  { t: 99.2, text: "It’s okay to be scared", chorus: true },
  { t: 101.2, text: "One splash at a time", chorus: true },
  { t: 104.5, text: "🎶 (wiggle break — everybody dance!) 🎶" },
  { t: 121.7, text: "It’s okay to fall", section: "Bridge" },
  { t: 123.8, text: "It’s okay to cry" },
  { t: 125.4, text: "Tomi wipes his tears" },
  { t: 127.2, text: "Gives it one more try" },
  { t: 128.8, text: "Tiny roar" },
  { t: 129.9, text: "Tiny roar" },
  { t: 130.6, text: "Echo in your mind" },
  { t: 132.4, text: "Tiny steps" },
  { t: 133.5, text: "Tiny splashes" },
  { t: 135.3, text: "Leave big paw prints behind" },
  { t: 140.6, text: "Walk and walk", section: "Last chorus — as loud as you like!", chorus: true },
  { t: 142.5, text: "Tomi the tiger", chorus: true },
  { t: 144.3, text: "Walk and walk (yeah!)", chorus: true },
  { t: 146.0, text: "Just a little brave", chorus: true },
  { t: 147.6, text: "But you never stop", chorus: true },
  { t: 149.3, text: "Little claws tapping", chorus: true },
  { t: 151.1, text: "Down the trail in a line", chorus: true },
  { t: 152.8, text: "It’s okay to be scared", chorus: true },
  { t: 154.8, text: "One splash at a time", chorus: true },
  { t: 158.3, text: "Walk and walk", chorus: true },
  { t: 160.3, text: "Tomi the tiger", chorus: true },
  { t: 162.0, text: "Walk and walk (whoa!)", chorus: true },
  { t: 164.0, text: "You can close your eyes", chorus: true },
  { t: 165.5, text: "You can hold on tight", chorus: true },
  { t: 167.5, text: "Every small try", chorus: true },
  { t: 168.8, text: "Makes your stripes shine bright", chorus: true },
  { t: 170.6, text: "That’s okay", chorus: true },
  { t: 171.2, text: "I’ll keep looking", chorus: true },
  { t: 172.4, text: "One splash at a time", chorus: true },
];

function KaraokeLine({
  line,
  state,
  duration,
}: {
  line: LyricLine;
  state: "past" | "active" | "upcoming";
  duration: number;
}) {
  if (state !== "active") {
    return (
      <p
        className={`py-0.5 text-lg leading-snug transition-colors duration-300 ${
          state === "past" ? "text-ink-soft/45" : "text-ink-soft/70"
        }`}
      >
        {line.text}
      </p>
    );
  }
  // Active line: words pop up one by one across the line's duration
  const words = line.text.split(" ");
  const step = Math.min(0.5, (duration * 0.75) / words.length);
  return (
    <p className="py-0.5 font-display text-xl sm:text-2xl leading-snug text-tiger-deep">
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="word-in mr-[0.3em]"
          style={{ animationDelay: `${i * step}s`, animationDuration: "0.35s" }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}

export default function ThemeSongPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const trackedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);
  const [tuneMode, setTuneMode] = useState(false);
  const [taps, setTaps] = useState<number[]>([]);

  useEffect(() => {
    setTuneMode(window.location.hash === "#tune");
  }, []);

  // Which line is being sung right now?
  let activeIndex = -1;
  for (let i = 0; i < LINES.length; i++) {
    if (LINES[i].t <= time) activeIndex = i;
    else break;
  }

  // Keep the active line centred in the karaoke window
  useEffect(() => {
    const list = listRef.current;
    if (!list || activeIndex < 0) return;
    const el = list.querySelector<HTMLElement>(`[data-line="${activeIndex}"]`);
    if (el) {
      list.scrollTo({
        top: el.offsetTop - list.clientHeight / 2 + el.clientHeight / 2,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setShowLyrics(true);
      if (!trackedRef.current) {
        trackedRef.current = true;
        window.plausible?.("Theme Song Played");
      }
    } else {
      audio.pause();
    }
  }

  function restart() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setTime(0);
    audio.play();
    setShowLyrics(true);
  }

  const progress = duration > 0 ? (time / duration) * 100 : 0;

  return (
    <div className="relative overflow-visible rounded-3xl bg-gradient-to-br from-paper via-cream to-jungle-mist/60 p-6 sm:p-8 shadow-lifted">
      {playing && (
        <div aria-hidden className="pointer-events-none absolute -top-2 inset-x-8 z-10">
          {NOTES.map((note) => (
            <span
              key={`${note.char}-${note.left}`}
              className="note-float absolute font-display text-2xl text-tiger"
              style={{ left: note.left, animationDelay: note.delay }}
            >
              {note.char}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause Tomi's theme song" : "Play Tomi's theme song"}
          className={`grid h-16 w-16 shrink-0 place-items-center rounded-full bg-tiger text-cream shadow-lifted transition hover:bg-tiger-deep hover:scale-105 active:scale-95 ${
            playing ? "" : "animate-float"
          }`}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
              <rect x="5" y="4" width="5" height="16" rx="2" />
              <rect x="14" y="4" width="5" height="16" rx="2" />
            </svg>
          ) : (
            <PawPrint className="h-9 w-9 translate-y-0.5" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="font-display text-xl text-tiger-deep leading-tight">
            Tomi&apos;s Theme Song 🎤
          </p>
          <p className="text-sm text-ink-soft">
            {playing
              ? "Sing along — the words light up as Tomi sings!"
              : "Press the paw — the words follow the song"}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-cream-deep">
              <div
                className="h-full rounded-full bg-sunshine transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="shrink-0 text-xs font-bold text-ink-soft tabular-nums">
              {formatTime(time)} / {formatTime(duration)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={restart}
          aria-label="Play again from the start"
          title="Play again from the start"
          className="grid h-11 w-11 shrink-0 place-items-center self-center rounded-full border-2 border-tiger/30 bg-paper text-tiger-deep transition hover:border-tiger hover:-rotate-90"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M3 12a9 9 0 1 0 2.6-6.4" />
            <path d="M3 4v5h5" />
          </svg>
        </button>
      </div>

      <button
        type="button"
        onClick={() => setShowLyrics(!showLyrics)}
        aria-expanded={showLyrics}
        className="mt-5 font-display text-jungle-deep underline decoration-sunshine decoration-4 underline-offset-4 transition hover:text-tiger-deep"
      >
        {showLyrics ? "Hide the words" : "Show the words"}
      </button>

      {showLyrics && (
        <div className="relative mt-4">
          <div
            ref={listRef}
            className="max-h-72 overflow-y-auto rounded-2xl bg-paper/80 px-6 py-5 sm:max-h-80"
          >
            {LINES.map((line, i) => (
              <div key={i} data-line={i}>
                {line.section && (
                  <p
                    className={`mt-4 mb-1 font-display text-xs uppercase tracking-widest first:mt-0 ${
                      line.chorus ? "text-berry" : "text-tiger"
                    }`}
                  >
                    {line.section}
                  </p>
                )}
                <KaraokeLine
                  line={line}
                  state={
                    i === activeIndex ? "active" : i < activeIndex ? "past" : "upcoming"
                  }
                  duration={(LINES[i + 1]?.t ?? (duration || 178)) - line.t}
                />
              </div>
            ))}
            <p className="mt-6 text-xs italic text-ink-soft/70">
              Words © Tiny Paws Press — for singing out loud, everywhere.
            </p>
          </div>
          {/* soft fade at the top and bottom of the karaoke window */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-8 rounded-t-2xl bg-gradient-to-b from-cream to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 rounded-b-2xl bg-gradient-to-t from-cream to-transparent" />
        </div>
      )}

      {/* One-time timing tuner: open the page with #tune, play from the start,
          and tap once at the moment each line begins. Copy the result. */}
      {tuneMode && (
        <div className="mt-4 rounded-2xl border-2 border-dashed border-berry/40 bg-paper p-4">
          <p className="mb-2 text-sm font-bold text-berry">
            Timing tuner — tap when each line starts ({taps.length}/{LINES.length})
          </p>
          <p className="mb-3 text-xs text-ink-soft">
            Next line: “{LINES[taps.length]?.text ?? "— done!"}”
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                const audio = audioRef.current;
                if (audio && taps.length < LINES.length)
                  setTaps([...taps, Math.round(audio.currentTime * 10) / 10]);
              }}
              className="rounded-full bg-berry px-5 py-2.5 font-display text-cream"
            >
              TAP — line starts now
            </button>
            <button
              type="button"
              onClick={() => setTaps(taps.slice(0, -1))}
              className="rounded-full border-2 border-berry/40 px-4 py-2 text-sm font-bold text-berry"
            >
              Undo
            </button>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(JSON.stringify(taps))}
              className="rounded-full border-2 border-berry/40 px-4 py-2 text-sm font-bold text-berry"
            >
              Copy timings
            </button>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        src="/audio/tomi-theme.mp3"
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
    </div>
  );
}
