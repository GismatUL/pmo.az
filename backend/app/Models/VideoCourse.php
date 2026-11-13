<?php

namespace App\Models;

use Database\Factories\VideoCourseFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoCourse extends Model
{
    /** @use HasFactory<VideoCourseFactory> */
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'body',
        'image',
        'url',
        'is_published',
        'sort',
    ];

    protected function casts(): array
    {
        return [
            'body' => 'array',
            'is_published' => 'boolean',
            'sort' => 'integer',
        ];
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort')->orderBy('id');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }
}
