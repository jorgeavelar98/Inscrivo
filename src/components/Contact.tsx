"use client";

import { useState, type FormEvent } from "react";
import { useTranslation } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire this form to a real destination — e.g. an email service
    // (Formspree/Resend), an API route, or a booking link (Calendly).
    // For now it just shows a confirmation message client-side.
    setSubmitted(true);
  }

  const inputClasses =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 min-h-[3rem]";

  return (
    <section id="contact" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-primary text-white shadow-2xl">
          <div className="grid gap-0 lg:grid-cols-2">
            {/* Pitch */}
            <Reveal className="flex flex-col justify-center p-8 lg:p-12">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                {t.contact.heading}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/75">
                {t.contact.subheading}
              </p>
              <div className="mt-8 space-y-2 text-white/80">
                <p className="text-sm font-bold uppercase tracking-wide text-accent-light">
                  {t.contact.orReachUs}
                </p>
                {/* TODO: replace with the real Inscrivo email and phone number. */}
                <p>
                  <a
                    href={`mailto:${t.contact.emailValue}`}
                    className="font-medium underline-offset-4 hover:underline"
                  >
                    {t.contact.emailValue}
                  </a>
                </p>
                <p>
                  <a
                    href={`tel:${t.contact.phoneValue.replace(/[^0-9+]/g, "")}`}
                    className="font-medium underline-offset-4 hover:underline"
                  >
                    {t.contact.phoneValue}
                  </a>
                </p>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal
              delay={120}
              className="bg-white/5 p-8 backdrop-blur-sm lg:p-12"
            >
              {submitted ? (
                <div
                  role="status"
                  className="flex h-full min-h-[16rem] flex-col items-center justify-center text-center"
                >
                  <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <svg
                      className="h-7 w-7"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <p className="text-lg font-medium text-white">
                    {t.contact.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-white/90"
                    >
                      {t.contact.nameLabel}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder={t.contact.namePlaceholder}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-white/90"
                    >
                      {t.contact.emailLabel}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder={t.contact.emailPlaceholder}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="restaurant"
                      className="mb-1.5 block text-sm font-medium text-white/90"
                    >
                      {t.contact.restaurantLabel}
                    </label>
                    <input
                      id="restaurant"
                      name="restaurant"
                      type="text"
                      required
                      placeholder={t.contact.restaurantPlaceholder}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-white/90"
                    >
                      {t.contact.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder={t.contact.messagePlaceholder}
                      className={`${inputClasses} resize-y`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="min-h-[3rem] w-full rounded-full bg-accent px-6 py-3 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {t.contact.submit}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
