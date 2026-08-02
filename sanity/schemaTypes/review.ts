import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "reviewerName",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "source",
      type: "string",
      description: "e.g. Amazon, Goodreads, a publication name",
    }),
    defineField({
      name: "starRating",
      type: "number",
      validation: (r) => r.min(1).max(5),
    }),
    defineField({
      name: "book",
      title: "Which book? (optional)",
      type: "reference",
      to: [{ type: "book" }],
      description: "Leave empty for a series-level review.",
    }),
    defineField({
      name: "featured",
      title: "Show on homepage?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "reviewerName", subtitle: "quote" },
  },
});
