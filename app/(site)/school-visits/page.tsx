import type { Metadata } from "next";
import Link from "next/link";
import { PawTrail, SectionTitle } from "@/components/decor";
import Reveal from "@/components/Reveal";
import { getEvents, getFaqs } from "@/lib/data";
import FaqList from "@/components/FaqList";

export const metadata: Metadata = {
  title: "School Visits & Events",
  description:
    "Book an author story-time or school visit with April Summers, creator of the Tomi the Tiger series — for preschools, kindergartens and libraries in Singapore.",
};

const VISIT_INCLUDES = [
  {
    title: "Story time with Tomi",
    text: "An interactive read-aloud where children join in with Tomi's mantras — “just a little brave!” — and guess his feelings from his bouncy tail.",
  },
  {
    title: "Big feelings talk",
    text: "A gentle, age-appropriate chat about the feeling in the story — fear, jealousy, nervousness — and what Tomi does with it.",
  },
  {
    title: "Draw-along & activities",
    text: "Simple draw-along fun plus take-home colouring and activity pages matched to the book.",
  },
];

export default async function SchoolVisitsPage() {
  const [events, faqs] = await Promise.all([getEvents(), getFaqs()]);
  const schoolFaqs = faqs.filter((f) => f.category === "schools");

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionTitle eyebrow="Bring Tomi to your school">
          School Visits & Events
        </SectionTitle>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-ink-soft leading-relaxed">
          April offers warm, playful story-time sessions for preschools,
          kindergartens and libraries in Singapore, built around the Tomi the
          Tiger books and the big feelings inside them. Best for ages 3–6.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VISIT_INCLUDES.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="h-full rounded-2xl bg-paper p-6 shadow-storybook">
                <p className="font-display text-4xl text-sunshine mb-3">{i + 1}</p>
                <h2 className="font-display text-xl text-tiger-deep mb-2">
                  {item.title}
                </h2>
                <p className="text-ink-soft leading-relaxed">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact?subject=school"
            className="inline-block rounded-full bg-tiger px-8 py-4 font-display text-xl text-cream shadow-lifted transition hover:bg-tiger-deep hover:-translate-y-1"
          >
            Enquire about a visit
          </Link>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl text-ink mb-6 text-center">
            Upcoming events
          </h2>
          {events.length === 0 ? (
            <div className="rounded-2xl bg-cream-deep p-8 text-center">
              <PawTrail className="justify-center text-tiger/30 mb-4" />
              <p className="font-display text-lg text-ink-soft">
                No public events on the calendar right now — check back soon,
                or join the newsletter to hear first.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {events.map((event) => (
                <li
                  key={`${event.title}-${event.date}`}
                  className="rounded-2xl bg-paper p-6 shadow-storybook sm:flex sm:items-center sm:justify-between sm:gap-6"
                >
                  <div>
                    <p className="text-sm font-bold text-tiger">
                      {new Date(event.date).toLocaleDateString("en-SG", {
                        weekday: "short",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      {" · "}
                      {event.location}
                    </p>
                    <h3 className="font-display text-xl text-ink">{event.title}</h3>
                    {event.description && (
                      <p className="mt-1 text-ink-soft">{event.description}</p>
                    )}
                  </div>
                  {event.registrationLink && (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block shrink-0 rounded-full bg-jungle px-6 py-3 font-display text-cream transition hover:bg-jungle-deep sm:mt-0"
                    >
                      Register →
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {schoolFaqs.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl text-ink mb-6">
              Questions schools ask
            </h2>
            <FaqList faqs={schoolFaqs} />
          </div>
        )}
      </div>
    </section>
  );
}
