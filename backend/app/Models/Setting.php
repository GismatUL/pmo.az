<?php

namespace App\Models;

use Database\Factories\SettingFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    /** @use HasFactory<SettingFactory> */
    use HasFactory;

    protected $fillable = [
        'key',
        'group',
        'label',
        'value',
    ];

    /** All settings as a key => value map, cached until a setting changes. */
    public static function map(): array
    {
        return Cache::rememberForever('settings.map', fn () => static::query()->pluck('value', 'key')->all());
    }

    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget('settings.map'));
        static::deleted(fn () => Cache::forget('settings.map'));
    }
}
