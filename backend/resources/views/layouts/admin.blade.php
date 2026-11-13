<!DOCTYPE html>
<html lang="az">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>{{ $title ?? 'Admin' }} — PMO.az CMS</title>
    <link rel="icon" href="{{ asset('favicon.png') }}">
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}?v=1">
    @livewireStyles
</head>
<body class="admin">
    <aside class="sidebar" x-data>
        <a href="{{ route('admin.dashboard') }}" class="sidebar__brand" wire:navigate>
            <img src="{{ asset('images/logo.png') }}" alt="PMO.az" width="112" height="43">
            <span>CMS</span>
        </a>

        <nav class="sidebar__nav">
            <a href="{{ route('admin.dashboard') }}" @class(['active' => request()->routeIs('admin.dashboard')]) wire:navigate>İdarə paneli</a>
            <a href="{{ route('admin.enquiries') }}" @class(['active' => request()->routeIs('admin.enquiries*')]) wire:navigate>
                Müraciətlər
                @php($newCount = \App\Models\Enquiry::query()->where('status', 'new')->count())
                @if ($newCount)<span class="badge">{{ $newCount }}</span>@endif
            </a>

            @foreach (\App\Admin\AdminResources::navigation() as $group => $items)
                <p class="sidebar__group">{{ $group }}</p>
                @foreach ($items as $key => $label)
                    <a href="{{ route('admin.resources.index', $key) }}" @class(['active' => request()->route('resource') === $key]) wire:navigate>{{ $label }}</a>
                @endforeach
            @endforeach

            <p class="sidebar__group">Sistem</p>
            <a href="{{ route('admin.settings') }}" @class(['active' => request()->routeIs('admin.settings')]) wire:navigate>Parametrlər</a>
        </nav>

        <form method="POST" action="{{ route('admin.logout') }}" class="sidebar__user">
            @csrf
            <span>{{ auth()->user()->name }}</span>
            <button type="submit" class="link">Çıxış</button>
        </form>
    </aside>

    <main class="content">
        @if (session('status'))
            <div class="flash" role="status">{{ session('status') }}</div>
        @endif

        {{ $slot }}
    </main>

    @livewireScripts
</body>
</html>
