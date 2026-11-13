<?php

namespace App\Livewire\Admin;

use App\Models\Setting;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Component;

#[Layout('layouts.admin')]
#[Title('Parametrlər')]
class Settings extends Component
{
    /** key => value */
    public array $values = [];

    public function mount(): void
    {
        $this->values = Setting::query()->pluck('value', 'key')->map(fn ($v) => (string) $v)->all();
    }

    public function save(): void
    {
        $known = Setting::query()->pluck('key')->all();

        $this->validate([
            'values' => ['array'],
            'values.*' => ['nullable', 'string', 'max:1000'],
            'values.email' => ['nullable', 'email'],
            'values.enquiry_notify_email' => ['nullable', 'email'],
            'values.maps_url' => ['nullable', 'url'],
            'values.linkedin_url' => ['nullable', 'url'],
            'values.instagram_url' => ['nullable', 'url'],
            'values.youtube_url' => ['nullable', 'url'],
            'values.telegram_url' => ['nullable', 'url'],
        ]);

        foreach (array_intersect_key($this->values, array_flip($known)) as $key => $value) {
            Setting::query()->where('key', $key)->first()?->update(['value' => $value === '' ? null : $value]);
        }

        session()->flash('status', 'Parametrlər yadda saxlanıldı.');
    }

    public function render()
    {
        return view('livewire.admin.settings', [
            'groups' => Setting::query()->orderBy('id')->get()->groupBy('group'),
        ]);
    }
}
