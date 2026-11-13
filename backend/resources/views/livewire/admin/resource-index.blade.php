<div>
    <header class="page-head">
        <div>
            <p class="eyebrow">CMS / {{ mb_strtoupper($config['label']) }}</p>
            <h1>{{ $config['label'] }}</h1>
        </div>
        <a class="btn btn-primary" href="{{ route('admin.resources.create', $resource) }}" wire:navigate>Yeni {{ mb_strtolower($config['singular']) }} +</a>
    </header>

    <div class="toolbar">
        <input type="search" class="input" placeholder="Axtar…" wire:model.live.debounce.300ms="search" aria-label="Axtar">
        @isset($config['filter'])
            <select class="input" wire:model.live="filter" aria-label="Filtr">
                <option value="">Hamısı</option>
                @foreach ($config['filter'][1] as $value => $label)
                    <option value="{{ $value }}">{{ $label }}</option>
                @endforeach
            </select>
        @endisset
        <span class="muted">{{ $records->total() }} qeyd</span>
    </div>

    <div class="card table-wrap">
        <table class="table">
            <thead>
                <tr>
                    @foreach ($config['columns'] as $label)
                        <th>{{ $label }}</th>
                    @endforeach
                    <th class="right">Əməliyyat</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($records as $record)
                    <tr wire:key="row-{{ $record->id }}">
                        @foreach ($config['columns'] as $column => $label)
                            @php($value = $record->{$column})
                            <td>
                                @if (in_array($column, ['photo', 'logo', 'cover_image', 'image'], true))
                                    @if ($value)
                                        <img class="thumb" src="{{ \App\Support\Media::url($value) }}" alt="">
                                    @else
                                        <span class="muted">—</span>
                                    @endif
                                @elseif (is_bool($value))
                                    <span class="pill {{ $value ? 'pill--closed' : '' }}">{{ $value ? 'Bəli' : 'Xeyr' }}</span>
                                @elseif ($value instanceof \DateTimeInterface)
                                    {{ $value->format('d.m.Y') }}
                                @elseif ($value === null)
                                    <span class="muted">{{ $column === 'published_at' ? 'Qaralama' : '—' }}</span>
                                @else
                                    {{ \Illuminate\Support\Str::limit((string) ($config['fields'][$column][3][$value] ?? $value), 70) }}
                                @endif
                            </td>
                        @endforeach
                        <td class="right nowrap">
                            <a href="{{ route('admin.resources.edit', ['resource' => $resource, 'id' => $record->id]) }}" wire:navigate>Redaktə</a>
                            <button type="button" class="link danger"
                                wire:click="delete({{ $record->id }})"
                                wire:confirm="Bu qeydi silmək istədiyinizə əminsiniz?">Sil</button>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="{{ count($config['columns']) + 1 }}" class="muted center">Heç nə tapılmadı.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

    {{ $records->links('livewire.admin.pagination') }}
</div>
