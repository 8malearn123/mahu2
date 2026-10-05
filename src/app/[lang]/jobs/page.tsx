import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobsPage } from "@/features/jobs/JobsPage";
import { hasLocale } from "@/i18n/config";
import { jobs } from "@/i18n/dictionaries/jobs";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/jobs">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/jobs", jobs[lang].meta);
}

export default async function JobsRoute({ params }: PageProps<"/[lang]/jobs">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <JobsPage lang={lang} />;
}
