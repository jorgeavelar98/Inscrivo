"use client";

import Image, { type StaticImageData } from "next/image";
import { useTranslation } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import dashboardImg from "../../public/dashboard.svg";
import sampleSiteImg from "../../public/sample-site.svg";

// TODO: replace these placeholder SVGs in /public with real screenshots
// (owner dashboard + a sample site Inscrivo has built).
const images: StaticImageData[] = [dashboardImg, sampleSiteImg];

export function FeatureShowcase() {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t.features.heading}
          subtitle={t.features.subheading}
        />

        <div className="mt-16 space-y-16 lg:space-y-24">
          {t.features.items.map((item, i) => {
            const imageFirst = i % 2 === 1;
            return (
              <Reveal
                key={item.title}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  className={`overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-primary/5 ${
                    imageFirst ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={images[i % images.length]}
                    alt={item.imageAlt}
                    className="h-auto w-full"
                  />
                </div>
                <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                  <h3 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
