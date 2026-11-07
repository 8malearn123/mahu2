import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FindUs } from "@/features/landing/FindUs";
import { SectionPage } from "@/features/lobby/SectionPage";
import { hasLocale } from "@/i18n/config";
import { landing } from "@/i18n/dictionaries/landing";
import { lobby } from "@/i18n/dictionaries/lobby";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/branches">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/branches", lobby[lang].pages.branches);
}

export default async function BranchesRoute({ params }: PageProps<"/[lang]/branches">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <SectionPage lang={lang} page="branches">
      <FindUs lang={lang} t={landing[lang].find} />
    </SectionPage>
  );
}
