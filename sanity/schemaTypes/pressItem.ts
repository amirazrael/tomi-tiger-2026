import { defineField, defineType } from "sanity";

export const pressItem = defineType({
  name: "pressItem",
  title: "Press Coverage",
  type: "document",
  fields: [
    defineField({
      name: "publication",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "link", type: "url" }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "logo", type: "image" }),
  ],
  preview: {
    select: { title: "headline", subtitle: "publication", media: "logo" },
  },
});
