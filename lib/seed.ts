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

/**
 * Seed content — used only until Sanity is connected (no NEXT_PUBLIC_SANITY_PROJECT_ID).
 * Once the CMS is live, everything below is managed in the Sanity Studio at /studio
 * and this file is ignored.
 */

export const seedBooks: Book[] = [
  {
    slug: "tomi-finds-a-friend",
    title: "Tomi Finds a Friend",
    subtitle: "Not everyone says yes.",
    bookNumber: 1,
    coverImage: "/images/books/tomi-finds-a-friend-cover-v2.png",
    blurb:
      "Tomi is a little tiger who loves to run, jump, and play.\n\nBut today, he doesn't want to play alone.\n\nSo off he goes to find a friend — past the tall grass, past the quiet lake, further from home than he's ever been. Each time someone says no, Tomi takes a breath.\n\n\"That's okay. I'll keep looking.\"",
    ageRange: "3–6",
    comingSoon: true,
    themes: ["Friendship", "Perseverance", "Kindness"],
    readingLevelNotes:
      "A gentle story about handling rejection, staying hopeful, and finding a friend who wants to play too.\n\nIncludes a Note to Grown-Ups with conversation starters, plus three activity pages to explore feelings together.",
  },
  {
    slug: "tomi-learns-to-be-brave",
    title: "Tomi Learns to be Brave",
    bookNumber: 2,
    blurb:
      "When Binni the bunny needs help, Tomi is scared. Really scared.\n\nBut being brave isn't about not being afraid — it's about whispering “just a little brave” and acting anyway. With help from a very large new friend, Tomi discovers what courage really means.\n\nA story for every child who has ever felt too small for a big moment.",
    ageRange: "3–6",
    comingSoon: true,
    themes: ["Courage", "Facing fears", "Helping others"],
    readingLevelNotes:
      "Slightly longer sentences with a gentle emotional arc. Great for talking about fear and bravery.",
  },
  {
    slug: "tomi-helps-at-the-beach",
    title: "Tomi Helps at the Beach",
    bookNumber: 3,
    blurb:
      "There's a problem at the beach, and everyone is stuck.\n\nTomi tries to help. He tries and tries — and fails. But Tomi never gives up, and sometimes the best solution is the one nobody expects, from the smallest helper of all.\n\nA story about creative thinking, teamwork and trying one more time.",
    ageRange: "3–6",
    comingSoon: true,
    themes: ["Problem-solving", "Teamwork", "Perseverance"],
    readingLevelNotes:
      "Playful, action-driven text with plenty of moments to pause and ask “what would you do?”",
  },
  {
    slug: "tomi-faces-the-water",
    title: "Tomi Faces the Water",
    bookNumber: 4,
    blurb:
      "Tomi loves to run. Tomi loves to jump. But water? Water is his biggest fear.\n\nWith the help of Dova the dolphin and a mantra he'll carry forever — “one splash at a time” — Tomi learns that big fears shrink when you face them in little pieces.\n\nThe series' most-loved story about conquering what scares you most.",
    ageRange: "3–6",
    comingSoon: true,
    themes: ["Facing fears", "Growth", "Patience"],
    readingLevelNotes:
      "A reassuring read for children learning to swim or facing any big fear. Strong repeated refrain.",
  },
  {
    slug: "tomi-tries-something-new",
    title: "Tomi Tries Something New",
    bookNumber: 5,
    blurb:
      "New things are exciting. New things are also a little bit scary.\n\nWhen something Tomi has never seen before arrives in the jungle, his curiosity and his hesitation have a tug-of-war. Guess which one wins?\n\nA joyful story about curiosity, open minds and the fun waiting on the other side of “I've never done that before.”",
    ageRange: "3–6",
    comingSoon: true,
    themes: ["Trying new things", "Curiosity", "Confidence"],
    readingLevelNotes:
      "Bright, bouncy text with lots of anticipation. Perfect before a first day of anything new.",
  },
  {
    slug: "tomi-learns-about-jealousy",
    title: "Tomi Learns about Jealousy",
    bookNumber: 6,
    blurb:
      "Tomi's tummy feels tight and his tail won't bounce. His friend is winning at everything — and Tomi doesn't like it one bit.\n\nThis is the story of a big green feeling, and how Tomi learns to name it, tame it, and cheer for his friends and himself.\n\nAn honest, gentle look at one of childhood's trickiest emotions.",
    ageRange: "3–6",
    comingSoon: true,
    themes: ["Big feelings", "Jealousy", "Friendship"],
    readingLevelNotes:
      "A social-emotional learning favourite. Includes natural pause points to talk about feelings.",
  },
  {
    slug: "tomi-goes-to-school",
    title: "Tomi Goes to School",
    bookNumber: 7,
    blurb:
      "It's Tomi's first day of school, and his tail is twitching with nerves.\n\nBut Tomi has learned a thing or two about new beginnings — and when he spots someone even more nervous than he is, he knows exactly what to do.\n\nThe heart-warming finale of the series, where the little cub who once played alone becomes the friend he was always looking for.",
    ageRange: "3–6",
    comingSoon: true,
    themes: ["Starting school", "Empathy", "New beginnings"],
    readingLevelNotes:
      "The perfect first-day-of-school read. Brings the series full circle — best read after Book 1.",
  },
];

// Sample reviews — replace with real ones in Sanity before launch.
export const seedReviews: Review[] = [
  {
    quote:
      "Tomi the Tiger was a very impressionable book as it helped my son navigate the realms of making friends. It also became an opener for me to ask him if he had ever encountered such situations before. Overall a great insightful read for parents and kids.",
    reviewerName: "Ashley (30, Mother)",
    starRating: 5,
    bookSlug: "tomi-finds-a-friend",
    featured: true,
  },
  {
    quote:
      "Tomi the Tiger really resonated with me as a parent. It gave my son a relatable way to understand friendship, social situations, and the challenges that can come with making new friends. More importantly, it opened up some meaningful conversations between us about whether he had ever experienced similar situations himself. A thoughtful and insightful book that I'd recommend to both parents and children.",
    reviewerName: "Amir (43, Father)",
    starRating: 5,
    bookSlug: "tomi-finds-a-friend",
    featured: true,
  },
  {
    quote:
      "I really liked Tomi the Tiger because it showed me how to make friends and what to do when things are not easy with friends. It made me think about things that have happened to me too. I also liked talking to my dad about the story and telling him about my own experiences. It was a fun book and I learned a lot from it!",
    reviewerName: "Arez Tan (5, Child)",
    starRating: 5,
    bookSlug: "tomi-finds-a-friend",
    featured: true,
  },
];

export const seedPress: PressItem[] = [];

export const seedEvents: EventItem[] = [];

export const seedFaqs: FaqItem[] = [
  {
    question: "What age are the Tomi the Tiger books for?",
    answer:
      "The series is written for children aged 3–6. The gentle, rhythmic text works beautifully as a read-aloud for younger children, while early readers enjoy the repeated phrases they can join in with.",
    category: "general",
  },
  {
    question: "Do I need to read the books in order?",
    answer:
      "Each story stands on its own, so you can start anywhere. That said, we recommend starting with Book 1, Tomi Finds a Friend — and Book 7, Tomi Goes to School, is extra special if you've followed Tomi's whole journey.",
    category: "general",
  },
  {
    question: "Where can I buy the books?",
    answer:
      "The books are available on Amazon (US and Singapore). Links are on each book's page. We're working on bringing Tomi to Singapore bookstores too — join the newsletter to hear the moment that happens.",
    category: "general",
  },
  {
    question: "Are the illustrations hand-made?",
    answer:
      "Yes — every page is illustrated in a warm watercolour style by Moonrags Studio, whose artwork gives Tomi's jungle its soft, storybook feel.",
    category: "general",
  },
  {
    question: "Do you offer school or library visits?",
    answer:
      "Yes! April offers story-time sessions and school visits for preschools and kindergartens in Singapore. Head to the School Visits page or get in touch via the contact form.",
    category: "schools",
  },
  {
    question: "Can I get activity pages for my classroom?",
    answer:
      "Absolutely. The For Parents & Educators page has free colouring pages, discussion guides and activities matched to each book's themes — feelings, friendship, bravery and more.",
    category: "parents",
  },
];

export const seedDownloads: DownloadItem[] = [
  {
    title: "Tomi Colouring Page",
    description:
      "A free printable colouring page of Tomi and his bouncy tail. Perfect for ages 3–6.",
    requiresEmail: true,
  },
  {
    title: "Big Feelings Discussion Guide",
    description:
      "Questions and prompts for talking about jealousy, fear and courage after reading — built for parents and preschool teachers.",
    requiresEmail: false,
  },
];

export const seedHome: HomeContent = {
  heroHeadline: "Big feelings. Little tiger.",
  heroSubheadline:
    "Join Tomi on seven heart-warming jungle adventures about friendship, bravery and trying again — picture books for ages 3–6.",
  heroCtaText: "Explore the Books",
  heroImage: "/images/tomi-hero.jpg",
  meetTomi:
    "Tomi is a young tiger cub finding his way through the big world, one adventure at a time. He leads with his heart. He gets scared, sad and even jealous — and that's exactly what makes him so easy for little readers to love.\n\nYou can always tell how Tomi feels by his tail: bouncing high when he's happy, perfectly still when he's sad, twitching when he's nervous. And when things get hard, he whispers to himself: “That's okay. I'll keep looking.”",
};

export const seedAbout: AboutContent = {
  authorBio:
    "April Summers writes stories that help small children navigate big feelings. Based in Singapore, she created Tomi the Tiger after noticing how quickly little ones connect with characters who feel exactly what they feel — fear, jealousy, nervousness — and keep going anyway.\n\nThe seven-book series follows one small cub from his very first friend to his very first day of school, growing a little braver with every story.",
    // ^ Placeholder bio — replace with April's real bio in Sanity.
  illustratorNote:
    "Every page of Tomi's world is illustrated in warm, hand-painted watercolour by Moonrags Studio, whose gentle style gives the jungle its soft light and Tomi his unmistakable bouncy tail.",
  missionStatement:
    "Tiny Paws Press is an independent children's publisher based in Singapore. We make books that take children's feelings seriously — and make bedtime the best part of the day.",
  pressBlurb:
    "Tomi the Tiger is a seven-book picture book series for ages 3–6 by April Summers, illustrated by Moonrags Studio, published by Tiny Paws Press (Singapore).",
};

export const seedSettings: SiteSettings = {
  announcement: null,
  contactEmail: "hello@tomithetiger.com",
};
