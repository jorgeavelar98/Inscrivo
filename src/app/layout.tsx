import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { I18nProvider } from "@/lib/i18n";
import { translations } from "@/lib/translations";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/*
 * SEO metadata. This is a single-page, client-toggled bilingual site, so the
 * server-rendered <title>/<meta> use English as the default (the document title is
 * updated client-side when the visitor switches to Spanish — see lib/i18n.tsx).
 * TODO: replace metadataBase with the real production domain before launch.
 * TODO: add a real /public/og-image.png (1200x630) for richer link previews.
 */
const en = translations.en;

export const metadata: Metadata = {
  metadataBase: new URL("https://inscrivo.com"),
  title: {
    default: en.meta.title,
    template: "%s | Inscrivo",
  },
  description: en.meta.description,
  keywords: [
    "restaurant website",
    "sitio web para restaurante",
    "restaurant web design",
    "menu website",
    "restaurant hosting",
  ],
  openGraph: {
    title: en.meta.title,
    description: en.meta.description,
    type: "website",
    siteName: "Inscrivo",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    images: [
      {
        // TODO: add public/og-image.png — placeholder reference for now.
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: en.meta.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: en.meta.title,
    description: en.meta.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <I18nProvider>{children}</I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
