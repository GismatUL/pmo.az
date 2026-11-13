<?php

namespace App\Models;

use Database\Factories\ExpertFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expert extends Model
{
    /** @use HasFactory<ExpertFactory> */
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'position',
        'bio',
        'photo',
        'articles',
        'is_founder',
        'is_published',
        'sort',
        'source_url',
    ];

    protected function casts(): array
    {
        return [
            'articles' => 'array',
            'is_founder' => 'boolean',
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
