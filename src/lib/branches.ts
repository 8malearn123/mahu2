import { fill, type Locale } from "@/i18n/config";
import { common } from "@/i18n/dictionaries/common";

export type BranchId = "corniche" | "prince" | "abuarish" | "sabya";

export type LatLng = { lat: number; lng: number };

type BranchCopy = { name: string; area: string; note: string };

export type Branch = LatLng & {
  id: BranchId;
  /** Opening hour, 24h clock. */
  open: number;
  /** Closing hour, 24h clock (24 = midnight). */
  close: number;
} & Record<Locale, BranchCopy>;

export const BRANCHES: readonly Branch[] = [
  {
    id: "corniche", lat: 16.8885, lng: 42.5456, open: 6, close: 23,
    en: { name: "Corniche", area: "Corniche Road, Jazan", note: "Two lanes in, exit south" },
    ar: { name: "الكورنيش", area: "طريق الكورنيش، جازان", note: "مسارَان للدخول، الخروج جنوباً" },
  },
  {
    id: "prince", lat: 16.8897, lng: 42.568, open: 6, close: 24,
    en: { name: "Prince Mohammed", area: "Prince Mohammed bin Nasser Road", note: "One lane, walk-up window too" },
    ar: { name: "الأمير محمد", area: "طريق الأمير محمد بن ناصر", note: "مسار واحد، وشباك للمشاة" },
  },
  {
    id: "abuarish", lat: 16.969, lng: 42.832, open: 6, close: 23,
    en: { name: "Abu Arish", area: "King Abdulaziz Road, Abu Arish", note: "Two lanes, easiest at night" },
    ar: { name: "أبو عريش", area: "طريق الملك عبدالعزيز، أبو عريش", note: "مسارَان، أهدأ في الليل" },
  },
  {
    id: "sabya", lat: 17.1494, lng: 42.6255, open: 6, close: 23,
    en: { name: "Sabya", area: "Al Thuqbah, Sabya", note: "Newest window, opened 2026" },
    ar: { name: "صبيا", area: "الثقبة، صبيا", note: "أحدث شباك، افتُتح 2026" },
  },
];

export const DEFAULT_BRANCH: BranchId = "corniche";

export function isBranchId(value: string | null | undefined): value is BranchId {
  return BRANCHES.some((b) => b.id === value);
}

export function getBranch(id: BranchId): Branch {
  return BRANCHES.find((b) => b.id === id) ?? BRANCHES[0];
}

/** Great-circle distance in kilometres. */
export function distanceKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la = (a.lat * Math.PI) / 180;
  const lb = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la) * Math.cos(lb) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function nearestBranch(from: LatLng): Branch {
  return BRANCHES.slice().sort((x, y) => distanceKm(from, x) - distanceKm(from, y))[0];
}

/** "1.4 km" under ten kilometres, whole kilometres after that. */
export function formatKm(km: number, lang: Locale): string {
  return `${km < 10 ? km.toFixed(1) : Math.round(km)} ${common[lang].km}`;
}

/** "11 PM" / "11 م" */
export function clockLabel(hour: number, lang: Locale): string {
  const hh = hour % 24;
  const n = hh % 12 === 0 ? 12 : hh % 12;
  const t = common[lang];
  return `${n} ${hh < 12 ? t.am : t.pm}`;
}

export function isOpenAt(branch: Branch, hour: number): boolean {
  return hour >= branch.open && hour < branch.close;
}

/** "Open · until 11 PM" or "Closed · opens 6 AM". */
export function statusLabel(branch: Branch, hour: number, lang: Locale): string {
  const t = common[lang];
  return isOpenAt(branch, hour)
    ? fill(t.openUntil, { t: clockLabel(branch.close, lang) })
    : fill(t.closedOpens, { t: clockLabel(branch.open, lang) });
}

export function directionsUrl(branch: LatLng): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}&travelmode=driving`;
}
