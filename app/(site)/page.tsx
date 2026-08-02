import Image from "next/image";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import {
  Blob,
  BrushUnderline,
  Butterfly,
  Cloud,
  Fireflies,
  FlightButterfly,
  Leaf,
  SectionTitle,
  Sparkle,
  Wave,
} from "@/components/decor";
import Reveal from "@/components/Reveal";
import ReviewCard from "@/components/ReviewCard";
import SignupForm from "@/components/SignupForm";
import TailMeter from "@/components/TailMeter";
import ThemeSongPlayer from "@/components/ThemeSongPlayer";
import { getBooks, getHome, getPress, getReviews, paragraphs } from "@/lib/data";

export default async function HomePage() {
  const [home, books, reviews, press] = await Promise.all([
    getHome(),
    getBooks(),
    getReviews(),
    getPress(),
  ]);
  const featured = reviews.filter((r) => r.featured).slice(0, 3);
  const [headlineStart, ...headlineRest] = home.heroHeadline.split(". ");

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-sky/50">
        <div className="parallax-drift absolute -top-24 -left-24 w-96 h-96 text-sunshine/30">
          <Blob className="h-full w-full animate-float-slow" />
        </div>
        <div className="parallax-drift absolute top-1/3 -right-32 w-[28rem] h-[28rem] text-jungle/15">
          <Blob className="h-full w-full animate-float" />
        </div>
        <Cloud className="cloud-across absolute top-8 left-0 w-44 text-paper/80 [--cloud-delay:-25s]" />
        <Cloud className="cloud-across absolute top-24 left-0 w-56 text-paper/60 [--cloud-dur:115s] [--cloud-delay:-75s]" />
        <Cloud className="cloud-across absolute top-44 left-0 w-32 text-paper/50 [--cloud-dur:70s] [--cloud-delay:-50s]" />
        <FlightButterfly className="text-berry hidden sm:block" />
        <Leaf className="absolute bottom-24 left-[6%] w-8 h-8 text-jungle/40 animate-float hidden lg:block" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-14 pb-8 sm:pt-20 lg:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-ink">
                {`${headlineStart}.`.split(" ").map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="word-in"
                    style={{ animationDelay: `${i * 110}ms` }}
                  >
                    {word}
                    {" "}
                  </span>
                ))}
                {headlineRest.length > 0 && (
                  <span
                    className="word-in relative inline-block text-tiger-deep"
                    style={{ animationDelay: "400ms" }}
                  >
                    {headlineRest.join(". ")}
                    <BrushUnderline className="underline-draw absolute -bottom-2 left-0 w-full h-4 text-sunshine" />
                  </span>
                )}
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-ink-soft leading-relaxed max-w-xl mx-auto lg:mx-0">
                {home.heroSubheadline}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/books"
                  className="rounded-full bg-tiger px-8 py-4 font-display text-xl text-cream shadow-lifted transition hover:bg-tiger-deep hover:-translate-y-1"
                >
                  {home.heroCtaText}
                </Link>
                <Link
                  href="/free-colouring-page"
                  className="font-display text-lg text-jungle-deep underline decoration-sunshine decoration-4 underline-offset-4 transition hover:text-tiger-deep"
                >
                  Get a free colouring page
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              {/* soft sun glow + drifting clouds behind Tomi */}
              <div
                aria-hidden
                className="absolute -inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(243,185,77,0.35),transparent_62%)]"
              />
              <Cloud className="cloud-drift absolute -top-8 -left-10 w-40 text-paper/90" />
              <Cloud className="cloud-drift absolute top-1/4 -right-14 w-52 text-paper/70 [--cloud-delay:-6s]" />
              <Cloud className="cloud-drift absolute -bottom-6 left-1/4 w-36 text-paper/60 [--cloud-delay:-11s]" />
              <div className="blob-morph relative aspect-square overflow-hidden shadow-lifted rotate-2 transition-transform duration-500 hover:rotate-0">
                {/* The hero scene, alive: Moonrags Studio's illustration animated. Falls back
                    to the still image (poster) wherever autoplay is blocked. */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={home.heroImage ?? "/images/tomi-hero.jpg"}
                  aria-label="Tomi the tiger cub walking through the jungle with a butterfly"
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src="/videos/tomi-walking.mp4" type="video/mp4" />
                </video>
              </div>
              <Butterfly className="absolute -top-4 -left-2 w-12 h-12 text-berry animate-flutter" />
            </div>
          </div>
        </div>
        <div className="text-cream relative">
          <Wave />
        </div>
      </section>

      {/* ---------- Storybook line ---------- */}
      <section className="pt-12 sm:pt-16">
        <Reveal>
          <p className="mx-auto max-w-4xl px-4 text-center font-display text-2xl sm:text-3xl lg:text-4xl leading-relaxed">
            {[
              { phrase: "Tomi loves to run.", color: "text-tiger-deep" },
              { phrase: "Tomi loves to jump.", color: "text-jungle-deep" },
              { phrase: "Tomi loves to play.", color: "text-berry" },
            ].map((item, i) => (
              <span
                key={item.phrase}
                className={`pop-word mx-2 ${item.color}`}
                style={{ animationDelay: `${i * 380}ms` }}
              >
                {item.phrase}
              </span>
            ))}
          </p>
          <p
            className="pop-word mt-3 w-full text-center text-ink-soft italic"
            style={{ animationDelay: "1300ms" }}
          >
            — the very first page of the very first book
          </p>
        </Reveal>
      </section>

      {/* ---------- The books ---------- */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="relative">
              <Sparkle className="absolute -top-6 left-[12%] w-5 h-5 text-sunshine" />
              <Sparkle className="absolute -top-2 right-[10%] w-4 h-4 text-tiger" delay={1100} />
              <Sparkle className="absolute top-10 left-[4%] w-3 h-3 text-berry hidden sm:block" delay={2200} />
              <SectionTitle eyebrow="Seven adventures">
                One little tiger, seven big feelings
              </SectionTitle>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {books.map((book, i) => (
              <Reveal key={book.slug} delay={(i % 4) * 80}>
                <BookCard book={book} index={i} />
              </Reveal>
            ))}
            <Reveal delay={((books.length) % 4) * 80}>
              <Link
                href="/books"
                className="group flex aspect-3/4 flex-col items-center justify-center gap-3 rounded-2xl border-4 border-dashed border-tiger/30 text-center transition hover:border-tiger hover:bg-cream-deep"
              >
                <span className="font-display text-5xl text-tiger transition-transform group-hover:scale-110">
                  →
                </span>
                <span className="font-display text-lg text-tiger-deep px-4">
                  See the whole series
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Meet Tomi ---------- */}
      <section className="relative">
        <div className="relative">
          <div className="absolute inset-x-0 -top-3 text-jungle/20">
            <Wave />
          </div>
          <div className="relative text-jungle-mist">
            <Wave />
          </div>
        </div>
        <div className="bg-jungle-mist relative overflow-hidden">
          <Fireflies />
          <Leaf className="absolute top-10 right-[8%] w-10 h-10 text-jungle/30 animate-float" />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-5">
              <div className="lg:col-span-3 relative">
                <Reveal>
                  <div className="relative aspect-video overflow-hidden rounded-3xl shadow-lifted -rotate-1">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster="/images/tomi-jungle.jpg"
                      aria-label="Tomi bounding across a sunny jungle clearing, chasing a butterfly"
                      className="absolute inset-0 h-full w-full object-cover"
                    >
                      <source src="/videos/tomi-clearing.mp4" type="video/mp4" />
                    </video>
                  </div>
                </Reveal>
              </div>
              <div className="lg:col-span-2">
                <Reveal delay={120}>
                  <SectionTitle eyebrow="Meet Tomi" className="text-left [&>div]:justify-start [&_p]:text-left [&_h2]:text-left">
                    The cub with the bouncy tail
                  </SectionTitle>
                  <div className="mt-6 space-y-4 text-ink-soft leading-relaxed">
                    {paragraphs(home.meetTomi).map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                  <div className="mt-6">
                    <TailMeter />
                  </div>
                  <Link
                    href="/about"
                    className="mt-6 inline-block font-display text-lg text-jungle-deep underline decoration-sunshine decoration-4 underline-offset-4 hover:text-tiger-deep"
                  >
                    The story behind the stories →
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
        <div className="text-jungle-mist rotate-180">
          <Wave />
        </div>
      </section>

      {/* ---------- Theme song ---------- */}
      <section className="pt-12 sm:pt-16">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <Reveal>
            <ThemeSongPlayer />
          </Reveal>
        </div>
      </section>

      {/* ---------- Reviews ---------- */}
      {featured.length > 0 && (
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <SectionTitle eyebrow="From Tomi's readers">
                Bedtimes, brightened
              </SectionTitle>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featured.map((review, i) => (
                <Reveal key={review.quote.slice(0, 24)} delay={i * 100}>
                  <ReviewCard review={review} tilt={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Press strip (auto-hides when empty) ---------- */}
      {press.length > 0 && (
        <section className="pb-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
            <p className="font-display text-ink-soft mb-6">As featured in</p>
            <div className="flex flex-wrap items-center justify-center gap-10 opacity-70">
              {press.slice(0, 5).map((item) =>
                item.logo ? (
                  <Image
                    key={item.publication}
                    src={item.logo}
                    alt={item.publication}
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <span key={item.publication} className="font-display text-lg">
                    {item.publication}
                  </span>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Lead magnet ---------- */}
      <section className="relative">
        <div className="relative">
          <div className="absolute inset-x-0 -top-3 text-sunshine/50">
            <Wave />
          </div>
          <div className="relative text-tiger">
            <Wave />
          </div>
        </div>
        <div className="bg-tiger relative overflow-hidden">
          <Blob className="absolute -bottom-20 -right-16 w-80 h-80 text-sunshine/25" />
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-16 text-center">
            <Reveal>
              <h2 className="font-display text-3xl sm:text-4xl text-cream">
                Bring Tomi home today — for free
              </h2>
              <p className="mt-3 text-cream/90 text-lg">
                Get a printable Tomi colouring page, plus first news on new
                books and free activities for little readers.
              </p>
              <div className="mt-8 max-w-xl mx-auto">
                <SignupForm source="homepage" light />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
