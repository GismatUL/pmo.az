<?php

namespace App\Rules;

use App\Support\Turnstile;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidCaptcha implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! Turnstile::verify(is_string($value) ? $value : null, request()->ip())) {
            $fail('Təhlükəsizlik yoxlaması uğursuz oldu. Zəhmət olmasa, yenidən cəhd edin.');
        }
    }
}
