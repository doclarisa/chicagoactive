import { faqSchema, type FaqItem } from "@/lib/schema";

export default function PageFaq({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-14 border-t border-flag-blue-tint-2 pt-6" aria-label="Frequently asked questions">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(items)) }}
      />
      <h2 className="text-xl font-extrabold tracking-tight text-ink">Frequently asked questions</h2>
      <dl className="mt-4 flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="text-lg font-bold text-ink">{item.question}</dt>
            <dd className="mt-1 text-base leading-relaxed text-ink-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
