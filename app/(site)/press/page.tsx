import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/decor";
import { getAbout, getPress } from "@/lib/data";

export const metadata: Metadata = {
  title: "Press & Media Kit",
  description:
    "Press coverage and media resources for the Tomi the Tiger picture book series by April Summers, published by Tiny Paws Press, Singapore.",
};

export default async function PressPage() {
  const [press, about] = await Promise.all([getPress(), getAbout()]);

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionTitle eyebrow="For media & booksellers">
          Press & Media Kit
        </SectionTitle>

        <div className="mt-12 rounded-3xl bg-paper p-8 sm:p-10 shadow-storybook">
          <h2 className="font-display text-2xl text-tiger-deep mb-3">
            About the series
          </h2>
          <p className="text-lg text-ink-soft leading-relaxed">{about.pressBlurb}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 text-sm text-ink-soft">
            <li className="rounded-xl bg-cream-deep p-4">
              <span className="font-bold text-ink">Series:</span> 7 picture books
            </li>
            <li className="rounded-xl bg-cream-deep p-4">
              <span className="font-bold text-ink">Age range:</span> 3–6 years
            </li>
            <li className="rounded-xl bg-cream-deep p-4">
              <span className="font-bold text-ink">Author:</span> April Summers
            </li>
            <li className="rounded-xl bg-cream-deep p-4">
              <span className="font-bold text-ink">Illustrator:</span> Moonrags Studio
              (hand-painted watercolour)
            </li>
            <li className="rounded-xl bg-cream-deep p-4">
              <span className="font-bold text-ink">Publisher:</span> Tiny Paws
              Press, Singapore
            </li>
            <li className="rounded-xl bg-cream-deep p-4">
              <span className="font-bold text-ink">Themes:</span> friendship,
              courage, big feelings, starting school
            </li>
          </ul>
          <p className="mt-6 text-sm text-ink-soft">
            For review copies, interviews, high-resolution covers and author
            photos, please{" "}
            <Link href="/contact" className="font-bold text-jungle-deep underline">
              get in touch
            </Link>
            . A downloadable media kit is coming soon.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl text-ink mb-6">In the news</h2>
          {press.length === 0 ? (
            <div className="rounded-2xl bg-cream-deep p-8 text-center">
              <p className="font-display text-lg text-ink-soft">
                Tomi&apos;s press adventures are just beginning — coverage will
                appear here.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {press.map((item) => (
                <li
                  key={`${item.publication}-${item.headline}`}
                  className="flex items-center gap-5 rounded-2xl bg-paper p-5 shadow-storybook"
                >
                  {item.logo && (
                    <Image
                      src={item.logo}
                      alt={item.publication}
                      width={80}
                      height={40}
                      className="h-10 w-auto shrink-0 object-contain"
                    />
                  )}
                  <div>
                    <p className="text-sm font-bold text-tiger">
                      {item.publication}
                      {item.date ? ` · ${item.date}` : ""}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display text-lg text-ink hover:text-tiger-deep"
                      >
                        {item.headline} →
                      </a>
                    ) : (
                      <p className="font-display text-lg text-ink">{item.headline}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
