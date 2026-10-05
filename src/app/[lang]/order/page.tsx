import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site/SiteFooter";
import { OrderApp } from "@/features/order/OrderApp";
import { hasLocale } from "@/i18n/config";
import { order } from "@/i18n/dictionaries/order";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/order">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/order", order[lang].meta);
}

export default async function OrderRoute({ params }: PageProps<"/[lang]/order">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <OrderApp lang={lang}>
      <SiteFooter lang={lang} />
    </OrderApp>
  );
}
