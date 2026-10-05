import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FranchisePage } from "@/features/franchise/FranchisePage";
import { hasLocale } from "@/i18n/config";
import { franchise } from "@/i18n/dictionaries/franchise";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/franchise">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/franchise", franchise[lang].meta);
}

export default async function FranchiseRoute({ params }: PageProps<"/[lang]/franchise">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <FranchisePage lang={lang} />;
}
