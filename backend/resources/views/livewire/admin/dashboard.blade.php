<div>
    <header class="page-head">
        <div>
            <p class="eyebrow">PMO.AZ / CMS</p>
            <h1>İdarə paneli</h1>
        </div>
        <a class="btn btn-secondary" href="{{ config('app.frontend_url') }}" target="_blank" rel="noopener">Sayta bax ↗</a>
    </header>

    <div class="cards">
        @foreach ($cards as [$label, $value, $url])
            <a class="card stat" href="{{ $url }}" wire:navigate>
                <strong>{{ $value }}</strong>
                <span>{{ $label }}</span>
            </a>
        @endforeach
    </div>

    <div class="grid-2">
        <section class="card">
            <div class="card__head">
                <h2>Son müraciətlər</h2>
                <a href="{{ route('admin.enquiries') }}" wire:navigate>Hamısı ↗</a>
            </div>
            <ul class="list">
                @forelse ($latestEnquiries as $enquiry)
                    <li>
                        <a href="{{ route('admin.enquiries.show', $enquiry) }}" wire:navigate>
                            <strong>{{ $enquiry->name }}</strong>
                            <span class="muted">{{ \Illuminate\Support\Str::limit($enquiry->message, 70) }}</span>
                        </a>
                        <span class="pill pill--{{ $enquiry->status }}">{{ \App\Models\Enquiry::STATUSES[$enquiry->status] ?? $enquiry->status }}</span>
                    </li>
                @empty
                    <li class="muted">Hələ müraciət yoxdur.</li>
                @endforelse
            </ul>
        </section>

        <section class="card">
            <div class="card__head">
                <h2>Son yazılar</h2>
                <a href="{{ route('admin.resources.create', 'posts') }}" wire:navigate>Yeni yazı +</a>
            </div>
            <ul class="list">
                @foreach ($latestPosts as $post)
                    <li>
                        <a href="{{ route('admin.resources.edit', ['resource' => 'posts', 'id' => $post->id]) }}" wire:navigate>
                            <strong>{{ $post->title }}</strong>
                            <span class="muted">{{ $post->category }} · {{ $post->published_at?->format('d.m.Y') ?? 'Qaralama' }}</span>
                        </a>
                    </li>
                @endforeach
            </ul>
        </section>
    </div>
</div>
