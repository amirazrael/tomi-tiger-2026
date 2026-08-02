import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  return (
    <>
      <Header announcement={settings.announcement} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
