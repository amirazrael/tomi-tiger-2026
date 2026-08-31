import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import InstagramLink from "@/components/InstagramLink";
import { SectionTitle } from "@/components/decor";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with April Summers and Tiny Paws Press — school visits, bookstore enquiries, press, or just to say hello.",
};

const SUBJECT_MAP: Record<string, string> = {
  school: "School or library visit",
  press: "Press & media",
  bookstore: "Bookstore / stockist enquiry",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject } = await searchParams;
  const settings = await getSettings();
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <SectionTitle eyebrow="Say hello">Get in touch</SectionTitle>
        <p className="mx-auto mt-5 max-w-xl text-center text-lg text-ink-soft leading-relaxed">
          School visits, bookstore enquiries, press questions, or a photo of a
          little reader with their favourite Tomi book — April would love to
          hear from you.
        </p>
        {settings.instagramUrl && (
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-ink-soft">
            Prefer Instagram? Say hello on{" "}
            <InstagramLink
              url={settings.instagramUrl}
              className="inline-flex min-h-0 min-w-0 align-middle"
            />
            .
          </p>
        )}
        <div className="mt-10">
          <ContactForm defaultSubject={subject ? SUBJECT_MAP[subject] : undefined} />
        </div>
      </div>
    </section>
  );
}
