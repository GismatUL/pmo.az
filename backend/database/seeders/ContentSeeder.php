<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\ConsultingService;
use App\Models\Expert;
use App\Models\Partner;
use App\Models\Post;
use App\Models\Program;
use App\Models\ServicePillar;
use App\Models\Setting;
use App\Models\Stat;
use App\Models\Testimonial;
use App\Models\VideoCourse;
use Database\Seeders\Support\SeedData;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Seeds the site content: live pmo.az content (scraped JSON + images) and
 * the structured copy from the approved Figma design (data/site.php).
 */
class ContentSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function () {
            $this->settings();
            $this->stats();
            $this->programs();
            $this->pillars();
            $this->consulting();
            $this->posts();
            $this->experts();
            $this->books();
            $this->videoCourses();
            $this->partners();
            $this->testimonials();
        });
    }

    private function settings(): void
    {
        foreach (SeedData::site('settings') as [$group, $key, $label, $value]) {
            // Keep values an admin already changed; only fill missing keys.
            Setting::query()->firstOrCreate(['key' => $key], compact('group', 'label', 'value'));
        }
    }

    private function stats(): void
    {
        foreach (SeedData::site('stats') as $i => [$value, $label]) {
            SeedData::upsert(Stat::class, ['label'], ['value' => $value, 'label' => $label, 'sort' => $i]);
        }
    }

    private function programs(): void
    {
        foreach (SeedData::site('programs') as $i => $row) {
            SeedData::upsert(Program::class, ['slug'], $row + [
                'is_featured' => false,
                'home_meta' => null,
                'home_summary' => null,
                'external_url' => 'https://pmu.az',
                'sort' => $i,
            ]);
        }
    }

    private function pillars(): void
    {
        $live = collect(SeedData::json('service_pillars'))->keyBy('slug');

        foreach (SeedData::site('pillars') as $i => $row) {
            $body = collect($live[$row['live']]['body'] ?? [])
                ->map(fn ($b) => $b['type'] === 'image' ? ['type' => 'image', 'src' => SeedData::media($b['src'])] : $b)
                ->values()
                ->all();

            SeedData::upsert(ServicePillar::class, ['slug'], Arr::except($row, 'live') + ['body' => $body, 'sort' => $i]);
        }
    }

    private function consulting(): void
    {
        foreach (SeedData::site('consulting') as $i => $row) {
            SeedData::upsert(ConsultingService::class, ['slug'], $row + ['intro' => null, 'detail' => null, 'sort' => $i]);
        }
    }

    private function posts(): void
    {
        $overrides = SeedData::site('post_overrides');

        foreach (SeedData::json('posts') as $post) {
            $extra = $overrides[$post['slug']] ?? [];

            $body = collect($post['body'])
                ->map(fn ($b) => $b['type'] === 'image' ? ['type' => 'image', 'src' => SeedData::media($b['src'])] : $b)
                ->filter(fn ($b) => $b['type'] !== 'image' || $b['src'])
                ->values()
                ->all();

            // The design adds section headings to the featured article.
            foreach (array_reverse($extra['insert_headings'] ?? [], true) as $index => $heading) {
                array_splice($body, $index, 0, [['type' => 'h2', 'text' => $heading]]);
            }

            SeedData::upsert(Post::class, ['slug'], [
                'slug' => $post['slug'],
                'category' => $post['category'],
                'title' => $post['title'],
                'short_title' => $extra['short_title'] ?? null,
                'excerpt' => $extra['excerpt'] ?? Str::limit($post['excerpt'], 200),
                'cover_image' => SeedData::media($post['cover']),
                'cover_caption' => $extra['cover_caption'] ?? null,
                'body' => $body,
                'toc' => $extra['toc'] ?? null,
                'tags' => $extra['tags'] ?? null,
                'is_featured' => $extra['is_featured'] ?? false,
                'published_at' => $post['published_at'] ? Carbon::parse($post['published_at'])->setTime(10, 0) : null,
                'source_url' => $post['source_url'],
            ]);
        }
    }

    private function experts(): void
    {
        $founder = SeedData::site('founder_slug');

        foreach (SeedData::json('experts') as $i => $e) {
            SeedData::upsert(Expert::class, ['slug'], [
                'slug' => $e['slug'],
                'name' => $e['name'],
                'position' => $e['position'],
                'bio' => null,
                'photo' => SeedData::media($e['photo']),
                'articles' => $e['articles'],
                'is_founder' => $e['slug'] === $founder,
                'sort' => $i,
                'source_url' => $e['source_url'],
            ]);
        }
    }

    private function books(): void
    {
        foreach (SeedData::json('books') as $i => $b) {
            // Live titles embed the author: "Title. Author" or "Title - Author. 2015".
            [$title, $author] = preg_match('/^(.*?)(?:\.| -) ([^.]+?)(?:\. \d{4})?$/u', $b['title'], $m)
                ? [trim($m[1]), trim($m[2])]
                : [$b['title'], null];

            SeedData::upsert(Book::class, ['title'], [
                'title' => $title,
                'author' => $author,
                'format' => $b['format'],
                'excerpt' => $b['excerpt'],
                'price' => $b['price'],
                'url' => 'https://pmbook.az',
                'sort' => $i,
            ]);
        }
    }

    private function videoCourses(): void
    {
        foreach (SeedData::json('video_courses') as $i => $c) {
            SeedData::upsert(VideoCourse::class, ['slug'], [
                'slug' => Str::slug($c['title']),
                'title' => $c['title'],
                'body' => $c['body'],
                'image' => null,
                'url' => 'https://edu.pmo.az',
                'sort' => $i,
            ]);
        }
    }

    private function partners(): void
    {
        $names = SeedData::site('partner_names');

        foreach (SeedData::json('partners') as $i => $logo) {
            $name = collect($names)->first(fn ($n, $needle) => str_contains($logo, $needle)) ?? 'Tərəfdaş '.($i + 1);

            SeedData::upsert(Partner::class, ['logo'], [
                'name' => $name,
                'type' => in_array($name, ['AzPMA', 'QazPMA'], true) ? 'accreditation' : 'partner',
                'logo' => SeedData::media($logo),
                'url' => null,
                'sort' => $i,
            ]);
        }
    }

    private function testimonials(): void
    {
        foreach (SeedData::json('testimonials') as $i => $t) {
            SeedData::upsert(Testimonial::class, ['name'], [
                'name' => $t['name'],
                'role' => $t['role'],
                'quote' => trim($t['quote']),
                'photo' => SeedData::media($t['photo']),
                'sort' => $i,
            ]);
        }
    }
}
