import type { Locale } from "../config";

// Copy for the franchise page, ported verbatim from the design's COPY (only the keys it renders).
// Header and footer copy lives in `common`.
const en = {
  meta: {
    title: "Open a Mahu window in your city",
    description:
      "One proven model from Jazan: a small plot, two windows, six minutes a car. We open it with you, from the site to the first cup.",
  },
  hero: {
    heroTitleA: "Open a Mahu window",
    heroTitleB: "in your city",
    heroBody:
      "One proven model from Jazan: a small plot, two windows, six minutes a car. We open it with you, from the site to the first cup.",
    register: "Register interest",
    boxAlt: "Mahu box",
    boxLine: "A brand ready to run",
    boxSub: "Identity, app, supply",
  },
  proof: {
    proofTitle: "A small window, a big number",
    // `dir` sets the figure's direction ("1 من 3" reads right to left).
    stats: [
      { value: "412", unit: "cups", label: "on an ordinary Tuesday at the Corniche window", dir: "ltr" },
      { value: "6", unit: "minutes", label: "order to hand-off, averaged over the month", dir: "ltr" },
      { value: "1 in 3", unit: "customers", label: "come back within the week — points bring them", dir: "ltr" },
      { value: "2021", unit: "founded", label: "same team since, now four windows", dir: "ltr" },
    ],
  },
  pack: {
    packTitle: "We open it with you",
    items: [
      { title: "Site study", body: "We read the traffic and sign off the site with you before you commit money." },
      {
        title: "Design and build",
        body: "Ready window drawings, the equipment list, and build supervision to handover.",
      },
      {
        title: "Training",
        body: "Two weeks in Jazan for you and your team, then a trainer on site for ten days.",
      },
      { title: "Beans and supply", body: "Mahu roast and network-price supply contracts, delivered ready." },
      { title: "App and points", body: "Order-ahead and the points programme run at your branch from day one." },
      {
        title: "Marketing and opening",
        body: "Opening campaign, photography, and monthly content from the brand team.",
      },
    ],
  },
  enquire: {
    formTitle: "Register interest",
    formBody:
      "We read every enquiry ourselves. Fill these fields and we'll come back within five working days with a call slot.",
    deckTitle: "Prefer the pack?",
    deckBody: "We send the full franchise pack — financial model, drawings, site criteria — after the first call.",
    deckLink: "Or email us:",
  },
  form: {
    nameLabel: "Full name",
    namePlaceholder: "e.g. Fahad Al-Ahmadi",
    phoneLabel: "Mobile number",
    cityLabel: "Target city",
    cityPick: "Pick a city",
    cities: ["Jazan", "Abha", "Riyadh", "Jeddah", "Dammam", "Madinah", "Taif", "Another city"],
    capitalLabel: "Available capital",
    capitalHint: "Liquid, without bank finance.",
    capitalPick: "Pick a range",
    capitals: ["Under 500k SAR", "500 – 750k SAR", "750k – 1.1M SAR", "Over 1.1M SAR"],
    siteLabel: "Do you have a site?",
    sites: ["I own land", "Still looking", "I lease a property"],
    expLabel: "Operating experience",
    expPick: "Pick one",
    exps: ["None in food service", "Experience in another sector", "I run a food business", "I run several stores"],
    aboutLabel: "Short note",
    aboutPlaceholder: "Where is the site? Why Mahu?",
    aboutHint: "Two lines is plenty. Optional.",
    consent: "I agree to be contacted on this number about my franchise enquiry.",
    submit: "Send enquiry",
    submitFine: "This form registers interest and is not an offer or a commitment to grant a franchise.",
    errName: "Please write your full name.",
    errPhone: "Enter a valid Saudi mobile starting with 5.",
    errCity: "Pick your target city.",
    errCapital: "Pick your available capital range.",
    errConsent: "We need your consent before sending.",
    sentTitle: "We've got it",
    sentBody: "We'll review it and call within five working days. Keep the reference for follow-up.",
    refLabel: "Reference",
    sentMail: "Send documents or questions to franchise@mahu.cafe",
  },
};

export type FranchiseDictionary = typeof en;

const ar: FranchiseDictionary = {
  meta: {
    title: "افتح شباك ماهو في مدينتك",
    description:
      "نموذج واحد مجرّب في جازان: أرض صغيرة، شباكان، وست دقائق لكل سيارة. نفتحه معك من الموقع حتى أول كوب.",
  },
  hero: {
    heroTitleA: "افتح شباك ماهو",
    heroTitleB: "في مدينتك",
    heroBody:
      "نموذج واحد مجرّب في جازان: أرض صغيرة، شباكان، وست دقائق لكل سيارة. نفتحه معك من الموقع حتى أول كوب.",
    register: "سجّل اهتمامك",
    boxAlt: "علبة ماهو",
    boxLine: "علامة جاهزة للتشغيل",
    boxSub: "هوية، تطبيق، وتوريد",
  },
  proof: {
    // The design had the typo "بارقام".
    proofTitle: "شباك صغير بأرقام كبيرة",
    stats: [
      { value: "412", unit: "كوب", label: "في يوم ثلاثاء عادي عند شباك الكورنيش", dir: "ltr" },
      { value: "6", unit: "دقائق", label: "من الطلب إلى تسليم الكوب، بمتوسط الشهر", dir: "ltr" },
      { value: "1 من 3", unit: "عملاء", label: "يعودون خلال الأسبوع، والنقاط تجيب بهم", dir: "rtl" },
      { value: "2021", unit: "التأسيس", label: "وبنفس الفريق حتى اليوم، أربعة شبابيك", dir: "ltr" },
    ],
  },
  pack: {
    packTitle: "نفتح معك، خطوة بخطوة",
    items: [
      { title: "دراسة الموقع", body: "نحلل الحركة المرورية ونعتمد الموقع معك قبل أي التزام مالي." },
      { title: "التصميم والتنفيذ", body: "مخططات الشباك الجاهزة، قائمة المعدات، ومتابعة التنفيذ حتى التسليم." },
      { title: "التدريب", body: "أسبوعان في جازان لك ولفريقك، ثم مدرّب معك في أول عشرة أيام." },
      { title: "البن والتوريد", body: "بن ماهو محمّص وعقود التوريد بأسعار الشبكة، تصلك جاهزة." },
      { title: "التطبيق والنقاط", body: "الطلب المسبق ونظام النقاط يعملان في فرعك من اليوم الأول." },
      { title: "التسويق والافتتاح", body: "حملة الافتتاح، التصوير، والمحتوى الشهري من فريق العلامة." },
    ],
  },
  enquire: {
    formTitle: "سجّل اهتمامك",
    formBody: "نقرأ كل طلب بأنفسنا. املأ الحقول التالية ونرد عليك خلال خمسة أيام عمل بموعد مكالمة.",
    deckTitle: "تفضّل الملف؟",
    deckBody: "نرسل ملف الامتياز الكامل (النموذج المالي، المخططات، ومعايير الموقع) بعد المكالمة الأولى.",
    deckLink: "أو راسلنا:",
  },
  form: {
    nameLabel: "الاسم الكامل",
    namePlaceholder: "مثال: فهد الأحمدي",
    phoneLabel: "رقم الجوال",
    cityLabel: "المدينة المستهدفة",
    cityPick: "اختر المدينة",
    cities: ["جازان", "أبها", "الرياض", "جدة", "الدمام", "المدينة المنورة", "الطائف", "مدينة أخرى"],
    capitalLabel: "رأس المال المتوفر",
    capitalHint: "سائل، دون تمويل بنكي.",
    capitalPick: "اختر النطاق",
    capitals: ["أقل من 500 ألف ر.س", "500 – 750 ألف ر.س", "750 ألف – 1.1 مليون ر.س", "أكثر من 1.1 مليون ر.س"],
    siteLabel: "هل تملك موقعاً؟",
    sites: ["أملك أرضاً", "أبحث عن موقع", "لديّ عقار مستأجر"],
    expLabel: "خبرتك في التشغيل",
    expPick: "اختر خبرتك",
    exps: ["بدون خبرة في المطاعم", "خبرة في قطاع آخر", "أملك مشروع أغذية قائم", "أدير عدة فروع"],
    aboutLabel: "نبذة قصيرة",
    aboutPlaceholder: "وين الموقع؟ وليش ماهو؟",
    aboutHint: "سطران يكفيان. اختياري.",
    consent: "أوافق على التواصل معي عبر هذا الرقم بخصوص طلب الامتياز.",
    submit: "أرسل الطلب",
    submitFine: "هذا النموذج تسجيل اهتمام، ولا يُعدّ عرضاً أو التزاماً بمنح امتياز.",
    errName: "اكتب اسمك الكامل.",
    errPhone: "أدخل رقم جوال سعودي صحيح يبدأ بـ 5.",
    errCity: "اختر المدينة المستهدفة.",
    errCapital: "اختر نطاق رأس المال المتوفر.",
    errConsent: "نحتاج موافقتك على التواصل قبل الإرسال.",
    sentTitle: "وصلنا طلبك",
    sentBody: "نراجعه ونتصل بك خلال خمسة أيام عمل. احفظ الرقم المرجعي للمتابعة.",
    refLabel: "الرقم المرجعي",
    sentMail: "أرسل ملفك أو أسئلتك على franchise@mahu.cafe",
  },
};

export const franchise: Record<Locale, FranchiseDictionary> = { en, ar };
