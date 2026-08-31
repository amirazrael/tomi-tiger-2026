import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getSettings } from "@/lib/data";
import { getSiteUrl } from "@/lib/site-url";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();

  const organizationJsonLd = settings.instagramUrl
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Tiny Paws Press",
        url: getSiteUrl(),
        logo: `${getSiteUrl()}/icon.png`,
        sameAs: [settings.instagramUrl],
      }
    : null;

  return (
    <>
      {organizationJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      )}
      <Header
        announcement={settings.announcement}
        instagramUrl={settings.instagramUrl}
      />
      <main className="flex-1">{children}</main>
      <Footer instagramUrl={settings.instagramUrl} />
    </>
  );
}
