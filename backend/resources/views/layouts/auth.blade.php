<!DOCTYPE html>
<html lang="az">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>{{ $title ?? 'Daxil ol' }} — PMO.az CMS</title>
    <link rel="icon" href="{{ asset('favicon.png') }}">
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}?v=1">
    @livewireStyles
</head>
<body class="auth">
    {{ $slot }}
    @livewireScripts
</body>
</html>
