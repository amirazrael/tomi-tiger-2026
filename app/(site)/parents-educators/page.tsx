import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/decor";
import FaqList from "@/components/FaqList";
import Reveal from "@/components/Reveal";
import ThemeSongPlayer from "@/components/ThemeSongPlayer";
import { getBooks, getDownloads, getFaqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "For Parents & Educators",
  description:
    "Free colouring pages, discussion guides and classroom activities for the Tomi the Tiger picture book series — friendship, bravery and big feelings for ages 3–6.",
};

export default async function ParentsEducatorsPage() {
  const [downloads, books, faqs] = await Promise.all([
    getDownloads(),
    getBooks(),
    getFaqs(),
  ]);
  const relevantFaqs = faqs.filter(
    (f) => f.category === "parents" || f.category === "general"
  );

  // Unique themes across the series, for the "find a book by feeling" index.
  const themeMap = new Map<string, { slug: string; title: string }[]>();
  for (const book of books) {
    for (const theme of book.themes) {
      const list = themeMap.get(theme) ?? [];
      list.push({ slug: book.slug, title: book.title });
      themeMap.set(theme, list);
    }
  }

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionTitle eyebrow="For grown-ups">
          Parents & Educators
        </SectionTitle>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-ink-soft leading-relaxed">
          Every Tomi story is built around a feeling children know well —
          and a conversation worth having afterwards. Here&apos;s everything to
          keep the story going after the last page.
        </p>

        {/* Downloads */}
        <div className="mt-14">
          <h2 className="font-display text-2xl text-ink mb-6">
            Free downloads
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {downloads.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl bg-paper p-6 shadow-storybook">
                  {item.thumbnail && (
                    <div className="relative mb-4 aspect-[3/2] overflow-hidden rounded-xl">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 90vw, 400px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-display text-xl text-tiger-deep">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 flex-1 text-ink-soft leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-4">
                    {item.requiresEmail || !item.fileUrl ? (
                      <Link
                        href="/free-colouring-page"
                        className="inline-block rounded-full bg-tiger px-5 py-2.5 font-display text-cream shadow-storybook transition hover:bg-tiger-deep"
                      >
                        Get it free by email
                      </Link>
                    ) : (
                      <a
                        href={item.fileUrl}
                        className="inline-block rounded-full border-2 border-tiger/30 px-5 py-2.5 font-display text-tiger-deep transition hover:border-tiger"
                      >
                        Download PDF
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Theme song */}
        <div className="mt-16">
          <h2 className="font-display text-2xl text-ink mb-2">
            Tomi&apos;s theme song
          </h2>
          <p className="text-ink-soft mb-6">
            Three minutes of jungle joy — lovely for tidy-up time, car rides
            and wiggle breaks.
          </p>
          <ThemeSongPlayer />
        </div>

        {/* Books by feeling */}
        <div className="mt-16">
          <h2 className="font-display text-2xl text-ink mb-2">
            Find a book by feeling
          </h2>
          <p className="text-ink-soft mb-6">
            Working on something specific — a fear of water, a new sibling, a
            first day of school? Start here.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...themeMap.entries()].map(([theme, themeBooks]) => (
              <div key={theme} className="rounded-2xl bg-cream-deep p-5">
                <p className="font-display text-lg text-jungle-deep mb-2">
                  {theme}
                </p>
                <ul className="space-y-1">
                  {themeBooks.map((b) => (
                    <li key={b.slug}>
                      <Link
                        href={`/books/${b.slug}`}
                        className="text-sm font-semibold text-ink-soft hover:text-tiger-deep"
                      >
                        {b.title} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="font-display text-2xl text-ink mb-6">
            Common questions
          </h2>
          <FaqList faqs={relevantFaqs} />
        </div>
      </div>
    </section>
  );
}
