<?php

/*
 * Content from the approved Figma design (PMO.az redesign) that is not on the
 * live site in structured form. Live-site content (news, experts, services,
 * books, video courses, testimonials, partners) lives in the JSON files next
 * to this one, produced by tools/scrape-pmo.
 */

return [
    'settings' => [
        ['contact', 'phone', 'Telefon', '(+994 55) 205 60-00'],
        ['contact', 'phone_href', 'Telefon (tel: link)', '+994552056000'],
        ['contact', 'email', 'E-poçt', 'info@pmo.az'],
        ['contact', 'address_line1', 'Ünvan (sətir 1)', '8 Noyabr prospekti, 25'],
        ['contact', 'address_line2', 'Ünvan (sətir 2)', 'Bakı Ağ Şəhər biznes mərkəzi'],
        ['contact', 'hours', 'İş saatları', 'B.e. – Cümə / 09:00–18:00'],
        ['contact', 'maps_url', 'Google Maps keçidi', 'https://www.google.com/maps/search/?api=1&query=8+Noyabr+prospekti+25+Bak%C4%B1'],
        ['social', 'linkedin_url', 'LinkedIn', null],
        ['social', 'instagram_url', 'Instagram', null],
        ['social', 'youtube_url', 'YouTube', null],
        ['social', 'telegram_url', 'Telegram icması', null],
        ['general', 'enquiry_notify_email', 'Müraciət bildirişləri üçün e-poçt', 'info@pmo.az'],
    ],

    'stats' => [
        ['100+', 'həyata keçirilən layihə'],
        ['50+', 'ekspert və təlimçi'],
        ['500+', 'sertifikasiya'],
        ['2000+', 'məzun'],
    ],

    // Programs catalogue (Figma Programs 16:329) + home featured copy (Figma Home 10:6).
    'programs' => [
        [
            'slug' => 'ipma-icb4', 'family' => 'IPMA', 'meta' => 'IPMA / AZPMA', 'title' => 'IPMA ICB4',
            'summary' => 'Beynəlxalq layihə idarəetmə kompetensiyalarının inkişafı və sertifikasiya hazırlığı.',
            'home_meta' => 'IPMA · KOMPETENSİYA ƏSASLI',
            'home_summary' => 'Layihə idarəetmə kompetensiyalarınızı beynəlxalq səviyyədə təsdiqləyin.',
            'is_featured' => true,
        ],
        [
            'slug' => 'pmp-hazirligi', 'family' => 'PMI', 'meta' => 'PMI / İMTAHAN HAZIRLIĞI', 'title' => 'PMP® hazırlığı',
            'summary' => 'Qlobal layihə idarəetmə yanaşmalarını öyrənin və PMP imtahanına hazırlaşın.',
            'home_meta' => 'PMI · İMTAHAN HAZIRLIĞI',
            'home_summary' => 'Qlobal layihə idarəetmə yanaşmaları ilə karyeranızda yeni mərhələyə keçin.',
            'is_featured' => true,
        ],
        [
            'slug' => 'gpm-b', 'family' => 'GPM', 'meta' => 'GPM GLOBAL', 'title' => 'GPM-b',
            'summary' => 'Dayanıqlılığı layihələrin qərarlarına və gündəlik idarəetməsinə inteqrasiya edin.',
            'home_meta' => 'GPM · DAYANIQLI İDARƏETMƏ',
            'home_summary' => 'Layihələrdə insan, planet və rifah üçün dayanıqlı dəyər yaradın.',
            'is_featured' => true,
        ],
        [
            'slug' => 'prince2', 'family' => 'PeopleCert', 'meta' => 'PEOPLECERT', 'title' => 'PRINCE2®',
            'summary' => 'Strukturlaşdırılmış layihə idarəetmə yanaşması ilə biliklərinizi genişləndirin.',
        ],
        [
            'slug' => 'itil', 'family' => 'PeopleCert', 'meta' => 'PEOPLECERT', 'title' => 'ITIL®',
            'summary' => 'İT xidmətlərinin idarə edilməsi üzrə beynəlxalq yanaşmalarla tanış olun.',
        ],
        [
            'slug' => 'cp3p-ppp', 'family' => 'APMG', 'meta' => 'APMG INTERNATIONAL', 'title' => 'CP3P / PPP',
            'summary' => 'Dövlət-özəl tərəfdaşlığı layihələri üzrə beynəlxalq sertifikasiya hazırlığı.',
        ],
    ],

    // Service pillars (Figma Services 16:155 + Home 10:7). Body text comes from the live site.
    // Lines of business, consulting first.
    'pillars' => [
        [
            'slug' => 'tetbiq', 'live' => 'tedbiq', 'title' => 'Konsaltinq və tətbiq',
            'summary' => 'Layihə idarəetməsini təşkilatınızın idarəetmə sisteminə və gündəlik işinə inteqrasiya edirik.',
            'home_summary' => 'PMO qurulması, portfel idarəetməsi, layihə dəstəyi və transformasiya.',
            'highlights' => ['PMO qurulması və portfel idarəetməsi', 'Layihə və proqram idarəetmə dəstəyi', 'İdarəetmə sistemi və transformasiya'],
            'link_label' => 'Konsaltinqə bax', 'link_url' => '/services#consulting',
        ],
        [
            'slug' => 'sertifikasiya', 'live' => 'sertifikasiya', 'title' => 'Qiymətləndirmə və sertifikasiya',
            'summary' => 'Layihələrin və təşkilatların beynəlxalq meyarlarla qiymətləndirilməsi.',
            'home_summary' => 'Təşkilatlar, layihələr və peşəkarlar üçün beynəlxalq yanaşmalar.',
            'highlights' => ['Təşkilatlar üçün IPMA Delta® və ISO 10006', 'Layihələr üçün GPM360®', 'Peşəkarlar üçün beynəlxalq sertifikasiya'],
            'link_label' => 'Daha ətraflı', 'link_url' => '/services/yetkinlik-qiymetlendirmesi',
        ],
        [
            'slug' => 'telimler', 'live' => 'telimler', 'title' => 'Təlimlər',
            'summary' => 'Komandaların layihə idarəetmə bacarıqlarını gücləndirən proqramlar.',
            'home_summary' => 'Komandanızın ehtiyaclarına uyğun korporativ proqramlar.',
            'highlights' => ['Korporativ təlimlər', 'Beynəlxalq sertifikasiya hazırlığı', 'Praktik və oyun əsaslı proqramlar'],
            'link_label' => 'Təlim proqramları', 'link_url' => '/programs',
        ],
    ],

    // Consulting services in order of priority (Figma Services 16:156) and the
    // PMO detail page (Figma 16:568). The first five are featured on the home page.
    'consulting' => [
        [
            'slug' => 'pmo-qurulmasi', 'title' => 'PMO qurulması və inkişafı', 'crumb' => 'PMO qurulması',
            'summary' => 'Layihə idarəetmə ofisinin modeli, prosesləri, metodologiyası və inkişafı.',
            'intro' => 'Təşkilatınıza uyğun layihə idarəetmə ofisi: strategiya, metodologiya, proseslər və komandanın inkişafı.',
            'detail' => [
                'hero_title' => ['PMO qurulması', 'və inkişafı'],
                'eyebrow' => 'XAOTİK PROSESLƏRDƏN SİSTEMLİ İDARƏETMƏYƏ',
                'purpose_title' => ['Layihələriniz üçün', 'vahid idarəetmə sistemi'],
                'purpose' => 'PMO qurulması layihə idarəetmə metodlarını, proseslərini və qaydalarını standartlaşdırmağa kömək edir. Təşkilatınızın ehtiyacına uyğun model seçir, komandanızla birlikdə praktik tətbiqini dəstəkləyirik.',
                'outcomes' => [
                    ['Uyğun PMO modeli', 'Təşkilatın məqsədləri və layihə portfeli ilə uzlaşan ofis modeli.'],
                    ['Ortaq metodologiya', 'Layihə sənədləri, qaydalar, proseslər və istifadə olunan şablonlar.'],
                    ['Aydın məsuliyyətlər', 'Komandalar, maraqlı tərəflər və qərarvermə sərhədləri.'],
                    ['Praktik inkişaf', 'Təlim və mentorluqla güclənən layihə idarəetmə bacarıqları.'],
                ],
                'process_title' => ['Ehtiyacdan tətbiqə,', 'addım-addım.'],
                'process' => [
                    ['Diaqnostika', 'Mövcud prosesləri, çətinlikləri və layihə idarəetmə ehtiyaclarını təhlil edirik.'],
                    ['Layihələndirmə', 'Uyğun PMO modelini, idarəetmə çərçivəsini və yol xəritəsini hazırlayırıq.'],
                    ['Tətbiq', 'Proses, sənəd və alətlərin komandanızla birlikdə istifadəsinə dəstək veririk.'],
                    ['İnkişaf', 'Təlim, mentorluq və metodoloji dəstəklə yanaşmanı təkmilləşdiririk.'],
                ],
                'experience_title' => ['Fərqli təşkilatlar.', 'Ortaq layihə düşüncəsi.'],
                'experience' => [
                    ['İqtisadiyyat Nazirliyi / İTMİM', 'IPMA ICB4 komanda təlimi, layihə idarəetməsi üzrə məsləhətçilik, PMO qurulması, ISO 9001 və ISO 10006 istiqamətləri.'],
                    ['Drakaris / Yigim payment', 'Komanda üçün IPMA ICB4 təlimi, mentorluq, PMO strategiyası və layihə idarəetmə metodologiyası.'],
                ],
                'cta_title' => 'Layihələriniz üçün ortaq dil yaradaq.',
                'cta_text' => 'PMO qurulması və inkişafı haqqında bizimlə danışın.',
            ],
        ],
        [
            'slug' => 'portfel-idareetmesi', 'title' => 'Layihə portfelinin idarə edilməsi', 'crumb' => 'Portfel idarəetməsi',
            'summary' => 'Layihələrin strateji məqsədlərə görə seçilməsi, prioritetləşdirilməsi və resursların balanslaşdırılması.',
            'intro' => 'Hansı layihəyə başlamaq, hansını dayandırmaq barədə qərarları aydın meyarlara əsaslandırırıq: seçim və prioritetləşdirmə qaydaları, resurs planlaması və rəhbərlik üçün portfel hesabatları.',
        ],
        [
            'slug' => 'layihe-ve-proqram-desteyi', 'title' => 'Layihə və proqram idarəetmə dəstəyi', 'crumb' => 'Layihə və proqram dəstəyi',
            'summary' => 'Planlaşdırma, monitorinq və nəzarət: cədvəl, risklər, maraqlı tərəflər, satınalma və hesabatlılıq.',
            'intro' => 'Böyük və mürəkkəb layihələrdə komandanızın yanındayıq: layihə sənədlərini strukturlaşdırır, risk, maraqlı tərəf, satınalma və hesabat sistemlərini qurur, audit və diaqnostik qiymətləndirmə ilə icranı nəzarətdə saxlayırıq.',
        ],
        [
            'slug' => 'idareetme-sistemi', 'title' => 'Layihə idarəetmə sistemi və governance', 'crumb' => 'İdarəetmə sistemi',
            'summary' => 'Rollar, səlahiyyətlər, qərarvermə səviyyələri və mərhələ nəzarət nöqtələri ilə vahid idarəetmə çərçivəsi.',
            'intro' => 'Layihələrin necə başladığını, kim tərəfindən təsdiqləndiyini və necə izlənildiyini müəyyən edən qaydaları hazırlayırıq: rollar və səlahiyyətlər, mərhələ qərarları, sənəd standartları və hesabat ritmi. Çərçivəni ISO 21500 / 21502 prinsiplərinə və təşkilatınızın strukturuna uyğunlaşdırırıq.',
        ],
        [
            'slug' => 'yetkinlik-qiymetlendirmesi', 'title' => 'Layihə idarəetmə yetkinliyinin qiymətləndirilməsi', 'crumb' => 'Yetkinlik qiymətləndirməsi',
            'summary' => 'IPMA Delta® və ISO 10006 yanaşmaları ilə təşkilatın layihə idarəetmə qabiliyyətinin diaqnostikası.',
            'intro' => 'Təşkilatın layihə idarəetmə qabiliyyətini beynəlxalq meyarlarla ölçür, güclü və zəif tərəfləri müəyyən edir, prioritetləşdirilmiş inkişaf planı hazırlayırıq. Yanaşma IPMA Delta® modelinə və ISO 10006 keyfiyyət menecmenti prinsiplərinə əsaslanır.',
        ],
        [
            'slug' => 'dayaniqli-layihe-menecmenti', 'title' => 'Dayanıqlı layihə menecmenti', 'crumb' => 'Dayanıqlı layihə menecmenti',
            'summary' => 'GPM P5 yanaşmasının tətbiqi, dayanıqlılığın qiymətləndirilməsi və GPM360®.',
            'intro' => 'Layihələrin ekoloji, sosial və iqtisadi təsirini GPM P5 yanaşması ilə idarə etməyə və GPM360® modeli ilə qiymətləndirməyə kömək edirik. Layihə strukturunu ESG və SDG tələblərinə uyğunlaşdırırıq.',
        ],
        [
            'slug' => 'dot-ppp', 'title' => 'DÖT / PPP məsləhətçiliyi', 'crumb' => 'DÖT / PPP',
            'summary' => 'Dövlət-özəl tərəfdaşlığı layihələrinin qiymətləndirilməsi və strukturlaşdırılması.',
            'intro' => 'Dövlət-özəl tərəfdaşlığı layihələrinin strukturlaşdırılması, biznes modellərinin hazırlanması və beynəlxalq standartlara uyğun layihə çərçivələrinin qurulması üzrə məsləhət veririk.',
        ],
        [
            'slug' => 'transformasiya', 'title' => 'Transformasiya və dəyişikliklər', 'crumb' => 'Transformasiya',
            'summary' => 'Dəyişikliklərin idarə edilməsi və təşkilati transformasiyaya metodoloji dəstək.',
            'intro' => 'Təşkilati dəyişiklikləri layihə kimi idarə edirik: Change Management yanaşmasının tətbiqi, transformasiya layihələrinə metodoloji dəstək və rəhbərlərin dəyişiklik kompetensiyalarının gücləndirilməsi.',
        ],
    ],

    // Presentation details from the design layered on top of the scraped posts.
    'post_overrides' => [
        'avrora-komandasi-ile-birlikde-ipma-icb4-telimine-start-verdik' => [
            'is_featured' => true,
            'short_title' => 'Avrora komandası ilə IPMA ICB4 təliminə start verdik',
            'excerpt' => 'Real iş təcrübələri, interaktiv vörkşoplar və komanda işi ilə zəngin təlim mühiti.',
            'cover_caption' => 'Avrora komandası ilə IPMA ICB4 təlimi / PMO.az',
            'toc' => ['Praktik öyrənmə', 'PM Anatomy', 'Komanda işi'],
            'tags' => ['IPMA ICB4', 'Korporativ təlim', 'PM Anatomy'],
            'insert_headings' => [1 => 'Praktik təcrübə: PM Anatomy', 3 => 'Öyrənən və öyrədən komanda'],
        ],
        'layihelerin-idare-olunmasi-yalniz-metodologiya-ve-aletlerden-ibaret-deyil-bu-eyni-zamanda-dusunce-terzidir' => [
            'short_title' => 'Layihə idarəetməsi — metodologiyadan daha çox düşüncə tərzi',
        ],
        'ada-universitetinin-telebeleri-ucun-teskil-olunan-pm-game-workshop-u-ugurla-heyata-kecirildi' => [
            'short_title' => 'ADA Universitetinin tələbələri üçün PM Game workshop-u',
        ],
    ],

    'founder_slug' => 'resad-ibrahimov',

    // Partner logos on the live site carry no names; these come from the file names.
    'partner_names' => [
        'UniversitasInternational' => 'Universitas International',
        'uniserlogo' => 'Uniser',
        'bakertilly' => 'Baker Tilly',
        'QazPMA' => 'QazPMA',
        'logo_azpma' => 'AzPMA',
    ],
];
