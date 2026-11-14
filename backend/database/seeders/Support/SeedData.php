<?php

namespace Database\Seeders\Support;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;

/**
 * Helpers shared by the content seeders: reading the scraped pmo.az JSON,
 * pointing images at their live pmo.az URLs, and idempotent factory-backed
 * upserts.
 */
class SeedData
{
    /** Origin of the live site that hosts the scraped images. */
    public const LIVE_ORIGIN = 'https://pmo.az';

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
     * Absolute live URL for a scraped image path ("/images/news/x.jpg" →
     * "https://pmo.az/images/news/x.jpg"), with each segment URL-encoded.
     */
    public static function media(?string $livePath): ?string
    {
        if (! $livePath) {
            return null;
        }

        $segments = array_map('rawurlencode', explode('/', ltrim($livePath, '/')));

        return self::LIVE_ORIGIN.'/'.implode('/', $segments);
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
