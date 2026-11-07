import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/features/landing/LandingPage";
import { hasLocale } from "@/i18n/config";
import { lobby } from "@/i18n/dictionaries/lobby";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/journey">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/journey", lobby[lang].pages.journey);
}

/** The whole landing page in one scroll, as it was before the lobby: the list's "رحلة ماهو كاملة". */
export default async function JourneyRoute({ params }: PageProps<"/[lang]/journey">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LandingPage lang={lang} />;
}
