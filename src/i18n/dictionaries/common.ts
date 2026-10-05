import type { Locale } from "../config";

// Copy shared by every page: site header, footer and branch status lines.
// The footer follows the landing page's copy; the other pages had drifted slightly.
const en = {
  nav: { menu: "Menu", find: "Find us", jobs: "Jobs", franchise: "Franchise" },
  order: "Order ahead",
  langSwitch: "العربية",
  menuLabel: "Menu",
  currency: "SAR",
  am: "AM",
  pm: "PM",
  openUntil: "Open · until {t}",
  closedOpens: "Closed · opens {t}",
  km: "km",
  directions: "Directions",
  footer: {
    tagline: "Specialty coffee drive thru. Jazan, Saudi Arabia. Since 2021.",
    menuEyebrow: "The menu",
    espresso: "Espresso",
    filter: "Filter",
    cold: "Cold",
    visit: "Visit",
    address: "Corniche Road, Jazan",
    hours: "6 AM – 11 PM, daily",
    follow: "Follow",
    instagram: "Instagram",
    careers: "Careers",
    franchise: "Franchise",
  },
};

export type CommonDictionary = typeof en;

const ar: CommonDictionary = {
  nav: { menu: "القائمة", find: "الموقع", jobs: "وظائف", franchise: "امتياز" },
  order: "اطلب مسبقاً",
  langSwitch: "English",
  menuLabel: "القائمة",
  currency: "ر.س",
  am: "ص",
  pm: "م",
  openUntil: "مفتوح · حتى {t}",
  closedOpens: "مغلق · يفتح {t}",
  km: "كم",
  directions: "الاتجاهات",
  footer: {
    tagline: "قهوة مختصة بنظام السيارات. جازان، السعودية. منذ 2021.",
    menuEyebrow: "القائمة",
    espresso: "إسبريسو",
    filter: "مفلترة",
    cold: "باردة",
    visit: "الزيارة",
    address: "طريق الكورنيش، جازان",
    hours: "6 ص – 11 م يومياً",
    follow: "تابعنا",
    instagram: "إنستقرام",
    careers: "وظائف",
    franchise: "الامتياز التجاري",
  },
};

export const common: Record<Locale, CommonDictionary> = { en, ar };

/** The window's phone number, shown as-is in both languages. */
export const PHONE_DISPLAY = "+966 17 000 0000";
