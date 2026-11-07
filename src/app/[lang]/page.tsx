import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lobby } from "@/features/lobby/Lobby";
import { hasLocale } from "@/i18n/config";
import { landing } from "@/i18n/dictionaries/landing";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "", landing[lang].meta, { absoluteTitle: true });
}

export default async function LobbyRoute({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <Lobby lang={lang} />;
}
