import { defineField, defineType } from "sanity";

export const theme = defineType({
  name: "theme",
  title: "Theme",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
      description: "e.g. Friendship, Courage, Starting school",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
    }),
  ],
});
