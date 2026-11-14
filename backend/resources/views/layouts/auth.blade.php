<!DOCTYPE html>
<html lang="az">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>{{ $title ?? 'Daxil ol' }} — PMO.az CMS</title>
    <link rel="icon" href="{{ asset('favicon.png') }}">
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}?v=2">
    @livewireStyles
</head>
<body class="auth">
    {{ $slot }}
    @livewireScripts
    @if (\App\Support\Turnstile::enabled())
        <script>
            (function () {
                var widgetId = null;

                // Called by the Turnstile script once it has loaded.
                window.pmoCaptchaLoad = function () {
                    var el = document.getElementById('login-captcha');
                    if (!el || widgetId !== null) return;
                    var component = function () {
                        var root = el.closest('[wire\\:id]');
                        return root ? Livewire.find(root.getAttribute('wire:id')) : null;
                    };
                    var setToken = function (token) {
                        var c = component();
                        if (c) c.set('captcha', token, false);
                    };
                    widgetId = turnstile.render(el, {
                        sitekey: el.dataset.sitekey,
                        theme: 'light',
                        callback: setToken,
                        'expired-callback': function () { setToken(''); },
                        'error-callback': function () { setToken(''); },
                    });
                };

                document.addEventListener('livewire:init', function () {
                    Livewire.on('captcha-reset', function () {
                        if (widgetId !== null && window.turnstile) turnstile.reset(widgetId);
                    });
                });
            })();
        </script>
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=pmoCaptchaLoad" async defer></script>
    @endif
</body>
</html>
