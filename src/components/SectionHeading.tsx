"use client";

import { Reveal } from "@/components/Reveal";

/**
 * The centered heading + subheading that opens most sections. Extracted so the
 * five sections that use it stay visually consistent and DRY.
 *
 * `tone="light"` is for sections on the dark primary background (white text);
 * `tone="dark"` (default) is for sections on light backgrounds.
 */
export function SectionHeading({
  title,
  subtitle,
  tone = "dark",
}: {
  title: string;
  subtitle: string;
  tone?: "dark" | "light";
}) {
  const titleColor = tone === "light" ? "text-white" : "text-primary";
  const subtitleColor = tone === "light" ? "text-white/70" : "text-muted";

  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <h2
        className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${titleColor}`}
      >
        {title}
      </h2>
      <p className={`mt-4 text-lg ${subtitleColor}`}>{subtitle}</p>
    </Reveal>
  );
}
