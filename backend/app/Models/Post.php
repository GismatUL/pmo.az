<?php

namespace App\Models;

use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<PostFactory> */
    use HasFactory;

    protected $fillable = [
        'slug',
        'category',
        'title',
        'short_title',
        'excerpt',
        'cover_image',
        'cover_caption',
        'body',
        'toc',
        'tags',
        'author',
        'is_featured',
        'published_at',
        'source_url',
    ];

    protected function casts(): array
    {
        return [
            'body' => 'array',
            'toc' => 'array',
            'tags' => 'array',
            'is_featured' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    public const CATEGORIES = [
        'Xəbərlər' => 'XƏBƏRLƏR',
        'Müsahibələr' => 'MÜSAHİBƏ',
        'Məqalələr' => 'MƏQALƏ',
        'Tədbirlər' => 'TƏDBİR',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->whereNotNull('published_at')->where('published_at', '<=', now());
    }

    public function scopeLatestFirst(Builder $query): Builder
    {
        return $query->orderByDesc('published_at')->orderByDesc('id');
    }

    /** Singular uppercase label used on cards, e.g. "MÜSAHİBƏ". */
    public function kindLabel(): string
    {
        return self::CATEGORIES[$this->category] ?? mb_strtoupper($this->category);
    }
}
