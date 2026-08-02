import { defineQuery } from "next-sanity";

// Every query projects image fields to plain CDN URLs so components can treat
// Sanity content and seed content identically.

const BOOK_FIELDS = /* groq */ `
  "slug": slug.current,
  title,
  subtitle,
  bookNumber,
  "coverImage": coverImage.asset->url,
  blurb,
  ageRange,
  isbn,
  amazonUSLink,
  amazonSGLink,
  kinokuniyaLink,
  publishDate,
  "comingSoon": coalesce(comingSoon, false),
  "interiorSpreads": interiorSpreads[].asset->url,
  "activityPreview": activityPreview.asset->url,
  "themes": themes[]->title,
  readingLevelNotes,
  seoDescription
`;

export const booksQuery = defineQuery(
  `*[_type == "book"] | order(bookNumber asc) { ${BOOK_FIELDS} }`
);

export const bookBySlugQuery = defineQuery(
  `*[_type == "book" && slug.current == $slug][0] { ${BOOK_FIELDS} }`
);

export const reviewsQuery = defineQuery(`
  *[_type == "review"] | order(_createdAt desc) {
    quote,
    reviewerName,
    source,
    starRating,
    "bookSlug": book->slug.current,
    featured
  }
`);

export const pressQuery = defineQuery(`
  *[_type == "pressItem"] | order(date desc) {
    publication,
    headline,
    link,
    date,
    "logo": logo.asset->url
  }
`);

export const eventsQuery = defineQuery(`
  *[_type == "event" && date >= now()] | order(date asc) {
    title,
    date,
    location,
    description,
    registrationLink,
    eventType
  }
`);

export const faqsQuery = defineQuery(`
  *[_type == "faqItem"] | order(order asc) {
    question,
    answer,
    category
  }
`);

export const downloadsQuery = defineQuery(`
  *[_type == "download"] | order(_createdAt desc) {
    title,
    description,
    "fileUrl": file.asset->url,
    "thumbnail": thumbnail.asset->url,
    "relatedBookSlug": relatedBook->slug.current,
    requiresEmail
  }
`);

export const homeQuery = defineQuery(`
  *[_type == "homePage"][0] {
    heroHeadline,
    heroSubheadline,
    heroCtaText,
    "heroImage": heroImage.asset->url,
    meetTomi
  }
`);

export const aboutQuery = defineQuery(`
  *[_type == "aboutPage"][0] {
    authorBio,
    "authorPhoto": authorPhoto.asset->url,
    illustratorNote,
    missionStatement,
    pressBlurb
  }
`);

export const settingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    announcement,
    instagramUrl,
    contactEmail
  }
`);
