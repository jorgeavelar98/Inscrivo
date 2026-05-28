"use client";

import { useTranslation } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export function Founder() {
  const { t } = useTranslation();

  return (
    <section id="about" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Photo placeholder — TODO: replace with a real photo */}
          <Reveal className="shrink-0">
            <div className="h-48 w-48 overflow-hidden rounded-2xl bg-accent/10 lg:h-56 lg:w-56">
              <div
                className="flex h-full w-full items-center justify-center text-accent/30"
                aria-label={t.founder.imageAlt}
                role="img"
              >
                <svg
                  width="72"
                  height="72"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={100} className="max-w-2xl">
            <p className="mb-3 inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              {t.founder.eyebrow}
            </p>
            <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl">
              {t.founder.heading}
            </h2>
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted">
              <p>{t.founder.body1}</p>
              <p>{t.founder.body2}</p>
              <p>{t.founder.body3}</p>
            </div>
            <p className="mt-6 font-semibold text-primary">{t.founder.signature}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
