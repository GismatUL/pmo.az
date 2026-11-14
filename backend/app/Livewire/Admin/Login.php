<?php

namespace App\Livewire\Admin;

use App\Support\Turnstile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Attributes\Validate;
use Livewire\Component;

#[Layout('layouts.auth')]
#[Title('Daxil ol')]
class Login extends Component
{
    #[Validate('required|email')]
    public string $email = '';

    #[Validate('required|string')]
    public string $password = '';

    public bool $remember = false;

    /** Cloudflare Turnstile token, set by the widget in the view. */
    public string $captcha = '';

    public function login()
    {
        try {
            return $this->attemptLogin();
        } catch (ValidationException $e) {
            // Turnstile tokens are single-use: get a fresh one for the next try.
            $this->reset('captcha');
            $this->dispatch('captcha-reset');

            throw $e;
        }
    }

    private function attemptLogin()
    {
        $this->validate();

        $key = 'admin-login:'.mb_strtolower($this->email).'|'.request()->ip();

        if (RateLimiter::tooManyAttempts($key, 5)) {
            throw ValidationException::withMessages([
                'email' => 'Çox sayda cəhd. '.RateLimiter::availableIn($key).' saniyə sonra yenidən yoxlayın.',
            ]);
        }

        if (! Turnstile::verify($this->captcha, request()->ip())) {
            throw ValidationException::withMessages([
                'captcha' => 'Təhlükəsizlik yoxlaması uğursuz oldu. Zəhmət olmasa, yenidən cəhd edin.',
            ]);
        }

        if (! Auth::attempt(['email' => $this->email, 'password' => $this->password, 'is_admin' => true], $this->remember)) {
            RateLimiter::hit($key, 60);
            $this->reset('password');

            throw ValidationException::withMessages(['email' => 'E-poçt və ya şifrə yanlışdır.']);
        }

        RateLimiter::clear($key);
        session()->regenerate();

        return $this->redirectIntended(route('admin.dashboard'), navigate: false);
    }

    public function render()
    {
        return view('livewire.admin.login', [
            'captchaEnabled' => Turnstile::enabled(),
            'captchaSiteKey' => Turnstile::siteKey(),
        ]);
    }
}
