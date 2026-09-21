import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InstagramLink from "@/components/InstagramLink";
import { Blob, SectionTitle } from "@/components/decor";
import Reveal from "@/components/Reveal";
import { getAbout, getSettings, paragraphs } from "@/lib/data";
import { authorPersonSchema } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "About April Summers & Tiny Paws Press",
  description:
    "Meet April Summers, author of the Tomi the Tiger series, illustrator Moonrags Studio, and Tiny Paws Press — an independent children's publisher in Singapore.",
};

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAbout(), getSettings()]);
  const base = getSiteUrl();
  const personJsonLd = authorPersonSchema(base, settings.instagramUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <section className="py-14 sm:py-20 relative overflow-hidden">
      <Blob className="absolute -top-32 -right-32 w-96 h-96 text-sunshine/20" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <SectionTitle eyebrow="The people behind the paws">
          About April & Tiny Paws Press
        </SectionTitle>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-cream-deep p-6 text-sm text-ink-soft leading-relaxed">
          <h2 className="font-display text-lg text-ink mb-3">At a glance</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Tomi the Tiger</strong> is a seven-book picture book
              series for ages 3–6 about friendship, bravery, and big feelings.
            </li>
            <li>
              Written by <strong>April Summers</strong>, illustrated by{" "}
              <strong>Moonrags Studio</strong>, published by{" "}
              <strong>Tiny Paws Press</strong> in Singapore.
            </li>
            <li>
              Book 1, <em>Tomi Finds a Friend</em>, is available on Amazon
              (ISBN 9819474094).
            </li>
          </ul>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-5 items-start">
          <div className="md:col-span-2">
            <div className="relative aspect-square overflow-hidden rounded-[38%_62%_57%_43%/45%_38%_62%_55%] shadow-lifted rotate-2 bg-cream-deep">
              <Image
                src={about.authorPhoto ?? "/images/about-paws.png"}
                alt="Tomi the Tiger paw prints"
                fill
                sizes="(max-width: 768px) 90vw, 350px"
                className="object-contain p-8 sm:p-10"
              />
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
              {settings.instagramUrl && (
                <p className="mt-6 text-base text-ink-soft">
                  See Tomi in the wild — behind-the-scenes sketches, new art
                  and jungle updates on{" "}
                  <InstagramLink
                    url={settings.instagramUrl}
                    className="inline-flex min-h-0 min-w-0 align-middle"
                  />
                  .
                </p>
              )}
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
    </>
  );
}
