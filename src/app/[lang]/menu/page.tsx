import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuSection } from "@/features/landing/MenuSection";
import { SectionPage } from "@/features/lobby/SectionPage";
import { hasLocale } from "@/i18n/config";
import { lobby } from "@/i18n/dictionaries/lobby";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/menu">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/menu", lobby[lang].pages.menu);
}

export default async function MenuRoute({ params }: PageProps<"/[lang]/menu">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <SectionPage lang={lang} page="menu">
      <MenuSection lang={lang} showLimited />
    </SectionPage>
  );
}
