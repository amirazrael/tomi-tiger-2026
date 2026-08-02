import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Blob, SectionTitle } from "@/components/decor";
import Reveal from "@/components/Reveal";
import { getAbout, paragraphs } from "@/lib/data";

export const metadata: Metadata = {
  title: "About April Summers & Tiny Paws Press",
  description:
    "Meet April Summers, author of the Tomi the Tiger series, illustrator Moonrags Studio, and Tiny Paws Press — an independent children's publisher in Singapore.",
};

export default async function AboutPage() {
  const about = await getAbout();
  return (
    <section className="py-14 sm:py-20 relative overflow-hidden">
      <Blob className="absolute -top-32 -right-32 w-96 h-96 text-sunshine/20" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <SectionTitle eyebrow="The people behind the paws">
          About April & Tiny Paws Press
        </SectionTitle>

        <div className="mt-12 grid gap-10 md:grid-cols-5 items-start">
          <div className="md:col-span-2">
            <div className="relative aspect-square overflow-hidden rounded-[38%_62%_57%_43%/45%_38%_62%_55%] shadow-lifted rotate-2 bg-cream-deep">
              {about.authorPhoto ? (
                <Image
                  src={about.authorPhoto}
                  alt="April Summers, author of Tomi the Tiger"
                  fill
                  sizes="(max-width: 768px) 90vw, 350px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center p-8 text-center">
                  <p className="font-display text-ink-soft">
                    April&apos;s photo — add it in the Studio ✏️
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-3">
            <Reveal>
              <h2 className="font-display text-2xl text-tiger-deep mb-4">
                April Summers, author
              </h2>
              <div className="space-y-4 text-lg text-ink-soft leading-relaxed">
                {paragraphs(about.authorBio).map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <div className="mt-14 rounded-3xl bg-jungle-mist p-8 sm:p-10">
            <h2 className="font-display text-2xl text-jungle-deep mb-3">
              The watercolours of Moonrags Studio
            </h2>
            <p className="text-lg text-ink-soft leading-relaxed">
              {about.illustratorNote}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 rounded-3xl bg-paper p-8 sm:p-10 shadow-storybook">
            <h2 className="font-display text-2xl text-tiger-deep mb-3">
              Tiny Paws Press
            </h2>
            <p className="text-lg text-ink-soft leading-relaxed">
              {about.missionStatement}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/books"
                className="rounded-full bg-tiger px-6 py-3 font-display text-cream shadow-storybook transition hover:bg-tiger-deep hover:-translate-y-0.5"
              >
                Explore the books
              </Link>
              <Link
                href="/press"
                className="rounded-full border-2 border-tiger/30 bg-paper px-6 py-3 font-display text-tiger-deep transition hover:border-tiger"
              >
                Press & media kit
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
