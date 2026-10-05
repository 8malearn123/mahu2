import type { Metadata } from "next";
import { localePath, type Locale } from "./config";

type PageMeta = {
  /** Page title; the root layout appends " · Mahu". */
  title: string;
  description: string;
};

/** Title, description, and links to the same page in the other language. */
export function pageMetadata(lang: Locale, path: string, meta: PageMeta, { absoluteTitle = false } = {}): Metadata {
  return {
    title: absoluteTitle ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: {
      canonical: localePath(lang, path),
      languages: { ar: localePath("ar", path), en: localePath("en", path) },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      siteName: "Mahu",
      locale: lang === "ar" ? "ar_SA" : "en_US",
    },
  };
}
