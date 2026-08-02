import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "authorBio",
      title: "April's bio",
      type: "text",
      rows: 8,
      description: "Leave a blank line between paragraphs.",
    }),
    defineField({
      name: "authorPhoto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "illustratorNote",
      title: "About Moonrags Studio (illustrator)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "missionStatement",
      title: "Tiny Paws Press mission",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "pressBlurb",
      title: "One-line series description (for press)",
      type: "text",
      rows: 2,
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
