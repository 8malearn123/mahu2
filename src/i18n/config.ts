export const locales = ["ar", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(lang: Locale): "rtl" | "ltr" {
  return lang === "ar" ? "rtl" : "ltr";
}

export function otherLocale(lang: Locale): Locale {
  return lang === "ar" ? "en" : "ar";
}

/** Prefix an app path with the locale: `localePath("en", "/order")` → `/en/order`. */
export function localePath(lang: Locale, path = ""): string {
  return `/${lang}${path}`;
}

/** Replace `{name}` placeholders, e.g. `fill("Open · until {t}", { t: "11 PM" })`. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
