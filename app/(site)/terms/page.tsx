import type { Metadata } from "next";
import { SectionTitle } from "@/components/decor";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for tomithetiger.com.",
};

export default function TermsPage() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionTitle>Terms of Use</SectionTitle>
        <div className="mt-10 space-y-6 text-ink-soft leading-relaxed">
          <p className="text-sm">Last updated: July 2026</p>
          <p>
            Welcome to tomithetiger.com, operated by Tiny Paws Press,
            Singapore. By using this website you agree to these simple terms.
          </p>

          <h2 className="font-display text-xl text-ink">Our content</h2>
          <p>
            Everything on this site — the Tomi the Tiger stories, characters,
            illustrations, text and downloads — is protected by copyright and
            belongs to April Summers, Moonrags Studio and Tiny Paws Press. Free
            downloads (like colouring pages and activity sheets) are for
            personal, classroom and library use. Please don&apos;t resell them
            or use them commercially.
          </p>

          <h2 className="font-display text-xl text-ink">External links</h2>
          <p>
            Buy buttons and some other links lead to external websites such as
            Amazon and Kinokuniya. We&apos;re not responsible for the content,
            pricing or availability on those sites.
          </p>

          <h2 className="font-display text-xl text-ink">No guarantees</h2>
          <p>
            We work hard to keep the information on this site accurate and the
            site available, but we provide it &quot;as is&quot; without
            warranties of any kind.
          </p>

          <h2 className="font-display text-xl text-ink">Changes</h2>
          <p>
            We may update these terms from time to time. The date at the top
            shows the latest version.
          </p>

          <h2 className="font-display text-xl text-ink">Questions?</h2>
          <p>Use the contact form — we&apos;re friendly.</p>
        </div>
      </div>
    </section>
  );
}
