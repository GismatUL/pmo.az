export type ServiceDetail = {
  heroTitle: [string, string];
  intro: string;
  eyebrow: string;
  purposeTitle: [string, string];
  purpose: string;
  outcomes: Array<[string, string]>;
  processTitle: [string, string];
  process: Array<[string, string]>;
  experienceTitle: [string, string];
  experience: Array<[string, string]>;
  ctaTitle: string;
  ctaText: string;
};

export type ConsultingService = {
  n: string;
  slug: string;
  title: string;
  crumb: string;
  summary: string;
  /** Full page content — only provided where the design specifies it. */
  detail?: ServiceDetail;
};

/** Consulting areas (Figma Services 16:156) and the PMO detail page (Figma 16:568). */
export const CONSULTING: ConsultingService[] = [
  {
    n: "01",
    slug: "pmo-qurulmasi",
    title: "PMO qurulması və inkişafı",
    crumb: "PMO qurulması",
    summary: "Layihə idarəetmə ofisinin modeli, prosesləri, metodologiyası və inkişafı.",
    detail: {
      heroTitle: ["PMO qurulması", "və inkişafı"],
      intro:
        "Təşkilatınıza uyğun layihə idarəetmə ofisi: strategiya, metodologiya, proseslər və komandanın inkişafı.",
      eyebrow: "XAOTİK PROSESLƏRDƏN SİSTEMLİ İDARƏETMƏYƏ",
      purposeTitle: ["Layihələriniz üçün", "vahid idarəetmə sistemi"],
      purpose:
        "PMO qurulması layihə idarəetmə metodlarını, proseslərini və qaydalarını standartlaşdırmağa kömək edir. Təşkilatınızın ehtiyacına uyğun model seçir, komandanızla birlikdə praktik tətbiqini dəstəkləyirik.",
      outcomes: [
        ["Uyğun PMO modeli", "Təşkilatın məqsədləri və layihə portfeli ilə uzlaşan ofis modeli."],
        ["Ortaq metodologiya", "Layihə sənədləri, qaydalar, proseslər və istifadə olunan şablonlar."],
        ["Aydın məsuliyyətlər", "Komandalar, maraqlı tərəflər və qərarvermə sərhədləri."],
        ["Praktik inkişaf", "Təlim və mentorluqla güclənən layihə idarəetmə bacarıqları."],
      ],
      processTitle: ["Ehtiyacdan tətbiqə,", "addım-addım."],
      process: [
        ["Diaqnostika", "Mövcud prosesləri, çətinlikləri və layihə idarəetmə ehtiyaclarını təhlil edirik."],
        ["Layihələndirmə", "Uyğun PMO modelini, idarəetmə çərçivəsini və yol xəritəsini hazırlayırıq."],
        ["Tətbiq", "Proses, sənəd və alətlərin komandanızla birlikdə istifadəsinə dəstək veririk."],
        ["İnkişaf", "Təlim, mentorluq və metodoloji dəstəklə yanaşmanı təkmilləşdiririk."],
      ],
      experienceTitle: ["Fərqli təşkilatlar.", "Ortaq layihə düşüncəsi."],
      experience: [
        [
          "İqtisadiyyat Nazirliyi / İTMİM",
          "IPMA ICB4 komanda təlimi, layihə idarəetməsi üzrə məsləhətçilik, PMO qurulması, ISO 9001 və ISO 10006 istiqamətləri.",
        ],
        [
          "Drakaris / Yigim payment",
          "Komanda üçün IPMA ICB4 təlimi, mentorluq, PMO strategiyası və layihə idarəetmə metodologiyası.",
        ],
      ],
      ctaTitle: "Layihələriniz üçün ortaq dil yaradaq.",
      ctaText: "PMO qurulması və inkişafı haqqında bizimlə danışın.",
    },
  },
  {
    n: "02",
    slug: "layihe-ve-proqram-desteyi",
    title: "Layihə və proqram idarəetmə dəstəyi",
    crumb: "Layihə və proqram dəstəyi",
    summary: "Layihə sənədləri, risklər, maraqlı tərəflər və hesabatlılıq üzrə metodoloji dəstək.",
  },
  {
    n: "03",
    slug: "dayaniqli-layihe-menecmenti",
    title: "Dayanıqlı layihə menecmenti",
    crumb: "Dayanıqlı layihə menecmenti",
    summary: "GPM P5 yanaşmasının tətbiqi, dayanıqlılığın qiymətləndirilməsi və GPM360.",
  },
  {
    n: "04",
    slug: "dot-ppp",
    title: "DÖT / PPP məsləhətçiliyi",
    crumb: "DÖT / PPP",
    summary: "Dövlət-özəl tərəfdaşlığı layihələrinin qiymətləndirilməsi və strukturlaşdırılması.",
  },
  {
    n: "05",
    slug: "transformasiya",
    title: "Transformasiya və dəyişikliklər",
    crumb: "Transformasiya",
    summary: "Dəyişikliklərin idarə edilməsi və təşkilati transformasiyaya metodoloji dəstək.",
  },
];

export type Pillar = {
  n: string;
  slug: string;
  title: string;
  text: string;
  homeText: string;
  items: string[];
  link: string;
  href: string;
};

/** Service pillars (Figma Services 16:155, Home 10:7). */
export const PILLARS: Pillar[] = [
  {
    n: "01",
    slug: "telimler",
    title: "Təlimlər",
    text: "Peşəkar bilikləri praktik təcrübəyə çevirən proqramlar.",
    homeText: "Komandanızın ehtiyaclarına uyğun korporativ proqramlar.",
    items: ["Beynəlxalq sertifikasiya hazırlığı", "Korporativ təlimlər", "Praktik və oyun əsaslı proqramlar"],
    link: "Proqramlara bax",
    href: "/programs",
  },
  {
    n: "02",
    slug: "sertifikasiya",
    title: "Sertifikasiya",
    text: "Peşəkarlar, layihələr və təşkilatlar üçün qiymətləndirmə.",
    homeText: "Peşəkarlar, layihələr və təşkilatlar üçün beynəlxalq yanaşmalar.",
    items: ["IPMA və digər beynəlxalq istiqamətlər", "Layihələr üçün GPM360®", "Təşkilatlar üçün IPMA Delta® və PSM3"],
    link: "Daha ətraflı",
    href: "/services/dayaniqli-layihe-menecmenti",
  },
  {
    n: "03",
    slug: "tetbiq",
    title: "Tətbiq",
    text: "Layihə idarəetməsini təşkilatınızın gündəlik işinə inteqrasiya edin.",
    homeText: "PMO qurulması, layihə dəstəyi və dəyişikliklərin idarə edilməsi.",
    items: ["PMO qurulması və inkişafı", "Layihə və proqram dəstəyi", "Transformasiya və dəyişikliklər"],
    link: "Konsaltinqə bax",
    href: "/services#consulting",
  },
];

/** "Əlaqəli xidmətlər" (Figma 16:584). */
export const RELATED = [
  {
    title: "Korporativ təlimlər",
    text: "Komandanız üçün layihə idarəetmə bilikləri və praktik bacarıqlar.",
    href: "/programs",
  },
  {
    title: "Layihə və proqram dəstəyi",
    text: "Risklər, sənədləşmə, hesabatlılıq və idarəetmə prosesləri.",
    href: "/services/layihe-ve-proqram-desteyi",
  },
  {
    title: "Transformasiya və dəyişikliklər",
    text: "Təşkilati dəyişikliklərə metodoloji yanaşma və dəstək.",
    href: "/services/transformasiya",
  },
];
