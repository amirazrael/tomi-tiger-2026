import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "announcement",
      title: "Announcement bar",
      type: "string",
      description:
        'Shown at the very top of every page, e.g. "Book 5 is out now!" Leave empty to hide.',
    }),
    defineField({ name: "instagramUrl", type: "url" }),
    defineField({ name: "contactEmail", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
