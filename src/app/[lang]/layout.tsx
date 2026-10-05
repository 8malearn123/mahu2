import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { dirOf, hasLocale, locales } from "@/i18n/config";
import { common } from "@/i18n/dictionaries/common";
import { fontVariables } from "../fonts";
import "../globals.css";

// Only /ar and /en exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: { default: "Mahu", template: "%s · Mahu" },
    description: common[lang].footer.tagline,
  };
}

export const viewport: Viewport = {
  themeColor: "#067B80",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} dir={dirOf(lang)} className={fontVariables} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
