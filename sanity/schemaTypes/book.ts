import { defineField, defineType } from "sanity";

export const book = defineType({
  name: "book",
  title: "Book",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "buy", title: "Buy Links" },
    { name: "media", title: "Images" },
    { name: "extras", title: "Extras & SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
      group: "content",
    }),
    defineField({
      name: "subtitle",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
      group: "content",
      description: "The web address of this book's page, e.g. tomi-finds-a-friend",
    }),
    defineField({
      name: "bookNumber",
      title: "Book number in series",
      type: "number",
      validation: (r) => r.required().min(1),
      group: "content",
    }),
    defineField({
      name: "blurb",
      title: "Back cover blurb",
      type: "text",
      rows: 8,
      description: "Leave a blank line between paragraphs.",
      validation: (r) => r.required(),
      group: "content",
    }),
    defineField({
      name: "ageRange",
      type: "string",
      initialValue: "3–6",
      group: "content",
    }),
    defineField({
      name: "themes",
      title: "Themes / topics",
      type: "array",
      of: [{ type: "reference", to: [{ type: "theme" }] }],
      group: "content",
    }),
    defineField({
      name: "readingLevelNotes",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "comingSoon",
      title: "Coming soon?",
      type: "boolean",
      initialValue: false,
      description:
        "When on, buy buttons are replaced with a newsletter signup on this book's page.",
      group: "content",
    }),
    defineField({
      name: "publishDate",
      type: "date",
      group: "content",
    }),
    defineField({
      name: "isbn",
      title: "ISBN",
      type: "string",
      group: "buy",
    }),
    defineField({
      name: "amazonUSLink",
      title: "Amazon US link",
      type: "url",
      group: "buy",
    }),
    defineField({
      name: "amazonSGLink",
      title: "Amazon Singapore link",
      type: "url",
      group: "buy",
    }),
    defineField({
      name: "kinokuniyaLink",
      title: "Kinokuniya link",
      type: "url",
      group: "buy",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      group: "media",
    }),
    defineField({
      name: "interiorSpreads",
      title: "Interior spread previews",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      group: "media",
    }),
    defineField({
      name: "activityPreview",
      title: "Activity page preview",
      type: "image",
      group: "media",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description (optional)",
      type: "string",
      description: "Overrides the first blurb paragraph in search results.",
      group: "extras",
    }),
  ],
  orderings: [
    {
      title: "Series order",
      name: "bookNumber",
      by: [{ field: "bookNumber", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "bookNumber", media: "coverImage" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: `Book ${subtitle}`, media };
    },
  },
});
