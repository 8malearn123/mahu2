import type { Locale } from "../config";

// The lobby (the home page, after effect.sa's link-in-bio) and the section pages it opens.
// The intro's headline and the "من جازان" sign reuse the landing copy (`landing.hero`, `landing.story`).
const en = {
  skip: "Skip to the sections",
  since: "Specialty coffee drive thru · Jazan · Since 2021",
  navLabel: "Mahu sections",
  order: "Order ahead",
  orderNote: "Your order's ready in 6 minutes",
  menu: "Menu",
  branches: "Branches",
  directions: "Take me to a window",
  points: "Mahu points",
  jobs: "Jobs",
  franchise: "Franchise",
  journey: "The whole Mahu journey",
  review: "Rate your visit",
  soon: "Soon",
  home: "Home",
  back: "Back to sections",
  follow: "Follow Mahu",
  langLabel: "العربية",
  endLine: "A journey, lived in every cup",
  rights: "Mahu. All rights reserved.",
  pages: {
    menu: {
      title: "Menu",
      description: "A short list, pulled properly: the Mahu latte, orange coffee, cold brew and more. Order ahead and pick it up ready.",
    },
    branches: {
      title: "Branches",
      description: "Four drive-thru windows from Jazan up to Sabya. Find the nearest and order from it.",
    },
    points: {
      title: "Mahu points",
      description: "Every riyal is a point, kept on your number. At 100 points the next drink is on us.",
    },
    journey: {
      title: "The whole Mahu journey",
      description: "All of Mahu on one page: the menu, the points, the story and the four windows.",
    },
  },
};

export type LobbyDictionary = typeof en;

const ar: LobbyDictionary = {
  skip: "تخطَّ إلى الأقسام",
  since: "قهوة مختصة بنظام السيارات · جازان · منذ 2021",
  navLabel: "أقسام ماهو",
  order: "اطلب مسبقاً",
  orderNote: "6 دقائق وطلبك جاهز",
  menu: "المنيو",
  branches: "الفروع",
  directions: "خذني للشباك",
  points: "نقاط ماهو",
  jobs: "وظائف",
  franchise: "الامتياز التجاري",
  journey: "رحلة ماهو كاملة",
  review: "قيّم زيارتك",
  soon: "قريباً",
  home: "الصفحة الرئيسية",
  back: "العودة للأقسام",
  follow: "تابع ماهو",
  langLabel: "English",
  endLine: "رحلة تُعاش في كل كوب",
  rights: "ماهو. جميع الحقوق محفوظة.",
  pages: {
    menu: {
      title: "المنيو",
      description: "قائمة قصيرة، محضّرة بإتقان: لاتيه ماهو، قهوة بالبرتقال، كولد برو وغيرها. اطلبها مسبقاً وخذها جاهزة.",
    },
    branches: {
      title: "الفروع",
      description: "أربعة شبابيك من جازان إلى صبيا. شوف الأقرب لك واطلب منه.",
    },
    points: {
      title: "نقاط ماهو",
      description: "كل ريال نقطة محفوظة على رقمك، وعند 100 نقطة كوبك التالي علينا.",
    },
    journey: {
      title: "رحلة ماهو كاملة",
      description: "ماهو كلها في صفحة وحدة: المنيو، والنقاط، والحكاية، والشبابيك الأربعة.",
    },
  },
};

export const lobby: Record<Locale, LobbyDictionary> = { en, ar };
