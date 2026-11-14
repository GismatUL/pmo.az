<?php

namespace App\Http\Requests;

use App\Rules\ValidCaptcha;
use App\Support\Turnstile;
use Illuminate\Foundation\Http\FormRequest;

class StoreEnquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:190'],
            'phone' => ['nullable', 'string', 'max:32', 'regex:/^[0-9+()\-\s_]*$/'],
            'company' => ['nullable', 'string', 'max:190'],
            'message' => ['required', 'string', 'min:5', 'max:5000'],
            'source' => ['nullable', 'string', 'max:64'],
            // Honeypot: real users never see or fill this field.
            'website' => ['prohibited'],
            // Cloudflare Turnstile token from the widget on the form.
            'captcha' => Turnstile::enabled() ? ['bail', 'required', 'string', new ValidCaptcha] : ['nullable'],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'ad və soyad',
            'email' => 'e-poçt',
            'phone' => 'telefon',
            'company' => 'təşkilat',
            'message' => 'müraciət',
            'captcha' => 'təhlükəsizlik yoxlaması',
        ];
    }
}
