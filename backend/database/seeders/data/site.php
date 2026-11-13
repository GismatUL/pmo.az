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
        ['2000+', 'məzun'],
        ['500+', 'sertifikasiya'],
        ['100+', 'həyata keçirilən layihə'],
        ['50+', 'ekspert və təlimçi'],
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
    'pillars' => [
        [
            'slug' => 'telimler', 'live' => 'telimler', 'title' => 'Təlimlər',
            'summary' => 'Peşəkar bilikləri praktik təcrübəyə çevirən proqramlar.',
            'home_summary' => 'Komandanızın ehtiyaclarına uyğun korporativ proqramlar.',
            'highlights' => ['Beynəlxalq sertifikasiya hazırlığı', 'Korporativ təlimlər', 'Praktik və oyun əsaslı proqramlar'],
            'link_label' => 'Proqramlara bax', 'link_url' => '/programs',
        ],
        [
            'slug' => 'sertifikasiya', 'live' => 'sertifikasiya', 'title' => 'Sertifikasiya',
            'summary' => 'Peşəkarlar, layihələr və təşkilatlar üçün qiymətləndirmə.',
            'home_summary' => 'Peşəkarlar, layihələr və təşkilatlar üçün beynəlxalq yanaşmalar.',
            'highlights' => ['IPMA və digər beynəlxalq istiqamətlər', 'Layihələr üçün GPM360®', 'Təşkilatlar üçün IPMA Delta® və PSM3'],
            'link_label' => 'Daha ətraflı', 'link_url' => '/services/dayaniqli-layihe-menecmenti',
        ],
        [
            'slug' => 'tetbiq', 'live' => 'tedbiq', 'title' => 'Tətbiq',
            'summary' => 'Layihə idarəetməsini təşkilatınızın gündəlik işinə inteqrasiya edin.',
            'home_summary' => 'PMO qurulması, layihə dəstəyi və dəyişikliklərin idarə edilməsi.',
            'highlights' => ['PMO qurulması və inkişafı', 'Layihə və proqram dəstəyi', 'Transformasiya və dəyişikliklər'],
            'link_label' => 'Konsaltinqə bax', 'link_url' => '/services#consulting',
        ],
    ],

    // Consulting areas (Figma Services 16:156) and PMO detail page (Figma 16:568).
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
            'slug' => 'layihe-ve-proqram-desteyi', 'title' => 'Layihə və proqram idarəetmə dəstəyi', 'crumb' => 'Layihə və proqram dəstəyi',
            'summary' => 'Layihə sənədləri, risklər, maraqlı tərəflər və hesabatlılıq üzrə metodoloji dəstək.',
        ],
        [
            'slug' => 'dayaniqli-layihe-menecmenti', 'title' => 'Dayanıqlı layihə menecmenti', 'crumb' => 'Dayanıqlı layihə menecmenti',
            'summary' => 'GPM P5 yanaşmasının tətbiqi, dayanıqlılığın qiymətləndirilməsi və GPM360.',
        ],
        [
            'slug' => 'dot-ppp', 'title' => 'DÖT / PPP məsləhətçiliyi', 'crumb' => 'DÖT / PPP',
            'summary' => 'Dövlət-özəl tərəfdaşlığı layihələrinin qiymətləndirilməsi və strukturlaşdırılması.',
        ],
        [
            'slug' => 'transformasiya', 'title' => 'Transformasiya və dəyişikliklər', 'crumb' => 'Transformasiya',
            'summary' => 'Dəyişikliklərin idarə edilməsi və təşkilati transformasiyaya metodoloji dəstək.',
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
