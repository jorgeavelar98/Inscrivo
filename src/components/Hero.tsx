"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { CtaButton } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";
import heroPhone from "../../public/hero-phone.svg";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-primary text-white"
    >
      {/* Warm ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-36">
        <Reveal className="max-w-xl">
          <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-accent-light">
            {t.hero.eyebrow}
          </p>
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-white/75">
            {t.hero.subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaButton href="#contact" variant="primary">
              {t.hero.ctaPrimary}
            </CtaButton>
            <CtaButton href="#how-it-works" variant="ghost">
              {t.hero.ctaSecondary}
            </CtaButton>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto w-full max-w-md">
          {/* TODO: replace public/hero-phone.svg with a real mock/screenshot of a site Inscrivo built. */}
          <Image
            src={heroPhone}
            alt={t.hero.imageAlt}
            priority
            className="h-auto w-full drop-shadow-2xl"
          />
        </Reveal>
      </div>
    </section>
  );
}
