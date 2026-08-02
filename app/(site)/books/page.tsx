import type { Metadata } from "next";
import BookCard from "@/components/BookCard";
import { SectionTitle } from "@/components/decor";
import Reveal from "@/components/Reveal";
import { getBooks } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Books",
  description:
    "All seven Tomi the Tiger picture books — heart-warming jungle adventures about friendship, bravery and big feelings for ages 3–6.",
};

export default async function BooksPage() {
  const books = await getBooks();
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle eyebrow="The series">
          Seven stories, one growing heart
        </SectionTitle>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-ink-soft leading-relaxed">
          Follow Tomi from his very first friend to his very first day of
          school. Each story stands alone — together, they&apos;re one little
          tiger&apos;s journey through all the big feelings of being small.
        </p>
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {books.map((book, i) => (
            <Reveal key={book.slug} delay={(i % 4) * 80}>
              <BookCard book={book} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
