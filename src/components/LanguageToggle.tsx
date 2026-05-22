"use client";

import { useTranslation } from "@/lib/i18n";
import { locales, type Locale } from "@/lib/translations";

/**
 * EN | ES language toggle. The active locale is highlighted; the choice is
 * persisted to localStorage by the i18n provider.
 */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t.nav.toggleAria}
      className={`inline-flex items-center rounded-full border border-border bg-background/60 p-0.5 text-sm font-semibold ${className}`}
    >
      {locales.map((code: Locale) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={`min-w-[2.75rem] rounded-full px-3 py-2 uppercase tracking-wide transition-colors ${
              active
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
