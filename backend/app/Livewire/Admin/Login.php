<?php

namespace App\Livewire\Admin;

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

    public function login()
    {
        $this->validate();

        $key = 'admin-login:'.mb_strtolower($this->email).'|'.request()->ip();

        if (RateLimiter::tooManyAttempts($key, 5)) {
            throw ValidationException::withMessages([
                'email' => 'Çox sayda cəhd. '.RateLimiter::availableIn($key).' saniyə sonra yenidən yoxlayın.',
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
        return view('livewire.admin.login');
    }
}
