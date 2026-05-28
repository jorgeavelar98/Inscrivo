"use client";

import { useTranslation } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t.howItWorks.heading}
          subtitle={t.howItWorks.subheading}
        />

        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {t.howItWorks.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.number}
              delay={i * 120}
              className="relative rounded-2xl bg-background p-8 shadow-sm ring-1 ring-border"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl font-extrabold text-accent-foreground">
                {step.number}
              </span>
              <h3 className="mt-6 text-xl font-bold text-primary">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
