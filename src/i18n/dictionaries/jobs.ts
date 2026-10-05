import type { Locale } from "../config";

// Copy for the jobs page, ported verbatim from the design's COPY (only the keys it renders).
// Header and footer copy lives in `common`.
const en = {
  meta: {
    title: "Work the fastest window",
    description:
      "Six minutes a car, a hundred hellos a shift. If you're quick and you love coffee, you belong here.",
  },
  hero: {
    heroTitleA: "Work the",
    heroTitleB: "fastest window",
    heroBody:
      "Six minutes a car, a hundred hellos a shift. If you're quick and you love coffee, you belong here.",
    applyNow: "Apply now",
    seeRoles: "See the roles",
    apronAlt: "Mahu apron",
    apronLine: "Your apron is waiting",
  },
  life: {
    lifeTitle: "Fast work, faster team",
    shiftHead: "Morning shift",
    shiftSub: "Corniche · Jazan",
    shiftRows: [
      { time: "5:40 AM", what: "You open the window and grind the first dose" },
      { time: "6:00 AM", what: "First car. It doesn't stop after that" },
      { time: "9:30 AM", what: "The rush. You and the lead on one rhythm" },
      { time: "11:45 AM", what: "Clean down, hand over to the second shift" },
      { time: "12:00 PM", what: "You leave on time. No stretching it" },
    ],
    shiftTally: [
      { label: "Shift length", value: "6 hours" },
      { label: "Paid training", value: "3 shifts" },
      { label: "Your coffee", value: "0.00" },
    ],
    shiftFoot: "Thanks — see you tomorrow",
    teamSlot: "Team at the window",
    handsSlot: "Close-up at the machine",
    handoffSlot: "Handing a cup out the window",
  },
  roles: {
    rolesTitle: "Four roles open",
    perMonth: "per month",
    doLabel: "What you'll do",
    needLabel: "What we need",
    applyRole: "Apply for this role",
    list: [
      {
        title: "Barista",
        pay: "4,500 – 5,500 SAR",
        tags: ["Full time", "1 year or in-house training", "Morning / evening"],
        doItems: [
          "Pull espresso and steam milk to the same standard, fast.",
          "Dial in the grind, weigh and taste the shot each shift.",
          "Keep the machine and prep station spotless.",
        ],
        needItems: [
          "Quick hands and focus through the peak hour.",
          "Real interest in coffee and in getting better.",
          "Punctuality — the early shift starts at 5:45.",
        ],
      },
      {
        title: "Window host",
        pay: "3,800 – 4,500 SAR",
        tags: ["Full or part time", "No experience", "Morning / evening"],
        doItems: [
          "Take the order and payment at the first window, confirm the name.",
          "Track app orders and hand them out in turn.",
          "Read the customer's stamp card and apply the free cup.",
        ],
        needItems: [
          "A warm face and a clear voice — you're the first person they see.",
          "Accuracy with cash and card.",
          "Arabic fluently; English is a plus.",
        ],
      },
      {
        title: "Shift lead",
        pay: "6,000 – 7,500 SAR",
        tags: ["Full time", "2 years", "Includes closing"],
        doItems: [
          "Run a full shift: assign stations, watch the service time.",
          "Count stock and order beans, milk and cups.",
          "Train new joiners and check cup quality through the shift.",
        ],
        needItems: [
          "Two years in coffee or food service, six months supervising.",
          "Calm in the rush and quick to decide.",
          "Comfortable reading sales numbers and acting on them.",
        ],
      },
      {
        title: "Prep & cleaning assistant",
        pay: "3,500 – 4,000 SAR",
        tags: ["Part time", "No experience", "Mornings"],
        doItems: [
          "Set the station before opening, stock cups and lids.",
          "Wash equipment and keep the floor and window clean.",
          "Receive deliveries and organise the store room.",
        ],
        needItems: [
          "Energy and initiative without being asked.",
          "An eye for detail and cleanliness.",
          "Flexible with early mornings.",
        ],
      },
    ],
  },
  apply: {
    applyTitle: "Two minutes to apply",
    applyBody: "Just these fields. No CV, no certificates — how you work the machine matters more.",
    walkTitle: "Or just come by",
    walkBody:
      "If you're near the corniche, drop in between 10:00 and 16:00 and ask for the shift lead. We'd rather hear it in person.",
    walkLink: "WhatsApp:",
  },
  form: {
    nameLabel: "Full name",
    namePlaceholder: "e.g. Abdullah Al-Faifi",
    phoneLabel: "Mobile number",
    roleLabel: "Role",
    rolePick: "Pick a role",
    shiftLabel: "Availability",
    shifts: ["Morning", "Evening", "Flexible"],
    expLabel: "Coffee experience",
    expPick: "Pick one",
    exps: ["None yet", "Under a year", "One to three years", "Over three years"],
    aboutLabel: "Short note",
    aboutPlaceholder: "Where have you worked? Why Mahu?",
    aboutHint: "Two lines is plenty. Optional.",
    consent: "I agree to be contacted on this number about my application.",
    submit: "Send application",
    submitFine: "Your details are used for hiring only, and deleted after three months if we don't hire.",
    errName: "Please write your full name.",
    errPhone: "Enter a valid Saudi mobile starting with 5.",
    errRole: "Pick the role you're applying for.",
    errConsent: "We need your consent before sending.",
    sentTitle: "We've got it",
    sentBody: "We'll read it and call within 48 hours. Keep the reference in case you ask at the window.",
    refLabel: "Reference",
    another: "Apply for another role",
  },
};

export type JobsDictionary = typeof en;

const ar: JobsDictionary = {
  meta: {
    title: "اشتغل عند أسرع شباك",
    description: "ست دقائق لكل سيارة، ومئة ابتسامة في الشفت. إن كنت سريعاً وتحب القهوة، مكانك عندنا.",
  },
  hero: {
    heroTitleA: "اشتغل عند",
    heroTitleB: "أسرع شباك",
    heroBody: "ست دقائق لكل سيارة، ومئة ابتسامة في الشفت. إن كنت سريعاً وتحب القهوة، مكانك عندنا.",
    applyNow: "قدّم الآن",
    seeRoles: "شاهد الوظائف",
    apronAlt: "مريول ماهو",
    apronLine: "مريولك بانتظارك",
  },
  life: {
    lifeTitle: "شغل سريع، وفريق أسرع",
    shiftHead: "وردية الصباح",
    shiftSub: "الكورنيش · جازان",
    shiftRows: [
      { time: "5:40 ص", what: "تفتح الشباك وتطحن أول جرعة" },
      { time: "6:00 ص", what: "أول سيارة. من هنا ما توقف" },
      { time: "9:30 ص", what: "الذروة. أنت والمناوب بإيقاع واحد" },
      { time: "11:45 ص", what: "تنظيف، وتسليم للوردية الثانية" },
      { time: "12:00 م", what: "تطلع في وقتك. بدون تمديد" },
    ],
    shiftTally: [
      { label: "طول الشفت", value: "6 ساعات" },
      { label: "تدريب مدفوع", value: "3 شفتات" },
      { label: "كوبك", value: "0.00" },
    ],
    shiftFoot: "شكراً — نشوفك بكرة",
    teamSlot: "صورة الفريق عند الشباك",
    handsSlot: "صورة قريبة للآلة",
    handoffSlot: "تسليم الكوب من الشباك",
  },
  roles: {
    rolesTitle: "أربع وظائف مفتوحة",
    perMonth: "شهرياً",
    doLabel: "ماذا ستعمل",
    needLabel: "نبحث عن",
    applyRole: "قدّم على هذه الوظيفة",
    list: [
      {
        title: "باريستا",
        pay: "4,500 – 5,500 ر.س",
        tags: ["دوام كامل", "خبرة سنة أو تدريب داخلي", "صباحي / مسائي"],
        doItems: [
          "تحضير الإسبريسو والحليب بجودة ثابتة في وقت قياسي.",
          "ضبط الطحن والوزن وتذوّق الشوت أول كل شفت.",
          "المحافظة على نظافة الآلة ومحطة التحضير.",
        ],
        needItems: [
          "يدين سريعتين وتركيز تحت ضغط الذروة.",
          "ذوق وحس بالقهوة، ورغبة في التعلّم.",
          "الالتزام بالمواعيد — الشفت يبدأ 5:45 صباحاً.",
        ],
      },
      {
        title: "موظف شباك",
        pay: "3,800 – 4,500 ر.س",
        tags: ["دوام كامل أو جزئي", "بدون خبرة", "صباحي / مسائي"],
        doItems: [
          "استلام الطلبات عند الشباك الأول والدفع وتأكيد الاسم.",
          "متابعة طلبات التطبيق وترتيب تسليمها بالدور.",
          "قراءة بطاقة الأختام للعميل وتفعيل الكوب المجاني.",
        ],
        needItems: [
          "وجه بشوش وصوت واضح — أنت أول من يراه العميل.",
          "دقة في الحساب والدفع الإلكتروني.",
          "إجادة العربية، والإنجليزية ميزة إضافية.",
        ],
      },
      {
        title: "مناوب وردية",
        pay: "6,000 – 7,500 ر.س",
        tags: ["دوام كامل", "خبرة سنتين", "يشمل الإغلاق"],
        doItems: [
          "إدارة شفت كامل: توزيع المهام ومتابعة زمن التسليم.",
          "جرد المخزون وطلب البن والحليب والأكواب.",
          "تدريب الجدد ومتابعة جودة الكوب خلال الشفت.",
        ],
        needItems: [
          "خبرة سنتين في قهوة أو مطاعم، ومنها ستة أشهر إشراف.",
          "هدوء في الذروة وقرار سريع.",
          "قدرة على قراءة أرقام المبيعات والتصرف بها.",
        ],
      },
      {
        title: "مساعد تحضير ونظافة",
        pay: "3,500 – 4,000 ر.س",
        tags: ["دوام جزئي", "بدون خبرة", "صباحي"],
        doItems: [
          "تجهيز المحطة قبل الافتتاح وتعبئة الأكواب والأغطية.",
          "غسل الأدوات ونظافة الصالة والشباك خلال الشفت.",
          "استلام التوريدات وترتيب المخزن.",
        ],
        needItems: [
          "نشاط ومبادرة بدون انتظار طلب.",
          "انتباه للتفاصيل والنظافة.",
          "مرونة في ساعات الصباح الباكر.",
        ],
      },
    ],
  },
  apply: {
    applyTitle: "قدّم بدقيقتين",
    applyBody: "املأ الحقول التالية فقط. ما نطلب سيرة ذاتية ولا شهادات.",
    walkTitle: "تفضّل مرّ علينا",
    walkBody: "إن كنت قريب من الكورنيش، مرّ بين 10 صباحاً و4 عصراً واسأل عن المناوب. نسمع منك مباشرة.",
    walkLink: "واتساب:",
  },
  form: {
    nameLabel: "الاسم الكامل",
    namePlaceholder: "مثال: عبدالله الفيفي",
    phoneLabel: "رقم الجوال",
    roleLabel: "الوظيفة",
    rolePick: "اختر الوظيفة",
    shiftLabel: "التفرّغ",
    shifts: ["صباحي", "مسائي", "مرن"],
    expLabel: "خبرتك في القهوة",
    expPick: "اختر خبرتك",
    exps: ["بدون خبرة", "أقل من سنة", "سنة إلى ثلاث", "أكثر من ثلاث سنوات"],
    aboutLabel: "نبذة قصيرة",
    aboutPlaceholder: "وين اشتغلت قبل؟ وليش ماهو؟",
    aboutHint: "سطران يكفيان. اختياري.",
    consent: "أوافق على التواصل معي عبر هذا الرقم بخصوص التقديم.",
    submit: "أرسل التقديم",
    submitFine: "بياناتك تُستخدم للتوظيف فقط، وتُحذف بعد ثلاثة أشهر إن لم يتم القبول.",
    errName: "اكتب اسمك الكامل.",
    errPhone: "أدخل رقم جوال سعودي صحيح يبدأ بـ 5.",
    errRole: "اختر الوظيفة التي تقدّم عليها.",
    errConsent: "نحتاج موافقتك على التواصل قبل الإرسال.",
    sentTitle: "وصلنا تقديمك",
    sentBody: "نراجعه ونتصل بك خلال 48 ساعة. احفظ الرقم المرجعي إن احتجت تسأل عند الشباك.",
    refLabel: "الرقم المرجعي",
    another: "قدّم على وظيفة أخرى",
  },
};

export const jobs: Record<Locale, JobsDictionary> = { en, ar };
