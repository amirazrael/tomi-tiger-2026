import type { Book, FaqItem } from "./types";

export function absoluteAssetUrl(base: string, path?: string | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function siteSchemaGraph(base: string, instagramUrl?: string | null) {
  const publisherId = `${base}/#publisher`;
  const websiteId = `${base}/#website`;
  const seriesId = `${base}/#book-series`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: "Tomi the Tiger",
      url: base,
      description:
        "Picture book series for ages 3–6 by April Summers — friendship, bravery and big feelings.",
      inLanguage: "en-SG",
      publisher: { "@id": publisherId },
    },
    {
      "@type": "Organization",
      "@id": publisherId,
      name: "Tiny Paws Press",
      url: base,
      logo: `${base}/icon.png`,
      ...(instagramUrl ? { sameAs: [instagramUrl] } : {}),
    },
    {
      "@type": "BookSeries",
      "@id": seriesId,
      name: "Tomi the Tiger",
      numberOfItems: 7,
      genre: "Picture book",
      author: { "@type": "Person", name: "April Summers" },
      publisher: { "@id": publisherId },
      url: `${base}/books`,
    },
  ];

  return { "@context": "https://schema.org", "@graph": graph };
}

export function bookSchema(book: Book, base: string) {
  const pageUrl = `${base}/books/${book.slug}`;
  const image = absoluteAssetUrl(base, book.coverImage);
  const buyUrl =
    book.amazonUSLink ?? book.amazonSGLink ?? book.kinokuniyaLink ?? undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": `${pageUrl}#book`,
    name: book.title,
    description: book.seoDescription ?? book.subtitle ?? book.blurb.split("\n")[0],
    url: pageUrl,
    ...(image ? { image } : {}),
    bookFormat: "https://schema.org/Paperback",
    author: { "@type": "Person", name: "April Summers" },
    illustrator: { "@type": "Organization", name: "Moonrags Studio" },
    publisher: { "@type": "Organization", name: "Tiny Paws Press" },
    ...(book.isbn ? { isbn: book.isbn } : {}),
    typicalAgeRange: book.ageRange,
    position: book.bookNumber,
    isPartOf: {
      "@type": "BookSeries",
      name: "Tomi the Tiger",
      url: `${base}/books`,
    },
    ...(buyUrl
      ? {
          offers: {
            "@type": "Offer",
            url: buyUrl,
            availability: book.comingSoon
              ? "https://schema.org/PreOrder"
              : "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function faqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function authorPersonSchema(base: string, instagramUrl?: string | null) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "April Summers",
    jobTitle: "Author",
    worksFor: { "@type": "Organization", name: "Tiny Paws Press" },
    url: `${base}/about`,
    ...(instagramUrl ? { sameAs: [instagramUrl] } : {}),
  };
}
