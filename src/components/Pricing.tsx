"use client";

import { useTranslation } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { CtaButton } from "@/components/CtaButton";
import { SectionHeading } from "@/components/SectionHeading";

export function Pricing() {
  const { t } = useTranslation();

  return (
    // NOTE: Only the Standard plan is shown publicly. The Basic plan is sold in
    // person and must never appear on this site.
    // TODO: confirm $699 setup / $99 month against live Stripe products before launch.
    <section id="pricing" className="bg-primary py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t.pricing.heading}
          subtitle={t.pricing.subheading}
          tone="light"
        />

        <Reveal className="mx-auto mt-12 max-w-lg">
          <div className="overflow-hidden rounded-3xl bg-background text-foreground shadow-2xl">
            <div className="bg-surface px-8 py-8 text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                {t.pricing.planName}
              </p>
              <div className="mt-4 flex flex-wrap items-end justify-center gap-x-2 gap-y-1">
                <span className="text-5xl font-extrabold text-primary">
                  {t.pricing.setupPrice}
                </span>
                <span className="mb-1.5 text-muted">
                  {t.pricing.setupLabel}
                </span>
              </div>
              <p className="mt-2 text-lg text-primary">
                <span className="font-bold">{t.pricing.monthlyPrice}</span>{" "}
                <span className="text-muted">{t.pricing.monthlyLabel}</span>
              </p>
            </div>

            <div className="px-8 py-8">
              <p className="text-sm font-bold uppercase tracking-wide text-muted">
                {t.pricing.includedHeading}
              </p>
              <ul className="mt-5 space-y-3">
                {t.pricing.included.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.79 6.8-6.79a1 1 0 0 1 1.4 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-pretty leading-relaxed text-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* TODO: point this CTA at the real destination (contact form,
                  Calendly/booking link, or mailto:). Currently scrolls to #contact. */}
              <CtaButton href="#contact" className="mt-8 w-full">
                {t.pricing.cta}
              </CtaButton>
              <p className="mt-4 text-center text-sm text-muted">
                {t.pricing.fineprint}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
