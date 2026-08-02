import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/types";
import { PawPrint } from "./decor";
import TiltCard from "./TiltCard";

// Watercolour gradient pairs used for placeholder covers until real art arrives.
const COVER_TINTS = [
  ["#f3b94d", "#e68a3c"],
  ["#8fb977", "#4d8157"],
  ["#a5cfd9", "#5f93a3"],
  ["#e79fb4", "#c95e7e"],
  ["#e6a06c", "#c1601a"],
  ["#b8c98a", "#7d9451"],
  ["#d9b8e0", "#9a6daa"],
];

export function Cover({ book, priority = false }: { book: Book; priority?: boolean }) {
  if (book.coverImage) {
    return (
      <Image
        src={book.coverImage}
        alt={`${book.title} — book cover`}
        fill
        priority={priority}
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 260px"
        className="object-cover"
      />
    );
  }
  const [from, to] = COVER_TINTS[(book.bookNumber - 1) % COVER_TINTS.length];
  return (
    <div
      className="absolute inset-0"
      style={{ background: `radial-gradient(circle at 30% 20%, ${from}, ${to})` }}
    >
      {/* watercolour blotches + jungle silhouettes */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 300 400"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <filter id={`wc-${book.slug}`}>
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>
        <g filter={`url(#wc-${book.slug})`} fill="#fffdf8">
          <ellipse cx="70" cy="80" rx="95" ry="65" opacity="0.18" />
          <ellipse cx="235" cy="290" rx="105" ry="85" opacity="0.14" />
          <ellipse cx="245" cy="60" rx="60" ry="48" opacity="0.1" />
        </g>
        <g fill="#2f5c3b" opacity="0.16">
          <path d="M-10,400 C30,320 95,310 140,345 C95,368 55,388 30,400 Z" />
          <path d="M310,400 C270,325 205,315 160,348 C210,370 255,388 275,400 Z" />
          <path d="M300,-10 C240,15 225,60 250,100 C272,62 290,30 305,10 Z" />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-between p-5 text-center">
        <span className="font-display text-cream/90 text-[0.65rem] tracking-[0.3em] uppercase">
          Tomi the Tiger
        </span>
        <div>
          <span
            className="mx-auto grid h-14 w-14 place-items-center rounded-[46%_54%_52%_48%/52%_46%_54%_48%] bg-cream/95 font-display text-2xl shadow-storybook"
            style={{ color: to }}
          >
            {book.bookNumber}
          </span>
          <span className="mt-4 block font-display text-2xl leading-tight text-cream drop-shadow-md">
            {book.title}
          </span>
        </div>
        <span className="flex gap-2 text-cream/60">
          <PawPrint className="w-4 h-4 -rotate-12" />
          <PawPrint className="w-4 h-4 translate-y-0.5 rotate-6" />
          <PawPrint className="w-4 h-4 -rotate-3" />
        </span>
      </div>
    </div>
  );
}

export default function BookCard({
  book,
  index = 0,
}: {
  book: Book;
  index?: number;
}) {
  const tilt = index % 2 === 0 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]";
  return (
    <Link
      href={`/books/${book.slug}`}
      className={`group block ${tilt} transition-transform duration-300 hover:rotate-0 hover:-translate-y-2`}
    >
      <TiltCard>
        <div className="relative aspect-3/4 overflow-hidden rounded-2xl shadow-storybook transition-shadow duration-300 group-hover:shadow-lifted">
          <Cover book={book} />
          <span className="shine-sweep" />
          {book.comingSoon && (
            <span className="absolute top-3 -right-9 rotate-45 bg-berry px-10 py-1 font-display text-xs text-cream shadow-storybook">
              Coming soon
            </span>
          )}
        </div>
      </TiltCard>
      <div className="mt-4 text-center">
        <p className="font-display text-tiger text-sm">Book {book.bookNumber}</p>
        <p className="font-display text-lg leading-snug text-ink group-hover:text-tiger-deep transition-colors">
          {book.title}
        </p>
      </div>
    </Link>
  );
}
