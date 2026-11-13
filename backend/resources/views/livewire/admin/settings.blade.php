<div>
    <header class="page-head">
        <div>
            <p class="eyebrow">CMS / SİSTEM</p>
            <h1>Parametrlər</h1>
        </div>
    </header>

    <form wire:submit="save" class="stack">
        @foreach ($groups as $group => $settings)
            <section class="card form">
                <h2 class="field--wide">{{ ['contact' => 'Əlaqə məlumatları', 'social' => 'Sosial şəbəkələr', 'general' => 'Ümumi'][$group] ?? ucfirst($group) }}</h2>
                @foreach ($settings as $setting)
                    <label class="field" wire:key="setting-{{ $setting->key }}">
                        <span>{{ $setting->label }}</span>
                        <input type="text" class="input" wire:model="values.{{ $setting->key }}">
                        @error("values.{$setting->key}") <small class="error">{{ $message }}</small> @enderror
                    </label>
                @endforeach
            </section>
        @endforeach

        <div class="form__actions">
            <button type="submit" class="btn btn-primary">Yadda saxla</button>
        </div>
    </form>
</div>
