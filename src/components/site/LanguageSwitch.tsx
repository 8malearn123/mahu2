"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { otherLocale, type Locale } from "@/i18n/config";
import { common } from "@/i18n/dictionaries/common";

/** The current page's path in the other language. Query and hash are dropped on purpose. */
export function useSwitchHref(lang: Locale): string {
  const pathname = usePathname() ?? `/${lang}`;
  return pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${otherLocale(lang)}`);
}

type LanguageSwitchProps = {
  lang: Locale;
  className?: string;
  onClick?: () => void;
};

/**
 * Link to the same page in the other language. It is labelled, and typeset, in that language:
 * the `lang` attribute picks up the matching type tokens.
 */
export function LanguageSwitch({ lang, className, onClick }: LanguageSwitchProps) {
  const href = useSwitchHref(lang);
  const other = otherLocale(lang);
  return (
    <Link href={href} replace scroll={false} lang={other} hrefLang={other} className={className} onClick={onClick}>
      {common[lang].langSwitch}
    </Link>
  );
}
