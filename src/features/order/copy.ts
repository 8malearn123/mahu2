import { fill, type Locale } from "@/i18n/config";
import type { OrderDictionary } from "@/i18n/dictionaries/order";
import { pointsToGo } from "./pricing";
import type { LineOptions, Method, SavedCard } from "./types";

// Display strings built from the dictionary at render time (the state only holds ids and keys).

/** Drop the price note from a choice label: "Oat milk · +3" → "Oat milk". */
function bare(label: string): string {
  return label.split(" · ")[0];
}

/** "Large, Oat milk, Light" — the choices that differ from a plain single. */
export function optionText(o: LineOptions, t: OrderDictionary, lang: Locale): string {
  const bits: string[] = [];
  if (o.size === "large") bits.push(bare(t.sizes.large));
  bits.push(bare(t.milks[o.milk]));
  if (o.sweet !== "none") bits.push(t.sweets[o.sweet]);
  return bits.join(lang === "ar" ? "، " : ", ");
}

/** "40 to go" / "باقي 40 نقطة" */
export function toGoText(points: number, t: OrderDictionary, lang: Locale): string {
  const n = pointsToGo(points);
  return lang === "ar" ? `${t.cardToGo} ${n} ${t.cardOf}` : `${n} ${t.cardToGo}`;
}

/** The method being paid with; the saved card only when paying by card. */
export function payingWithText(method: Method, savedCard: SavedCard | null, t: OrderDictionary): string {
  return method === "card" && savedCard ? `${t.savedCardLabel} · ···· ${savedCard.last4}` : t.methods[method];
}

export function otpDigitLabel(index: number, t: OrderDictionary): string {
  return fill(t.otpDigit, { n: index + 1 });
}
