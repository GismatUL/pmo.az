<?php

namespace Tests\Feature\Api;

use App\Events\EnquirySubmitted;
use App\Listeners\NotifyTeamOfEnquiry;
use App\Mail\NewEnquiryMail;
use App\Models\Enquiry;
use App\Models\Setting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class EnquiryApiTest extends TestCase
{
    use RefreshDatabase;

    private array $valid = [
        'name' => 'Aysel Məmmədova',
        'email' => 'aysel@example.com',
        'phone' => '+994 55 123 45 67',
        'message' => 'Komandamız üçün IPMA təlimi ilə maraqlanırıq.',
        'source' => 'contact',
    ];

    public function test_valid_enquiry_is_stored_and_event_dispatched(): void
    {
        Event::fake([EnquirySubmitted::class]);

        $this->postJson('/api/v1/enquiries', $this->valid)
            ->assertCreated()
            ->assertJsonPath('data.status', 'new');

        $this->assertDatabaseHas('enquiries', ['email' => 'aysel@example.com', 'status' => 'new', 'source' => 'contact']);
        Event::assertDispatched(EnquirySubmitted::class);
        Event::assertListening(EnquirySubmitted::class, NotifyTeamOfEnquiry::class);
    }

    public function test_team_is_emailed_about_new_enquiry(): void
    {
        Mail::fake();
        Setting::factory()->create(['key' => 'enquiry_notify_email', 'value' => 'team@example.com']);

        $this->postJson('/api/v1/enquiries', $this->valid)->assertCreated();

        Mail::assertSent(NewEnquiryMail::class, fn ($mail) => $mail->hasTo('team@example.com'));
    }

    public function test_validation_errors(): void
    {
        $this->postJson('/api/v1/enquiries', ['email' => 'not-an-email'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'email', 'message']);

        $this->assertSame(0, Enquiry::query()->count());
    }

    public function test_honeypot_submissions_are_rejected(): void
    {
        $this->postJson('/api/v1/enquiries', [...$this->valid, 'website' => 'http://spam.example'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('website');
    }

    public function test_status_and_internal_fields_cannot_be_mass_assigned(): void
    {
        $this->postJson('/api/v1/enquiries', [...$this->valid, 'status' => 'closed', 'admin_note' => 'x'])->assertCreated();

        $this->assertDatabaseHas('enquiries', ['email' => 'aysel@example.com', 'status' => 'new', 'admin_note' => null]);
    }

    public function test_enquiries_are_rate_limited(): void
    {
        Event::fake();

        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/v1/enquiries', $this->valid)->assertCreated();
        }

        $this->postJson('/api/v1/enquiries', $this->valid)->assertTooManyRequests();
    }

    public function test_cors_allows_the_configured_frontend_origin(): void
    {
        config(['cors.allowed_origins' => ['http://localhost:3000']]);

        $this->withHeaders(['Origin' => 'http://localhost:3000'])
            ->getJson('/api/v1/site')
            ->assertHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    }
}
