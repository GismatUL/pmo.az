export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "image"; src: string; alt?: string };

export type Post = {
  slug: string;
  category: "Xəbərlər" | "Müsahibələr" | "Məqalələr" | "Tədbirlər";
  /** Singular label used on cards, e.g. "MÜSAHİBƏ". */
  kind: string;
  date: string; // ISO yyyy-mm-dd
  title: string;
  /** Shorter headline used on related-article cards. */
  shortTitle?: string;
  featured?: boolean;
  /** Slugs shown under "Oxumağa davam edin". */
  related?: string[];
  excerpt?: string;
  image?: string;
  imageCaption?: string;
  body?: Block[];
  toc?: string[];
  tags?: string[];
};

export const CATEGORIES = ["Xəbərlər", "Müsahibələr", "Məqalələr", "Tədbirlər"] as const;

/** Blog content (Figma Blog 16:400 and Blog detail 16:484). */
export const POSTS: Post[] = [
  {
    slug: "avrora-ipma-icb4",
    category: "Xəbərlər",
    kind: "XƏBƏRLƏR",
    date: "2026-06-22",
    title: "Avrora komandası ilə birlikdə IPMA ICB4 təliminə start verdik",
    shortTitle: "Avrora komandası ilə IPMA ICB4 təliminə start verdik",
    excerpt: "Real iş təcrübələri, interaktiv vörkşoplar və komanda işi ilə zəngin təlim mühiti.",
    image: "/images/news-avrora.jpg",
    imageCaption: "Avrora komandası ilə IPMA ICB4 təlimi / PMO.az",
    toc: ["Praktik öyrənmə", "PM Anatomy", "Komanda işi"],
    tags: ["IPMA ICB4", "Korporativ təlim", "PM Anatomy"],
    related: ["ada-pm-game-workshop", "layihe-idareetmesi-dusunce-terzi"],
    body: [
      {
        type: "p",
        text: "Avrora komandası ilə birlikdə IPMA ICB4 təliminə start verdik və artıq ilk günlərdən çox maraqlı, dinamik bir mühit formalaşıb. Təlim prosesi sadəcə nəzəri biliklərlə məhdudlaşmır — iştirakçılar öz real iş təcrübələrini açıq şəkildə bölüşür, bu təcrübələr vörkşoplarda praktiki şəkildə əksini tapır. Bu isə öyrənmə prosesini daha dərin və dəyərli edir.",
      },
      { type: "h2", text: "Praktik təcrübə: PM Anatomy" },
      {
        type: "p",
        text: "Başlanğıc mərhələsində Avrora komandası ilə birlikdə Rəşad İbrahimovun xüsusi müəllif proqramı olan “PM Anatomy” vörkşopunu təşkil etdik. Vörkşop ekspertimiz Vüqar Bayramovun iştirakı ilə həyata keçirildi və iştirakçılar üçün olduqca fərqli bir təcrübə yaratdı.",
      },
      {
        type: "p",
        text: "Bu sessiyanın əsas məqsədi real iş mühitinə maksimum yaxın olan case study üzərindən işləmək idi. İştirakçılar komandalar şəklində bölünərək təqdim olunan layihənin sənədlərini başlanğıcdan sona qədər idarə etdilər, qərarlar qəbul etdilər, problemlərlə üzləşdilər və həll yolları formalaşdırdılar. Bu proses həm onların mövcud bilik və bacarıqlarını üzə çıxardı, həm də yeni baxış bucaqları qazandırdı.",
      },
      { type: "h2", text: "Öyrənən və öyrədən komanda" },
      {
        type: "p",
        text: "Ümumilikdə, proses çox interaktiv, enerjili və düşündürücü keçdi. Hər bir iştirakçı yalnız öyrənən deyil, eyni zamanda öyrədən rolunda çıxış etdi. Bu isə təlimin dəyərini qat-qat artırdı.",
      },
      { type: "p", text: "Daha çoxu üçün bizi sosial şəbəkələrdə izləyin." },
    ],
  },
  {
    slug: "asif-besirov-musahibe",
    category: "Müsahibələr",
    kind: "MÜSAHİBƏ",
    date: "2026-07-30",
    title: "Asif Bəşirov ilə layihə menecmentində peşəkarlıq və yaradıcılığın birləşməsi",
  },
  {
    slug: "dot-layihelerinin-esas-novleri",
    category: "Məqalələr",
    kind: "MƏQALƏ",
    date: "2026-07-14",
    title: "Dövlət-Özəl Tərəfdaşlığı layihələrinin əsas növləri",
  },
  {
    slug: "layihe-idareetmesi-dusunce-terzi",
    category: "Məqalələr",
    kind: "MƏQALƏ",
    date: "2026-07-10",
    title:
      "Layihələrin idarə olunması yalnız metodologiya və alətlərdən ibarət deyil — bu, eyni zamanda düşüncə tərzidir.",
    shortTitle: "Layihə idarəetməsi — metodologiyadan daha çox düşüncə tərzi",
  },
  {
    slug: "naile-memmedli-cybersecurity",
    category: "Müsahibələr",
    kind: "MÜSAHİBƏ",
    date: "2026-07-08",
    title: "Nailə Məmmədli ilə Cybersecurity və Layihə idarəetməsi",
  },
  {
    slug: "en-cox-edilen-sehvler",
    category: "Məqalələr",
    kind: "MƏQALƏ",
    date: "2026-07-04",
    title: "Layihələrin idarə edilməsində ən çox edilən səhvlər",
  },
  {
    slug: "ada-pm-game-workshop",
    category: "Tədbirlər",
    kind: "TƏDBİR",
    date: "2026-06-23",
    title: "ADA Universitetinin tələbələri üçün PM Game workshop-u",
    image: "/images/hero-workshop.jpg",
  },
];

const MONTHS = ["YANVAR", "FEVRAL", "MART", "APREL", "MAY", "İYUN", "İYUL", "AVQUST", "SENTYABR", "OKTYABR", "NOYABR", "DEKABR"];

/** 2026-06-22 → "22.06.2026" */
export const shortDate = (iso: string) => iso.split("-").reverse().join(".");
/** 2026-06-22 → "22 İYUN 2026" */
export const longDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
};

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

/** Newest first; the featured post is shown separately on the blog index. */
export const FEATURED_SLUG = "avrora-ipma-icb4";
