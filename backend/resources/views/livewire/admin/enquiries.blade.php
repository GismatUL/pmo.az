<div>
    <header class="page-head">
        <div>
            <p class="eyebrow">CMS / MÜRACİƏTLƏR</p>
            <h1>Müraciətlər</h1>
        </div>
    </header>

    <div class="toolbar">
        <div class="chips">
            <button type="button" @class(['chip', 'chip--active' => $status === '']) wire:click="$set('status', '')">Hamısı</button>
            @foreach (\App\Models\Enquiry::STATUSES as $value => $label)
                <button type="button" @class(['chip', 'chip--active' => $status === $value]) wire:click="$set('status', '{{ $value }}')">
                    {{ $label }} <span class="muted">{{ $counts[$value] ?? 0 }}</span>
                </button>
            @endforeach
        </div>
        <input type="search" class="input" placeholder="Ad, e-poçt, təşkilat…" wire:model.live.debounce.300ms="search" aria-label="Axtar">
    </div>

    <div @class(['split-view', 'split-view--open' => $selected])>
        <div class="card table-wrap">
            <table class="table">
                <thead>
                    <tr><th>Ad</th><th>Əlaqə</th><th>Mənbə</th><th>Tarix</th><th>Status</th></tr>
                </thead>
                <tbody>
                    @forelse ($enquiries as $enquiry)
                        <tr wire:key="enq-{{ $enquiry->id }}" @class(['row-link', 'is-selected' => $selectedId === $enquiry->id]) wire:click="select({{ $enquiry->id }})">
                            <td><strong>{{ $enquiry->name }}</strong><br><span class="muted">{{ $enquiry->company }}</span></td>
                            <td>{{ $enquiry->email }}<br><span class="muted">{{ $enquiry->phone }}</span></td>
                            <td>{{ $enquiry->source ?? '—' }}</td>
                            <td class="nowrap">{{ $enquiry->created_at->format('d.m.Y H:i') }}</td>
                            <td><span class="pill pill--{{ $enquiry->status }}">{{ \App\Models\Enquiry::STATUSES[$enquiry->status] ?? $enquiry->status }}</span></td>
                        </tr>
                    @empty
                        <tr><td colspan="5" class="muted center">Müraciət tapılmadı.</td></tr>
                    @endforelse
                </tbody>
            </table>
            {{ $enquiries->links('livewire.admin.pagination') }}
        </div>

        @if ($selected)
            <aside class="card detail" wire:key="detail-{{ $selected->id }}">
                <div class="card__head">
                    <h2>{{ $selected->name }}</h2>
                    <button type="button" class="link" wire:click="close" aria-label="Bağla">✕</button>
                </div>
                <dl class="meta">
                    <dt>E-poçt</dt><dd><a href="mailto:{{ $selected->email }}">{{ $selected->email }}</a></dd>
                    @if ($selected->phone)<dt>Telefon</dt><dd><a href="tel:{{ preg_replace('/[^0-9+]/', '', $selected->phone) }}">{{ $selected->phone }}</a></dd>@endif
                    @if ($selected->company)<dt>Təşkilat</dt><dd>{{ $selected->company }}</dd>@endif
                    <dt>Göndərilib</dt><dd>{{ $selected->created_at->format('d.m.Y H:i') }}</dd>
                    @if ($selected->handled_at)<dt>Baxılıb</dt><dd>{{ $selected->handled_at->format('d.m.Y H:i') }}</dd>@endif
                </dl>
                <p class="message">{{ $selected->message }}</p>

                <form wire:submit="saveStatus" class="stack">
                    <label class="field">
                        <span>Status</span>
                        <select class="input" wire:model="newStatus">
                            @foreach (\App\Models\Enquiry::STATUSES as $value => $label)
                                <option value="{{ $value }}">{{ $label }}</option>
                            @endforeach
                        </select>
                    </label>
                    <label class="field">
                        <span>Daxili qeyd</span>
                        <textarea class="input" rows="3" wire:model="note"></textarea>
                    </label>
                    <div class="form__actions">
                        <button type="button" class="link danger" wire:click="delete({{ $selected->id }})" wire:confirm="Müraciəti silmək istədiyinizə əminsiniz?">Sil</button>
                        <button type="submit" class="btn btn-primary">Yadda saxla</button>
                    </div>
                </form>
            </aside>
        @endif
    </div>
</div>
