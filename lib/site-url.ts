/** Live site — used for sitemap, metadata, and JSON-LD on production deploys. */
export const CANONICAL_SITE_URL = "https://tomithetiger.com";

/**
 * Canonical site URL for metadata, sitemap, and social previews.
 * Production Vercel deploys always use the live domain (ignores stale staging env).
 */
export function getSiteUrl(): string {
  if (process.env.VERCEL_ENV === "production") {
    return CANONICAL_SITE_URL;
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
