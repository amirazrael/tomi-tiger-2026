import Link from "next/link";
import { PawTrail } from "@/components/decor";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl">🐯</p>
      <h1 className="mt-4 font-display text-3xl sm:text-4xl text-ink">
        Tomi looked and looked… but this page isn&apos;t here.
      </h1>
      <p className="mt-3 text-lg text-ink-soft">
        “That&apos;s okay,” said Tomi. “I&apos;ll keep looking.”
      </p>
      <PawTrail className="mt-6 text-tiger/30" />
      <Link
        href="/"
        className="mt-8 rounded-full bg-tiger px-8 py-4 font-display text-xl text-cream shadow-lifted transition hover:bg-tiger-deep hover:-translate-y-1"
      >
        Back to the jungle
      </Link>
    </main>
  );
}
