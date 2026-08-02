import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      type: "datetime",
      validation: (r) => r.required(),
      description: "Past events disappear from the site automatically.",
    }),
    defineField({
      name: "location",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({ name: "registrationLink", type: "url" }),
    defineField({
      name: "eventType",
      type: "string",
      options: {
        list: ["School visit", "Storytime", "Book signing", "Other"],
      },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "location" },
  },
});
