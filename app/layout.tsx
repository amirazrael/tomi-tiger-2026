import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import Script from "next/script";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const siteDescription =
  "Join Tomi on seven heart-warming jungle adventures about friendship, bravery and trying again — picture books for ages 3–6. - by April Summers";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Tomi the Tiger — Picture Books for Ages 3–6 by April Summers",
    template: "%s | Tomi the Tiger",
  },
  description: siteDescription,
  openGraph: {
    title: "Tomi the Tiger — Picture Books for Ages 3–6 by April Summers",
    description: siteDescription,
    url: getSiteUrl(),
    siteName: "Tomi the Tiger",
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tomi the Tiger — Picture Books for Ages 3–6 by April Summers",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {process.env.NODE_ENV === "production" && (
          <Script
            defer
            data-domain="tomithetiger.com"
            src="https://plausible.io/js/script.outbound-links.js"
          />
        )}
      </body>
    </html>
  );
}
