import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/features/landing/LandingPage";
import { hasLocale } from "@/i18n/config";
import { landing } from "@/i18n/dictionaries/landing";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "", landing[lang].meta, { absoluteTitle: true });
}

export default async function LandingRoute({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LandingPage lang={lang} />;
}
