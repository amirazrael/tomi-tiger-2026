import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroSubheadline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero button text",
      type: "string",
      initialValue: "Explore the Books",
    }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "meetTomi",
      title: "“Meet Tomi” section text",
      type: "text",
      rows: 8,
      description: "Leave a blank line between paragraphs.",
    }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
