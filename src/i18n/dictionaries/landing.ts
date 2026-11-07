import type { Locale } from "../config";

// Landing page copy, ported verbatim from the design's COPY (only the strings the page renders).
// Shared strings (order button, currency, km, branch status, directions) live in `common`;
// language-neutral data (prices, badge tones, photo slots) in src/features/landing/data.ts.
const en = {
  meta: {
    title: "Mahu · Specialty coffee drive thru, Jazan",
    description: "Order ahead, swing by your nearest window, and pick up your coffee while it's ready for you.",
  },
  hero: {
    eyebrow: "Jazan, from the mountains to the sea",
    titleA: "Your coffee,",
    titleB: "your way.",
    body: "Order ahead, swing by your nearest window, and pick up your coffee while it's ready for you.",
    findWindow: "Find a window",
    imageAlt: "A coastline at dusk — mountains, sea and leaves in the foreground — with the Māhū wordmark",
  },
  how: {
    titleA: "Order. Collect.",
    titleB: "Keep driving.",
    step1: "Order from the road",
    step2: "Pay ahead",
    step3: "Cup in your hand",
    kicker: "6 min and your order's ready",
  },
  menu: {
    titleA: "Short list,",
    titleB: "pulled properly",
    viewAll: "See the full menu",
    add: "Add to order",
    featured: {
      "mahu-latte": {
        name: "Mahu latte",
        note: "Condensed milk, double shot",
        badge: "Most ordered",
        proof: "One in three cups leaving the window",
      },
      orange: {
        name: "Orange coffee",
        note: "Cold brew, orange, tonic",
        badge: "Limited",
        proof: "Fifty a day, usually gone by 14:00",
      },
      "cold-brew": {
        name: "Cold brew",
        note: "Overnight, no sugar",
        badge: "For the heat",
        proof: "Brewed last night, poured over ice",
      },
    },
    dropTitle: "This week: orange coffee",
    dropBody: "Cold brew, orange, tonic. Fifty cups a day, then it's gone.",
  },
  loyalty: {
    titleA: "Every riyal,",
    titleB: "a point",
    body: "Your points sit on your number. Spend, collect, and at 100 points the next drink is on us — nothing to sign up for, nothing to carry.",
    cta: "Start collecting",
    card: {
      label: "Mahu points · on your number",
      balance: "Your points",
      rule: "100 points = free drink",
      unit: "points",
      toGo: "{n} points to your free drink",
      footer: "Keep it on your number",
    },
  },
  story: {
    eyebrow: "Our story",
    title: "Your moment starts at Māhū",
    body1: "Our story began in the heart of Jazan, and so did our passion: serving coffee in the belief that every cup is part of an experience, and every detail carries the care we put into Mahu.",
    body2: "Mahu's identity draws on the magic of the Hawaiian islands and the warmth of their tropical nature, in harmony with Jazan's beauty, its natural variety and its singular spirit. From that kinship came an identity with a sense of place, calm in its details and warm in its welcome — so every moment with Mahu feels closer to a journey, lived one cup at a time.",
    visit: "Visit the window",
    alt: {
      cup: "A Mahu cup in the orange-to-coral sunset gradient",
      stickers: "A parcel wrapped in Mahu paper, sealed with the round sticker",
      carrier: "A Mahu coffee carrier pouring into a cup",
    },
  },
  find: {
    titleA: "Four windows,",
    titleB: "from Jazan up to Sabya",
    count: "Four windows open today",
    locate: "Nearest to me",
    locating: "Finding you…",
    locateOff: "Location unavailable",
    nearestTag: "Nearest to you",
    orderHere: "Order here",
  },
  cta: {
    title: "Four minutes out? Start the order.",
    sub: "Order ahead and pick it up when you arrive.",
  },
};

export type LandingDictionary = typeof en;

const ar: LandingDictionary = {
  meta: {
    title: "ماهو · قهوة مختصة بنظام السيارات، جازان",
    description: "اطلبها مسبقًا، مرّ من أقرب نقطة، وخذ قهوتك وهي جاهزة لك.",
  },
  hero: {
    eyebrow: "جازان من جبالها إلى بحرها",
    titleA: "قهوتك،",
    titleB: "على طريقك.",
    body: "اطلبها مسبقًا، مرّ من أقرب نقطة، وخذ قهوتك وهي جاهزة لك.",
    findWindow: "وين الشباك؟",
    imageAlt: "ساحل عند الغروب بين الجبال والبحر، وأوراق خضراء في المقدمة، وشعار ماهو في المنتصف",
  },
  how: {
    titleA: "اطلب. استلم.",
    titleB: "وكمّل طريقك.",
    step1: "اطلب وانت بالطريق",
    step2: "ادفع مسبقاً",
    step3: "كوبك بيدك",
    kicker: "6 دقائق وطلبك جاهز",
  },
  menu: {
    titleA: "قائمة قصيرة،",
    titleB: "محضّرة بإتقان",
    viewAll: "شوف القائمة كاملة",
    add: "أضف للطلب",
    featured: {
      "mahu-latte": {
        name: "لاتيه ماهو",
        note: "حليب مكثف، شوتان",
        badge: "الأكثر طلباً",
        proof: "كوب من كل ثلاثة يخرج من الشباك",
      },
      orange: {
        name: "قهوة بالبرتقال",
        note: "كولد برو، برتقال، تونيك",
        badge: "محدود",
        proof: "خمسون كوباً في اليوم، تنتهي قبل 14:00",
      },
      "cold-brew": {
        name: "كولد برو",
        note: "منقوعة ليلة كاملة، بدون سكر",
        badge: "للحرّ",
        proof: "منقوعة من الليل وتُسكب على الثلج",
      },
    },
    dropTitle: "هذا الأسبوع: قهوة بالبرتقال",
    dropBody: "كولد برو، برتقال، تونيك. خمسون كوباً في اليوم، وتنتهي.",
  },
  loyalty: {
    titleA: "كل ريال",
    titleB: "نقطة",
    body: "نقاطك محفوظة على رقمك. اطلب، تتجمع النقاط، وعند 100 نقطة كوبك التالي علينا.",
    cta: "ابدأ الجمع",
    card: {
      label: "نقاط ماهو · على رقمك",
      balance: "نقاطك",
      rule: "100 نقطة = كوب مجاني",
      unit: "نقطة",
      toGo: "باقي {n} نقطة على كوبك المجاني",
      footer: "محفوظة على رقمك",
    },
  },
  story: {
    eyebrow: "قصتنا",
    title: "لحظتك تبدأ من ماهو",
    body1: "من قلب جازان بدأت حكايتنا، ومنها وُلد شغفنا بتقديم القهوة بروح تؤمن بأن كل كوب هو امتداد لتجربة، وتفصيل يجسّد الشغف الذي نصنعه في ماهو.",
    body2: "بُنيت هوية ماهو بطابع يستلهم سحر جزر هاواي ودفء طبيعتها الاستوائية، في تناغم يلتقي مع جمال جازان وتنوعها الطبيعي وروحها الفريدة. ومن هذا التشابه وُلدت هوية تحمل الإحساس بالمكان، وهدوء التفاصيل، ودفء التجربة؛ لتصبح كل لحظة مع ماهو أقرب إلى رحلة تُعاش مع كل كوب.",
    visit: "زورونا عند الشباك",
    alt: {
      cup: "كوب ماهو بتدرّج الغروب من البرتقالي إلى المرجاني",
      stickers: "طرد مغلّف بورق ماهو ومختوم بالملصق الدائري",
      carrier: "حافظة قهوة ماهو تسكب في كوب",
    },
  },
  find: {
    titleA: "أربعة شبابيك،",
    titleB: "من جازان إلى صبيا",
    count: "أربعة شبابيك مفتوحة اليوم",
    locate: "الأقرب لي",
    locating: "نحدد موقعك…",
    locateOff: "تعذّر تحديد الموقع",
    nearestTag: "الأقرب لك",
    orderHere: "اطلب من هنا",
  },
  cta: {
    title: "على بُعد أربع دقائق؟ ابدأ طلبك.",
    sub: "اطلبها الآن، وخذها جاهزة عند وصولك.",
  },
};

export const landing: Record<Locale, LandingDictionary> = { en, ar };
