import type { Review } from "@/lib/types";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-sunshine" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor" aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({
  review,
  tilt = 0,
}: {
  review: Review;
  tilt?: number;
}) {
  const rotation = ["rotate-[1deg]", "-rotate-[1deg]", "rotate-[0.5deg]"][tilt % 3];
  return (
    <figure
      className={`${rotation} relative rounded-2xl bg-paper p-6 pt-7 shadow-storybook transition-transform duration-300 hover:rotate-0 hover:-translate-y-1`}
    >
      <span
        aria-hidden
        className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 rounded-sm bg-sunshine/60 shadow-sm"
      />
      {review.starRating ? <Stars rating={review.starRating} /> : null}
      <blockquote className="mt-3 text-ink leading-relaxed">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-4 text-sm font-bold text-ink-soft">
        {review.reviewerName}
        {review.source ? (
          <span className="font-normal"> · {review.source}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}
