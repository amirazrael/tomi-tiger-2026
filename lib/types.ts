export interface Book {
  slug: string;
  title: string;
  subtitle?: string;
  bookNumber: number;
  coverImage?: string | null;
  blurb: string; // paragraphs separated by blank lines
  ageRange: string;
  isbn?: string;
  amazonUSLink?: string | null;
  amazonSGLink?: string | null;
  kinokuniyaLink?: string | null;
  publishDate?: string;
  comingSoon: boolean;
  interiorSpreads?: string[];
  activityPreview?: string | null;
  themes: string[];
  readingLevelNotes?: string;
  seoDescription?: string;
}

export interface Review {
  quote: string;
  reviewerName: string;
  source?: string;
  starRating?: number;
  bookSlug?: string | null;
  featured?: boolean;
}

export interface PressItem {
  publication: string;
  headline: string;
  link?: string;
  date?: string;
  logo?: string | null;
}

export interface EventItem {
  title: string;
  date: string;
  location: string;
  description?: string;
  registrationLink?: string;
  eventType?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: "general" | "parents" | "schools";
}

export interface DownloadItem {
  title: string;
  description?: string;
  fileUrl?: string | null;
  thumbnail?: string | null;
  relatedBookSlug?: string | null;
  requiresEmail?: boolean;
}

export interface HomeContent {
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
  heroImage?: string | null;
  meetTomi: string;
}

export interface AboutContent {
  authorBio: string;
  authorPhoto?: string | null;
  illustratorNote: string;
  missionStatement: string;
  pressBlurb: string;
}

export interface SiteSettings {
  announcement?: string | null;
  instagramUrl?: string;
  contactEmail?: string;
}
