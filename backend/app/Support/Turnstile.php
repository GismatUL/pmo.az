<?php

namespace App\Support;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Cloudflare Turnstile captcha verification.
 *
 * Fails closed: when captcha is enabled but no secret is configured, or
 * Cloudflare can't be reached, verification fails rather than letting
 * the request through.
 */
class Turnstile
{
    public const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

    public static function enabled(): bool
    {
        return (bool) config('services.turnstile.enabled', true);
    }

    public static function siteKey(): ?string
    {
        return config('services.turnstile.site_key') ?: null;
    }

    public static function verify(?string $token, ?string $ip = null): bool
    {
        if (! self::enabled()) {
            return true;
        }

        $secret = config('services.turnstile.secret_key');

        if (! $secret) {
            Log::error('Turnstile is enabled but TURNSTILE_SECRET_KEY is not set; rejecting captcha.');

            return false;
        }

        if (! is_string($token) || $token === '' || strlen($token) > 2048) {
            return false;
        }

        try {
            $response = Http::asForm()
                ->timeout(5)
                ->post(self::VERIFY_URL, array_filter([
                    'secret' => $secret,
                    'response' => $token,
                    'remoteip' => $ip,
                ]));
        } catch (Throwable $e) {
            Log::warning('Turnstile verification request failed: '.$e->getMessage());

            return false;
        }

        return $response->successful() && $response->json('success') === true;
    }
}
