<div class="auth-card">
    <img src="{{ asset('images/logo.png') }}" alt="PMO.az" width="136" height="52" class="auth-card__logo">
    <h1>İdarəetmə paneli</h1>
    <p class="muted">Davam etmək üçün hesabınıza daxil olun.</p>

    <form wire:submit="login" class="stack">
        <label class="field">
            <span>E-poçt</span>
            <input type="email" wire:model="email" autocomplete="username" required autofocus>
            @error('email') <small class="error">{{ $message }}</small> @enderror
        </label>
        <label class="field">
            <span>Şifrə</span>
            <input type="password" wire:model="password" autocomplete="current-password" required>
            @error('password') <small class="error">{{ $message }}</small> @enderror
        </label>
        <label class="check">
            <input type="checkbox" wire:model="remember"> Məni xatırla
        </label>
        <button type="submit" class="btn btn-primary" wire:loading.attr="disabled">
            <span wire:loading.remove>Daxil ol ↗</span>
            <span wire:loading>Yoxlanılır…</span>
        </button>
    </form>
</div>
