import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getSettings } from "@/lib/data";
import { siteSchemaGraph } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site-url";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  const base = getSiteUrl();
  const siteJsonLd = siteSchemaGraph(base, settings.instagramUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
      <Header
        announcement={settings.announcement}
        instagramUrl={settings.instagramUrl}
      />
      <main className="flex-1">{children}</main>
      <Footer instagramUrl={settings.instagramUrl} />
    </>
  );
}
