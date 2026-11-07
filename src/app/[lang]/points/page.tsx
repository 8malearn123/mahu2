import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Loyalty } from "@/features/landing/Loyalty";
import { SectionPage } from "@/features/lobby/SectionPage";
import { hasLocale } from "@/i18n/config";
import { lobby } from "@/i18n/dictionaries/lobby";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/points">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/points", lobby[lang].pages.points);
}

export default async function PointsRoute({ params }: PageProps<"/[lang]/points">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <SectionPage lang={lang} page="points">
      <Loyalty lang={lang} />
    </SectionPage>
  );
}
