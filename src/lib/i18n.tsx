"use client";

/**
 * Lightweight, dependency-free internationalization.
 *
 * A React context holds the active locale and exposes the matching slice of the
 * translation dictionary. No i18n framework — just a typed dictionary, a provider,
 * and a `useTranslation()` hook.
 *
 * Behavior required by the brief:
 *  - First visit defaults to the browser language (Spanish speakers land in Spanish),
 *    falling back to English.
 *  - The chosen locale is persisted to localStorage.
 *  - `<html lang>` is kept in sync with the active locale.
 *
 * The active locale lives in localStorage and is read through `useSyncExternalStore`,
 * which renders the server/default value during hydration and then resolves the
 * browser preference on the client — no hydration mismatch, no setState-in-effect.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  defaultLocale,
  locales,
  translations,
  type Locale,
  type Translation,
} from "@/lib/translations";

const STORAGE_KEY = "inscrivo-locale";

function isLocale(value: string | null): value is Locale {
  return value !== null && (locales as readonly string[]).includes(value);
}

// --- External store backed by localStorage -------------------------------

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): Locale {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) {
    return stored;
  }
  const browser = window.navigator.language?.toLowerCase() ?? "";
  return browser.startsWith("es") ? "es" : defaultLocale;
}

function getServerSnapshot(): Locale {
  return defaultLocale;
}

function writeLocale(next: Locale) {
  window.localStorage.setItem(STORAGE_KEY, next);
  emitChange();
}

// --- Context -------------------------------------------------------------

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Translation;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Keep <html lang> and the document title in sync with the active locale.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = translations[locale].meta.title;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    writeLocale(next);
  }, []);

  const toggleLocale = useCallback(() => {
    writeLocale(getSnapshot() === "en" ? "es" : "en");
  }, []);

  const value: I18nContextValue = {
    locale,
    setLocale,
    toggleLocale,
    t: translations[locale],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation(): I18nContextValue {
  const context = useContext(I18nContext);
  if (context === null) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
