import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyButtons from "@/components/BuyButtons";
import { Cover, CoverFrame } from "@/components/BookCard";
import { PawTrail, SectionTitle } from "@/components/decor";
import Reveal from "@/components/Reveal";
import ReviewCard from "@/components/ReviewCard";
import { getBook, getBooks, getReviews, paragraphs } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBook(slug);
  if (!book) return {};
  return {
    title: `${book.title} (Book ${book.bookNumber})`,
    description: book.seoDescription ?? paragraphs(book.blurb)[0],
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const [book, allBooks, allReviews] = await Promise.all([
    getBook(slug),
    getBooks(),
    getReviews(),
  ]);
  if (!book) notFound();

  const reviews = allReviews.filter((r) => r.bookSlug === book.slug);
  const next = allBooks.find((b) => b.bookNumber === book.bookNumber + 1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    bookFormat: "https://schema.org/Paperback",
    author: { "@type": "Person", name: "April Summers" },
    illustrator: { "@type": "Organization", name: "Moonrags Studio" },
    publisher: { "@type": "Organization", name: "Tiny Paws Press" },
    ...(book.isbn ? { isbn: book.isbn } : {}),
    typicalAgeRange: book.ageRange,
    position: book.bookNumber,
    isPartOf: { "@type": "BookSeries", name: "Tomi the Tiger" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-8 text-sm font-semibold text-ink-soft">
            <Link href="/books" className="hover:text-tiger-deep">
              ← All books
            </Link>
          </nav>

          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <CoverFrame className="mx-auto max-w-sm">
                <Cover book={book} priority />
              </CoverFrame>
            </div>

            <div className="lg:col-span-3">
              <p className="font-display text-tiger text-lg">
                Book {book.bookNumber} of 7 · Ages {book.ageRange}
              </p>
              <h1 className="mt-1 font-display text-4xl sm:text-5xl text-ink leading-tight">
                {book.title}
              </h1>
              {book.subtitle && (
                <p className="mt-2 font-display text-xl text-ink-soft">
                  {book.subtitle}
                </p>
              )}

              {book.themes.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {book.themes.map((theme) => (
                    <span
                      key={theme}
                      className="rounded-full bg-jungle-mist px-4 py-1.5 text-sm font-bold text-jungle-deep"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 space-y-4 text-lg text-ink-soft leading-relaxed">
                {paragraphs(book.blurb).map((p) => (
                  <p
                    key={p.slice(0, 24)}
                    className={
                      p.startsWith('"') || p.startsWith("\u201c")
                        ? "font-display text-xl italic text-tiger-deep"
                        : undefined
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8">
                <BuyButtons book={book} />
              </div>

              {book.readingLevelNotes && (
                <div className="mt-8 rounded-2xl bg-cream-deep p-5">
                  <p className="font-display text-ink mb-1">For grown-ups</p>
                  <div className="space-y-3 text-sm text-ink-soft leading-relaxed">
                    {paragraphs(book.readingLevelNotes).map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                </div>
              )}

              {book.isbn && (
                <p className="mt-6 text-xs text-ink-soft">
                  ISBN {book.isbn}
                  {book.publishDate ? ` · Published ${book.publishDate}` : ""}
                </p>
              )}
            </div>
          </div>

          {/* Interior spreads */}
          {book.interiorSpreads && book.interiorSpreads.length > 0 && (
            <section className="mt-20">
              <Reveal>
                <SectionTitle eyebrow="Peek inside">
                  A few pages from the jungle
                </SectionTitle>
              </Reveal>
              <div className="mt-10 flex gap-6 overflow-x-auto pb-4 snap-x">
                {book.interiorSpreads.map((spread, i) => (
                  <div
                    key={spread}
                    className="relative aspect-[3/2] w-80 sm:w-[28rem] shrink-0 snap-center overflow-hidden rounded-2xl shadow-storybook"
                  >
                    <Image
                      src={spread}
                      alt={`${book.title} — interior spread ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 320px, 448px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reviews for this book */}
          {reviews.length > 0 && (
            <section className="mt-20">
              <Reveal>
                <SectionTitle eyebrow="Reader love">
                  What families say
                </SectionTitle>
              </Reveal>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review, i) => (
                  <ReviewCard key={review.quote.slice(0, 24)} review={review} tilt={i} />
                ))}
              </div>
            </section>
          )}

          {/* Next book */}
          {next && (
            <section className="mt-20 text-center">
              <PawTrail className="justify-center text-tiger/30 mb-6" />
              <p className="font-display text-ink-soft">Tomi&apos;s next adventure</p>
              <Link
                href={`/books/${next.slug}`}
                className="mt-1 inline-block font-display text-3xl text-tiger-deep hover:text-tiger transition-colors"
              >
                {next.title} →
              </Link>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
