import { client, sanityConfigured } from "./sanity/client";
import {
  aboutQuery,
  bookBySlugQuery,
  booksQuery,
  downloadsQuery,
  eventsQuery,
  faqsQuery,
  homeQuery,
  pressQuery,
  reviewsQuery,
  settingsQuery,
} from "./sanity/queries";
import {
  seedAbout,
  seedBooks,
  seedDownloads,
  seedEvents,
  seedFaqs,
  seedHome,
  seedPress,
  seedReviews,
  seedSettings,
} from "./seed";
import type {
  AboutContent,
  Book,
  DownloadItem,
  EventItem,
  FaqItem,
  HomeContent,
  PressItem,
  Review,
  SiteSettings,
} from "./types";

// Revalidate CMS content every 60s in production (ISR).
const options = { next: { revalidate: 60 } };

async function fromSanity<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T
): Promise<T> {
  if (!sanityConfigured || !client) return fallback;
  const result = await client.fetch<T>(query, params, options);
  return result ?? fallback;
}

export async function getBooks(): Promise<Book[]> {
  const books = await fromSanity<Book[]>(booksQuery, {}, seedBooks);
  return books.length ? books : seedBooks;
}

export async function getBook(slug: string): Promise<Book | null> {
  if (!sanityConfigured || !client) {
    return seedBooks.find((b) => b.slug === slug) ?? null;
  }
  const book = await client.fetch<Book | null>(bookBySlugQuery, { slug }, options);
  return book ?? seedBooks.find((b) => b.slug === slug) ?? null;
}

export async function getReviews(): Promise<Review[]> {
  return fromSanity<Review[]>(reviewsQuery, {}, seedReviews);
}

export async function getPress(): Promise<PressItem[]> {
  return fromSanity<PressItem[]>(pressQuery, {}, seedPress);
}

export async function getEvents(): Promise<EventItem[]> {
  return fromSanity<EventItem[]>(eventsQuery, {}, seedEvents);
}

export async function getFaqs(): Promise<FaqItem[]> {
  const faqs = await fromSanity<FaqItem[]>(faqsQuery, {}, seedFaqs);
  return faqs.length ? faqs : seedFaqs;
}

export async function getDownloads(): Promise<DownloadItem[]> {
  const downloads = await fromSanity<DownloadItem[]>(downloadsQuery, {}, seedDownloads);
  return downloads.length ? downloads : seedDownloads;
}

export async function getHome(): Promise<HomeContent> {
  return fromSanity<HomeContent>(homeQuery, {}, seedHome);
}

export async function getAbout(): Promise<AboutContent> {
  return fromSanity<AboutContent>(aboutQuery, {}, seedAbout);
}

export async function getSettings(): Promise<SiteSettings> {
  return fromSanity<SiteSettings>(settingsQuery, {}, seedSettings);
}

/** Split plain-text content into paragraphs on blank lines. */
export function paragraphs(text?: string | null): string[] {
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
