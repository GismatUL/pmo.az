<div>
    <header class="page-head">
        <div>
            <p class="eyebrow"><a href="{{ route('admin.resources.index', $resource) }}" wire:navigate>{{ $config['label'] }}</a> / {{ $recordId ? 'REDAKTƏ' : 'YENİ' }}</p>
            <h1>{{ $recordId ? ($data['title'] ?? $data['name'] ?? $data['label'] ?? $config['singular']) : 'Yeni '.mb_strtolower($config['singular']) }}</h1>
        </div>
    </header>

    <form wire:submit="save" class="card form">
        @foreach ($config['fields'] as $name => $field)
            @php([$type, $label] = $field)
            <div @class(['field', 'field--wide' => in_array($type, ['blocks', 'json', 'textarea', 'lines'], true)]) wire:key="field-{{ $name }}">
                @if ($type === 'checkbox')
                    <label class="check">
                        <input type="checkbox" wire:model="data.{{ $name }}"> {{ $label }}
                    </label>
                @else
                    <label for="f-{{ $name }}">{{ $label }}</label>

                    @switch($type)
                        @case('textarea')
                            <textarea id="f-{{ $name }}" class="input" rows="3" wire:model="data.{{ $name }}"></textarea>
                            @break
                        @case('blocks')
                            <textarea id="f-{{ $name }}" class="input mono" rows="16" wire:model="data.{{ $name }}"></textarea>
                            <small class="muted">Abzasları boş sətirlə ayırın. Başlıq: <code>## Mətn</code>. Şəkil: <code>![](media/yol.jpg)</code>.</small>
                            @break
                        @case('lines')
                            <textarea id="f-{{ $name }}" class="input" rows="4" wire:model="data.{{ $name }}"></textarea>
                            <small class="muted">Hər sətirdə bir bənd.</small>
                            @break
                        @case('json')
                            <textarea id="f-{{ $name }}" class="input mono" rows="14" wire:model="data.{{ $name }}"></textarea>
                            <small class="muted">Qabaqcıl: səhifə bölmələri JSON formatında. Boş saxlasanız yalnız qısa səhifə göstərilir.</small>
                            @break
                        @case('select')
                            <select id="f-{{ $name }}" class="input" wire:model="data.{{ $name }}">
                                <option value="">Seçin…</option>
                                @foreach ($field[3] as $value => $optionLabel)
                                    <option value="{{ $value }}">{{ $optionLabel }}</option>
                                @endforeach
                            </select>
                            @break
                        @case('number')
                            <input id="f-{{ $name }}" type="number" step="any" class="input" wire:model="data.{{ $name }}">
                            @break
                        @case('date')
                            <input id="f-{{ $name }}" type="datetime-local" class="input" wire:model="data.{{ $name }}">
                            @break
                        @case('image')
                            <div class="image-field">
                                @if (isset($uploads[$name]) && method_exists($uploads[$name], 'temporaryUrl'))
                                    <img src="{{ $uploads[$name]->temporaryUrl() }}" alt="" class="preview">
                                @elseif (! empty($data[$name]))
                                    <img src="{{ \App\Support\Media::url($data[$name]) }}" alt="" class="preview">
                                @endif
                                <div class="stack-sm">
                                    <input id="f-{{ $name }}" type="file" accept="image/png,image/jpeg,image/webp" wire:model="uploads.{{ $name }}">
                                    <div wire:loading wire:target="uploads.{{ $name }}" class="muted">Yüklənir…</div>
                                    @if (! empty($data[$name]) || isset($uploads[$name]))
                                        <button type="button" class="link danger" wire:click="removeImage('{{ $name }}')">Şəkli sil</button>
                                    @endif
                                </div>
                            </div>
                            @error("uploads.$name") <small class="error">{{ $message }}</small> @enderror
                            @break
                        @default
                            <input id="f-{{ $name }}" type="text" class="input" wire:model{{ in_array($name, ['title', 'name'], true) ? '.blur' : '' }}="data.{{ $name }}">
                    @endswitch
                @endif

                @error("data.$name") <small class="error">{{ $message }}</small> @enderror
            </div>
        @endforeach

        <div class="form__actions">
            <a href="{{ route('admin.resources.index', $resource) }}" class="btn btn-ghost" wire:navigate>Ləğv et</a>
            <button type="submit" class="btn btn-primary" wire:loading.attr="disabled">
                <span wire:loading.remove wire:target="save">Yadda saxla</span>
                <span wire:loading wire:target="save">Saxlanılır…</span>
            </button>
        </div>
    </form>
</div>
