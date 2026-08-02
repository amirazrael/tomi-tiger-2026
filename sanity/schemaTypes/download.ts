import { defineField, defineType } from "sanity";

export const download = defineType({
  name: "download",
  title: "Free Download",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "file",
      title: "PDF file",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({ name: "thumbnail", type: "image" }),
    defineField({
      name: "relatedBook",
      type: "reference",
      to: [{ type: "book" }],
    }),
    defineField({
      name: "requiresEmail",
      title: "Requires email signup?",
      type: "boolean",
      initialValue: false,
      description:
        "When on, visitors are sent to the colouring-page signup instead of a direct download.",
    }),
  ],
  preview: { select: { title: "title", media: "thumbnail" } },
});
