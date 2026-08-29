import type { FaqItem } from "@/lib/types";

export default function FaqList({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="faq rounded-2xl bg-paper p-5 shadow-storybook"
        >
          <summary className="font-display text-lg text-ink">
            <span className="min-w-0 flex-1">{faq.question}</span>
          </summary>
          <p className="mt-3 text-ink-soft leading-relaxed">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
