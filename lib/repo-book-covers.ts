/**
 * Covers shipped in /public/images/books. Applied after CMS merge so grid and
 * detail pages always use repo assets for launched titles.
 */
export const REPO_BOOK_COVERS: Record<string, string> = {
  "tomi-finds-a-friend": "/images/books/tomi-finds-a-friend-cover-160926.jpg",
  "tomi-learns-to-be-brave":
    "/images/books/tomi-learns-to-be-brave-cover-221126.jpg",
};

export function applyRepoCover<T extends { slug: string; coverImage?: string | null }>(
  book: T
): T {
  const path = REPO_BOOK_COVERS[book.slug];
  if (!path) return book;
  return { ...book, coverImage: path };
}