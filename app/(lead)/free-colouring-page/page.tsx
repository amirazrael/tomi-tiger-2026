import type { Metadata } from "next";
import Image from "next/image";
import { Blob, Butterfly, FlightButterfly, PawTrail, Sparkle } from "@/components/decor";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Free Tomi Colouring Page",
  description:
    "Download a free printable Tomi the Tiger colouring page for ages 3–6 — plus first news on new books and free activities.",
};

const PERKS = [
  "A printable Tomi colouring page, straight to your inbox",
  "New free activities and discussion guides as they're released",
  "First news when a new Tomi adventure arrives",
];

export default function ColouringPage() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16">
      <Blob className="absolute -top-24 -right-24 w-96 h-96 text-sunshine/25 animate-float-slow" />
      <Blob className="absolute -bottom-32 -left-24 w-96 h-96 text-jungle/10 animate-float" />
      <Butterfly className="absolute top-10 left-[10%] w-10 h-10 text-berry animate-flutter hidden sm:block" />
      <FlightButterfly className="text-tiger hidden sm:block" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-display text-tiger text-lg">Free for little readers</p>
            <h1 className="relative mt-1 font-display text-4xl sm:text-5xl leading-[1.1] text-ink">
              <Sparkle className="absolute -top-5 -left-4 w-5 h-5 text-sunshine" />
              Colour Tomi&apos;s bounciest adventure
              <Sparkle className="ml-2 inline-block w-5 h-5 text-tiger" delay={1400} />
            </h1>
            <p className="mt-5 text-lg text-ink-soft leading-relaxed">
              Pop your email below and we&apos;ll send a printable Tomi the
              Tiger colouring page for ages 3–6 — hand-drawn in the same warm
              style as the books.
            </p>
            <ul className="mt-6 space-y-3">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-jungle-mist font-display text-jungle-deep">
                    ✓
                  </span>
                  <span className="text-ink-soft">{perk}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <SignupForm source="colouring-page" />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="rotate-2 rounded-3xl bg-paper p-4 shadow-lifted transition-transform duration-500 hover:rotate-0">
              <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-sky/40">
                <Image
                  src="/images/tomi-hero.jpg"
                  alt="Preview of the Tomi the Tiger colouring page"
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-paper/90 p-4 text-center backdrop-blur-sm">
                  <p className="font-display text-tiger-deep">
                    Print me & grab the crayons! 🖍️
                  </p>
                </div>
              </div>
            </div>
            <PawTrail className="mt-6 justify-center text-tiger/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
