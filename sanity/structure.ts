import type { StructureResolver } from "sanity/structure";

// Singletons (homepage, about, settings) open directly as a single document;
// everything else is a normal list.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("book").title("Books"),
      S.documentTypeListItem("review").title("Reviews"),
      S.documentTypeListItem("pressItem").title("Press Coverage"),
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("download").title("Free Downloads"),
      S.documentTypeListItem("faqItem").title("FAQs"),
      S.documentTypeListItem("theme").title("Themes"),
      S.divider(),
      S.listItem()
        .title("Homepage")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("About Page")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
