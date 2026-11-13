<?php

namespace App\Support;

use Illuminate\Support\Facades\Storage;

class Media
{
    /** Absolute public URL for a path on the public disk (null-safe). */
    public static function url(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (preg_match('#^https?://#', $path)) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }

    /** Resolve image blocks inside a rich-text body to absolute URLs. */
    public static function blocks(?array $blocks): array
    {
        return collect($blocks ?? [])
            ->map(fn (array $b) => ($b['type'] ?? null) === 'image' ? [...$b, 'src' => self::url($b['src'] ?? null)] : $b)
            ->values()
            ->all();
    }
}
