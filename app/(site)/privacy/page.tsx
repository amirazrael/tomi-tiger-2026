import type { Metadata } from "next";
import { SectionTitle } from "@/components/decor";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How tomithetiger.com handles your personal data.",
};

export default function PrivacyPage() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionTitle>Privacy Policy</SectionTitle>
        <div className="prose-tomi mt-10 space-y-6 text-ink-soft leading-relaxed">
          <p className="text-sm">Last updated: July 2026</p>
          <p>
            This website is operated by Tiny Paws Press, Singapore
            (&quot;we&quot;, &quot;us&quot;). We keep things simple: we collect
            as little personal data as possible, and we never sell it.
          </p>

          <h2 className="font-display text-xl text-ink">What we collect</h2>
          <p>
            <strong>Email signups.</strong> If you request the free colouring
            page or join our newsletter, we collect your email address. It is
            stored with MailerLite, our email service provider, and used only
            to send you the download you asked for and occasional news about
            the Tomi the Tiger books. Every email includes an unsubscribe
            link.
          </p>
          <p>
            <strong>Contact form.</strong> If you write to us, we receive your
            name, email address and message so we can reply.
          </p>
          <p>
            <strong>Analytics.</strong> We use Plausible Analytics, a
            privacy-friendly service that uses no cookies and collects no
            personal data. We see anonymous, aggregate statistics only (like
            how many people visited a page), never who you are.
          </p>

          <h2 className="font-display text-xl text-ink">What we don&apos;t do</h2>
          <p>
            We don&apos;t use advertising cookies or tracking pixels, we
            don&apos;t sell or share your data with third parties for
            marketing, and we don&apos;t knowingly collect personal data from
            children. This website is written for grown-ups; the books are for
            the little ones.
          </p>

          <h2 className="font-display text-xl text-ink">Your rights</h2>
          <p>
            In line with Singapore&apos;s Personal Data Protection Act (PDPA)
            and similar laws elsewhere, you may ask us at any time to access,
            correct or delete the personal data we hold about you. Just email
            us or use the contact form, and we&apos;ll sort it out promptly.
          </p>

          <h2 className="font-display text-xl text-ink">Third-party links</h2>
          <p>
            Buy buttons link to external retailers such as Amazon and
            Kinokuniya. Once you leave our site, those retailers&apos; own
            privacy policies apply.
          </p>
        </div>
      </div>
    </section>
  );
}
