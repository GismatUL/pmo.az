<?php

namespace Tests\Feature\Api;

use App\Models\ConsultingService;
use App\Models\Post;
use App\Models\Program;
use Database\Seeders\ContentSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ContentApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    public function test_seeded_site_content_is_served(): void
    {
        $this->seed(ContentSeeder::class);

        $this->getJson('/api/v1/site')
            ->assertOk()
            ->assertJsonPath('data.settings.email', 'info@pmo.az')
            ->assertJsonCount(4, 'data.stats')
            ->assertJsonPath('data.stats.0.value', '2000+');

        $this->getJson('/api/v1/programs')->assertOk()->assertJsonCount(6, 'data');
        $this->getJson('/api/v1/programs?featured=1')->assertOk()->assertJsonCount(3, 'data')
            ->assertJsonPath('data.0.title', 'IPMA ICB4');
        $this->getJson('/api/v1/services')->assertOk()
            ->assertJsonCount(3, 'data.pillars')
            ->assertJsonCount(5, 'data.consulting');
        $this->getJson('/api/v1/experts')->assertOk()->assertJsonPath('data.0.slug', 'resad-ibrahimov');
        $this->getJson('/api/v1/books')->assertOk()->assertJsonPath('data.0.price', 60);
    }

    public function test_seeding_twice_does_not_duplicate_content(): void
    {
        $this->seed(ContentSeeder::class);
        $this->seed(ContentSeeder::class);

        $this->assertSame(6, Program::query()->count());
        $this->assertSame(14, Post::query()->count());
    }

    public function test_program_filters(): void
    {
        Program::factory()->create(['title' => 'PRINCE2® Foundation', 'family' => 'PeopleCert']);
        Program::factory()->create(['title' => 'IPMA Level D', 'family' => 'IPMA']);
        Program::factory()->unpublished()->create(['title' => 'Hidden', 'family' => 'IPMA']);

        $this->getJson('/api/v1/programs?family=IPMA')->assertOk()->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.title', 'IPMA Level D');
        $this->getJson('/api/v1/programs?q=prince')->assertOk()->assertJsonCount(1, 'data');
        $this->getJson('/api/v1/programs?family=Unknown')->assertUnprocessable();
    }

    public function test_posts_are_paginated_filtered_and_drafts_hidden(): void
    {
        Post::factory()->count(3)->create(['category' => 'Məqalələr']);
        Post::factory()->create(['category' => 'Tədbirlər']);
        $draft = Post::factory()->draft()->create();
        Post::factory()->create(['published_at' => now()->addWeek()]);

        $this->getJson('/api/v1/posts?per_page=2')
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('meta.total', 4);

        $this->getJson('/api/v1/posts?category=Tədbirlər')->assertOk()->assertJsonCount(1, 'data');
        $this->getJson('/api/v1/posts/'.$draft->slug)->assertNotFound();
    }

    public function test_post_detail_includes_body_and_related_posts(): void
    {
        $post = Post::factory()->create(['category' => 'Xəbərlər', 'cover_image' => 'media/news/a.jpg']);
        $sameCategory = Post::factory()->create(['category' => 'Xəbərlər', 'published_at' => now()->subYear()]);
        Post::factory()->count(2)->create(['category' => 'Məqalələr']);

        $this->getJson('/api/v1/posts/'.$post->slug)
            ->assertOk()
            ->assertJsonPath('data.kind', 'XƏBƏRLƏR')
            ->assertJsonPath('data.body.0.type', 'p')
            ->assertJsonPath('data.image', Storage::disk('public')->url('media/news/a.jpg'))
            ->assertJsonCount(2, 'related')
            ->assertJsonPath('related.0.slug', $sameCategory->slug)
            ->assertJsonMissingPath('related.0.body');
    }

    public function test_unpublished_consulting_service_is_not_found(): void
    {
        $service = ConsultingService::factory()->create(['is_published' => false]);

        $this->getJson('/api/v1/services/'.$service->slug)->assertNotFound();
    }
}
