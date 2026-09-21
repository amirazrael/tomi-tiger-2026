import Link from "next/link";
import type { Book } from "@/lib/types";

const RETAILERS: {
  key: keyof Pick<Book, "amazonUSLink" | "amazonSGLink" | "kinokuniyaLink">;
  label: string;
  primaryLabel?: string;
}[] = [
  { key: "amazonUSLink", label: "Amazon US", primaryLabel: "Buy Now on Amazon" },
  { key: "amazonSGLink", label: "Amazon Singapore" },
  { key: "kinokuniyaLink", label: "Kinokuniya" },
];

export default function BuyButtons({ book }: { book: Book }) {
  const available = RETAILERS.filter((r) => book[r.key]);

  if (book.comingSoon || available.length === 0) {
    return (
      <div className="rounded-2xl bg-sky/60 p-5">
        <p className="font-display text-lg text-ink mb-1">
          {book.comingSoon ? "This adventure is coming soon!" : "Buy links arriving shortly"}
        </p>
        <p className="text-sm text-ink-soft mb-3">
          Join the jungle post and be the first to know the moment it&apos;s ready.
        </p>
        <Link
          href="/free-colouring-page"
          className="inline-block rounded-full bg-tiger px-6 py-3 font-display text-cream shadow-storybook transition hover:bg-tiger-deep hover:-translate-y-0.5"
        >
          Keep me posted
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-sky/60 p-5">
      <p className="font-display text-lg text-ink mb-3">
        Experience this adventure now!
      </p>
      <div className="flex flex-wrap gap-3">
        {available.map((r, i) => (
          <a
            key={r.key}
            href={book[r.key] as string}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full px-6 py-3.5 font-display text-lg shadow-storybook transition hover:-translate-y-0.5 ${
              i === 0
                ? "bg-tiger text-cream hover:bg-tiger-deep"
                : "bg-paper text-tiger-deep border-2 border-tiger/30 hover:border-tiger"
            }`}
          >
            {i === 0 && r.primaryLabel ? r.primaryLabel : `${r.label} →`}
          </a>
        ))}
      </div>
    </div>
  );
}
