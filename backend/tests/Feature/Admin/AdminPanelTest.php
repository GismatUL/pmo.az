<?php

namespace Tests\Feature\Admin;

use App\Admin\AdminResources;
use App\Livewire\Admin\Enquiries;
use App\Livewire\Admin\Login;
use App\Livewire\Admin\ResourceForm;
use App\Livewire\Admin\ResourceIndex;
use App\Livewire\Admin\Settings;
use App\Models\Enquiry;
use App\Models\Post;
use App\Models\Program;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Livewire\Livewire;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        $user = User::factory()->create();
        $user->forceFill(['is_admin' => true])->save();

        return $user;
    }

    public function test_guests_are_redirected_to_login(): void
    {
        $this->get('/admin')->assertRedirect('/admin/login');
        $this->get('/admin/posts')->assertRedirect('/admin/login');
        $this->get('/admin/login')->assertOk()->assertSee('İdarəetmə paneli');
    }

    public function test_non_admin_users_are_forbidden(): void
    {
        $this->actingAs(User::factory()->create())->get('/admin')->assertForbidden();
    }

    public function test_admin_can_open_every_screen(): void
    {
        $admin = $this->admin();
        Post::factory()->create(['title' => 'Test yazısı']);
        Enquiry::factory()->create();

        $this->actingAs($admin)->get('/admin')->assertOk()->assertSee('İdarə paneli');
        $this->actingAs($admin)->get('/admin/enquiries')->assertOk();
        $this->actingAs($admin)->get('/admin/settings')->assertOk();

        foreach (array_keys(AdminResources::all()) as $resource) {
            $this->actingAs($admin)->get("/admin/{$resource}")->assertOk();
            $this->actingAs($admin)->get("/admin/{$resource}/create")->assertOk();
        }

        $this->actingAs($admin)->get('/admin/unknown')->assertNotFound();
    }

    public function test_login_requires_admin_flag_and_correct_password(): void
    {
        $admin = $this->admin();
        $regular = User::factory()->create();

        Livewire::test(Login::class)
            ->set('email', $regular->email)->set('password', 'password')
            ->call('login')
            ->assertHasErrors('email');
        $this->assertGuest();

        Livewire::test(Login::class)
            ->set('email', $admin->email)->set('password', 'wrong')
            ->call('login')
            ->assertHasErrors('email');

        Livewire::test(Login::class)
            ->set('email', $admin->email)->set('password', 'password')
            ->call('login')
            ->assertRedirect(route('admin.dashboard'));
        $this->assertAuthenticatedAs($admin);
    }

    public function test_admin_can_create_a_post_with_blocks_and_cover(): void
    {
        Storage::fake('public');
        $this->actingAs($this->admin());

        Livewire::test(ResourceForm::class, ['resource' => 'posts'])
            ->set('data.title', 'Yeni məqalə')
            ->assertSet('data.slug', 'yeni-meqale')
            ->set('data.category', 'Məqalələr')
            ->set('data.body', "Birinci abzas.\n\n## Başlıq\n\nİkinci abzas.")
            ->set('data.tags', "IPMA\nPMO")
            ->set('data.published_at', '2026-11-01T10:00')
            ->set('uploads.cover_image', UploadedFile::fake()->image('cover.jpg', 800, 450))
            ->call('save')
            ->assertHasNoErrors();

        $post = Post::query()->where('slug', 'yeni-meqale')->firstOrFail();
        $this->assertEquals([['type' => 'p', 'text' => 'Birinci abzas.'], ['type' => 'h2', 'text' => 'Başlıq'], ['type' => 'p', 'text' => 'İkinci abzas.']], $post->body);
        $this->assertSame(['IPMA', 'PMO'], $post->tags);
        Storage::disk('public')->assertExists($post->cover_image);
    }

    public function test_form_validates_unique_slug_and_select_values(): void
    {
        $this->actingAs($this->admin());
        Program::factory()->create(['slug' => 'ipma-icb4']);

        Livewire::test(ResourceForm::class, ['resource' => 'programs'])
            ->set('data.title', 'IPMA ICB4')
            ->set('data.slug', 'ipma-icb4')
            ->set('data.family', 'NotABody')
            ->set('data.meta', 'IPMA')
            ->set('data.summary', 'Test')
            ->call('save')
            ->assertHasErrors(['data.slug', 'data.family']);
    }

    public function test_admin_can_edit_and_delete_records(): void
    {
        $this->actingAs($this->admin());
        $program = Program::factory()->create(['title' => 'Köhnə ad']);

        Livewire::test(ResourceForm::class, ['resource' => 'programs', 'id' => $program->id])
            ->assertSet('data.title', 'Köhnə ad')
            ->set('data.title', 'Yeni ad')
            ->call('save')
            ->assertHasNoErrors();
        $this->assertSame('Yeni ad', $program->fresh()->title);

        Livewire::test(ResourceIndex::class, ['resource' => 'programs'])
            ->assertSee('Yeni ad')
            ->call('delete', $program->id);
        $this->assertModelMissing($program);
    }

    public function test_admin_can_update_enquiry_status(): void
    {
        $this->actingAs($this->admin());
        $enquiry = Enquiry::factory()->create(['status' => 'new']);

        Livewire::test(Enquiries::class)
            ->call('select', $enquiry->id)
            ->assertSee($enquiry->email)
            ->set('newStatus', 'closed')
            ->set('note', 'Zəng edildi')
            ->call('saveStatus')
            ->assertHasNoErrors();

        $enquiry->refresh();
        $this->assertSame('closed', $enquiry->status);
        $this->assertSame('Zəng edildi', $enquiry->admin_note);
        $this->assertNotNull($enquiry->handled_at);
    }

    public function test_settings_are_saved_and_cache_is_refreshed(): void
    {
        $this->actingAs($this->admin());
        Setting::factory()->create(['key' => 'phone', 'value' => '1']);
        Setting::factory()->create(['key' => 'email', 'value' => 'a@example.com']);
        $this->assertSame('1', Setting::map()['phone']);

        Livewire::test(Settings::class)
            ->set('values.phone', '(+994 55) 000 00-00')
            ->set('values.email', 'not-email')
            ->call('save')
            ->assertHasErrors('values.email')
            ->set('values.email', 'b@example.com')
            ->call('save')
            ->assertHasNoErrors();

        $this->assertSame('(+994 55) 000 00-00', Setting::map()['phone']);
    }
}
