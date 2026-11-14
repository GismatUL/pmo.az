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
  /** Value statement shown under the title on the service page. */
  intro?: string;
  /** Full page content — only provided where the design specifies it. */
  detail?: ServiceDetail;
};

/**
 * Consulting services in order of priority (Figma Services 16:156) and the
 * PMO detail page (Figma 16:568). The first five are featured on the home page.
 */
export const CONSULTING: ConsultingService[] = [
  {
    n: "01",
    slug: "pmo-qurulmasi",
    title: "PMO qurulması və inkişafı",
    crumb: "PMO qurulması",
    summary: "Layihə idarəetmə ofisinin modeli, prosesləri, metodologiyası və inkişafı.",
    intro:
      "Təşkilatınıza uyğun layihə idarəetmə ofisi: strategiya, metodologiya, proseslər və komandanın inkişafı.",
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
    slug: "portfel-idareetmesi",
    title: "Layihə portfelinin idarə edilməsi",
    crumb: "Portfel idarəetməsi",
    summary: "Layihələrin strateji məqsədlərə görə seçilməsi, prioritetləşdirilməsi və resursların balanslaşdırılması.",
    intro:
      "Hansı layihəyə başlamaq, hansını dayandırmaq barədə qərarları aydın meyarlara əsaslandırırıq: seçim və prioritetləşdirmə qaydaları, resurs planlaması və rəhbərlik üçün portfel hesabatları.",
  },
  {
    n: "03",
    slug: "layihe-ve-proqram-desteyi",
    title: "Layihə və proqram idarəetmə dəstəyi",
    crumb: "Layihə və proqram dəstəyi",
    summary: "Planlaşdırma, monitorinq və nəzarət: cədvəl, risklər, maraqlı tərəflər, satınalma və hesabatlılıq.",
    intro:
      "Böyük və mürəkkəb layihələrdə komandanızın yanındayıq: layihə sənədlərini strukturlaşdırır, risk, maraqlı tərəf, satınalma və hesabat sistemlərini qurur, audit və diaqnostik qiymətləndirmə ilə icranı nəzarətdə saxlayırıq.",
  },
  {
    n: "04",
    slug: "idareetme-sistemi",
    title: "Layihə idarəetmə sistemi və governance",
    crumb: "İdarəetmə sistemi",
    summary: "Rollar, səlahiyyətlər, qərarvermə səviyyələri və mərhələ nəzarət nöqtələri ilə vahid idarəetmə çərçivəsi.",
    intro:
      "Layihələrin necə başladığını, kim tərəfindən təsdiqləndiyini və necə izlənildiyini müəyyən edən qaydaları hazırlayırıq: rollar və səlahiyyətlər, mərhələ qərarları, sənəd standartları və hesabat ritmi. Çərçivəni ISO 21500 / 21502 prinsiplərinə və təşkilatınızın strukturuna uyğunlaşdırırıq.",
  },
  {
    n: "05",
    slug: "yetkinlik-qiymetlendirmesi",
    title: "Layihə idarəetmə yetkinliyinin qiymətləndirilməsi",
    crumb: "Yetkinlik qiymətləndirməsi",
    summary: "IPMA Delta® və ISO 10006 yanaşmaları ilə təşkilatın layihə idarəetmə qabiliyyətinin diaqnostikası.",
    intro:
      "Təşkilatın layihə idarəetmə qabiliyyətini beynəlxalq meyarlarla ölçür, güclü və zəif tərəfləri müəyyən edir, prioritetləşdirilmiş inkişaf planı hazırlayırıq. Yanaşma IPMA Delta® modelinə və ISO 10006 keyfiyyət menecmenti prinsiplərinə əsaslanır.",
  },
  {
    n: "06",
    slug: "dayaniqli-layihe-menecmenti",
    title: "Dayanıqlı layihə menecmenti",
    crumb: "Dayanıqlı layihə menecmenti",
    summary: "GPM P5 yanaşmasının tətbiqi, dayanıqlılığın qiymətləndirilməsi və GPM360®.",
    intro:
      "Layihələrin ekoloji, sosial və iqtisadi təsirini GPM P5 yanaşması ilə idarə etməyə və GPM360® modeli ilə qiymətləndirməyə kömək edirik. Layihə strukturunu ESG və SDG tələblərinə uyğunlaşdırırıq.",
  },
  {
    n: "07",
    slug: "dot-ppp",
    title: "DÖT / PPP məsləhətçiliyi",
    crumb: "DÖT / PPP",
    summary: "Dövlət-özəl tərəfdaşlığı layihələrinin qiymətləndirilməsi və strukturlaşdırılması.",
    intro:
      "Dövlət-özəl tərəfdaşlığı layihələrinin strukturlaşdırılması, biznes modellərinin hazırlanması və beynəlxalq standartlara uyğun layihə çərçivələrinin qurulması üzrə məsləhət veririk.",
  },
  {
    n: "08",
    slug: "transformasiya",
    title: "Transformasiya və dəyişikliklər",
    crumb: "Transformasiya",
    summary: "Dəyişikliklərin idarə edilməsi və təşkilati transformasiyaya metodoloji dəstək.",
    intro:
      "Təşkilati dəyişiklikləri layihə kimi idarə edirik: Change Management yanaşmasının tətbiqi, transformasiya layihələrinə metodoloji dəstək və rəhbərlərin dəyişiklik kompetensiyalarının gücləndirilməsi.",
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

/** Lines of business, consulting first (Figma Services 16:155). */
export const PILLARS: Pillar[] = [
  {
    n: "01",
    slug: "tetbiq",
    title: "Konsaltinq və tətbiq",
    text: "Layihə idarəetməsini təşkilatınızın idarəetmə sisteminə və gündəlik işinə inteqrasiya edirik.",
    homeText: "PMO qurulması, portfel idarəetməsi, layihə dəstəyi və transformasiya.",
    items: ["PMO qurulması və portfel idarəetməsi", "Layihə və proqram idarəetmə dəstəyi", "İdarəetmə sistemi və transformasiya"],
    link: "Konsaltinqə bax",
    href: "/services#consulting",
  },
  {
    n: "02",
    slug: "sertifikasiya",
    title: "Qiymətləndirmə və sertifikasiya",
    text: "Layihələrin və təşkilatların beynəlxalq meyarlarla qiymətləndirilməsi.",
    homeText: "Təşkilatlar, layihələr və peşəkarlar üçün beynəlxalq yanaşmalar.",
    items: ["Təşkilatlar üçün IPMA Delta® və ISO 10006", "Layihələr üçün GPM360®", "Peşəkarlar üçün beynəlxalq sertifikasiya"],
    link: "Daha ətraflı",
    href: "/services/yetkinlik-qiymetlendirmesi",
  },
  {
    n: "03",
    slug: "telimler",
    title: "Təlimlər",
    text: "Komandaların layihə idarəetmə bacarıqlarını gücləndirən proqramlar.",
    homeText: "Komandanızın ehtiyaclarına uyğun korporativ proqramlar.",
    items: ["Korporativ təlimlər", "Beynəlxalq sertifikasiya hazırlığı", "Praktik və oyun əsaslı proqramlar"],
    link: "Təlim proqramları",
    href: "/programs",
  },
];

/** How an engagement runs (home "Yanaşmamız", Services approach). */
export const APPROACH: Array<[string, string]> = [
  ["Qiymətləndirmə", "Mövcud prosesləri, layihə portfelini və idarəetmə yetkinliyini təhlil edirik."],
  ["Planlaşdırma", "Hədəf modelini, prioritetləri və mərhələli yol xəritəsini rəhbərliklə razılaşdırırıq."],
  ["Tətbiq", "Prosesləri, sənədləri və alətləri komandanızla birlikdə gündəlik işə daxil edirik."],
  ["Monitorinq", "Göstəricilər və hesabatlarla icranı izləyir, kənarlaşmalara vaxtında reaksiya veririk."],
  ["Təkmilləşdirmə", "Öyrənilən dərslər əsasında sistemi təşkilatınızla birlikdə inkişaf etdiririk."],
];

/** What professional project management gives an organisation (home "Niyə"). */
export const VALUE: Array<[string, string]> = [
  ["Strateji uyğunluq", "Resurslar təşkilatın prioritetlərinə xidmət edən layihələrə yönəlir."],
  ["Proqnozlaşdırılan icra", "Cədvəl, büdcə və risklər əvvəlcədən planlaşdırılır və mütəmadi izlənilir."],
  ["Şəffaflıq", "Rəhbərlik layihələrin real vəziyyətini vahid formatda və vaxtında görür."],
  ["Aydın idarəetmə", "Rollar, səlahiyyətlər və qərarvermə qaydaları hər kəs üçün müəyyəndir."],
];

/** Selected experience (from the approved design and the live site). */
export const EXPERIENCE: Array<[string, string]> = [
  [
    "İqtisadiyyat Nazirliyi / İTMİM",
    "Layihə idarəetməsi üzrə məsləhətçilik, PMO qurulması, ISO 9001 və ISO 10006 istiqamətləri, IPMA ICB4 komanda təlimi.",
  ],
  [
    "Drakaris / Yigim payment",
    "PMO strategiyası, layihə idarəetmə metodologiyası, mentorluq və komanda üçün IPMA ICB4 təlimi.",
  ],
  [
    "AZS ISO 21500 / 21502",
    "Layihə, proqram və portfel idarəetməsi üzrə milli standartların hazırlanmasında iştirak.",
  ],
];
