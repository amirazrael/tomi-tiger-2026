import Link from "next/link";
import { PawPrint } from "@/components/decor";

/** Minimal distraction-free layout for lead-magnet landing pages. */
export default function LeadLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="py-5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="grid place-items-center w-10 h-10 rounded-full bg-tiger text-cream shadow-storybook transition-transform group-hover:-rotate-12">
              <PawPrint className="w-6 h-6" />
            </span>
            <span className="font-display text-xl text-tiger-deep">
              Tomi the Tiger
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-8 text-center text-xs text-ink-soft">
        <p>
          © {new Date().getFullYear()} Tiny Paws Press ·{" "}
          <Link href="/privacy" className="underline">
            Privacy
          </Link>{" "}
          ·{" "}
          <Link href="/" className="underline">
            Back to the site
          </Link>
        </p>
      </footer>
    </>
  );
}
