import type { MetadataRoute } from "next";
import { getBooks } from "@/lib/data";

const BASE = "https://tomithetiger.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const books = await getBooks();

  const staticPages = [
    "",
    "/books",
    "/about",
    "/parents-educators",
    "/press",
    "/school-visits",
    "/contact",
    "/free-colouring-page",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const bookPages = books.map((book) => ({
    url: `${BASE}/books/${book.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...bookPages];
}
