<?php

namespace Database\Seeders\Support;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

/**
 * Helpers shared by the content seeders: reading the scraped pmo.az JSON,
 * publishing bundled images to the public disk, and idempotent
 * factory-backed upserts.
 */
class SeedData
{
    public static function json(string $name): array
    {
        return json_decode(File::get(database_path("seeders/data/{$name}.json")), true, flags: JSON_THROW_ON_ERROR);
    }

    public static function site(string $key): mixed
    {
        static $site;
        $site ??= require database_path('seeders/data/site.php');

        return $site[$key];
    }

    /**
     * Copy a bundled asset ("/images/news/x.jpg") to the public disk and
     * return its disk path ("media/news/x.jpg"), or null when missing.
     */
    public static function media(?string $livePath): ?string
    {
        if (! $livePath) {
            return null;
        }

        $relative = ltrim(preg_replace('#^/?images/#', '', $livePath), '/');
        $source = database_path("seeders/assets/{$relative}");

        if (! File::exists($source)) {
            return null;
        }

        $target = 'media/'.$relative;
        $disk = Storage::disk('public');

        if (! $disk->exists($target)) {
            $disk->put($target, File::get($source));
        }

        return $target;
    }

    /**
     * Build a model through its factory (so defaults/casts apply) and upsert
     * it by the given unique keys, keeping re-seeding idempotent.
     *
     * @param  class-string<Model>  $model
     */
    public static function upsert(string $model, array $keys, array $attributes): Model
    {
        /** @var Factory $factory */
        $factory = $model::factory();
        $raw = $factory->make($attributes)->getAttributes();

        // getAttributes() is already cast/encoded, so write it raw to avoid double JSON encoding.
        $record = $model::query()->where(array_intersect_key($raw, array_flip($keys)))->first() ?? new $model;
        $record->setRawAttributes(array_merge($record->getAttributes(), $raw));
        $record->save();

        return $record;
    }
}
