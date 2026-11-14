<?php

namespace Tests;

use App\Support\Turnstile;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;

abstract class TestCase extends BaseTestCase
{
    /** Captcha token the faked Turnstile endpoint accepts; anything else fails. */
    protected const CAPTCHA_OK = 'valid-captcha-token';

    protected function setUp(): void
    {
        parent::setUp();

        Http::preventStrayRequests();
        Http::fake([
            Turnstile::VERIFY_URL => fn (Request $request) => Http::response([
                'success' => $request['secret'] === 'test-secret-key' && $request['response'] === self::CAPTCHA_OK,
            ]),
        ]);
    }
}
