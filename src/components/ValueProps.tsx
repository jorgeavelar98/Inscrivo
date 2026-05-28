"use client";

import { useTranslation } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

/** Icons keyed by card position; purely decorative. */
const icons = [
  // You control your content — pencil
  "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",
  // Live in days — lightning
  "M13 2 3 14h7l-1 8 10-12h-7l1-8Z",
  // Mobile — phone
  "M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1ZM11 18h2",
  // Everything in one place — grid
  "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
];

export function ValueProps() {
  const { t } = useTranslation();

  return (
    <section id="benefits" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t.valueProps.heading}
          subtitle={t.valueProps.subheading}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.valueProps.cards.map((card, i) => (
            <Reveal
              as="article"
              key={card.title}
              delay={i * 90}
              className="group rounded-2xl border border-border bg-surface p-7 transition-shadow hover:shadow-xl hover:shadow-primary/5"
            >
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={icons[i % icons.length]} />
                </svg>
              </span>
              <h3 className="text-lg font-bold text-primary">{card.title}</h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted">
                {card.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
