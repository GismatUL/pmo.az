<?php

namespace App\Admin;

use App\Models\Book;
use App\Models\ConsultingService;
use App\Models\Expert;
use App\Models\Partner;
use App\Models\Post;
use App\Models\Program;
use App\Models\ServicePillar;
use App\Models\Stat;
use App\Models\Testimonial;
use App\Models\VideoCourse;
use Illuminate\Support\Arr;

/**
 * Declarative definitions for the generic Livewire CRUD screens.
 *
 * Field types: text, textarea, number, checkbox, select, date, image,
 * lines (JSON list ⇄ one item per line), blocks (rich body ⇄ markdown-ish
 * text), json (raw JSON).
 */
class AdminResources
{
    public static function all(): array
    {
        return [
            'posts' => [
                'model' => Post::class,
                'label' => 'Bloq yazıları',
                'singular' => 'Yazı',
                'search' => ['title', 'excerpt'],
                'order' => ['published_at', 'desc'],
                'columns' => ['title' => 'Başlıq', 'category' => 'Kateqoriya', 'published_at' => 'Tarix', 'is_featured' => 'Seçilmiş'],
                'filter' => ['category', array_combine(array_keys(Post::CATEGORIES), array_keys(Post::CATEGORIES))],
                'fields' => [
                    'title' => ['text', 'Başlıq', 'required|string|max:255'],
                    'slug' => ['text', 'Slug (URL)', 'required|alpha_dash:ascii|max:255|unique'],
                    'category' => ['select', 'Kateqoriya', 'required', array_combine(array_keys(Post::CATEGORIES), array_keys(Post::CATEGORIES))],
                    'short_title' => ['text', 'Qısa başlıq (əlaqəli yazılar üçün)', 'nullable|string|max:255'],
                    'excerpt' => ['textarea', 'Qısa təsvir', 'nullable|string|max:1000'],
                    'cover_image' => ['image', 'Örtük şəkli', 'nullable'],
                    'cover_caption' => ['text', 'Şəkil izahı', 'nullable|string|max:255'],
                    'body' => ['blocks', 'Mətn', 'nullable|string'],
                    'toc' => ['lines', '“Bu yazıda” bəndləri', 'nullable|string'],
                    'tags' => ['lines', 'Teqlər', 'nullable|string'],
                    'published_at' => ['date', 'Dərc tarixi (boş = qaralama)', 'nullable|date'],
                    'is_featured' => ['checkbox', 'Bloq səhifəsində seçilmiş yazı', 'boolean'],
                ],
            ],
            'programs' => [
                'model' => Program::class,
                'label' => 'Proqramlar',
                'singular' => 'Proqram',
                'search' => ['title', 'meta'],
                'order' => ['sort', 'asc'],
                'columns' => ['title' => 'Proqram', 'family' => 'Qurum', 'is_featured' => 'Ana səhifə', 'is_published' => 'Aktiv'],
                'filter' => ['family', array_combine(Program::FAMILIES, Program::FAMILIES)],
                'fields' => [
                    'title' => ['text', 'Ad', 'required|string|max:255'],
                    'slug' => ['text', 'Slug', 'required|alpha_dash:ascii|max:255|unique'],
                    'family' => ['select', 'Sertifikasiya qurumu', 'required', array_combine(Program::FAMILIES, Program::FAMILIES)],
                    'meta' => ['text', 'Kateqoriya sətri (kartda)', 'required|string|max:255'],
                    'summary' => ['textarea', 'Təsvir', 'required|string|max:1000'],
                    'home_meta' => ['text', 'Ana səhifə kateqoriya sətri', 'nullable|string|max:255'],
                    'home_summary' => ['textarea', 'Ana səhifə təsviri', 'nullable|string|max:1000'],
                    'price' => ['number', 'Qiymət (₼, boş = təsdiqlənir)', 'nullable|numeric|min:0'],
                    'price_note' => ['text', 'Qiymət qeydi', 'required|string|max:255'],
                    'external_url' => ['text', 'Qeydiyyat keçidi', 'nullable|url|max:255'],
                    'sort' => ['number', 'Sıra', 'required|integer|min:0'],
                    'is_featured' => ['checkbox', 'Ana səhifədə göstər', 'boolean'],
                    'is_published' => ['checkbox', 'Aktiv', 'boolean'],
                ],
            ],
            'experts' => [
                'model' => Expert::class,
                'label' => 'Ekspertlər',
                'singular' => 'Ekspert',
                'search' => ['name', 'position'],
                'order' => ['sort', 'asc'],
                'columns' => ['photo' => 'Foto', 'name' => 'Ad', 'position' => 'Vəzifə', 'is_published' => 'Aktiv'],
                'fields' => [
                    'name' => ['text', 'Ad və soyad', 'required|string|max:255'],
                    'slug' => ['text', 'Slug', 'required|alpha_dash:ascii|max:255|unique'],
                    'position' => ['text', 'Vəzifə / ixtisas', 'nullable|string|max:255'],
                    'bio' => ['textarea', 'Bioqrafiya', 'nullable|string|max:5000'],
                    'photo' => ['image', 'Foto', 'nullable'],
                    'articles' => ['lines', 'Bloq yazıları', 'nullable|string'],
                    'sort' => ['number', 'Sıra', 'required|integer|min:0'],
                    'is_founder' => ['checkbox', 'Təsisçi', 'boolean'],
                    'is_published' => ['checkbox', 'Aktiv', 'boolean'],
                ],
            ],
            'consulting' => [
                'model' => ConsultingService::class,
                'label' => 'Konsaltinq xidmətləri',
                'singular' => 'Xidmət',
                'search' => ['title'],
                'order' => ['sort', 'asc'],
                'columns' => ['title' => 'Xidmət', 'summary' => 'Qısa təsvir', 'is_published' => 'Aktiv'],
                'fields' => [
                    'title' => ['text', 'Ad', 'required|string|max:255'],
                    'slug' => ['text', 'Slug', 'required|alpha_dash:ascii|max:255|unique'],
                    'crumb' => ['text', 'Breadcrumb adı', 'nullable|string|max:255'],
                    'summary' => ['textarea', 'Qısa təsvir', 'required|string|max:255'],
                    'intro' => ['textarea', 'Giriş mətni', 'nullable|string|max:1000'],
                    'detail' => ['json', 'Ətraflı səhifə (JSON)', 'nullable|json'],
                    'sort' => ['number', 'Sıra', 'required|integer|min:0'],
                    'is_published' => ['checkbox', 'Aktiv', 'boolean'],
                ],
            ],
            'pillars' => [
                'model' => ServicePillar::class,
                'label' => 'Xidmət istiqamətləri',
                'singular' => 'İstiqamət',
                'search' => ['title'],
                'order' => ['sort', 'asc'],
                'columns' => ['title' => 'İstiqamət', 'summary' => 'Təsvir'],
                'fields' => [
                    'title' => ['text', 'Ad', 'required|string|max:255'],
                    'slug' => ['text', 'Slug', 'required|alpha_dash:ascii|max:255|unique'],
                    'summary' => ['text', 'Təsvir (Xidmətlər səhifəsi)', 'required|string|max:255'],
                    'home_summary' => ['text', 'Təsvir (ana səhifə)', 'nullable|string|max:255'],
                    'highlights' => ['lines', 'Əsas bəndlər', 'nullable|string'],
                    'body' => ['blocks', 'Ətraflı mətn', 'nullable|string'],
                    'link_label' => ['text', 'Keçid mətni', 'nullable|string|max:255'],
                    'link_url' => ['text', 'Keçid ünvanı', 'nullable|string|max:255'],
                    'sort' => ['number', 'Sıra', 'required|integer|min:0'],
                ],
            ],
            'books' => [
                'model' => Book::class,
                'label' => 'Kitablar',
                'singular' => 'Kitab',
                'search' => ['title', 'author'],
                'order' => ['sort', 'asc'],
                'columns' => ['title' => 'Kitab', 'author' => 'Müəllif', 'price' => 'Qiymət', 'is_published' => 'Aktiv'],
                'fields' => [
                    'title' => ['text', 'Ad', 'required|string|max:255'],
                    'author' => ['text', 'Müəllif', 'nullable|string|max:255'],
                    'format' => ['text', 'Format', 'required|string|max:255'],
                    'excerpt' => ['textarea', 'Təsvir', 'nullable|string|max:2000'],
                    'price' => ['number', 'Qiymət (₼)', 'nullable|numeric|min:0'],
                    'url' => ['text', 'Satış keçidi', 'nullable|url|max:255'],
                    'sort' => ['number', 'Sıra', 'required|integer|min:0'],
                    'is_published' => ['checkbox', 'Aktiv', 'boolean'],
                ],
            ],
            'video-courses' => [
                'model' => VideoCourse::class,
                'label' => 'Videokurslar',
                'singular' => 'Videokurs',
                'search' => ['title'],
                'order' => ['sort', 'asc'],
                'columns' => ['title' => 'Kurs', 'url' => 'Keçid', 'is_published' => 'Aktiv'],
                'fields' => [
                    'title' => ['text', 'Ad', 'required|string|max:255'],
                    'slug' => ['text', 'Slug', 'required|alpha_dash:ascii|max:255|unique'],
                    'body' => ['blocks', 'Təsvir', 'nullable|string'],
                    'image' => ['image', 'Şəkil', 'nullable'],
                    'url' => ['text', 'Platforma keçidi', 'nullable|url|max:255'],
                    'sort' => ['number', 'Sıra', 'required|integer|min:0'],
                    'is_published' => ['checkbox', 'Aktiv', 'boolean'],
                ],
            ],
            'partners' => [
                'model' => Partner::class,
                'label' => 'Tərəfdaşlar',
                'singular' => 'Tərəfdaş',
                'search' => ['name'],
                'order' => ['sort', 'asc'],
                'columns' => ['logo' => 'Loqo', 'name' => 'Ad', 'type' => 'Növ', 'is_published' => 'Aktiv'],
                'fields' => [
                    'name' => ['text', 'Ad', 'required|string|max:255'],
                    'type' => ['select', 'Növ', 'required', Partner::TYPES],
                    'logo' => ['image', 'Loqo', 'nullable'],
                    'url' => ['text', 'Vebsayt', 'nullable|url|max:255'],
                    'sort' => ['number', 'Sıra', 'required|integer|min:0'],
                    'is_published' => ['checkbox', 'Aktiv', 'boolean'],
                ],
            ],
            'testimonials' => [
                'model' => Testimonial::class,
                'label' => 'Rəylər',
                'singular' => 'Rəy',
                'search' => ['name', 'quote'],
                'order' => ['sort', 'asc'],
                'columns' => ['name' => 'Ad', 'role' => 'Rol', 'is_published' => 'Aktiv'],
                'fields' => [
                    'name' => ['text', 'Ad', 'required|string|max:255'],
                    'role' => ['text', 'Rol', 'nullable|string|max:255'],
                    'quote' => ['textarea', 'Rəy', 'required|string|max:5000'],
                    'photo' => ['image', 'Foto', 'nullable'],
                    'sort' => ['number', 'Sıra', 'required|integer|min:0'],
                    'is_published' => ['checkbox', 'Aktiv', 'boolean'],
                ],
            ],
            'stats' => [
                'model' => Stat::class,
                'label' => 'Rəqəmlər',
                'singular' => 'Göstərici',
                'search' => ['label'],
                'order' => ['sort', 'asc'],
                'columns' => ['value' => 'Dəyər', 'label' => 'Ad'],
                'fields' => [
                    'value' => ['text', 'Dəyər (məs. 2000+)', 'required|string|max:32'],
                    'label' => ['text', 'Ad', 'required|string|max:255'],
                    'sort' => ['number', 'Sıra', 'required|integer|min:0'],
                ],
            ],
        ];
    }

    public static function get(string $key): array
    {
        $resource = self::all()[$key] ?? abort(404);

        return $resource + ['key' => $key];
    }

    /** Navigation groups for the admin sidebar. */
    public static function navigation(): array
    {
        return [
            'Məzmun' => Arr::only(self::labels(), ['posts', 'programs', 'experts', 'books', 'video-courses']),
            'Xidmətlər' => Arr::only(self::labels(), ['pillars', 'consulting']),
            'Sayt' => Arr::only(self::labels(), ['stats', 'partners', 'testimonials']),
        ];
    }

    private static function labels(): array
    {
        return array_map(fn ($r) => $r['label'], self::all());
    }
}
